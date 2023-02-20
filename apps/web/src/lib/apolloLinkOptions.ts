import { HttpOptions } from "@apollo/client";
import cookie from "cookie";
import { isBrowser } from "../utils/isBrowser";

export async function parseServerCookies() {
  const { cookies } = await import("next/headers");

  const cookiesList = cookies();

  if (cookiesList.has("qid")) {
    return cookiesList.get("qid");
  }
}

export function parseClientCookies() {
  return document.cookie;
}

export async function getToken() {
  const cookies = isBrowser ? parseClientCookies() : await parseServerCookies();
  if (typeof cookies === "string") {
    return cookie.parse(cookies).qid;
  } else {
    return cookies?.value;
  }
}

const { NEXT_PUBLIC_ACME_BACKEND_URL } = process.env;

export const linkOptions: HttpOptions = {
  uri: NEXT_PUBLIC_ACME_BACKEND_URL,
  credentials: "include",
};
