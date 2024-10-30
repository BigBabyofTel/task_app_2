import { Hono } from "hono";
import { logger } from "hono/logger";
import { loginRoute, registerRoute } from "./routes/auth_routes";

const app = new Hono();

app.use(logger());

//group routes go here
app.route("/", registerRoute);
app.route("/", loginRoute);

export default app;
