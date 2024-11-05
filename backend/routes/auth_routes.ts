//log in and register paths
import { Hono } from "hono";
import {
  createtUserData,
  getTokens,
  verifyAccount,
} from "../controllers/auth_controllers";
import { getJWT, getRefJWT } from "../services/authService";
import { validateUser, type User } from "../utils/utils";
import { set, ZodError } from "zod";
import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { accessToken } from "../config/db";
import type { JWTPayload } from "hono/utils/jwt/types";
import { authenticateToken } from "../middleware/middleware";

export type Variables = {
  access_token: string;
  refresh_token: string;
  decode: string;
  authenticateToken: () => Promise<JWTPayload | string>;
};

//Authorization routes
export const authRoute = new Hono<{ Variables: Variables }>().basePath("/auth");

authRoute.post("/signup", async (c) => {
  try {
    const { username, password }: User = await c.req.json();
    createtUserData({
      username: username,
      password: password,
    });

    c.json({ message: "User registered successfully" }, 201);
    c.redirect("/verify");
  } catch (error: unknown) {
    console.log(ZodError, error);
  }
});

authRoute.post("/login", async (c) => {
  try {
    const { username, password } = await c.req.json();
    const user = await verifyAccount(username, password);
    //verify
    const tokens: { access_token: string; refresh_token: string } | void =
      await getTokens(user).then((res) => {
        return res;
      });
    // await as an object with two strings
    const access_token = tokens?.access_token as string;
    const refresh_token = tokens?.refresh_token as string;
    //add age for cookies
    setCookie(c, "access_token", access_token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 1, // 1 hour
    });
    setCookie(c, "refresh_token", refresh_token, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 2, //2 days
    });
    c.redirect("/dashboard");
    return c.json({ message: "user found" }, 201);
  } catch (error) {
    console.log(error);
  }
});

authRoute.use("/dashboard", authenticateToken);

authRoute.get("/dashboard", async (c) => {
  return c.json("This is a protected route must be authorized to see it", 202);
});
