//functions for authentication

import { setCookie } from "../utils/utils";
import { redirect, useNavigate } from "@tanstack/react-router";

export async function authenticate(response: Response) {
  const token = response.headers.get("authorization") as string;
  const refresher = response.headers.get("refresher") as string;
  if (!token || !refresher) {
    
  }
  setCookie({ name: "token", value: token, days: 1 });
  setCookie({ name: "refresher", value: refresher, days: 5 });
  
  const isAuthed = token && true || false;
 if (isAuthed) return true;
 else return false;
}
