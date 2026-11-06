import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { NAV, type NavTo } from "@/components/site/content";
import {
  IconArrow,
  IconCatalog,
  IconClose,
  IconHome,
  IconMail,
  IconMenu,
  IconNews,
  IconPhone,
  IconSettings,
  IconShield,
  IconTelegram,
  IconTruck,
} from "@/components/site/icons";
import { SeriesText } from "@/components/site/series-text";
import { useSiteCopy } from "@/components/site/use-site-copy";

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="whitespace-nowrap font-display text-[15px] font-semibold leading-none tracking-[-0.03em] sm:text-[16px]">
      Лоток<span className={onDark ? "text-[#8ae8b4]" : "text-[#3db878]"}>24</span>
    </span>
  );
}

export function Mark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="7 7 22 22" className={className} aria-hidden="true" fill="none">
      <path
        d="M25.5 11.7a9.8 9.8 0 1 1-10.8-2.9"
        stroke="#5ed492"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12.1 8.3 14.7 8.8 13 10.8"
        stroke="#5ed492"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="18" r="6" stroke="#5ed492" strokeWidth="1.7" />
      <path d="M18 18V14.2M18 18l3.1 1.8" stroke="#5ed492" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="18" cy="18" r="1.15" fill="#5ed492" />
    </svg>
  );
}

function navClass(mobile: boolean) {
  return mobile
    ? "flex h-11 items-center whitespace-nowrap rounded-control px-2 text-[15px] font-medium"
    : "whitespace-nowrap rounded-control px-2 py-1.5 text-[13px] font-medium";
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
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-2 sm:px-6 lg:min-h-14 lg:gap-3 lg:py-1.5">
          <div className="flex min-w-0 flex-col">
            <Link to="/" className="flex w-fit shrink-0 items-center gap-1.5" onClick={() => setOpen(false)}>
              <Mark className="size-7" />
              <Wordmark />
            </Link>
            <div className="mt-0.5 flex flex-col lg:hidden">
              <PhoneLink className="header-contact" />
              <MailLink className="header-contact" />
            </div>
          </div>
          <nav className="hidden items-center lg:flex" aria-label="Разделы">
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
          <div className="flex shrink-0 items-center gap-1.5">
            <div className="hidden shrink-0 flex-col items-start lg:flex">
              <PhoneLink className="header-contact" />
              <MailLink className="header-contact" />
            </div>
            <ChatLinks copy={copy} className="hidden lg:inline-flex" />
            <Link to="/contacts" className="press ios-filled ios-compact max-lg:px-3 max-lg:text-[13px]">
              Заказать
            </Link>
            <button
              type="button"
              className="press ios-icon !size-9 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
              {open ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
            </button>
          </div>
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
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
          <div>
            <div className="flex items-center gap-1 text-paper">
              <Mark className="size-7" />
              <Wordmark onDark />
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-on-ink/80">
              <SeriesText text={copy.footerText} className="underline decoration-white/30 underline-offset-2 hover:text-paper" />
            </p>
          </div>
          <nav aria-label="Подвал" className="flex flex-col gap-2.5 text-sm">
            {NAV.map((item) => {
              const Icon = FOOTER_ICONS[item.to];
              return (
                <Link key={item.to} to={item.to} className="inline-flex w-fit items-center gap-2 hover:text-paper">
                  <span className="text-[#8ae8b4]">
                    <Icon />
                  </span>
                  {item.label}
                </Link>
              );
            })}
            <Link to="/admin" className="mt-2 inline-flex w-fit items-center gap-2 text-on-ink/60 hover:text-paper">
              <IconSettings className="size-4" />
              Админка
            </Link>
          </nav>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-on-ink/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>© 2026 ООО «3К». ИНН 9718232170, КПП 771801001.</p>
            <Link to="/privacy" className="inline-flex w-fit items-center gap-1.5 hover:text-paper">
              <IconShield className="size-3.5" />
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const FOOTER_ICONS = {
  "/": IconHome,
  "/catalog": IconCatalog,
  "/delivery": IconTruck,
  "/blog": IconNews,
  "/contacts": IconPhone,
} as const satisfies Record<NavTo, typeof IconHome>;

export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a href="tel:+79859389776" className={`press ios-filled inline-flex items-center justify-center gap-2 ${className}`}>
      <IconPhone className="size-4" />
      Позвонить
    </a>
  );
}

export function PhoneLink({ className = "inline-flex" }: { className?: string }) {
  return (
    <ContactChip href="tel:+79859389776" label="Позвонить по номеру +7 (985) 938-97-76" className={className}>
      <IconPhone className="size-4" />
      +7 (985) 938-97-76
    </ContactChip>
  );
}

export function MailLink({ className = "inline-flex" }: { className?: string }) {
  return (
    <ContactChip href="mailto:info@lotok24.ru" label="Написать на info@lotok24.ru" className={className}>
      <IconMail className="size-4" />
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
      className={`press inline-flex items-center gap-1.5 rounded-full bg-transparent font-medium text-teal hover:bg-transparent hover:text-teal-deep ${className}`}
    >
      {children}
    </a>
  );
}

function ChatLinks({
  copy,
  wide = false,
  className = "",
}: {
  copy: { telegramUrl: string };
  wide?: boolean;
  className?: string;
}) {
  return (
    <a
      href={copy.telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в Telegram"
      className={`press chat-tg ${wide ? "chat-wide" : "!size-9 !min-h-9 !min-w-9"} ${className}`}
    >
      <IconTelegram className="size-4" />
      {wide ? <span>Telegram</span> : null}
    </a>
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
      <IconArrow className={`size-4 ${className}`} />
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
