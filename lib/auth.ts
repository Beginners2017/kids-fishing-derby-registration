import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/constants";

function getAdminAccessKey() {
  const key = process.env.ADMIN_ACCESS_KEY;

  if (!key) {
    throw new Error("Missing required environment variable: ADMIN_ACCESS_KEY");
  }

  return key;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === getAdminAccessKey();
}

export function isValidAdminAccessKey(accessKey: string) {
  return accessKey === getAdminAccessKey();
}
