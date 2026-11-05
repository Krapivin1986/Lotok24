import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/lead-form";
import { PageIntro } from "@/components/site/shell";

const FACTS = [
  { label: "Склад", value: "Москва, Открытое шоссе, д. 12, стр. 4" },
  { label: "Часы", value: "пн–пт, 9:00–18:00" },
  { label: "Ответ", value: "в тот же рабочий день" },
] as const;

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — СТАЛЬТРАССА" },
      {
        name: "description",
        content: "Склад кабельных лотков в Москве. Напишите email — пришлём прайс, спецификацию и пропуск на отгрузку.",
      },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
      <div>
        <PageIntro
          kicker="Контакты"
          title="Склад в Москве, ответ на почту"
          text="Напишите рабочий email. В ответ — прайс, таблица нагрузок и, если едете сами, пропуск на рампу."
        />
        <dl className="mt-8 grid gap-3">
          {FACTS.map((fact) => (
            <div key={fact.label} className="rounded-card border border-line bg-surface px-5 py-4">
              <dt className="text-sm font-semibold text-teal">{fact.label}</dt>
              <dd className="mt-1 font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-relaxed text-muted">
          Звонков «просто узнать» нет: заявка, спецификация и счёт идут письмом. Для пропуска на склад достаточно
          номера машины и имени водителя в том же письме.
        </p>
      </div>
      <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
        <LeadForm />
      </div>
    </section>
  );
}
