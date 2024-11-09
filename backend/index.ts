import { CookieStore } from "hono-sessions";
import app from "./app";

import {
  getNewAccessToken,
  verifyAccount,
} from "./controllers/auth_controllers";
import { getJWT } from "./services/authService";
import { type Context } from "hono";
import { refreshToken } from "./config/db";
import { getCookie } from "hono/cookie";

export const server = Bun.serve({
  fetch: app.fetch,
  hostname: "0.0.0.0",
  port: 3000,
});

console.log(`listening on http://localhost:${server.port} ...`);