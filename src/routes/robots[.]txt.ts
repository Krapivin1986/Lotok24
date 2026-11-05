import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const body = `User-agent: Yandex
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /api/
Clean-param: utm_source&utm_medium&utm_campaign&utm_term&utm_content
Host: ${new URL(origin).host}
Sitemap: ${origin}/sitemap.xml

User-agent: *
Allow: /
Disallow: /admin
Disallow: /login
Disallow: /api/
Sitemap: ${origin}/sitemap.xml
`;
        return new Response(body, {
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
