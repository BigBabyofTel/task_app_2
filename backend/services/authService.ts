// hashing the password and token generation

import { sign, verify } from "hono/jwt";

//this function makes a hashed string
export function hasing(password: string) {
    const HashedPassword = Bun.password.hash(password)
    return HashedPassword;
}

export function hashCheck(password: string, storedPW: string) {
    const HashedPassword = Bun.password.verify(password, storedPW)
    return HashedPassword;
}

//no expiration so user can refresh
export async function getJWT(username: string | void) {
    const payload = {
        username: username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1, // token expires in 5 minutes
      }
      const accessToken = sign(payload, Bun.env.ACCESS_TOKEN_SECRET, "HS256",)
      !accessToken ? console.log('no token created') : console.log('access token created');
      console.log(accessToken)
      return accessToken;
}

export async function getRefJWT(username: string | void) {
    const payload = {
        username: username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2, // second/minutes/hours/days
      }
    const refreshToken = sign(payload, Bun.env.REFRESH_TOKEN_SECRET, "HS256")
    !refreshToken ? console.log('no token created') : console.log('refresh token created');
    return refreshToken;
}


export async function verifyToken(token: string | void) {
    const currentToken = token as string;
    
    const decodedPayload = await verify(currentToken, Bun.env.ACCESS_TOKEN_SECRET)
    console.log(decodedPayload)
    return;
}


