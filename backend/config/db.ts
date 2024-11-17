import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(Bun.env.DATABASE_URL as string);

declare module "bun" {
    interface Env {
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        SESSION_KEY: string;
        PORT: number;
    }
}

export const accessToken: string = Bun.env.ACCESS_TOKEN_SECRET as string;
export const refreshToken: string = Bun.env.REFRESH_TOKEN_SECRET as string;
export const sessionKey: string = Bun.env.SESSION_KEY as string;
export const port: number = Bun.env.PORT as number;


