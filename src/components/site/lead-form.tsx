import { useEffect, useId, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { IconArrow } from "@/components/site/icons";
import { SERIES } from "@/components/site/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "lotok24-leads";
const WIDTHS = ["50", "100", "150", "200", "300", "400", "500", "600", "другая", "пока не знаю"] as const;

type SeriesId = (typeof SERIES)[number]["id"];

function isSeriesId(value: string): value is SeriesId {
  return SERIES.some((item) => item.id === value);
}

export function LeadForm({ initialSeries }: { initialSeries?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [series, setSeries] = useState(initialSeries && isSeriesId(initialSeries) ? initialSeries : "");
  const [width, setWidth] = useState("");
  const [meters, setMeters] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const errorId = useId();

  useEffect(() => {
    if (initialSeries && isSeriesId(initialSeries)) setSeries(initialSeries);
  }, [initialSeries]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    const nextPhone = phone.trim();
    const nextEmail = email.trim();
    const digits = nextPhone.replace(/\D/g, "");
    if (nextName.length < 2) {
      setError("Напишите, как к вам обращаться.");
      return;
    }
    if (digits.length < 10) {
      setError("Введите телефон, чтобы можно было перезвонить.");
      return;
    }
    if (!EMAIL_RE.test(nextEmail)) {
      setError("Введите почту, на неё уйдёт спецификация.");
      return;
    }
    if (!isSeriesId(series)) {
      setError("Выберите серию лотка.");
      return;
    }
    if (!width) {
      setError("Укажите ширину или отметьте, что она пока неизвестна.");
      return;
    }
    const length = Number(meters.replace(",", "."));
    if (!Number.isFinite(length) || length <= 0) {
      setError("Укажите метраж числом, например 120.");
      return;
    }

    const seriesName = SERIES.find((item) => item.id === series)?.name ?? series;
    const body = [
      `Имя: ${nextName}`,
      `Телефон: ${nextPhone}`,
      `Почта: ${nextEmail}`,
      `Серия: ${seriesName}`,
      `Ширина, мм: ${width}`,
      `Метраж: ${length}`,
    ].join("\n");
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const prev: unknown[] = raw ? (JSON.parse(raw) as unknown[]) : [];
      prev.push({ name: nextName, phone: nextPhone, email: nextEmail, series, width, meters: length, at: Date.now() });
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prev));
    } catch {
      /* письмо всё равно открывается */
    }
    window.location.href = `mailto:info@lotok24.ru?subject=${encodeURIComponent("Заявка на кабельный лоток")}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setError("");
  }

  if (sent) {
    return (
      <div role="status" className="py-2">
        <p className="font-display text-2xl tracking-tight">Письмо собрано</p>
        <p className="mt-3 text-muted">
          Отправьте его из почтовой программы на info@lotok24.ru. Если окно не открылось, напишите туда сами или позвоните{" "}
          <a href="tel:+79859389776" className="font-semibold text-teal">
            +7 (985) 938-97-76
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3">
      <div>
        <h2 className="font-display text-xl tracking-tight">Запросить спецификацию</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Напишите серию, ширину и метры. Прайс и срок отгрузки пришлём в тот же рабочий день.
        </p>
      </div>
      <label className="grid gap-1 text-sm font-medium">
        Имя
        <input
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="h-12 rounded-control border border-line bg-surface px-4 text-base font-normal text-ink outline-none"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Телефон
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          placeholder="+7 985 000-00-00"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="h-12 rounded-control border border-line bg-surface px-4 text-base font-normal text-ink outline-none placeholder:text-muted"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Почта
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="name@company.ru"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 rounded-control border border-line bg-surface px-4 text-base font-normal text-ink outline-none placeholder:text-muted"
        />
      </label>
      <label className="grid gap-1 text-sm font-medium">
        Серия
        <select
          name="series"
          required
          value={series}
          onChange={(event) => setSeries(event.target.value)}
          className="h-12 rounded-control border border-line bg-surface px-4 text-base font-normal text-ink outline-none"
        >
          <option value="">Выберите серию</option>
          {SERIES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">
          Ширина, мм
          <select
            name="width"
            required
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            className="h-12 rounded-control border border-line bg-surface px-4 text-base font-normal text-ink outline-none"
          >
            <option value="">Выберите</option>
            {WIDTHS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Метраж
          <input
            name="meters"
            inputMode="decimal"
            required
            placeholder="120"
            value={meters}
            onChange={(event) => setMeters(event.target.value)}
            className="h-12 rounded-control border border-line bg-surface px-4 text-base font-normal text-ink outline-none placeholder:text-muted"
          />
        </label>
      </div>
      {error ? (
        <p id={errorId} className="text-sm font-medium text-teal-deep" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="press ios-filled mt-1 w-full">
        Отправить
        <IconArrow className="size-4" />
      </button>
      <p className="text-xs leading-relaxed text-muted">
        Кнопка откроет письмо на info@lotok24.ru. Его нужно отправить. Подробности — в{" "}
        <Link to="/privacy" className="font-semibold text-teal underline decoration-teal/40 underline-offset-4">
          политике конфиденциальности
        </Link>
        .
      </p>
    </form>
  );
}
