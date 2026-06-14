import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { registrationsToCsv } from "@/lib/csv";
import { listRegistrations } from "@/lib/registrations";

export async function GET(request: Request) {
  try {
    const isAuthed = await isAdminAuthenticated();

    if (!isAuthed) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("q") ?? "";
    const registrations = await listRegistrations(search);
    const csv = registrationsToCsv(registrations);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="kids-fishing-derby-registrations.csv"'
      }
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to export registrations at this time.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
