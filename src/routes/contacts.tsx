import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, jsonLd } from "@/components/site/seo";
import { LeadForm } from "@/components/site/lead-form";
import { CallButton, MailLink, PageIntro, PhoneLink } from "@/components/site/shell";
import { SERIES } from "@/components/site/content";

import { useSiteCopy } from "@/components/site/use-site-copy";

export const Route = createFileRoute("/contacts")({
  validateSearch: (search: Record<string, unknown>): { series?: string } => {
    const series = typeof search.series === "string" ? search.series : undefined;
    return { series: SERIES.some((item) => item.id === series) ? series : undefined };
  },
  head: () => ({
    meta: [
      { title: "Кабельный лоток со склада в Пушкино — контакты Лоток24" },
      {
        name: "description",
        content:
          "Склад кабельных лотков в Пушкино, микрорайон Мамонтовка, улица Рабочая. Прайс, спецификацию и пропуск на отгрузку пришлём на почту в тот же рабочий день.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Главная", path: "/" },
          { name: "Контакты", path: "/contacts" },
        ]),
      ),
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const copy = useSiteCopy();
  const { series } = Route.useSearch();
  const facts = [
    { label: "Склад", value: copy.warehouse },
    { label: "Часы", value: copy.hours },
    { label: "Ответ", value: copy.reply },
  ];
  return (
    <>
    <section className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:py-12">
      <div>
        <PageIntro kicker="Контакты" title={copy.contactsTitle} text={copy.contactsText} />
        <dl className="mt-8 grid gap-3">
          <div className="rounded-card border border-line bg-surface px-5 py-4">
            <dt className="text-sm font-semibold text-teal">Телефон</dt>
            <dd className="mt-2 flex flex-wrap items-center gap-2">
              <PhoneLink />
              <CallButton className="max-sm:min-h-9 max-sm:px-3.5 max-sm:text-[15px]" />
            </dd>
          </div>
          <div className="rounded-card border border-line bg-surface px-5 py-4">
            <dt className="text-sm font-semibold text-teal">Почта</dt>
            <dd className="mt-2">
              <MailLink />
            </dd>
          </div>
          <div className="rounded-card border border-line bg-surface px-5 py-4">
            <dt className="text-sm font-semibold text-teal">Реквизиты</dt>
            <dd className="mt-1 font-medium">ООО «3К»</dd>
            <dd className="mt-1 text-sm leading-relaxed text-muted">
              ИНН 9718232170, КПП 771801001. Юридический адрес: бульвар Маршала Рокоссовского, д. 8, корп. 2, кв. 26,
              г. Москва.
            </dd>
          </div>
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-card border border-line bg-surface px-5 py-4">
              <dt className="text-sm font-semibold text-teal">{fact.label}</dt>
              <dd className="mt-1 font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          По этому номеру и на почту принимаем заявку и уточняем спецификацию. Для пропуска на склад достаточно
          номера машины и имени водителя в письме.
        </p>
      </div>
      <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
        <LeadForm initialSeries={series} />
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 sm:pb-16">
      <div className="overflow-hidden rounded-card border border-line bg-surface">
        <div className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-2xl tracking-tight">Склад на карте</h2>
            <p className="mt-1 text-sm text-muted">
              Московская область, г. Пушкино, мкр. Мамонтовка, ул. Рабочая, вл. 1
            </p>
          </div>
          <a
            href="https://yandex.ru/maps/?text=%D0%9C%D0%BE%D1%81%D0%BA%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C%2C%20%D0%B3.%20%D0%9F%D1%83%D1%88%D0%BA%D0%B8%D0%BD%D0%BE%2C%20%D0%BC%D0%BA%D1%80.%20%D0%9C%D0%B0%D0%BC%D0%BE%D0%BD%D1%82%D0%BE%D0%B2%D0%BA%D0%B0%2C%20%D1%83%D0%BB.%20%D0%A0%D0%B0%D0%B1%D0%BE%D1%87%D0%B0%D1%8F%2C%20%D0%B2%D0%BB.%201"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-teal underline decoration-teal/40 underline-offset-4 hover:text-teal-deep"
          >
            Открыть в Яндекс Картах
          </a>
        </div>
        <iframe
          title="Склад Лоток24: Пушкино, Мамонтовка, улица Рабочая, владение 1"
          src="https://yandex.ru/map-widget/v1/?ll=37.805608%2C56.002048&z=16&pt=37.805608%2C56.002048%2Cpm2gnm&l=map"
          className="h-80 w-full border-0 sm:h-[28rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
    </>
  );
}
