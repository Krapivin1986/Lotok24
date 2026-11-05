import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFrame } from "@/components/site/shell";
import { getSiteCopy } from "@/lib/site-copy.functions";
import { jsonLd, organizationLd } from "@/components/site/seo";
import appCss from "../styles.css?url";

const APP_NAME = "Лоток24 — металлические кабельные лотки";

export const Route = createRootRoute({
  loader: () => getSiteCopy(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Оцинкованные кабельные лотки от производителя: перфорированные, лестничные и глухие. Склад в Москве, отгрузка по России.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Лоток24" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#f6f3ec" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [jsonLd(organizationLd)],
  }),
  component: () => (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteFrame>
            <Outlet />
          </SiteFrame>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
