import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { GALLERY, SERIES, type SeriesId } from "@/components/site/content";
import { breadcrumbLd, jsonLd, SERIES_SEO } from "@/components/site/seo";
import { SeriesText } from "@/components/site/series-text";
import { Photo } from "@/components/site/photo";
import { ArrowCta, CtaLink } from "@/components/site/shell";
import { useMergedSeries } from "@/components/site/use-site-copy";

function isSeriesId(value: string): value is SeriesId {
  return SERIES.some((item) => item.id === value);
}

export const Route = createFileRoute("/catalog_/$series")({
  beforeLoad: ({ params }) => {
    if (!isSeriesId(params.series)) throw notFound();
  },
  head: ({ params }) => {
    const series = SERIES.find((item) => item.id === params.series);
    const seo = series ? SERIES_SEO[series.id] : undefined;
    return {
      meta: [
        { title: seo?.title ?? "Каталог кабельных лотков — Лоток24" },
        {
          name: "description",
          content: seo?.description ?? "Оцинкованные кабельные лотки «Лоток24»: размеры, покрытие и поставка со склада в Москве.",
        },
      ],
      scripts: series
        ? [
            jsonLd(
              breadcrumbLd([
                { name: "Главная", path: "/" },
                { name: "Каталог", path: "/catalog" },
                { name: series.pageTitle, path: `/catalog/${series.id}` },
              ]),
            ),
            jsonLd({
              "@context": "https://schema.org",
              "@type": "Product",
              name: series.pageTitle,
              description: series.lead,
              category: "Кабельные лотки",
              brand: { "@type": "Brand", name: "Лоток24" },
              image: series.image,
            }),
          ]
        : [],
    };
  },
  component: SeriesPage,
});

function SeriesPage() {
  const { series: id } = Route.useParams();
  const seriesList = useMergedSeries();
  const series = seriesList.find((item) => item.id === id);
  if (!series) return null;
  const others = seriesList.filter((item) => item.id !== series.id);

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-sm text-muted">
              <Link to="/catalog" className="font-semibold text-teal hover:text-teal-deep">
                Каталог
              </Link>
              <span aria-hidden="true"> · </span>
              <span>{series.code}</span>
            </p>
            <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{series.pageTitle}</h1>
            <p className="mt-3 font-display text-2xl tracking-tight tabular-nums">
              от {series.priceFrom}{" "}
              <span className="text-base font-medium text-muted">
                рублей {series.id === "fastener" ? "за штуку" : "за метр"}
              </span>
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              <SeriesText text={series.lead} skip={series.id} />
            </p>
            <div className="mt-8">
              <CtaLink to="/contacts">
                <ArrowCta>Запросить эту серию</ArrowCta>
              </CtaLink>
            </div>
          </div>
          <figure className="overflow-hidden rounded-card border border-line bg-paper">
            <Photo
              src={series.image}
              alt={series.alt}
              width={series.width}
              height={series.height}
              className="aspect-video w-full"
            />
            <figcaption className="px-5 py-4 text-sm text-muted">{series.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6" aria-label="Дополнительные фото">
        <ul className="grid gap-4 sm:grid-cols-2">
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
                <figcaption className="px-5 py-3 text-sm text-muted">{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl tracking-tight">Что входит</h2>
          <ul className="mt-6 flex flex-col gap-3">
            {series.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-relaxed">
                <Check className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-card border border-line bg-surface">
          <table className="data-table w-full text-left text-sm">
            <caption className="px-5 pt-5 pb-3 text-left font-display text-lg tracking-tight">Размеры серии</caption>
            <tbody>
              {series.specs.map(([name, value]) => (
                <tr key={name} className="flex items-baseline justify-between gap-3 border-t border-line px-5 py-3 sm:table-row">
                  <th scope="row" className="shrink-0 font-medium text-muted sm:px-5 sm:py-3">
                    {name}
                  </th>
                  <td className="min-w-0 text-right font-medium sm:px-5 sm:py-3 sm:text-right">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
          <h2 className="font-display text-2xl tracking-tight">Другие серии</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {others.map((item) => (
              <li key={item.id}>
                <Link
                  to="/catalog/$series"
                  params={{ series: item.id }}
                  className="flex h-full flex-col rounded-card border border-line bg-surface p-5 hover:bg-paper-deep"
                >
                  <p className="text-sm font-semibold text-teal">{item.code}</p>
                  <p className="mt-2 font-display text-xl tracking-tight">{item.name}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    <SeriesText text={item.text} skip={series.id} />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
