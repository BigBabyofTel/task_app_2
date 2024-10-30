FROM oven/bun

WORKDIR /app

COPY . .

RUN ["bun install", "bun install drizzle-orm @neondatabase/serverless"]

ENV [DATABASE_URL = process.env.DATABASE_URL ]

EXPOSE 3000

ENTRYPOINT [ "bun", "run", "start"]