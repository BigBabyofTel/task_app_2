import { hc } from "hono/client"
import type { AppType } from "../../../backend/routes/auth_routes"

const client = hc<AppType>('http://localhost:3000');

export const api = client
