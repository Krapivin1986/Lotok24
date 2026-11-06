import { createFileRoute, Link } from "@tanstack/react-router";
import { IconCheck } from "@/components/site/icons";
import { ACCESSORIES, FEATURES, GALLERY, SPECS, USES } from "@/components/site/content";
import { breadcrumbLd, jsonLd } from "@/components/site/seo";
import { SeriesText } from "@/components/site/series-text";
import { Photo } from "@/components/site/photo";
import { PageIntro, PopularSizes } from "@/components/site/shell";
import { useMergedSeries } from "@/components/site/use-site-copy";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог кабельных лотков: перфорированные, неперфорированные, лестничные и проволочные" },
      {
        name: "description",
        content:
          "Каталог оцинкованных кабельных лотков: перфорированный, неперфорированный, лестничный и проволочный. Классификация по ГОСТ Р 52868-2021 (МЭК 61537:2006).",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Главная", path: "/" },
          { name: "Каталог кабельных лотков", path: "/catalog" },
        ]),
      ),
    ],
  }),
  component: CatalogPage,
});

function CatalogPage() {
  const seriesList = useMergedSeries();
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <PageIntro
            kicker="Каталог"
            title={<SeriesText text="Кабельные лотки: перфорированные, неперфорированные, лестничные и проволочные" />}
            text="Выберите серию по среде и нагрузке. Крышка лотка, страт-профиль и метизы идут в той же спецификации. Подбор по плану отдельно не тарифицируется."
          />
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-10 lg:py-14">
        <ul className="flex flex-col gap-10 sm:gap-10">
          {seriesList.map((series, index) => (
            <li key={series.id} id={series.id} className="grid items-center gap-8 lg:grid-cols-2">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <figure className="overflow-hidden rounded-card border border-line bg-surface">
                  <Photo
                    src={series.image}
                    alt={series.alt}
                    width={series.width}
                    height={series.height}
                    loading={index === 0 ? undefined : "lazy"}
                    className="aspect-video w-full"
                  />
                  <figcaption className="px-5 py-4 text-sm text-muted">{series.caption}</figcaption>
                </figure>
                <ul className="mt-3 grid grid-cols-2 gap-3">
                  {GALLERY[series.id].map((photo) => (
                    <li key={photo.src}>
                      <figure className="overflow-hidden rounded-card border border-line bg-paper">
                        <Photo
                          src={photo.src}
                          alt={photo.alt}
                          width={1792}
                          height={1008}
                          loading="lazy"
                          className="aspect-video w-full"
                        />
                        <figcaption className="px-3 py-2 text-xs text-muted">{photo.caption}</figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-teal">{series.code}</p>
                <h2 className="mt-2 font-display text-3xl tracking-tight">{series.name}</h2>
                <p className="mt-2 font-display text-2xl tracking-tight tabular-nums">
                  от {series.priceFrom}{" "}
                  <span className="text-base font-medium text-muted">
                    рублей {series.id === "fastener" ? "за штуку" : "за метр"}
                  </span>
                </p>
                <PopularSizes id={series.id} priceFrom={series.priceFrom} />
                <p className="mt-4 leading-relaxed text-muted">
                  <SeriesText text={series.text} />
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {series.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-relaxed">
                      <IconCheck className="mt-0.5 size-4 text-teal" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/catalog/$series"
                    params={{ series: series.id }}
                    className="press ios-filled w-full sm:w-auto"
                  >
                    Страница серии
                  </Link>
                  <Link to="/contacts" search={{ series: series.id }} className="press ios-tinted w-full text-center sm:w-auto">
                    Запросить серию
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 sm:mt-16 grid items-start gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-card border border-line bg-surface">
            <table className="data-table w-full text-left text-sm">
              <caption className="px-5 pt-5 pb-3 text-left font-display text-lg tracking-tight">Рабочий диапазон</caption>
              <tbody>
                {SPECS.map(([name, value]) => (
                  <tr key={name} className="flex items-baseline justify-between gap-3 border-t border-line px-5 py-3 sm:table-row">
                    <th scope="row" className="shrink-0 font-medium text-muted sm:px-5 sm:py-3">
                      {name}
                    </th>
                    <td className="min-w-0 text-right font-medium sm:px-5 sm:py-3 sm:tabular-nums">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figure className="flex items-center gap-4 rounded-card border border-line bg-surface p-4 sm:p-5">
            <Photo
              src="/images/tray-zinc.jpg"
              alt="Крупный план кристаллического покрытия горячего цинка на кромке лотка"
              width={1408}
              height={1408}
              loading="lazy"
              className="size-20 shrink-0 rounded-control sm:size-36"
            />
            <figcaption>
              <p className="font-display text-lg tracking-tight">Горячий цинк</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Кристаллический слой закрывает кромку после рубки. Для улицы берут горячее цинкование готового лотка по ГОСТ 9.307: класс 5 — не менее 45 мкм.
              </p>
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 sm:mt-16">
          <h2 className="font-display text-3xl tracking-tight">Где ставят лоток</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {USES.map((use) => (
              <li key={use.title} className="rounded-card border border-line bg-surface p-5">
                <h3 className="font-display text-xl tracking-tight">{use.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <SeriesText text={use.text} />
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 sm:mt-16">
          <h2 className="font-display text-3xl tracking-tight">Фасонка в той же поставке</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {ACCESSORIES.map((item) => (
              <li key={item} className="rounded-control bg-paper-deep px-4 py-2 text-sm font-medium">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 sm:mt-16">
          <h2 className="font-display text-3xl tracking-tight">Почему металл не становится проблемой</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li key={feature.title} className="rounded-card border border-line bg-surface p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="size-5 text-teal" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-display text-xl tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <SeriesText text={feature.text} />
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
