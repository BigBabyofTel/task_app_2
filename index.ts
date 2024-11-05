import { CookieStore } from "hono-sessions";
import app from "./backend/app";

import { verifyAccount } from "./backend/controllers/auth_controllers";
import { getJWT } from "./backend/services/authService";

export const server = Bun.serve({
  fetch: app.fetch,
  hostname: "0.0.0.0",
  port: 3000,
});

console.log(`listening on http://localhost:${server.port} ...`);
