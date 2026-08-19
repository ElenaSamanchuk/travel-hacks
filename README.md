# Travel Hacks — чеклист путешественников

Интерактивная редакционная страница: лайфхаки и чеклист для планирования отпуска.

## Cursor Projects

Проект настроен как Cloud Agent environment (`.cursor/environment.json`):

- `install`: `npm ci`
- dev-сервер на порту **3456**

### Открыть в Projects

1. Cursor → **Projects** (или Cloud Agents)
2. **New Agent** → выберите репозиторий:
   - GitHub: `elenasamanchuk/travel-hacks` (после пуша)
   - или текущий Origin: `tmp-be5c667e3f96a798`
3. Агент поднимет dev-сервер автоматически

### GitHub Pages (опционально)

После пуша в `main` на GitHub деплой идёт через Actions.

**Live URL:** https://elenasamanchuk.github.io/travel-hacks/

Локально с basePath для Pages:

```bash
GITHUB_PAGES=true npm run build
```

## Локальный запуск

```bash
npm install
npm run dev -- -p 3456
```

http://localhost:3456

## Деплой на GitHub

```bash
./scripts/github-device-deploy.sh
```

Откройте https://github.com/login/device и введите код из вывода скрипта.

## Стек

Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui
