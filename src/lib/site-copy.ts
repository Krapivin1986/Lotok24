export const SERIES_IDS = ["perforated", "ladder", "solid"] as const;

export type SeriesId = (typeof SERIES_IDS)[number];

export type SiteCopy = {
  heroKicker: string;
  heroTitle: string;
  heroText: string;
  footerText: string;
  series: Array<{
    id: SeriesId;
    name: string;
    pageTitle: string;
    text: string;
    lead: string;
    points: string[];
  }>;
  reviews: Array<{ quote: string; name: string; role: string }>;
  contactsTitle: string;
  contactsText: string;
  warehouse: string;
  hours: string;
  reply: string;
  deliveryTitle: string;
  deliveryText: string;
};

export const DEFAULT_SITE_COPY: SiteCopy = {
  heroKicker: "Каталог стали · кабельные трассы",
  heroTitle: "Металлический кабельный лоток от производителя",
  heroText:
    "Оцинкованные лотки для цехов, ЦОД и коммерческих зданий: перфорированные, лестничные и глухие. Считаем нагрузку по пролёту между опорами, комплектуем фасонку и отгружаем со склада — монтаж не ждёт металла.",
  footerText: "Металлические кабельные лотки: перфорированные, лестничные и глухие. Москва, отгрузка по России.",
  series: [
    {
      id: "perforated",
      name: "Перфорированный",
      pageTitle: "Перфорированный кабельный лоток",
      text: "Для внутренних трасс, где кабель должен дышать. Овальные отверстия по дну и бортам снимают тепло и облегчают секцию.",
      lead: "Основной лоток для цехов, техэтажей и машзалов. Перфорация вентилирует кабель и снижает вес секции без потери жёсткости борта.",
      points: [
        "Ширина 50–400 мм, борт 50/80/100 мм",
        "Толщина 0,7–1,5 мм под пролёт между опорами",
        "Цинк Сендзимир, класс 3; горячий цинк по заказу",
        "Крышка и разделитель садятся на ту же секцию",
      ],
    },
    {
      id: "ladder",
      name: "Лестничный",
      pageTitle: "Лестничный кабельный лоток",
      text: "Для силовых пучков, длинных пролётов и вертикальных стояков. Поперечины держат кабель и оставляют его открытым для обслуживания.",
      lead: "Кабельная лестница для тяжёлых пучков и длинных пролётов. Кабель крепится к поперечинам и остаётся доступным без снятия крышки.",
      points: [
        "Ширина 200–600 мм",
        "Шаг опор обычно 1,5–3 м",
        "Горячий цинк для эстакад и улицы",
        "Те же консоли и шпильки, что и у лотка",
      ],
    },
    {
      id: "solid",
      name: "Глухой с крышкой",
      pageTitle: "Глухой кабельный лоток с крышкой",
      text: "Для пыли, улицы и разделения слаботочных линий. Сплошное дно и крышка закрывают трассу от грязи и случайного контакта.",
      lead: "Лоток со сплошным дном, когда кабель нужно закрыть: пыль, осадки, разделение силовых и слаботочных линий одной трассой.",
      points: [
        "Сплошное дно без перфорации",
        "Крышка на защёлке или винте",
        "Для мокрых зон — горячий цинк от класса 5 или нержавеющая сталь",
        "Перегородка отделяет силовые линии от слаботочных линий",
      ],
    },
  ],
  reviews: [
    {
      quote:
        "Брали перфорированный 200×100. По накладной всё сошлось, только одну пачку подписали не той осью — поправили по телефону. Углы встали без подрезки.",
      name: "Анна Ковалёва",
      role: "Электромонтажник",
    },
    {
      quote:
        "Между опорами лоток не просел, это проверили сами. Крышки на слаботочку в первую спецификацию не попали, дослали на следующий день. Кромки пришли без ржавчины.",
      name: "Павел Ершов",
      role: "Главный энергетик",
    },
    {
      quote:
        "Счёт прислали в день заявки, оплатили по QR. Машина была на объекте через два дня, разгружались сами. УПД лежал в папке, без переделок. По цене не самые низкие.",
      name: "Марина Ли",
      role: "Менеджер по снабжению",
    },
  ],
  contactsTitle: "Склад в Москве, ответ на почту",
  contactsText: "Напишите рабочий email. В ответ — прайс, таблица нагрузок и, если едете сами, пропуск на рампу.",
  warehouse: "Москва, Открытое шоссе, д. 12, стр. 4",
  hours: "пн–пт, 9:00–18:00",
  reply: "в тот же рабочий день",
  deliveryTitle: "Металл уезжает со счётом, а не с сюрпризом",
  deliveryText: "Стоимость перевозки считаем до оплаты. В машине — пачки с маркировкой по осям и закрывающие документы.",
};

function clip(value: unknown, max: number, fallback: string) {
  if (typeof value !== "string") return fallback;
  const text = value.trim().slice(0, max);
  return text || fallback;
}

function points(value: unknown, fallback: string[]) {
  const source = Array.isArray(value) ? value : [];
  const next = source
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6)
    .map((item) => item.slice(0, 180));
  return next.length > 0 ? next : fallback;
}

export function sanitizeSiteCopy(input: unknown): SiteCopy {
  const raw = input && typeof input === "object" ? (input as Partial<SiteCopy>) : {};
  const base = DEFAULT_SITE_COPY;
  return {
    heroKicker: clip(raw.heroKicker, 80, base.heroKicker),
    heroTitle: clip(raw.heroTitle, 140, base.heroTitle),
    heroText: clip(raw.heroText, 500, base.heroText),
    footerText: clip(raw.footerText, 240, base.footerText),
    series: base.series.map((item) => {
      const found = Array.isArray(raw.series) ? raw.series.find((entry) => entry?.id === item.id) : undefined;
      return {
        id: item.id,
        name: clip(found?.name, 80, item.name),
        pageTitle: clip(found?.pageTitle, 120, item.pageTitle),
        text: clip(found?.text, 400, item.text),
        lead: clip(found?.lead, 400, item.lead),
        points: points(found?.points, item.points),
      };
    }),
    reviews: base.reviews.map((item, index) => {
      const found = Array.isArray(raw.reviews) ? raw.reviews[index] : undefined;
      return {
        quote: clip(found?.quote, 500, item.quote),
        name: clip(found?.name, 80, item.name),
        role: clip(found?.role, 120, item.role),
      };
    }),
    contactsTitle: clip(raw.contactsTitle, 120, base.contactsTitle),
    contactsText: clip(raw.contactsText, 400, base.contactsText),
    warehouse: clip(raw.warehouse, 160, base.warehouse),
    hours: clip(raw.hours, 80, base.hours),
    reply: clip(raw.reply, 80, base.reply),
    deliveryTitle: clip(raw.deliveryTitle, 140, base.deliveryTitle),
    deliveryText: clip(raw.deliveryText, 400, base.deliveryText),
  };
}
