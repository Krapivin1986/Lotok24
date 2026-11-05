import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { DEFAULT_SITE_COPY, sanitizeSiteCopy, type SiteCopy } from "@/lib/site-copy";

const memory = globalThis as typeof globalThis & {
  __siteCopyBody?: string;
  __siteAdmins?: Set<string>;
};

function admins() {
  memory.__siteAdmins ??= new Set<string>();
  return memory.__siteAdmins;
}

function databaseUrl() {
  const value = process.env.DATABASE_URL;
  return value && value.trim() ? value.trim() : "";
}

async function sqlClient() {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

async function readCopy(): Promise<SiteCopy> {
  if (!databaseUrl()) {
    if (!memory.__siteCopyBody) return DEFAULT_SITE_COPY;
    try {
      return sanitizeSiteCopy(JSON.parse(memory.__siteCopyBody));
    } catch {
      return DEFAULT_SITE_COPY;
    }
  }
  const sql = await sqlClient();
  const rows = await sql<{ body: string }>`select body from site_copy where id = 1`;
  if (!rows[0]) return DEFAULT_SITE_COPY;
  try {
    return sanitizeSiteCopy(JSON.parse(rows[0].body));
  } catch {
    return DEFAULT_SITE_COPY;
  }
}

export const getSiteCopy = createServerFn({ method: "GET" }).handler(async (): Promise<SiteCopy> => {
  try {
    return await readCopy();
  } catch {
    return DEFAULT_SITE_COPY;
  }
});

export const getAdminStatus = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    if (!databaseUrl()) {
      const list = admins();
      return { isAdmin: list.has(context.userId), hasAdmin: list.size > 0 };
    }
    const sql = await sqlClient();
    const rows = await sql<{ user_id: string }>`select user_id from site_admins`;
    return {
      isAdmin: rows.some((row) => row.user_id === context.userId),
      hasAdmin: rows.length > 0,
    };
  });

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    if (!databaseUrl()) {
      const list = admins();
      if (list.size === 0) list.add(context.userId);
      return { isAdmin: list.has(context.userId) };
    }
    const sql = await sqlClient();
    const inserted = await sql<{ user_id: string }>`
      insert into site_admins (user_id)
      select ${context.userId}
      where not exists (select 1 from site_admins)
      returning user_id
    `;
    if (inserted[0]) return { isAdmin: true };
    const mine = await sql<{ user_id: string }>`
      select user_id from site_admins where user_id = ${context.userId}
    `;
    return { isAdmin: mine.length > 0 };
  });

export const saveSiteCopy = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: SiteCopy) => sanitizeSiteCopy(data))
  .handler(async ({ data, context }): Promise<{ ok: true; copy: SiteCopy } | { ok: false }> => {
    if (!databaseUrl()) {
      if (!admins().has(context.userId)) return { ok: false };
      memory.__siteCopyBody = JSON.stringify(data);
      return { ok: true, copy: data };
    }
    const sql = await sqlClient();
    const mine = await sql<{ user_id: string }>`
      select user_id from site_admins where user_id = ${context.userId}
    `;
    if (mine.length === 0) return { ok: false };
    const body = JSON.stringify(data);
    await sql`
      insert into site_copy (id, body)
      values (1, ${body})
      on conflict (id) do update set body = excluded.body, updated_at = now()
    `;
    return { ok: true, copy: data };
  });
