export type RegistrationInput = {
  parentFullName: string;
  childFullName: string;
  childAge: number;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  notes: string;
  waiverAccepted: boolean;
};

export type RegistrationRecord = {
  id: string;
  parent_full_name: string;
  child_full_name: string;
  child_age: number;
  phone: string;
  email: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  notes: string | null;
  waiver_accepted: boolean;
  created_at: string;
};
