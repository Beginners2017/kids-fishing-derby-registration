import { createSupabaseAdminClient } from "@/lib/supabase";
import { RegistrationInput, RegistrationRecord } from "@/lib/types";

export async function createRegistration(data: RegistrationInput) {
  const supabase = createSupabaseAdminClient();

  const { error } = await supabase.from("registrations").insert({
    parent_full_name: data.parentFullName,
    child_full_name: data.childFullName,
    child_age: data.childAge,
    phone: data.phone,
    email: data.email,
    emergency_contact_name: data.emergencyContactName,
    emergency_contact_phone: data.emergencyContactPhone,
    notes: data.notes || null,
    waiver_accepted: data.waiverAccepted
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function listRegistrations(search: string) {
  const supabase = createSupabaseAdminClient();
  const trimmedSearch = search.trim();

  let query = supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (trimmedSearch) {
    const safeTerm = `%${trimmedSearch.replace(/[%]/g, "")}%`;
    query = query.or(
      [
        `parent_full_name.ilike.${safeTerm}`,
        `child_full_name.ilike.${safeTerm}`,
        `phone.ilike.${safeTerm}`,
        `email.ilike.${safeTerm}`,
        `emergency_contact_name.ilike.${safeTerm}`
      ].join(",")
    );
  }

  const { data, error } = await query.returns<RegistrationRecord[]>();

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
