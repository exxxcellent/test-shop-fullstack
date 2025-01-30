# Используем Node.js для сборки
FROM node:18-alpine

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

RUN npm run build

EXPOSE 8080

# Запускаем dev-сервер (можно заменить на `npm run build` + serve)
CMD ["npm", "run", "preview"]
