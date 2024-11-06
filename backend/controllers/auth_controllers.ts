import { insertUserSchema, userSchema, usersTable } from "../models/schema";
import { db } from "../config/db";
import { getJWT, getRefJWT, hashCheck, hasing } from "../services/authService";
import { validateUser, type User } from "../utils/utils";
import { setCookie } from "hono/cookie";
import type { Context } from "hono";
import { verify } from "hono/jwt";

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
    if (userName !== username) return console.log("username was not found");
    const isMatch = await hashCheck(password, results[0]?.password);
    !isMatch
      ? console.log("passwords do not match")
      : console.log("passwords match");
    //username and password check
    if (userName !== username || !isMatch) {
      console.log("there is no match");
    } else {
      console.log("there is a match");
    }

    return { username, password };
  } catch (Error) {
    console.log(Error);
  }
}

export async function getTokens(
  user: { username: string; password: boolean | string } | void
) {
  try {
    if (!user) {
      return console.log("User not found");
    } else if (!user.password) {
      return console.log("Password not found");
    } else {
      const access_token = await getJWT(user.username);
      const refresh_token = await getRefJWT(user.username);
      return { access_token, refresh_token };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function checkRefresh(c: Context) {
  try {
    const refreshtoken = c.req.header("Authorization")?.split("")[1];

    !refreshtoken
      ? c.json("The token is expired or missinng")
      : c.json("The token is valid");
  } catch (error) {
    console.log(error);
  }
}
