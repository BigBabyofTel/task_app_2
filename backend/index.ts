import app from "./app";
import { port } from "./config/db";

export const server = Bun.serve({
  fetch: app.fetch,
  hostname: "0.0.0.0",
  port: port,
});

console.log(`listening on http://localhost:${server.port} ...`);