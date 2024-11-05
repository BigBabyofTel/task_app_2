//helpers and validation

import { userSchema } from "../models/schema";

export type User = {
  username: string;
  password: string;
};

export const validateUser = async ({ username, password }: User) => {
  const validUser = userSchema.parse({
    username,
    password,
  });
  return validUser;
};
