import { RegistrationInput } from "@/lib/types";

function normalizePhone(value: string) {
  return value.replace(/[^\d+()-.\s]/g, "").trim();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasEnoughDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

export function validateRegistrationPayload(payload: unknown):
  | { success: true; data: RegistrationInput }
  | { success: false; errors: string[] } {
  const source = (payload ?? {}) as Record<string, unknown>;

  const data: RegistrationInput = {
    parentFullName: String(source.parentFullName ?? "").trim(),
    childFullName: String(source.childFullName ?? "").trim(),
    childAge: Number(source.childAge ?? 0),
    phone: normalizePhone(String(source.phone ?? "")),
    email: String(source.email ?? "").trim().toLowerCase(),
    emergencyContactName: String(source.emergencyContactName ?? "").trim(),
    emergencyContactPhone: normalizePhone(String(source.emergencyContactPhone ?? "")),
    notes: String(source.notes ?? "").trim(),
    waiverAccepted: Boolean(source.waiverAccepted)
  };

  const errors: string[] = [];

  if (!data.parentFullName) errors.push("Parent or guardian full name is required.");
  if (!data.childFullName) errors.push("Child full name is required.");
  if (!Number.isInteger(data.childAge) || data.childAge < 1 || data.childAge > 17) {
    errors.push("Child age must be a whole number between 1 and 17.");
  }
  if (!hasEnoughDigits(data.phone)) errors.push("A valid phone number is required.");
  if (!isValidEmail(data.email)) errors.push("A valid email address is required.");
  if (!data.emergencyContactName) errors.push("Emergency contact name is required.");
  if (!hasEnoughDigits(data.emergencyContactPhone)) {
    errors.push("A valid emergency contact phone number is required.");
  }
  if (!data.waiverAccepted) errors.push("You must agree to the event waiver.");

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
