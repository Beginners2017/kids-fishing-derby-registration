import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/constants";
import { isValidAdminAccessKey } from "@/lib/auth";

function getRedirectUrl(request: Request, path: string) {
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const forwardedHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host;

  return new URL(path, `${forwardedProto}://${forwardedHost}`);
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const accessKey = String(formData.get("accessKey") ?? "").trim();

  if (!isValidAdminAccessKey(accessKey)) {
    return NextResponse.redirect(getRedirectUrl(request, "/admin?error=invalid_access_code"), 303);
  }

  const response = NextResponse.redirect(getRedirectUrl(request, "/admin"), 303);
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: accessKey,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12
  });

  return response;
}
