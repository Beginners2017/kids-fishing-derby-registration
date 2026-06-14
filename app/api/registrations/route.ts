import { NextResponse } from "next/server";
import { createRegistration } from "@/lib/registrations";
import { validateRegistrationPayload } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const validation = validateRegistrationPayload(payload);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    await createRegistration(validation.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save registration at this time.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
