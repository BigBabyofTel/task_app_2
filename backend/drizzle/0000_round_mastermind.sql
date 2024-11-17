CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"created_on" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
