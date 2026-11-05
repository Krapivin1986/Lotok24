export function jsonLd(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Лоток24",
  description:
    "Производитель оцинкованных кабельных лотков: перфорированные, лестничные и глухие. Склад в Москве, отгрузка по России.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Открытое шоссе, д. 12, стр. 4",
    addressLocality: "Москва",
    addressCountry: "RU",
  },
  areaServed: "RU",
  openingHours: "Mo-Fr 09:00-18:00",
};

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path,
    })),
  };
}

export const SERIES_SEO = {
  perforated: {
    title: "Оцинкованный перфорированный кабельный лоток — Лоток24",
    description:
      "Оцинкованный перфорированный кабельный лоток 50–400 мм. Сендзимир класса 3 или горячий цинк от класса 5, длина 3 м. Испытания по ГОСТ Р 52868-2021. Отгрузка со склада в Москве от 1 дня.",
  },
  ladder: {
    title: "Лестничный кабельный лоток: размеры и нагрузка — Лоток24",
    description:
      "Лестничный кабельный лоток 200–600 мм для силовых трасс и длинных пролётов. Горячий цинк по ГОСТ 9.307, не менее 45 мкм. Длина секции 3 м.",
  },
  solid: {
    title: "Глухой кабельный лоток с крышкой — Лоток24",
    description:
      "Глухой кабельный лоток с крышкой: сплошное дно, защита от пыли и осадков. Ширина 50–400 мм, горячий цинк от класса 5 или нержавеющая сталь.",
  },
} as const;
