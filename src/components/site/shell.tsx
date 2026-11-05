import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV, type NavTo } from "@/components/site/content";

export function Mark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <rect width="36" height="36" rx="10" className="fill-teal" />
      <path
        d="M8 11h20v3.2h-2.2v8.2c0 1.5-1 2.6-2.6 2.6h-10.4c-1.6 0-2.6-1.1-2.6-2.6v-8.2H8V11z"
        className="fill-paper"
      />
    </svg>
  );
}

function navClass(mobile: boolean) {
  return mobile
    ? "flex h-12 items-center rounded-control px-2 text-base font-medium"
    : "rounded-control px-3 py-2 text-sm font-medium";
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <Mark />
            <span className="truncate font-display text-sm tracking-tight sm:text-base">СТАЛЬТРАССА</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Разделы">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                preload="intent"
                activeOptions={{ exact: item.to !== "/catalog" }}
                className={navClass(false)}
                activeProps={{ className: "bg-paper-deep text-ink" }}
                inactiveProps={{ className: "text-muted hover:bg-paper-deep hover:text-ink" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/contacts"
              className="press inline-flex h-11 items-center justify-center rounded-control bg-teal px-3 text-sm font-semibold text-paper hover:bg-teal-deep sm:px-4"
            >
              Написать
            </Link>
            <button
              type="button"
              className="press inline-flex size-11 items-center justify-center rounded-control border border-line bg-surface lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {open ? (
          <nav id="mobile-nav" className="border-t border-line px-4 py-3 lg:hidden" aria-label="Разделы">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    preload="intent"
                    activeOptions={{ exact: item.to !== "/catalog" }}
                    className={navClass(true)}
                    activeProps={{ className: "bg-paper-deep text-ink" }}
                    inactiveProps={{ className: "text-muted hover:bg-paper-deep hover:text-ink" }}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="border-t border-line-strong bg-ink text-on-ink">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5 text-paper">
              <Mark className="size-8" />
              <span className="font-display tracking-tight">СТАЛЬТРАССА</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              Металлические кабельные лотки: перфорированные, лестничные и глухие. Москва, отгрузка по России.
            </p>
          </div>
          <nav aria-label="Подвал" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-paper">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="border-t border-line-strong">
          <p className="mx-auto max-w-6xl px-4 py-4 text-xs sm:px-6">© 2026 СТАЛЬТРАССА. Ориентир, не оферта.</p>
        </div>
      </footer>
    </div>
  );
}

const TONES = {
  teal: "bg-teal text-paper hover:bg-teal-deep",
  paper: "bg-paper text-ink hover:bg-paper-deep",
  ghost: "border border-line bg-paper text-ink hover:bg-paper-deep",
} as const;

export function CtaLink({
  to,
  hash,
  tone = "teal",
  children,
  className = "",
}: {
  to: NavTo;
  hash?: string;
  tone?: keyof typeof TONES;
  children: ReactNode;
  className?: string;
}) {
  const classNames = `press inline-flex h-12 items-center justify-center gap-2 rounded-control px-5 text-center font-semibold ${TONES[tone]} ${className}`;
  if (hash) {
    return (
      <Link to={to} hash={hash} className={classNames}>
        {children}
      </Link>
    );
  }
  return (
    <Link to={to} className={classNames}>
      {children}
    </Link>
  );
}

export function ArrowCta({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <>
      {children}
      <ArrowRight className={`size-4 ${className}`} aria-hidden="true" />
    </>
  );
}

export function PageIntro({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold text-teal">{kicker}</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{text}</p>
    </div>
  );
}
