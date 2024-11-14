//log in and register paths
import { Hono } from "hono";
import {
  createtUserData,
  getNewAccessToken,
  verifyAccount,
} from "../controllers/auth_controllers";
import { type User } from "../utils/utils";
import { ZodError } from "zod";
import type { JWTPayload } from "hono/utils/jwt/types";
import { authenticateToken } from "../middleware/middleware";
import { verify } from "hono/jwt";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../models/schema";
import { cors } from "hono/cors";
import type { Token } from "typescript";

export type Variables = {
  access_token: string;
  refresh_token: string;
  decode: string;
  authenticateToken: () => Promise<JWTPayload | string>;
};

//Authorization routes
export const authRoute = new Hono<{ Variables: Variables }>()
  .basePath("/auth")
  .post("/signup", zValidator("json", userSchema), async (c) => {
    try {
      const { username, password }: User = c.req.valid("json");
      createtUserData({
        username: username,
        password: password,
      });

      c.json({ message: "User registered successfully" }, 201);
      c.redirect("/verify");
    } catch (error: unknown) {
      console.log(ZodError, error);
    }
  })
  .post("/login", zValidator("json", userSchema), async (c) => {
    try {
      const { username, password } = await c.req.json();
      //change so that users doesnt log the username or password
      const user = await verifyAccount(username, password);
      if (user == undefined) throw new Error(`user not found`);
      c.res.headers.set("Authorization", user?.access_token as string);
      c.res.headers.set("Refresher", user?.refresh_token as string);
      return c.json(`Access Granted`, 200);
    } catch (error) {
      console.log(error);
    }
  })
  .post("/refresh", async (c) => {
    try {
      const refreshToken = c.req.header("Authorization");

      // Verify the refresh token
      const verifiedToken = await verify(
        refreshToken as string,
        Bun.env.REFRESH_TOKEN_SECRET
      );

      if (verifiedToken) {
        // Correct the condition
        // Issue a new access token
        const newAccessToken = await getNewAccessToken(refreshToken);
        return c.json({ access_token: newAccessToken });
      } else {
        // Handle invalid refresh token
        return c.json({ message: "Invalid refresh token" }, 401); // Unauthorized
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      return c.json({ message: "Failed to refresh token" }, 500); // Internal Server Error
    }
  });

authRoute.use("/dashboard", authenticateToken);

authRoute.get("/dashboard", async (c) => {
  return c.json("This is a protected route must be authorized to see it", 202);
});

export type AppType = typeof authRoute;
