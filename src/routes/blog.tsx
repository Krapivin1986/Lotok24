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
  const [featured, ...rest] = POSTS;

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="text-sm font-semibold text-teal">Блог</p>
            <h1 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">Заметки с объектов и со склада</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Короткие разборы без рекламных обещаний: какую серию ставить, какое покрытие переживёт улицу и что
              проверить до подъёма пачки на отметку.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {POSTS.map((post) => (
                <li key={post.id}>
                  <a
                    href={`#${post.id}`}
                    className="inline-flex rounded-full bg-green-soft px-3 py-1.5 text-sm font-semibold text-green-ink"
                  >
                    {post.tag}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <figure className="overflow-hidden rounded-card border border-line">
            <img
              src="/images/tray-install.jpg"
              alt="Кабельная трасса на потолке промышленного зала"
              width={1728}
              height={1152}
              className="aspect-[4/3] w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        <article id={featured.id} className="scroll-mt-24 overflow-hidden rounded-card border border-line bg-surface">
          <div className="grid lg:grid-cols-2">
            <img
              src={featured.image}
              alt={featured.alt}
              width={1792}
              height={1008}
              className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto"
            />
            <div className="p-5 sm:p-8">
              <p className="text-sm font-semibold text-teal">Свежая заметка · {featured.date}</p>
              <h2 className="mt-3 font-display text-2xl tracking-tight sm:text-3xl">{featured.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">{featured.lead}</p>
              <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed">
                {featured.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </article>

        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((post) => (
            <li key={post.id}>
              <article id={post.id} className="scroll-mt-24 overflow-hidden rounded-card border border-line bg-surface">
                {post.image ? (
                  <img src={post.image} alt={post.alt} width={1408} height={1008} className="aspect-[16/9] w-full object-cover" />
                ) : (
                  <div className="bg-green-soft px-5 py-8">
                    <p className="font-display text-3xl tracking-tight text-green-ink">05</p>
                    <p className="mt-2 text-sm font-semibold text-green-ink">{post.tag}</p>
                  </div>
                )}
                <div className="p-5">
                  <p className="text-sm font-semibold text-teal">
                    <span className="rounded-full bg-green-soft px-2.5 py-1 text-xs text-green-ink">{post.tag}</span>
                    <span className="ml-2 font-medium text-muted">{post.date}</span>
                  </p>
                  <h2 className="mt-3 font-display text-xl tracking-tight">{post.title}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{post.lead}</p>
                  <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed">
                    {post.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-card bg-ink px-5 py-6 text-paper sm:flex-row sm:items-center sm:px-6">
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
