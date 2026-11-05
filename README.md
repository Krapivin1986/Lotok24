# СТАЛЬТРАССА

Сайт металлических кабельных лотков: главная, каталог, страницы серий, доставка и оплата, контакты.

Нужен Node.js 22. База данных не нужна: заявки сохраняются в браузере.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://127.0.0.1:8080`.

Проверка типов: `npm run typecheck`.

## Сборка

```bash
npm install
npm run build
npm run preview
```

`npm run build` собирает клиент и сервер в формате Vercel. Без `DATABASE_URL` миграции пропускаются — для этого сайта это нормально.

`npm run preview` поднимает собранную версию на `http://127.0.0.1:8081`.

## Настройка Vercel

Сайт собирается пресетом Nitro `vercel`: команда `npm run build` сама пишет `.vercel/output`. Отдельный каталог `dist` указывать не нужно.

### Первый проект

1. Войдите на [vercel.com](https://vercel.com) под аккаунтом, у которого есть доступ к GitHub `Krapivin1986`.
2. **Add New → Project** и импортируйте [Krapivin1986/staltrassa](https://github.com/Krapivin1986/staltrassa). Если репозитория нет в списке, нажмите **Adjust GitHub App Permissions** и разрешите доступ к нему.
3. На экране настройки оставьте:
   - **Framework Preset** — `Other`. Не выбирайте Next.js: это не Next-проект.
   - **Root Directory** — корень репозитория, `./`.
4. Раскройте **Build and Output Settings** и проверьте команды:

   | Поле | Значение |
   | --- | --- |
   | Install Command | `npm install --omit=dev --no-audit --no-fund` |
   | Build Command | `npm run build` |
   | Output Directory | пусто |

   Install Command уже задан в `vercel.json`. Если поле пустое, Vercel возьмёт его оттуда. Output Directory оставьте пустым: если указать `dist`, `public` или `.vercel/output`, деплой сломается.
5. Блок **Environment Variables** не заполняйте. Сайт работает без ключей. `DATABASE_URL` понадобится только если позже подключите Postgres.
6. Нажмите **Deploy** и дождитесь статуса Ready.

### После создания проекта

В **Settings → General** выставьте **Node.js Version** `22.x`. В **Settings → Git** производственная ветка должна быть `main`: пуш в неё запускает новый деплой сам.

Проверьте адреса:

- `/`
- `/catalog`
- `/catalog/perforated`
- `/catalog/ladder`
- `/catalog/solid`
- `/delivery`
- `/contacts`

Свой домен добавляется в **Settings → Domains**. Пока DNS не обновился, рабочий адрес — `*.vercel.app`.

