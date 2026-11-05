import { useEffect, useId, useLayoutEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV, type NavTo } from "@/components/site/content";
import { SeriesText } from "@/components/site/series-text";
import { useSiteCopy } from "@/components/site/use-site-copy";

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="truncate font-display text-[15px] leading-none tracking-[-0.03em] sm:text-[17px]">
      <span className="font-medium">Лоток</span>
      <span className={onDark ? "font-semibold text-[#8ae8b4]" : "font-semibold text-teal"}>24</span>
    </span>
  );
}

export function Mark({ className = "size-9" }: { className?: string }) {
  const gradientId = `mark-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 36 36" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="4" y1="2" x2="32" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8ae8b4" />
          <stop offset="1" stopColor="#127a40" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="11" fill={`url(#${gradientId})`} />
      <rect x="8.5" y="11" width="3.6" height="14.5" rx="1.8" className="fill-paper" />
      <rect x="23.9" y="11" width="3.6" height="14.5" rx="1.8" className="fill-paper" />
      <rect x="8.5" y="21.2" width="19" height="4.3" rx="2.15" className="fill-paper" />
      <rect x="15.1" y="22.25" width="5.8" height="2.2" rx="1.1" fill={`url(#${gradientId})`} />
    </svg>
  );
}

function navClass(mobile: boolean) {
  return mobile
    ? "flex h-12 items-center rounded-control px-2 text-base font-medium"
    : "rounded-control px-3 py-2 text-sm font-medium";
}

export function SiteFrame({ children }: { children: ReactNode }) {
  const copy = useSiteCopy();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;
    const items = [...main.querySelectorAll<HTMLElement>("article, section:not(:has(article))")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("reveal-in");
          observer.unobserve(target);
          target.addEventListener("transitionend", () => target.classList.add("reveal-done"), { once: true });
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 12% 0px" },
    );
    const limit = window.innerHeight * 0.92;
    const tops = items.map((item) => item.getBoundingClientRect().top);
    items.forEach((item, index) => {
      item.classList.add("reveal");
      if (tops[index] < limit) {
        item.classList.add("reveal-in", "reveal-done");
        return;
      }
      observer.observe(item);
    });
    return () => {
      observer.disconnect();
      items.forEach((item) => {
        item.classList.remove("reveal", "reveal-in", "reveal-done");
      });
    };
  }, [pathname]);

  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-ink">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
            <Mark />
            <Wordmark />
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
            <PhoneLink className="hidden xl:inline-flex" />
            <MailLink className="hidden sm:inline-flex" />
            <ChatLinks copy={copy} />
            <Link to="/contacts" className="press ios-filled max-sm:min-h-9 max-sm:px-3.5 max-sm:text-[15px]">
              Заказать
            </Link>
            <button
              type="button"
              className="press ios-icon lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 border-t border-line px-4 py-2 xl:hidden">
          <PhoneLink />
          <MailLink className="inline-flex sm:hidden" />
        </div>
        {open ? (
          <nav id="mobile-nav" className="max-h-[70dvh] overflow-y-auto border-t border-line px-4 py-3 lg:hidden" aria-label="Разделы">
            <div className="mb-2 flex items-center gap-2">
              <ChatLinks copy={copy} wide />
            </div>
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
              <Wordmark onDark />
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed">
              <SeriesText text={copy.footerText} className="underline decoration-white/40 underline-offset-2 hover:text-paper" />
            </p>
          </div>
          <nav aria-label="Подвал" className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            {NAV.map((item) =>
              item.to === "/" ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className="press ios-filled"
                >
                  На главную
                </Link>
              ) : (
                <Link key={item.to} to={item.to} className="hover:text-paper">
                  {item.label}
                </Link>
              ),
            )}
            <Link to="/admin" className="hover:text-paper">
              Админка
            </Link>
          </nav>
        </div>
        <div className="border-t border-line-strong">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>© 2026 Лоток24. Ориентир, не оферта.</p>
            <Link to="/privacy" className="hover:text-paper">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a href="tel:+79859389776" className={`press ios-filled inline-flex items-center justify-center ${className}`}>
      Позвонить
    </a>
  );
}

export function PhoneLink({ className = "inline-flex" }: { className?: string }) {
  return (
    <ContactChip href="tel:+79859389776" label="Позвонить по номеру +7 (985) 938-97-76" className={className}>
      +7 (985) 938-97-76
    </ContactChip>
  );
}

export function MailLink({ className = "inline-flex" }: { className?: string }) {
  return (
    <ContactChip href="mailto:info@lotok24.ru" label="Написать на info@lotok24.ru" className={className}>
      info@lotok24.ru
    </ContactChip>
  );
}

function ContactChip({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`press min-h-9 items-center justify-center rounded-full bg-transparent px-3.5 text-sm font-semibold text-teal hover:bg-transparent hover:text-teal-deep ${className}`}
    >
      {children}
    </a>
  );
}

function ChatLinks({
  copy,
  wide = false,
}: {
  copy: { telegramUrl: string };
  wide?: boolean;
}) {
  return (
    <a
      href={copy.telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      className={`press chat-tg ${wide ? "chat-wide" : ""}`}
    >
      <TelegramIcon />
      {wide ? <span>Telegram</span> : null}
    </a>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 sm:size-5" aria-hidden="true" fill="currentColor">
      <path d="M21.5 4.4 2.7 11.6c-1.28.5-1.27 1.22-.23 1.54l4.82 1.5 11.2-7.07c.53-.32 1.01-.15.61.21l-9.07 8.2-.35 4.93c.51 0 .73-.23 1.01-.5l2.42-2.35 5.03 3.71c.93.51 1.59.25 1.82-.86l3.3-15.55c.34-1.34-.51-1.95-1.46-1.56Z" />
    </svg>
  );
}

const TONES = {
  teal: "",
  paper: "ios-on-dark",
  ghost: "",
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
  const classNames = `press ${tone === "ghost" ? "ios-tinted" : "ios-filled"} w-full text-center sm:w-auto ${TONES[tone]} ${className}`;
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

export function PageIntro({ kicker, title, text }: { kicker: string; title: ReactNode; text: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <p className="kicker">{kicker}</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{text}</p>
    </div>
  );
}
