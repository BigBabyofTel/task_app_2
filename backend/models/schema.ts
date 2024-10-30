import { password } from "bun"
import { integer, pgTable, varchar, date} from "drizzle-orm/pg-core"


export const usersTable = pgTable("users", {
    id: integer("id").primaryKey(),
    username: varchar({length: 50}).notNull(),
    password: varchar({length: 100}).notNull(),
})
