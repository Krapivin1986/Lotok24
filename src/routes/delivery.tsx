import { createFileRoute } from "@tanstack/react-router";
import { breadcrumbLd, jsonLd } from "@/components/site/seo";
import { ArrowCta, CtaLink, PageIntro } from "@/components/site/shell";
import { useSiteCopy } from "@/components/site/use-site-copy";

const SHIPPING = [
  {
    title: "Самовывоз",
    time: "в день готовности",
    text: "Склад в Пушкино, микрорайон Мамонтовка, улица Рабочая, владение 1. Пачки лежат по заказу, пропуск присылаем за час. Погрузка на вашу машину — с нашей рампы.",
  },
  {
    title: "Москва и область",
    time: "1–2 дня",
    text: "Своя машина по МКАД и ближнему Подмосковью. Длинномер до 6 м. Разгрузка на объекте — силами заказчика.",
  },
  {
    title: "Россия",
    time: "3–10 дней",
    text: "Транспортная компания до терминала или адреса. Срок зависит от региона и считается до отгрузки, а не после неё.",
  },
] as const;

const PAYMENTS = [
  {
    title: "Безналичный расчёт",
    text: "Оплата по счёту для юрлица и ИП. В счёте — металл, фасонка и доставка отдельными строками, с НДС.",
  },
  {
    title: "Оплата по QR-коду",
    text: "Счёт можно оплатить по QR-коду в банке. Реквизиты те же, что и при переводе по счёту.",
  },
  {
    title: "Зачисление на счёт",
    text: "Деньги зачисляются на расчётный счёт продавца в срок от 1 до 3 рабочих дней.",
  },
  {
    title: "Закрывающие документы",
    text: "Счёт, УПД и паспорт на партию. Сертификат соответствия — копией к отгрузке, без отдельного запроса.",
  },
] as const;

const TERMS = [
  ["Готовность склада", "от 1 рабочего дня"],
  ["Комплектация объекта", "5–7 рабочих дней"],
  ["Окно отгрузки", "пн–пт, 9:00–17:00"],
  ["Длина секции", "3 м"],
  ["Зачисление оплаты", "1–3 рабочих дня"],
  ["Доставка в счёте", "до оплаты, не «потом уточним»"],
] as const;

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Доставка кабельных лотков и оплата по счёту или QR-коду — Лоток24" },
      {
        name: "description",
        content:
          "Доставка кабельных лотков по Москве и России, самовывоз со склада от 1 дня. Секция 3 м. Безналичный расчёт и оплата по QR-коду, зачисление от 1 до 3 рабочих дней.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Главная", path: "/" },
          { name: "Доставка и оплата", path: "/delivery" },
        ]),
      ),
    ],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  const copy = useSiteCopy();
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <PageIntro
            kicker="Доставка и оплата"
            title={copy.deliveryTitle}
            text={copy.deliveryText}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-10 lg:py-14">
        <h2 className="font-display text-3xl tracking-tight">Как везём</h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {SHIPPING.map((item) => (
            <li key={item.title} className="flex flex-col rounded-card border border-line bg-surface p-5">
              <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
              <p className="mt-3 font-display text-sm tabular-nums text-teal">{item.time}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 overflow-hidden rounded-card border border-line bg-surface sm:mt-16">
          <table className="data-table w-full text-left text-sm">
            <caption className="px-5 pt-5 pb-3 text-left font-display text-lg tracking-tight">Сроки и условия</caption>
            <tbody>
              {TERMS.map(([name, value]) => (
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

        <h2 className="mt-10 font-display text-3xl tracking-tight sm:mt-16">Как платите</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {PAYMENTS.map((item) => (
            <li key={item.title} className="rounded-card border border-line bg-surface p-5">
              <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-card bg-ink px-5 py-6 text-paper sm:flex-row sm:items-center sm:px-6">
          <p className="max-w-xl leading-relaxed">Нужен расчёт доставки до вашего адреса — напишите город и объём.</p>
          <CtaLink to="/contacts" tone="paper" className="shrink-0">
            <ArrowCta>Запросить счёт</ArrowCta>
          </CtaLink>
        </div>
      </section>
    </>
  );
}
