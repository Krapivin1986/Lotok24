import { createFileRoute, Link } from "@tanstack/react-router";
import { PROOF } from "@/components/site/content";
import { ArrowCta, CtaLink } from "@/components/site/shell";
import { useMergedSeries, useSiteCopy } from "@/components/site/use-site-copy";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "СТАЛЬТРАССА — металлические кабельные лотки" },
      {
        name: "description",
        content:
          "Оцинкованные кабельные лотки для цехов, ЦОД и коммерческих зданий. Расчёт нагрузки, комплектация и срок отгрузки — от 5 дней.",
      },
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div>
            <p className="text-sm font-semibold tracking-wide text-teal">{copy.heroKicker}</p>
            <h1 className="mt-4 font-display text-display leading-display tracking-tight">{copy.heroTitle}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{copy.heroText}</p>
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
              <li>Горячий цинк и Sendzimir</li>
              <li>Спецификация за 48 часов</li>
            </ul>
          </div>
          <figure className="min-w-0">
            <div className="overflow-hidden rounded-card border border-line bg-paper">
              <img
                src="/images/tray-hero.jpg"
                alt="Перфорированный оцинкованный кабельный лоток на светлом подиуме"
                width={1792}
                height={1008}
                className="aspect-video w-full object-cover"
              />
              <figcaption className="flex items-center justify-between gap-3 bg-teal px-5 py-4 text-sm text-paper">
                <span className="font-medium">Лоток перфорированный 200×100</span>
                <span className="shrink-0 tabular-nums text-on-ink">Zn · 3 м</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      <section aria-label="Коротко о лотках" className="border-y border-line">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4">
          {PROOF.map((item) => (
            <div key={item.label} className="px-4 py-7 sm:px-6 sm:py-8">
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="mt-2 font-display text-2xl tracking-tight tabular-nums sm:text-3xl">
                {item.value}
                <span className="ml-2 font-sans text-base font-medium text-muted">{item.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal">Серии</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Три лотка — одна система крепёжа</h2>
          </div>
          <Link to="/catalog" className="text-sm font-semibold text-teal hover:text-teal-deep">
            Весь каталог
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {seriesList.map((series) => (
            <li key={series.id} className="flex flex-col rounded-card border border-line bg-surface p-5">
              <p className="text-sm font-semibold text-teal">{series.code}</p>
              <h3 className="mt-3 font-display text-xl tracking-tight">{series.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{series.text}</p>
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

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-teal">Объекты</p>
            <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Как это выглядит на площадке</h2>
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-4 rounded-card bg-ink px-5 py-6 text-paper sm:flex-row sm:items-center sm:px-6">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl tracking-tight sm:text-3xl">Не знаете серию?</h2>
            <p className="mt-2 leading-relaxed text-on-ink">
              Пришлите план — подберём лоток под пролёт, среду и способ крепления. Прайс уйдёт на почту.
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
