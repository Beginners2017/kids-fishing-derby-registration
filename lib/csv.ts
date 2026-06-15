import { RegistrationRecord } from "@/lib/types";
import { formatRegistrationTimestamp } from "@/lib/dates";

function escapeCsvValue(value: string | number | boolean | null) {
  const safeValue = value == null ? "" : String(value);
  const escaped = safeValue.replace(/"/g, "\"\"");
  return `"${escaped}"`;
}

export function registrationsToCsv(registrations: RegistrationRecord[]) {
  const header = [
    "Submitted At",
    "Parent / Guardian",
    "Child Name",
    "Child Age",
    "Phone",
    "Email",
    "Emergency Contact",
    "Emergency Contact Phone",
    "Notes / Allergies / Special Needs",
    "Waiver Accepted"
  ];

  const rows = registrations.map((registration) => [
    formatRegistrationTimestamp(registration.created_at),
    registration.parent_full_name,
    registration.child_full_name,
    registration.child_age,
    registration.phone,
    registration.email,
    registration.emergency_contact_name,
    registration.emergency_contact_phone,
    registration.notes ?? "",
    registration.waiver_accepted ? "Yes" : "No"
  ]);

  return [header, ...rows]
    .map((row) => row.map((value) => escapeCsvValue(value)).join(","))
    .join("\n");
}
