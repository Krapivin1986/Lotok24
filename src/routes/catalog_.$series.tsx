import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SERIES, type SeriesId } from "@/components/site/content";
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
    return {
      meta: [
        { title: series ? `${series.pageTitle} — Лоток24` : "Каталог — Лоток24" },
        {
          name: "description",
          content: series?.lead ?? "Кабельный лоток Лоток24.",
        },
      ],
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
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-sm text-muted">
              <Link to="/catalog" className="font-semibold text-teal hover:text-teal-deep">
                Каталог
              </Link>
              <span aria-hidden="true"> · </span>
              <span>{series.code}</span>
            </p>
            <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">{series.pageTitle}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted">{series.lead}</p>
            <div className="mt-8">
              <CtaLink to="/contacts">
                <ArrowCta>Запросить эту серию</ArrowCta>
              </CtaLink>
            </div>
          </div>
          <figure className="overflow-hidden rounded-card border border-line bg-paper">
            <img
              src={series.image}
              alt={series.alt}
              width={series.width}
              height={series.height}
              className="aspect-video w-full object-cover"
            />
            <figcaption className="px-5 py-4 text-sm text-muted">{series.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 sm:py-20">
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
          <table className="w-full text-left text-sm">
            <caption className="px-5 pt-5 pb-3 text-left font-display text-lg tracking-tight">Размеры серии</caption>
            <tbody>
              {series.specs.map(([name, value]) => (
                <tr key={name} className="border-t border-line">
                  <th scope="row" className="px-5 py-3 font-medium text-muted">
                    {name}
                  </th>
                  <td className="px-5 py-3 text-right font-medium">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
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
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
