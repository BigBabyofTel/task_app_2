
import { pgTable, serial, timestamp, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod"

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  username: text().notNull().unique(),
  password: text().notNull(),
  createdOn: timestamp("created_on").defaultNow(),
});

export const userSchema = z.object({
  username: z.string().min(1).max(255),
  password: z.string().min(5).max(255),
})
export const insertUserSchema = createInsertSchema(usersTable, {
  username: (schema) => schema.username.min(3).max(255),
  password: (schema) => schema.password.min(8).max(255),
});
