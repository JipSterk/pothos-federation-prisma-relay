import { isBrowser } from "@/utils/isBrowser";
import { HttpOptions } from "@apollo/client";
import cookie from "cookie";

const { NEXT_PUBLIC_ACME_BACKEND_URL } = process.env;

export const linkOptions: HttpOptions = {
  uri: NEXT_PUBLIC_ACME_BACKEND_URL,
  credentials: "include",
};

export async function getToken() {
  if (isBrowser) {
    return cookie.parse(document.cookie).qid;
  }

  const { cookies } = await import("next/headers");
  const cookiesList = cookies();

  if (cookiesList.has("qid")) {
    return cookiesList.get("qid")?.value;
  }
}
