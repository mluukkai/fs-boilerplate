FROM node:26-trixie-slim AS build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json frontend/
RUN npm --prefix frontend ci

COPY frontend/index.html frontend/vite.config.js frontend/
COPY frontend/src frontend/src
RUN npm run build --prefix frontend

FROM node:26-trixie-slim

WORKDIR /app

COPY backend/package.json backend/package-lock.json backend/
RUN npm --prefix backend ci --omit=dev

COPY backend/index.js backend/
COPY backend/models backend/models
COPY backend/util backend/util
COPY --from=build /app/frontend/dist frontend/dist

ENV NODE_ENV=production

WORKDIR /app/backend

EXPOSE 3001

CMD ["node", "index.js"]
