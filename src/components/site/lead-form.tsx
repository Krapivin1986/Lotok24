import { useEffect, useId, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PLANS, planById, type PlanId } from "@/components/site/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "lotok24-leads";

export function LeadForm({ initialPlan }: { initialPlan?: PlanId }) {
  const [plan, setPlan] = useState<PlanId | null>(initialPlan ?? null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");
  const hintId = useId();
  const errorId = useId();
  const chosen = planById(plan ?? undefined);

  useEffect(() => {
    setPlan(initialPlan ?? null);
  }, [initialPlan]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = email.trim();
    if (!EMAIL_RE.test(next)) {
      setStatus("error");
      return;
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const prev: unknown[] = raw ? (JSON.parse(raw) as unknown[]) : [];
      prev.push({ email: next, plan, at: Date.now() });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
    } catch {
      /* заявка всё равно подтверждается на экране */
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div role="status" className="py-2">
        <p className="font-display text-2xl tracking-tight">Заявка принята</p>
        <p className="mt-3 text-muted">
          Прайс и спецификацию отправим на {email.trim()}
          {chosen ? ` по тарифу «${chosen.name}»` : ""}. В рабочее время, без звонка «просто узнать».
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="press ios-filled bg-teal text-paper hover:bg-teal-deep"
          >
            На главную
          </Link>
          <button
            type="button"
            className="press ios-tinted"
            onClick={() => setStatus("idle")}
          >
            Указать другой адрес
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="email" className="font-display text-xl tracking-tight">
        Куда отправить прайс
      </label>
      <fieldset className="mt-4">
        <legend className="text-sm text-muted">Тариф, если уже выбрали</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {PLANS.map((item) => {
            const active = plan === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPlan(active ? null : item.id)}
                className={
                  active
                    ? "press ios-filled ios-compact bg-teal text-paper"
                    : "press ios-tinted ios-compact"
                }
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </fieldset>
      <p id={hintId} className="mt-4 text-sm text-muted">
        Можно без тарифа — подберём серию по письму.
      </p>
      <input
        id="email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        value={email}
        placeholder="name@company.ru"
        aria-invalid={status === "error"}
        aria-describedby={status === "error" ? errorId : hintId}
        onChange={(event) => {
          setEmail(event.target.value);
          if (status === "error") setStatus("idle");
        }}
        className="mt-3 h-12 w-full rounded-control border border-line bg-surface px-4 text-base text-ink outline-none placeholder:text-muted"
      />
      {status === "error" ? (
        <p id={errorId} className="mt-2 text-sm font-medium text-teal-deep" role="alert">
          Введите рабочий email — на него уйдёт спецификация.
        </p>
      ) : null}
      <button
        type="submit"
        className="press ios-filled mt-4 w-full bg-teal text-paper hover:bg-teal-deep"
      >
        Отправить
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
      <p className="mt-3 text-xs leading-relaxed text-muted">
        Нажимая кнопку, вы соглашаетесь получить письмо со спецификацией. Адрес остаётся в этом браузере и не уходит
        на сервер.
      </p>
    </form>
  );
}
