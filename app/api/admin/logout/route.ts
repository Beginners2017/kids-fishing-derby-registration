import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/constants";

function getRedirectUrl(request: Request, path: string) {
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const forwardedHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host;

  return new URL(path, `${forwardedProto}://${forwardedHost}`);
}

export async function POST(request: Request) {
  const response = NextResponse.redirect(getRedirectUrl(request, "/admin"), 303);
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });

  return response;
}
