import { createFileRoute } from "@tanstack/react-router";
import { ArrowCta, CtaLink, PageIntro } from "@/components/site/shell";
import { useSiteCopy } from "@/components/site/use-site-copy";

const SHIPPING = [
  {
    title: "Самовывоз",
    time: "в день готовности",
    text: "Склад в Москве. Пачки лежат по заказу, пропуск присылаем за час. Погрузка на вашу машину — с нашей рампы.",
  },
  {
    title: "Москва и область",
    time: "1–2 дня",
    text: "Своя машина по МКАД и ближнему Подмосковью. Длинномер до 6 м. Разгрузка на объекте — силами заказчика.",
  },
  {
    title: "Россия",
    time: "3–10 дней",
    text: "Транспортная компания до терминала или адреса. Срок зависит от региона и считается до отгрузки, не после.",
  },
] as const;

const PAYMENTS = [
  {
    title: "Счёт для юрлица и ИП",
    text: "Безналичный расчёт. В счёте — металл, фасонка и доставка отдельными строками, с НДС.",
  },
  {
    title: "Предоплата",
    text: "Первый заказ — 100% до запуска в производство или отгрузки со склада. Повторным клиентам — по договору.",
  },
  {
    title: "Договор",
    text: "Для нескольких объектов: график отгрузок, резерв и отсрочка, если она прописана в договоре.",
  },
  {
    title: "Закрывающие",
    text: "Счёт, УПД и паспорт на партию. Сертификат соответствия — копией к отгрузке, без отдельного запроса.",
  },
] as const;

const TERMS = [
  ["Готовность склада", "от 3 рабочих дней"],
  ["Сборка объекта", "5–7 рабочих дней"],
  ["Окно отгрузки", "пн–пт, 9:00–17:00"],
  ["Длина пачки", "секции 2 и 3 м"],
  ["Маркировка", "по осям из спецификации"],
  ["Доставка в счёте", "до оплаты, не «потом уточним»"],
] as const;

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Доставка и оплата — СТАЛЬТРАССА" },
      {
        name: "description",
        content:
          "Самовывоз со склада в Москве, доставка по России, безналичная оплата по счёту и закрывающие документы.",
      },
    ],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  const copy = useSiteCopy();
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <PageIntro
            kicker="Доставка и оплата"
            title={copy.deliveryTitle}
            text={copy.deliveryText}
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
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

        <div className="mt-16 overflow-hidden rounded-card border border-line bg-surface">
          <table className="w-full text-left text-sm">
            <caption className="px-5 pt-5 pb-3 text-left font-display text-lg tracking-tight">Сроки и условия</caption>
            <tbody>
              {TERMS.map(([name, value]) => (
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

        <h2 className="mt-16 font-display text-3xl tracking-tight">Как платите</h2>
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
