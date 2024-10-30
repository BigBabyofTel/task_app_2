FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install

ENV DATABASE_URL=process.env.DATABASE_URL

EXPOSE 3000

ENTRYPOINT [ "bun", "run", "start"]