# Button presses

An extremely simple full-stack app: press a button, and it counts how many times it's been pressed each day. Shows today's count and the date with the most presses ever.

## Structure

```
backend/    Express API + SQLite via Sequelize, table: presses(date PK, count)
frontend/   React + Vite
package.json  root scripts that run both together
```

## Development

Install dependencies once (root, backend, and frontend each have their own `package.json`):

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

Then start both the backend and frontend dev servers together:

```bash
npm run dev
```

- Backend runs on http://localhost:3001
- Frontend runs on http://localhost:5173 and proxies `/api` requests to the backend

## Production

Build the frontend and start the backend, which then serves the built frontend, the API, and everything from a single port:

```bash
npm run build
npm start
```

- App available on http://localhost:3001 (or `PORT` env var)

## API

- `GET /api/stats` — returns `{ today: { date, count }, max: { date, count } }`
- `POST /api/press` — increments today's count, returns the updated stats
