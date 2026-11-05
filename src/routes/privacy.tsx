import { createFileRoute, Link } from "@tanstack/react-router";
import { breadcrumbLd, jsonLd } from "@/components/site/seo";
import { PageIntro } from "@/components/site/shell";

const SECTIONS = [
  {
    title: "Кто обрабатывает данные",
    text: "Сайт ведёт Лоток24. По вопросам данных пишите на info@lotok24.ru или звоните +7 (985) 938-97-76. Склад: Москва, Открытое шоссе, д. 12, стр. 4.",
  },
  {
    title: "Какие данные вы оставляете",
    text: "В форме на сайте — адрес электронной почты и, если выбран, тариф. В письме на info@lotok24.ru — то, что вы сами напишете: имя, телефон, реквизиты, адрес объекта. При звонке мы слышим номер, с которого вы звоните.",
  },
  {
    title: "Зачем они нужны",
    text: "Чтобы ответить на заявку, прислать прайс и спецификацию, выставить счёт и организовать отгрузку. Адрес не используем для рекламной рассылки. Отдельной подписки на сайте нет.",
  },
  {
    title: "Где хранится заявка с формы",
    text: "Форма «Куда отправить прайс» записывает адрес в память браузера на вашем устройстве и не отправляет его на сервер. Запись пропадёт, если очистить данные сайта. Письмо на info@lotok24.ru и звонок доходят до нас напрямую.",
  },
  {
    title: "Кому передаём",
    text: "Пока заказа нет, данные никому не передаём. Для доставки транспортной компании сообщаем адрес и контакт получателя, которые вы указали в заявке. Базы адресов не продаём.",
  },
  {
    title: "Сколько храним",
    text: "Переписку по заказу храним, пока идёт поставка и пока документы нужны для учёта. Заявку в браузере вы удаляете сами, очистив данные сайта.",
  },
  {
    title: "Ваши права",
    text: "Можно спросить, какие данные у нас есть, попросить исправить их или удалить. Напишите на info@lotok24.ru с темой «Персональные данные». Ответим в тот же рабочий день.",
  },
  {
    title: "Файлы cookie",
    text: "Рекламных и аналитических cookie нет. Вход администратора может сохранить технический ключ сессии в браузере. Он не ставится обычному посетителю.",
  },
] as const;

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Политика конфиденциальности — Лоток24" },
      {
        name: "description",
        content:
          "Какие данные собирает сайт Лоток24, зачем они нужны и как попросить их удалить. Почта info@lotok24.ru.",
      },
    ],
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Главная", path: "/" },
          { name: "Политика конфиденциальности", path: "/privacy" },
        ]),
      ),
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-16">
      <PageIntro
        kicker="Документы"
        title="Политика конфиденциальности"
        text="Как Лоток24 обращается со сведениями, которые вы оставляете на сайте, в письме или по телефону. Текст обновлён 5 ноября 2026 года."
      />
      <div className="mt-10 flex flex-col gap-8">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl tracking-tight">{section.title}</h2>
            <p className="mt-3 leading-relaxed text-muted">{section.text}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm leading-relaxed text-muted">
        Написать по данным:{" "}
        <a href="mailto:info@lotok24.ru" className="font-semibold text-teal underline decoration-teal/40 underline-offset-4">
          info@lotok24.ru
        </a>
        . Вернуться на сайт можно со страницы{" "}
        <Link to="/contacts" className="font-semibold text-teal underline decoration-teal/40 underline-offset-4">
          контактов
        </Link>
        .
      </p>
    </section>
  );
}
