# Travel Hacks — чеклист путешественника

Интерактивная редакционная страница в стиле travel-гайдов: лайфхаки и чеклист для планирования отпуска без разочарований.

**Live:** https://elenasamanchuk.github.io/travel-hacks/

## Возможности

- Гигантский редакционный заголовок «Ненадёжные надежды»
- Лонгрид с pull-quotes и секциями
- Интерактивные рассыпанные цифры — наведите, чтобы прочитать совет
- Два чеклиста: планирование и спонтанные поездки

## Локальный запуск

```bash
npm install
npm run dev -- -p 3456
```

Откройте http://localhost:3456

## Деплой на GitHub Pages

Сайт деплоится автоматически через GitHub Actions при пуше в `main`.

В настройках репозитория: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Для локальной проверки production-сборки с basePath:

```bash
GITHUB_PAGES=true npm run build
npx serve out
```

## Стек

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui
