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

## Развёртывание на Vercel

1. Откройте [репозиторий](https://github.com/Krapivin1986/staltrassa) и нажмите **Deploy** на [vercel.com/new](https://vercel.com/new), либо импортируйте `Krapivin1986/staltrassa` в панели Vercel.
2. Framework Preset оставьте **Other**. Каталог сборки — корень репозитория.
3. Команды не меняйте вручную, если Vercel их уже подхватил:
   - Install: `npm install --omit=dev --no-audit --no-fund` (записано в `vercel.json`)
   - Build: `npm run build`
4. Переменные окружения не задавайте. `DATABASE_URL` нужен только если позже подключите Postgres.
5. В настройках проекта выберите Node.js **22.x** и нажмите **Deploy**.
6. После сборки сайт будет на адресе `*.vercel.app`. Свой домен добавляется в **Settings → Domains**.

Повторный деплой запускается сам при пуше в `main`.

Сборка кладёт результат в `.vercel/output`. Этот каталог не коммитится: его создаёт `npm run build` на стороне Vercel.
