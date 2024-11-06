import { Hono } from "hono";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth_routes";


import { prettyJSON } from "hono/pretty-json";
import { cors } from "hono/cors";

const app = new Hono();

app.use(logger());
app.use(prettyJSON());

app.use('/*', cors({
    origin: ['http://localhost:3000'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    exposeHeaders: ['Content-Length'],
    maxAge: 3600,
}))


//group routes go here
app.route("/", authRoute);


export default app;
