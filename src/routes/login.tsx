import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Вход — Лоток24" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <section className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <p className="text-sm font-semibold text-teal">Админка</p>
      <h1 className="mt-3 font-display text-3xl tracking-tight">Вход для правки текстов</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Войдите через Google или X. Первый аккаунт становится администратором и может менять тексты сайта.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((provider) => (
            <button
              key={provider.providerId}
              type="button"
              onClick={() => signIn(provider.providerId, { callbackURL: "/admin" })}
              className="press ios-tinted w-full"
            >
              Войти через {provider.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-muted">Вход сейчас выключен.</p>
        )}
      </div>
    </section>
  );
}
