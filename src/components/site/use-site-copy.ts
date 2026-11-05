import { useRouterState } from "@tanstack/react-router";
import { SERIES } from "@/components/site/content";
import { DEFAULT_SITE_COPY, type SiteCopy } from "@/lib/site-copy";

export function useSiteCopy(): SiteCopy {
  const data = useRouterState({
    select: (state) => {
      const match = state.matches.find((item) => item.routeId === "__root__");
      return match?.loaderData as SiteCopy | undefined;
    },
  });
  return data ?? DEFAULT_SITE_COPY;
}

export function useMergedSeries() {
  const copy = useSiteCopy();
  return SERIES.map((series) => {
    const extra = copy.series.find((item) => item.id === series.id);
    if (!extra) return series;
    return {
      ...series,
      name: extra.name,
      pageTitle: extra.pageTitle,
      text: extra.text,
      lead: extra.lead,
      points: extra.points,
    };
  });
}
