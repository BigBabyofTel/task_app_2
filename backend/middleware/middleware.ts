import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { accessToken } from "../config/db";

export const verifyToken = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("authHeader");
  const token = authHeader && authHeader.split("")[1];
  console.log(token)

  if (token === null) {
    return c.json("no token found", 401);
  }
  console.log(token);
  await next();
  return;
});


export const authenticateToken = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  
  if (!authHeader) {
    console.log(`there is no token`);
  }
  const token =  authHeader && authHeader.split(" ")[1];

  try{
    const decoded = await verify(token as string, accessToken);
    c.set('decode', decoded)
    await next();
    return;
  } catch (error) {
    console.log(error);
  }
  return c.json('You are not authorized', 404)
});