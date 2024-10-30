import app from "./backend/app";

export const server = Bun.serve({
  fetch: app.fetch,
  hostname: "0.0.0.0",
  port: 3000,
});

console.log(`listening on http://localhost:${server.port} ...`);
