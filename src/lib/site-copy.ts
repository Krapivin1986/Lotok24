export const SERIES_IDS = ["perforated", "ladder", "solid", "wire"] as const;

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
    "Оцинкованные лотки для цехов, ЦОД и коммерческих зданий: перфорированные, неперфорированные, лестничные и проволочные. Считаем нагрузку по пролёту между опорами, комплектуем фасонку и отгружаем со склада — монтаж не ждёт металла.",
  footerText: "Металлические кабельные лотки: перфорированные, неперфорированные, лестничные и проволочные. Москва, отгрузка по России.",
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
      name: "Неперфорированный",
      pageTitle: "Неперфорированный кабельный лоток",
      text: "Для пыли, улицы и разделения линий. Сплошное дно без отверстий закрывает кабель от грязи и случайного контакта.",
      lead: "Лоток со сплошным дном, когда перфорация не нужна: пыль, осадки, разделение силовых и слаботочных линий одной трассой.",
      points: [
        "Сплошное дно без отверстий",
        "Крышка на защёлке или винте, по заказу",
        "Для мокрых зон — горячий цинк от класса 5 или нержавеющая сталь",
        "Перегородка отделяет силовые линии от слаботочных линий",
      ],
    },
    {
      id: "wire",
      name: "Проволочный",
      pageTitle: "Проволочный кабельный лоток",
      text: "Для лёгких линий под фальшполом и за потолком. Сетка из прутка легче листового лотка, кабель крепится хомутом к проволоке.",
      lead: "Сварной проволочный лоток для ответвлений и лёгких трасс. Кабель виден, тепло уходит через сетку, секция гнётся по месту без фасонки на каждый поворот.",
      points: [
        "Ширина 50–400 мм, борт 50 и 100 мм",
        "Пруток 4–6 мм, ячейка открытая",
        "Для фальшполов, потолков и стоек",
        "Горячий цинк — если трасса во влажной зоне",
      ],
    },
  ],
  reviews: [
    {
      quote:
        "Меняли лоток на техэтаже продуктового, это на Каширском. Перфорированный, 100 на 50, где-то двести метров с лишним. Я уже мысленно сверло достала: в прошлый раз шпильки в старые дырки не попадали. Тут попали. Крышки минут двадцать искали, стояли у лифта отдельно. Угол к щитовой встал, я даже перепроверила, вдруг не тот.",
      name: "Анна Ковалёва",
      role: "Монтажник, торговый центр",
    },
    {
      quote:
        "Лестницу на эстакаде у котельной вешали вдвоём. 300 на 100, двенадцать кусков. Я упёрся: только полтора миллиметра. В том году взяли тоньше, пролёт два метра, к осени борт сел, до сих пор вспоминаю. Эти пока ровные, на срезе цинк белый, не голый металл. Дальше как обычно: хомут и пошли.",
      name: "Павел Ершов",
      role: "Энергетик котельной",
    },
    {
      quote:
        "Парковка, минус второй этаж. Неперфорированный лоток с крышкой, метров восемьдесят, углов четыре. Счёт в четверг, пятьдесят четыре тысячи, если не путаю. В пятницу вечером кинула по QR и все выходные в банк заглядывала. В понедельник только к обеду деньги появились. Водитель позвонил с КПП, в домофон не орал. Мелочь, а я уже была на взводе.",
      name: "Марина Ли",
      role: "Снабжение управляющей компании",
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
