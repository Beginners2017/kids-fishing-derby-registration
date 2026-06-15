import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { deleteRegistration } from "@/lib/registrations";

function getRedirectUrl(request: Request, path: string) {
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const forwardedHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host;

  return new URL(path, `${forwardedProto}://${forwardedHost}`);
}

export async function POST(request: Request) {
  const isAuthed = await isAdminAuthenticated();

  if (!isAuthed) {
    return NextResponse.redirect(getRedirectUrl(request, "/admin"), 303);
  }

  const formData = await request.formData();
  const id = String(formData.get("id") ?? "").trim();
  const search = String(formData.get("q") ?? "").trim();
  const returnPath = search ? `/admin?q=${encodeURIComponent(search)}` : "/admin";

  if (!id) {
    return NextResponse.redirect(getRedirectUrl(request, returnPath), 303);
  }

  try {
    await deleteRegistration(id);
    return NextResponse.redirect(getRedirectUrl(request, returnPath), 303);
  } catch {
    return NextResponse.redirect(getRedirectUrl(request, `${returnPath}${search ? "&" : "?"}error=delete_failed`), 303);
  }
}
