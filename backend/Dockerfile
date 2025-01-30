# Используем Node.js 20 (LTS) с полным Linux (не Alpine)
FROM node:20-bullseye AS builder

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем NestJS (если есть TypeScript)
RUN npm run build

# Финальный контейнер
FROM node:20-bullseye

WORKDIR /app

# Копируем собранные файлы и зависимости
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

RUN npm install -g prisma

EXPOSE 3000

CMD ["node", "dist/main"]
