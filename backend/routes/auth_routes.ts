//log in and register paths
import { Hono } from "hono";

//registration routes
export const registerRoute = new Hono().basePath("/register");

registerRoute.get("/", (c) => {
  return c.json({ message: "This is the registration route" });
});

//login routes
export const loginRoute = new Hono().basePath("/login");

loginRoute.get('/', (c) => {
    return c.json({ message: 'This is the login route' });
})

