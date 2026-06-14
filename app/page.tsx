import { RegistrationForm } from "@/components/registration-form";
import { BRAND_NAME, EVENT_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] bg-lake px-6 py-8 text-white shadow-card sm:px-8 sm:py-10">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sand">
            {BRAND_NAME}
          </div>
          <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
            {EVENT_NAME} Online Registration
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            A simple, mobile-friendly registration page for families joining your community fishing
            event. Share this page link online and each registration will be saved to Supabase for
            easy tracking.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-2xl font-bold">Fast</p>
              <p className="mt-1 text-sm text-slate-200">Parents can sign up in under a minute.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-2xl font-bold">Mobile Ready</p>
              <p className="mt-1 text-sm text-slate-200">Designed to look good on phones and tablets.</p>
            </div>
            <div className="rounded-3xl bg-white/10 p-4">
              <p className="text-2xl font-bold">Organized</p>
              <p className="mt-1 text-sm text-slate-200">Search and export registrations from the admin page.</p>
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-brand-500/25 to-sunrise/20 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-sand/80">What parents will provide</p>
            <ul className="mt-4 grid gap-3 text-sm text-slate-100 sm:grid-cols-2">
              <li>Parent or guardian details</li>
              <li>Child name and age</li>
              <li>Emergency contact information</li>
              <li>Allergy or special-needs notes</li>
              <li>Waiver acceptance</li>
            </ul>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-card backdrop-blur sm:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
              Registration Form
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-lake">
              Reserve a spot for the derby
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fill out the form below. After submitting, you&apos;ll see a confirmation screen right away.
            </p>
          </div>
          <RegistrationForm />
        </div>
      </section>
    </main>
  );
}
