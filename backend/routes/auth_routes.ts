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
    //change so that users doesnt log the username or password
    const user = await verifyAccount(username, password);
    console.log(user);
    return c.json(user);
  } catch (error) {
    console.log(error);
  }
});

authRoute.post("/refresh", async (c) => {
  try {
    const refreshToken = c.req.header("Authorization");
    
    // Verify the refresh token
    const verifiedToken = await verify(
      refreshToken as string,
      Bun.env.REFRESH_TOKEN_SECRET
    );

    if (verifiedToken) { // Correct the condition
      // Issue a new access token
      const newAccessToken = await getNewAccessToken(refreshToken);
      return c.json({ access_token: newAccessToken }); 
    } else {
      // Handle invalid refresh token
      return c.json({ message: 'Invalid refresh token' }, 401); // Unauthorized
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return c.json({ message: 'Failed to refresh token' }, 500); // Internal Server Error
  }
});


authRoute.use("/dashboard", authenticateToken);

authRoute.get("/dashboard", async (c) => {
  return c.json("This is a protected route must be authorized to see it", 202);
});
