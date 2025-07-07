FROM docker:dind

RUN apk add --no-cache nodejs npm curl

WORKDIR /app
COPY package*.json ./
COPY .env ./
COPY tsconfig.json ./
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 80 81 443 8080
CMD ["sh", "-c", "dockerd & npm run dev"]