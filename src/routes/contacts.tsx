import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/lead-form";
import { PageIntro } from "@/components/site/shell";
import { useSiteCopy } from "@/components/site/use-site-copy";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Лоток24" },
      {
        name: "description",
        content: "Склад кабельных лотков в Москве. Напишите email — пришлём прайс, спецификацию и пропуск на отгрузку.",
      },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const copy = useSiteCopy();
  const facts = [
    { label: "Склад", value: copy.warehouse },
    { label: "Часы", value: copy.hours },
    { label: "Ответ", value: copy.reply },
  ];
  return (
    <section className="mx-auto grid max-w-6xl items-start gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:py-16">
      <div>
        <PageIntro kicker="Контакты" title={copy.contactsTitle} text={copy.contactsText} />
        <dl className="mt-8 grid gap-3">
          {facts.map((fact) => (
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
