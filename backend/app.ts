import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth_routes";

import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";
import { hc } from "hono/client";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());
app.use(
  cors({
    origin: "http://localhost:3001",
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Custom-Header",
      "Access-Control-Allow-Origin",
      "X-User-Agent",
    ],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: [
      "Content-Length",
      "Access-Control-Allow-Origin",
      "Authorization",
      "Refresher",
    ],
    maxAge: 3600,
  })
);

app.route("/", authRoute);

export default app;
