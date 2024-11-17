## for the backend

FROM oven/bun:latest

WORKDIR /backend

COPY package*.json ./
COPY bun.lockb ./

RUN bun install

COPY  . .

ENV DATABASE_URL=process.env.DATABASE_URL

EXPOSE 3000

ENTRYPOINT [ "bun", "dev"]