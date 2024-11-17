## for the frontend

FROM oven/bun:latest

WORKDIR /frontend

COPY package*.json ./
COPY bun.lockb ./
COPY . .

RUN bun install

ENV DATABASE_URL=process.env.DATABASE_URL

EXPOSE 3001

ENTRYPOINT [ "bun", "dev"]