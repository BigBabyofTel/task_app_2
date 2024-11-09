import { insertUserSchema, userSchema, usersTable } from "../models/schema";
import { db } from "../config/db";
import { getJWT, getRefJWT, hashCheck, hasing } from "../services/authService";
import { validateUser, type User } from "../utils/utils";
import { getCookie, setCookie } from "hono/cookie";
import type { Context } from "hono";
import { verify } from "hono/jwt";
import { refreshToken } from "../config/db";

//inputs username and password into the database after validating and hashing
export async function createtUserData({ username, password }: User) {
  try {
    const valid = await validateUser({ username, password });
    const newPassword = await hasing(valid.password);
    const newValData = {
      username: valid.username,
      password: newPassword,
    };
    await db.insert(usersTable).values(newValData);
    console.log("data created");
  } catch (error) {
    console.log(error);
  }
}

export async function verifyAccount(username: string, password: string) {
  try {
    const results = await db
      .select({
        username: usersTable.username,
        password: usersTable.password,
      })
      .from(usersTable)
      .limit(1);

    //have access to the username and password from db
    const userName = results[0].username;
    //simplify later
    if (userName !== username) throw new Error("username was not found");
    const isMatch = await hashCheck(password, results[0]?.password);
    
    if (!isMatch) throw new Error("password did not match")
    if (userName !== username || !isMatch) throw new Error("there is no match");
  //add below the functions to make tokens
  //return those instead of username and password
     const access_token = await getJWT(username);
     const refresh_token = await getRefJWT(username);
    return { access_token, refresh_token };
  } catch (Error) {
    console.log(Error);
  }
}

export async function getNewAccessToken(token: string | void) {
  try {
    const decodedToken = await verify(token as string, refreshToken);
    if (!decodedToken) {
      throw new Error("Invalid token");
    } else if (!decodedToken.username) {
      throw new Error("Username not found");
    } else {
      const new_access_token = await getJWT(decodedToken.username as string);
      return new_access_token;
    }
  } catch (error) {
    console.log(error);
  }
}
