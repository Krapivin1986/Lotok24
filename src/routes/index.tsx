import { createFileRoute, Link } from "@tanstack/react-router";
import { jsonLd } from "@/components/site/seo";
import { SeriesText } from "@/components/site/series-text";
import { Photo } from "@/components/site/photo";
import { FEATURES, PROOF, STEPS } from "@/components/site/content";
import { ArrowCta, CtaLink } from "@/components/site/shell";
import { useMergedSeries, useSiteCopy } from "@/components/site/use-site-copy";

const ORDER_FACTS = [
  ["Длина секции", "Только 3 м. Секций другой длины нет."],
  ["Склад", "Отгрузка от 1 рабочего дня. Пачки маркируют по осям из спецификации."],
  ["Оплата", "Безналичный расчёт по счёту или оплата по QR-коду."],
  ["Зачисление", "Деньги приходят на расчётный счёт продавца за 1–3 рабочих дня."],
  ["Стандарт", "ГОСТ Р 52868-2021, взамен редакции 2007 года. Прогиб при рабочей нагрузке — не больше 1/100 длины пролёта."],
  ["Комплект", "Крышка, углы, тройники и соединители идут в одной спецификации."],
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Металлический кабельный лоток от производителя — Лоток24" },
      {
        name: "description",
        content:
          "Оцинкованные кабельные лотки от производителя: перфорированные, неперфорированные, лестничные и проволочные. ГОСТ Р 52868-2021, склад в Москве, отгрузка от 1 дня.",
      },
      { property: "og:title", content: "Металлический кабельный лоток от производителя — Лоток24" },
      {
        property: "og:description",
        content:
          "Оцинкованные кабельные лотки от производителя: перфорированные, неперфорированные, лестничные и проволочные. ГОСТ Р 52868-2021, склад в Москве, отгрузка от 1 дня.",
      },
    ],
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Лоток24",
        description: "Металлические кабельные лотки от производителя",
        inLanguage: "ru",
      }),
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const copy = useSiteCopy();
  const seriesList = useMergedSeries();
  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div>
            <p className="kicker">{copy.heroKicker}</p>
            <h1 className="mt-4 font-display text-display leading-display tracking-tight">{copy.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              <SeriesText text={copy.heroText} />
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaLink to="/contacts">
                <ArrowCta>Рассчитать трассу</ArrowCta>
              </CtaLink>
              <CtaLink to="/delivery" tone="ghost">
                Доставка и оплата
              </CtaLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <li>ГОСТ Р 52868-2021</li>
              <li>Горячий цинк от класса 5 и Сендзимир</li>
              <li>Спецификация за 48 часов</li>
            </ul>
          </div>
          <figure className="min-w-0">
            <div className="overflow-hidden rounded-card border border-line bg-paper">
              <Photo
                src="/images/tray-hero.jpg"
                alt="Перфорированный оцинкованный кабельный лоток на светлом подиуме"
                width={1792}
                height={1008}
                className="aspect-video w-full"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 bg-green-soft px-4 py-3 text-sm text-green-ink sm:px-5">
                <span className="font-medium">
                  Лоток <SeriesText text="перфорированный" /> 200×100
                </span>
                <span className="shrink-0 tabular-nums">Zn · 3 м</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section aria-label="Коротко о лотках" className="border-y border-line">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {PROOF.map((item) => (
            <div key={item.label} className="border-b border-line px-4 py-4 odd:border-r sm:px-6 sm:py-8 lg:border-b-0 lg:odd:border-r-0 lg:[&:not(:last-child)]:border-r">
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="mt-2 font-display text-xl tracking-tight text-teal tabular-nums sm:text-3xl">
                {item.value}
                <span className="ml-2 font-sans text-base font-medium text-muted">{item.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <figure className="overflow-hidden rounded-card border border-line bg-paper">
            <Photo
              src="/images/tray-install.jpg"
              alt="Лестничные кабельные лотки с кабелем на светлом потолке промышленного зала"
              width={1728}
              height={1152}
              loading="lazy"
              className="aspect-[4/3] w-full"
            />
          </figure>
          <div>
            <p className="kicker">Преимущества</p>
            <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">Зачем использовать металлический лоток</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Оцинкованная сталь несёт кабель годами: не горит, не гниёт и не требует покраски на объекте. Секцию крепят
              к шпилькам и консолям без сварки. Перфорация отводит тепло, крышка закрывает трассу от пыли.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.title} className="rounded-control border border-line bg-surface p-3">
                    <div className="flex items-center gap-2">
                      <Icon className="size-4 shrink-0 text-teal" aria-hidden="true" />
                      <h3 className="font-display text-sm tracking-tight">{feature.title}</h3>
                    </div>
                    <p className="mt-1.5 text-xs leading-snug text-muted">
                      <SeriesText text={feature.text} />
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="kicker">Серии</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Четыре типа лотков — одна система построения кабельной трассы</h2>
            <p className="mt-3 text-muted">Цена указана от самого узкого лотка серии, за метр. Ширина, толщина и покрытие меняют сумму в счёте.</p>
          </div>
          <Link to="/catalog" className="text-sm font-semibold text-teal hover:text-teal-deep">
            Весь каталог
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {seriesList
            .filter((series) => series.id !== "cover" && series.id !== "strut" && series.id !== "fastener")
            .map((series) => (
            <li key={series.id} className="flex flex-col rounded-card border border-line bg-surface p-5 ring-1 ring-transparent transition hover:ring-[#7ee2a8]">
              <p className="text-sm font-semibold text-teal">{series.code}</p>
              <h3 className="mt-3 font-display text-xl tracking-tight">
                <Link to="/catalog/$series" params={{ series: series.id }} className="hover:text-teal">
                  {series.name}
                </Link>
              </h3>
              <p className="mt-2 font-display text-2xl tracking-tight tabular-nums">
                от {series.priceFrom}{" "}
                <span className="text-base font-medium text-muted">
                  рублей {series.id === "fastener" ? "за штуку" : "за метр"}
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                <SeriesText text={series.text} />
              </p>
              <dl className="mt-4 flex flex-1 flex-col gap-1.5 border-t border-line pt-4 text-sm">
                {series.specs
                  .filter(([name]) => name === "Ширина" || name === "Толщина" || name === "Длина" || name === "Покрытие")
                  .map(([name, value]) => (
                    <div key={name} className="flex items-baseline justify-between gap-3">
                      <dt className="text-muted">{name}</dt>
                      <dd className="text-right font-medium">{value}</dd>
                    </div>
                  ))}
              </dl>
              <Link
                to="/catalog/$series"
                params={{ series: series.id }}
                className="mt-5 inline-flex h-11 items-center text-sm font-semibold text-ink"
              >
                Смотреть серию
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16">
        <div className="max-w-2xl">
          <p className="kicker">Комплектующие</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Добавьте крышку, профиль и крепёж в заказ</h2>
          <p className="mt-3 text-muted">
            Крышка закрывает лоток, страт-профиль несёт консоль, метизы собирают стык. Ширина и резьба подбираются под секцию, не «примерно».
          </p>
        </div>
        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {seriesList
            .filter((series) => series.id === "cover" || series.id === "strut" || series.id === "fastener")
            .map((series) => (
            <li key={series.id} className="flex flex-col rounded-card border border-line bg-surface p-5 ring-1 ring-transparent transition hover:ring-[#7ee2a8]">
              <p className="text-sm font-semibold text-teal">{series.code}</p>
              <h3 className="mt-3 font-display text-xl tracking-tight">
                <Link to="/catalog/$series" params={{ series: series.id }} className="hover:text-teal">
                  {series.name}
                </Link>
              </h3>
              <p className="mt-2 font-display text-2xl tracking-tight tabular-nums">
                от {series.priceFrom}{" "}
                <span className="text-base font-medium text-muted">
                  рублей {series.id === "fastener" ? "за штуку" : "за метр"}
                </span>
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                <SeriesText text={series.text} />
              </p>
              <Link
                to="/catalog/$series"
                params={{ series: series.id }}
                className="mt-5 inline-flex h-11 items-center text-sm font-semibold text-ink"
              >
                Смотреть категорию
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <p className="kicker">До заказа</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight sm:text-4xl">Что важно знать заранее</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Длина, срок склада и оплата не зависят от серии. Подробности — на странице{" "}
            <Link to="/delivery" className="font-semibold text-teal underline decoration-teal/40 underline-offset-2">
              доставки и оплаты
            </Link>
            .
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ORDER_FACTS.map(([title, text]) => (
              <li key={title} className="rounded-card border border-line bg-paper p-5">
                <h3 className="font-display text-lg tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <ol className="mt-8 grid gap-3 md:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="rounded-card border border-line bg-paper p-5">
                <p className="font-display text-sm text-teal">{step.n}</p>
                <h3 className="mt-2 font-display text-lg tracking-tight">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="kicker">Отзывы</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Отзывы наших клиентов</h2>
          </div>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {copy.reviews.map((review) => (
              <li key={review.name}>
                <figure className="flex h-full flex-col rounded-card border border-line bg-paper p-5">
                  <blockquote className="text-base leading-relaxed">«{review.quote}»</blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="font-semibold">{review.name}</p>
                    <p className="mt-1 text-sm text-muted">{review.role}</p>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="flex flex-col items-start justify-between gap-4 rounded-card bg-ink px-5 py-6 text-paper sm:flex-row sm:items-center sm:px-6">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Не знаете серию?</h2>
            <p className="mt-2 leading-relaxed text-on-ink">
              В тот же рабочий день пришлём прайс, спецификацию и срок отгрузки. Подбор по плану — без отдельного счёта.
            </p>
          </div>
          <CtaLink to="/contacts" tone="paper" className="shrink-0">
            <ArrowCta>Получить подбор лотка</ArrowCta>
          </CtaLink>
        </div>
      </section>
    </>
  );
}
