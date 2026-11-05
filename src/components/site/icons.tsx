import type { ReactNode } from "react";

export function Glyph({ className = "size-4", children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} shrink-0`}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function IconHome({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
    </Glyph>
  );
}

export function IconCatalog({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </Glyph>
  );
}

export function IconTruck({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 11h4l3 3v2h-7" />
      <circle cx="7" cy="18" r="1.4" />
      <circle cx="18" cy="18" r="1.4" />
    </Glyph>
  );
}

export function IconNews({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M7 3.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1z" />
      <path d="M14 3.5V8h4.5M8 12h8M8 16h5" />
    </Glyph>
  );
}

export function IconPhone({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M8 4h2.5l1.2 3.2-1.8 1a11 11 0 0 0 5 5l1-1.8 3.2 1.2V15a2 2 0 0 1-2 2A13 13 0 0 1 6 6a2 2 0 0 1 2-2z" />
    </Glyph>
  );
}

export function IconMail({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Glyph>
  );
}

export function IconTelegram({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="m4 11 16-7-7 16-2.2-6.2z" />
      <path d="M10.8 13.8 20 4" />
    </Glyph>
  );
}

export function IconArrow({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Glyph>
  );
}

export function IconMenu({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Glyph>
  );
}

export function IconClose({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Glyph>
  );
}

export function IconCheck({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M5 12.5 9.5 17 19 7" />
    </Glyph>
  );
}

export function IconShield({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6z" />
    </Glyph>
  );
}

export function IconSettings({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6.1 6.1l1.6 1.6M16.3 16.3l1.6 1.6M17.9 6.1l-1.6 1.6M7.7 16.3l-1.6 1.6" />
    </Glyph>
  );
}

export function IconAlert({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M12 3.5 3 20h18z" />
      <path d="M12 9.5v5" />
      <path d="M12 17.2h.01" />
    </Glyph>
  );
}

export function IconWeight({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M12 4v3" />
      <path d="M8 7h8l2 13H6z" />
      <path d="M10 12h4" />
    </Glyph>
  );
}

export function IconWind({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M4 9h10a3 3 0 1 0-3-3" />
      <path d="M4 14h14a3 3 0 1 1-3 3" />
    </Glyph>
  );
}

export function IconLayers({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="m12 4 8 4-8 4-8-4z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </Glyph>
  );
}

export function IconWrench({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M14.5 6.5a3.5 3.5 0 0 0-4.8 4.8L4 17.2 6.8 20l5.9-5.7a3.5 3.5 0 0 0 4.8-4.8L15 12l-3-3z" />
    </Glyph>
  );
}

export function IconBadge({ className }: { className?: string }) {
  return (
    <Glyph className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12.2 2.3 2.3 4.7-5" />
    </Glyph>
  );
}
