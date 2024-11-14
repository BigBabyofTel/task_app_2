import { z } from "zod";


export const userSchema = z.object({
    username: z.string().max(255).min(3, "username must be at least 3 characters"),
    password: z.string().max(255).min(5, "password must be at least 5 characters") // Increase length for hashed password
  });
  