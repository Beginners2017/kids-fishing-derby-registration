"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormValues = {
  parentFullName: string;
  childFullName: string;
  childAge: string;
  phone: string;
  email: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  notes: string;
  waiverAccepted: boolean;
};

const initialValues: FormValues = {
  parentFullName: "",
  childFullName: "",
  childAge: "",
  phone: "",
  email: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  notes: "",
  waiverAccepted: false
};

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
};

function Field({ label, htmlFor, required, children }: FieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-lake" htmlFor={htmlFor}>
      <span>
        {label}
        {required ? <span className="ml-1 text-sunrise">*</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-brand-100 bg-white/95 px-4 py-3 text-base text-lake placeholder:text-slate-400 transition focus:border-brand-400";

export function RegistrationForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors([]);

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          childAge: Number(values.childAge)
        })
      });

      const payload = (await response.json()) as { errors?: string[]; message?: string };

      if (!response.ok) {
        setErrors(payload.errors ?? [payload.message ?? "Unable to submit registration."]);
        return;
      }

      router.push(`/thank-you?child=${encodeURIComponent(values.childFullName)}`);
    } catch {
      setErrors(["Unable to submit registration right now. Please try again in a moment."]);
    } finally {
      setSubmitting(false);
    }
  }

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {errors.length > 0 ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <p className="font-semibold">Please fix the following:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field htmlFor="parentFullName" label="Parent / Guardian Full Name" required>
          <input
            className={inputClassName}
            id="parentFullName"
            value={values.parentFullName}
            onChange={(event) => updateValue("parentFullName", event.target.value)}
          />
        </Field>

        <Field htmlFor="childFullName" label="Child Full Name" required>
          <input
            className={inputClassName}
            id="childFullName"
            value={values.childFullName}
            onChange={(event) => updateValue("childFullName", event.target.value)}
          />
        </Field>

        <Field htmlFor="childAge" label="Child Age" required>
          <input
            className={inputClassName}
            id="childAge"
            min={1}
            max={17}
            inputMode="numeric"
            type="number"
            value={values.childAge}
            onChange={(event) => updateValue("childAge", event.target.value)}
          />
        </Field>

        <Field htmlFor="phone" label="Phone Number" required>
          <input
            className={inputClassName}
            id="phone"
            inputMode="tel"
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
          />
        </Field>

        <Field htmlFor="email" label="Email Address" required>
          <input
            className={inputClassName}
            id="email"
            inputMode="email"
            type="email"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
          />
        </Field>

        <Field htmlFor="emergencyContactName" label="Emergency Contact Name" required>
          <input
            className={inputClassName}
            id="emergencyContactName"
            value={values.emergencyContactName}
            onChange={(event) => updateValue("emergencyContactName", event.target.value)}
          />
        </Field>

        <Field htmlFor="emergencyContactPhone" label="Emergency Contact Phone" required>
          <input
            className={inputClassName}
            id="emergencyContactPhone"
            inputMode="tel"
            value={values.emergencyContactPhone}
            onChange={(event) => updateValue("emergencyContactPhone", event.target.value)}
          />
        </Field>

        <Field htmlFor="notes" label="Notes / Allergies / Special Needs">
          <textarea
            className={`${inputClassName} min-h-32 md:min-h-full`}
            id="notes"
            value={values.notes}
            onChange={(event) => updateValue("notes", event.target.value)}
          />
        </Field>
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/70 px-4 py-4 text-sm text-lake">
        <input
          checked={values.waiverAccepted}
          className="mt-1 h-4 w-4 rounded border-brand-300 text-brand-600"
          onChange={(event) => updateValue("waiverAccepted", event.target.checked)}
          type="checkbox"
        />
        <span>
          I agree to the event waiver and understand that my child is participating in the{" "}
          <strong>Beginners Luck Tackle and Supply Kids Fishing Derby</strong> at my own risk.
        </span>
      </label>

      <button
        className="inline-flex w-full items-center justify-center rounded-full bg-lake px-6 py-4 text-base font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Submitting registration..." : "Register for the Derby"}
      </button>
    </form>
  );
}
