import { createFileRoute } from "@tanstack/react-router";
import { ArrowCta, CtaLink } from "@/components/site/shell";

const POSTS = [
  {
    id: "perforated-or-ladder",
    date: "12 марта 2026",
    tag: "Серии",
    title: "Перфорированный или лестничный: что ставить на трассу",
    lead: "Серию выбирают по весу кабеля, среде и тому, нужно ли ему дышать. Прямой лоток без этой развилки почти всегда оказывается не тем.",
    image: "/images/tray-hero.jpg",
    alt: "Перфорированный оцинкованный кабельный лоток на светлом подиуме",
    paragraphs: [
      "Перфорированный лоток берут для внутренних линий: цех, техэтаж, машзал. Отверстия по дну и бортам снимают тепло и облегчают секцию без потери жёсткости борта.",
      "Лестничный лоток ставят на магистраль с тяжёлым пучком и длинным пролётом. Открытые перекладины держат вес и не запирают тепло внутри короба.",
      "Глухой лоток с крышкой нужен там, где трасса идёт в пыли, под открытым небом или рядом с водой. В сухом помещении глухой короб без нужды только греет кабель.",
    ],
  },
  {
    id: "zinc",
    date: "28 марта 2026",
    tag: "Покрытие",
    title: "Sendzimir или горячий цинк",
    lead: "Покрытие выбирают по среде, а не по цене метра. Ошибка здесь видна не на складе, а через два сезона.",
    image: "/images/tray-zinc.jpg",
    alt: "Крупный план кристаллического покрытия горячего цинка",
    paragraphs: [
      "Sendzimir — цинк, нанесённый на лист до гибки. Его хватает для сухих помещений: цех, техэтаж, серверная. Кромка после рубки остаётся без слоя.",
      "Горячее цинкование 60–80 мкм берут для улицы, влажных зон и эстакад. Слой закрывает и кромку, поэтому лоток спокойнее стоит под открытым небом.",
      "Если трасса выходит из здания наружу, на уличном участке не экономят. Внутри оставляют Sendzimir, снаружи ставят горячий цинк той же ширины.",
    ],
  },
  {
    id: "load",
    date: "9 апреля 2026",
    tag: "Нагрузка",
    title: "Как не просадить лоток между опорами",
    lead: "Секцию считают по безопасной рабочей нагрузке на пролёт, а не по весу пустого лотка.",
    image: "/images/tray-install.jpg",
    alt: "Лестничные кабельные лотки на потолке промышленного зала",
    paragraphs: [
      "Чем шире шаг консолей, тем толще сталь и выше борт. На лотке 100×50 при шаге 1,5 м и лёгком кабеле обычно хватает стали 0,7–1,0 мм.",
      "Магистраль 300–400 мм с силовым пучком уже требует стали 1,2–1,5 мм и более частых опор. Иначе секция проседает между консолями.",
      "В заявке лучше сразу указать шаг опор. Без этой цифры спецификация получается на глаз, и лоток приходится менять уже на монтаже.",
    ],
  },
  {
    id: "fittings",
    date: "21 апреля 2026",
    tag: "Комплект",
    title: "Что заказать кроме прямой секции",
    lead: "Прямой лоток — меньшая часть трассы. Без фасонки монтаж встаёт на первом повороте.",
    image: "/images/tray-solid.jpg",
    alt: "Глухой оцинкованный лоток с крышкой",
    paragraphs: [
      "К прямым секциям нужны углы 45° и 90°, тройники, редукции, крышки, разделители и соединители. Болты и шайбы идут вместе с соединителем, а не отдельным поиском по объекту.",
      "Крышку ставят на пыльные и слаботочные участки. Разделитель не даёт силовому кабелю лечь на слаботочный в одном лотке.",
      "Если фасонка приедет вторым счётом, бригада будет ждать металл. В одной спецификации собирают лоток, крепёж и маркировку по осям.",
    ],
  },
  {
    id: "acceptance",
    date: "6 мая 2026",
    tag: "Объект",
    title: "Как принять лоток на объекте",
    lead: "Пачки проверяют на земле, до подъёма на отметку. На кровле недостачу уже не сверить.",
    image: "",
    alt: "",
    paragraphs: [
      "Каждая пачка маркируется по осям из спецификации. Сверяют ширину, высоту борта, покрытие и число секций с накладной.",
      "Горячий цинк смотрят по кромке и по кристаллическому слою, Sendzimir — по равномерности листа. Вмятины на борту фиксируют до подписания приёмки.",
      "Недостачу пишут в тот же день. Так секция уходит со склада повторно, а не ищется по этажам через неделю.",
    ],
  },
] as const;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Блог — Лоток24" },
      {
        name: "description",
        content:
          "Заметки о кабельных лотках: как выбрать серию, покрытие и толщину стали, что входит в спецификацию и как принять поставку.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <section className="bg-surface">
        <div className="mx-auto grid max-w-6xl items-end gap-8 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold text-teal">Блог · 5 заметок</p>
            <h1 className="mt-4 font-display text-display leading-display tracking-tight">
              Заметки с объектов и со склада
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Какую серию ставить, какое покрытие переживёт улицу и что проверить до подъёма пачки на отметку.
            </p>
          </div>
          <figure className="overflow-hidden rounded-card">
            <img
              src="/images/tray-install.jpg"
              alt="Кабельная трасса на потолке промышленного зала"
              width={1728}
              height={1152}
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="bg-green-soft px-4 py-3 text-sm font-medium text-green-ink">
              Трасса на объекте · лестничный лоток
            </figcaption>
          </figure>
        </div>
      </section>

      <nav aria-label="Заметки" className="border-y border-line">
        <ol className="mx-auto grid max-w-6xl sm:grid-cols-5">
          {POSTS.map((post, index) => (
            <li key={post.id} className="border-line sm:border-l sm:first:border-l-0">
              <a href={`#${post.id}`} className="flex h-full flex-col gap-1 px-4 py-4 hover:bg-paper-deep sm:px-5">
                <span className="font-display text-sm text-teal">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm font-semibold">{post.tag}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        {POSTS.map((post, index) => (
          <article
            key={post.id}
            id={post.id}
            className="grid scroll-mt-24 gap-6 border-b border-line py-10 lg:grid-cols-[240px_1fr] lg:gap-14 lg:py-14"
          >
            <div>
              <p className="font-display text-4xl tracking-tight text-teal">{String(index + 1).padStart(2, "0")}</p>
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.alt}
                  width={1408}
                  height={1008}
                  loading="lazy"
                  className="mt-4 aspect-[4/3] w-full rounded-card object-cover"
                />
              ) : null}
              <p className="mt-4 text-sm text-muted">{post.date}</p>
            </div>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-teal">{post.tag}</p>
              <h2 className="mt-2 font-display text-2xl tracking-tight sm:text-3xl">{post.title}</h2>
              <p className="mt-4 text-lg leading-relaxed">{post.lead}</p>
              <div className="mt-4 flex flex-col gap-3 leading-relaxed text-muted">
                {post.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        ))}

        <div className="my-10 flex flex-col items-start justify-between gap-4 rounded-card bg-ink px-5 py-6 text-paper sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 className="font-display text-2xl tracking-tight">Нужна спецификация, а не статья?</h2>
            <p className="mt-2 text-on-ink">Пришлите план — подберём серию, покрытие и фасонку.</p>
          </div>
          <CtaLink to="/contacts" tone="paper" className="shrink-0">
            <ArrowCta>Запросить подбор</ArrowCta>
          </CtaLink>
        </div>
      </section>
    </>
  );
}
