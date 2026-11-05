import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SignInGate, UserButton } from "@/lib/auth/gates";
import { claimAdmin, getAdminStatus, getSiteCopy, saveSiteCopy } from "@/lib/site-copy.functions";
import { DEFAULT_SITE_COPY, type SiteCopy } from "@/lib/site-copy";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Админка — СТАЛЬТРАССА" }] }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <SignInGate fallback={<SignedOutAdmin />}>
      <AdminDesk />
    </SignInGate>
  );
}

function SignedOutAdmin() {
  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-3xl tracking-tight">Нужен вход</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Тексты сайта меняет только администратор. Войдите — если администратора ещё нет, им станете вы.
      </p>
      <Link
        to="/login"
        className="press mt-6 inline-flex h-12 items-center rounded-control bg-teal px-5 font-semibold text-paper"
      >
        Войти
      </Link>
    </section>
  );
}

function AdminDesk() {
  const router = useRouter();
  const [copy, setCopy] = useState<SiteCopy | null>(null);
  const [denied, setDenied] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancel = false;
    (async () => {
      const status = await getAdminStatus();
      if (cancel) return;
      if (!status.hasAdmin) {
        const claimed = await claimAdmin();
        if (!claimed.isAdmin) {
          setDenied(true);
          return;
        }
      } else if (!status.isAdmin) {
        setDenied(true);
        return;
      }
      const current = await getSiteCopy();
      if (!cancel) setCopy(current);
    })().catch(() => {
      if (!cancel) setMessage("Не удалось открыть админку. Обновите страницу.");
    });
    return () => {
      cancel = true;
    };
  }, []);

  async function save(next: SiteCopy) {
    setSaving(true);
    setMessage("");
    try {
      const result = await saveSiteCopy({ data: next });
      if (!result.ok) {
        setDenied(true);
        setCopy(null);
        return;
      }
      setCopy(result.copy);
      setMessage("Сохранено. Текст уже на сайте.");
      await router.invalidate();
    } catch {
      setMessage("Не сохранилось. Попробуйте ещё раз.");
    } finally {
      setSaving(false);
    }
  }

  if (denied) {
    return (
      <section className="mx-auto max-w-lg px-4 py-16">
        <h1 className="font-display text-3xl tracking-tight">Нет прав</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Администратор уже назначен. Этот аккаунт может только смотреть сайт.
        </p>
        <div className="mt-6">
          <UserButton />
        </div>
      </section>
    );
  }

  if (!copy) {
    return <p className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted">{message || "Открываем админку…"}</p>;
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-teal">Админка</p>
          <h1 className="mt-2 font-display text-3xl tracking-tight">Тексты сайта</h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            Правки видят все посетители. Размеры, фото и цены здесь не меняются.
          </p>
        </div>
        <UserButton />
      </div>

      <form
        className="mt-8 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          void save(copy);
        }}
      >
        <Block title="Главная">
          <Field label="Строка над заголовком" value={copy.heroKicker} onChange={(heroKicker) => setCopy({ ...copy, heroKicker })} />
          <Field label="Заголовок" value={copy.heroTitle} onChange={(heroTitle) => setCopy({ ...copy, heroTitle })} />
          <Field label="Текст" value={copy.heroText} multiline onChange={(heroText) => setCopy({ ...copy, heroText })} />
          <Field label="Подвал" value={copy.footerText} multiline onChange={(footerText) => setCopy({ ...copy, footerText })} />
        </Block>

        {copy.series.map((series, index) => (
          <Block key={series.id} title={series.name}>
            <Field
              label="Название в каталоге"
              value={series.name}
              onChange={(name) => setCopy(updateSeries(copy, index, { name }))}
            />
            <Field
              label="Заголовок страницы"
              value={series.pageTitle}
              onChange={(pageTitle) => setCopy(updateSeries(copy, index, { pageTitle }))}
            />
            <Field
              label="Коротко в каталоге"
              value={series.text}
              multiline
              onChange={(text) => setCopy(updateSeries(copy, index, { text }))}
            />
            <Field
              label="Текст на странице серии"
              value={series.lead}
              multiline
              onChange={(lead) => setCopy(updateSeries(copy, index, { lead }))}
            />
            <Field
              label="Пункты, каждый с новой строки"
              value={series.points.join("\n")}
              multiline
              onChange={(value) =>
                setCopy(updateSeries(copy, index, { points: value.split("\n").map((line) => line.trim()).filter(Boolean) }))
              }
            />
          </Block>
        ))}

        <Block title="Отзывы">
          {copy.reviews.map((review, index) => (
            <div key={review.name + index} className="flex flex-col gap-3 border-t border-line pt-4 first:border-t-0 first:pt-0">
              <Field
                label="Цитата"
                value={review.quote}
                multiline
                onChange={(quote) => setCopy(updateReview(copy, index, { quote }))}
              />
              <Field label="Имя" value={review.name} onChange={(name) => setCopy(updateReview(copy, index, { name }))} />
              <Field label="Должность" value={review.role} onChange={(role) => setCopy(updateReview(copy, index, { role }))} />
            </div>
          ))}
        </Block>

        <Block title="Контакты">
          <Field label="Заголовок" value={copy.contactsTitle} onChange={(contactsTitle) => setCopy({ ...copy, contactsTitle })} />
          <Field label="Текст" value={copy.contactsText} multiline onChange={(contactsText) => setCopy({ ...copy, contactsText })} />
          <Field label="Склад" value={copy.warehouse} onChange={(warehouse) => setCopy({ ...copy, warehouse })} />
          <Field label="Часы" value={copy.hours} onChange={(hours) => setCopy({ ...copy, hours })} />
          <Field label="Срок ответа" value={copy.reply} onChange={(reply) => setCopy({ ...copy, reply })} />
        </Block>

        <Block title="Доставка">
          <Field label="Заголовок" value={copy.deliveryTitle} onChange={(deliveryTitle) => setCopy({ ...copy, deliveryTitle })} />
          <Field label="Текст" value={copy.deliveryText} multiline onChange={(deliveryText) => setCopy({ ...copy, deliveryText })} />
        </Block>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="press h-12 rounded-control bg-teal px-5 font-semibold text-paper hover:bg-teal-deep disabled:opacity-60"
          >
            {saving ? "Сохраняем…" : "Сохранить"}
          </button>
          <button
            type="button"
            className="press h-12 rounded-control border border-line bg-surface px-5 font-semibold"
            onClick={() => setCopy(DEFAULT_SITE_COPY)}
          >
            Вернуть исходные
          </button>
          {message ? <p className="text-sm text-muted">{message}</p> : null}
        </div>
      </form>
    </section>
  );
}

function updateSeries(copy: SiteCopy, index: number, patch: Partial<SiteCopy["series"][number]>): SiteCopy {
  return {
    ...copy,
    series: copy.series.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
  };
}

function updateReview(copy: SiteCopy, index: number, patch: Partial<SiteCopy["reviews"][number]>): SiteCopy {
  return {
    ...copy,
    reviews: copy.reviews.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)),
  };
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open className="rounded-card border border-line bg-surface p-5">
      <summary className="cursor-pointer font-display text-xl tracking-tight">{title}</summary>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </details>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const className = "mt-1 w-full rounded-control border border-line bg-paper px-3 py-2 text-sm";
  return (
    <label className="block text-sm font-medium">
      {label}
      {multiline ? (
        <textarea className={className} rows={4} value={value} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={className} value={value} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}
