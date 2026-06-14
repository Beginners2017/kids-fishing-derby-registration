import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/auth";
import { BRAND_NAME, EVENT_NAME } from "@/lib/constants";
import { listRegistrations } from "@/lib/registrations";

function formatSubmittedAt(value: string) {
  return new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; error?: string }>;
}) {
  const params = await searchParams;
  const isAuthed = await isAdminAuthenticated();
  const search = params.q?.trim() ?? "";
  const error = params.error?.trim() ?? "";

  if (!isAuthed) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-[2rem] border border-white/60 bg-white/95 p-8 shadow-card">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
            {BRAND_NAME}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-lake">Admin Access</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Enter your private admin access code to view registrations for the {EVENT_NAME}.
          </p>

          {error ? (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              The access code was not accepted. Please try again.
            </div>
          ) : null}

          <form action="/api/admin/login" className="mt-6 space-y-4" method="post">
            <label className="flex flex-col gap-2 text-sm font-medium text-lake" htmlFor="accessKey">
              Admin access code
              <input
                className="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-base text-lake"
                id="accessKey"
                name="accessKey"
                type="password"
              />
            </label>
            <button
              className="inline-flex w-full items-center justify-center rounded-full bg-lake px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
              type="submit"
            >
              Open Admin Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  const registrations = await listRegistrations(search);
  const exportHref = search
    ? `/api/registrations/export?q=${encodeURIComponent(search)}`
    : "/api/registrations/export";

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
              {BRAND_NAME}
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-lake">
              {EVENT_NAME} Registrations
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Search submitted entries and export the current results to CSV.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center rounded-full border border-brand-200 px-5 py-3 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
              href={exportHref}
            >
              Export CSV
            </Link>
            <form action="/api/admin/logout" method="post">
              <button
                className="inline-flex w-full items-center justify-center rounded-full bg-lake px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
                type="submit"
              >
                Log Out
              </button>
            </form>
          </div>
        </div>

        <form action="/admin" className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]" method="get">
          <input
            className="w-full rounded-2xl border border-brand-100 bg-white px-4 py-3 text-base text-lake"
            defaultValue={search}
            name="q"
            placeholder="Search by parent, child, phone, email, or emergency contact"
          />
          <button
            className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            type="submit"
          >
            Search
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-sm text-slate-600">
          <p>{registrations.length} registration(s) shown</p>
          {search ? <p>Filtered by: "{search}"</p> : <p>Showing all registrations</p>}
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-brand-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-brand-100">
              <thead className="bg-brand-50">
                <tr className="text-left text-xs uppercase tracking-[0.16em] text-brand-700">
                  <th className="px-4 py-4">Submitted</th>
                  <th className="px-4 py-4">Parent / Guardian</th>
                  <th className="px-4 py-4">Child</th>
                  <th className="px-4 py-4">Contact</th>
                  <th className="px-4 py-4">Emergency Contact</th>
                  <th className="px-4 py-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100 bg-white">
                {registrations.length === 0 ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-sm text-slate-500" colSpan={6}>
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  registrations.map((registration) => (
                    <tr className="align-top text-sm text-slate-700" key={registration.id}>
                      <td className="px-4 py-4">{formatSubmittedAt(registration.created_at)}</td>
                      <td className="px-4 py-4 font-medium text-lake">
                        {registration.parent_full_name}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-lake">{registration.child_full_name}</div>
                        <div className="mt-1 text-slate-500">Age {registration.child_age}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div>{registration.phone}</div>
                        <div className="mt-1 break-all text-slate-500">{registration.email}</div>
                      </td>
                      <td className="px-4 py-4">
                        <div>{registration.emergency_contact_name}</div>
                        <div className="mt-1 text-slate-500">
                          {registration.emergency_contact_phone}
                        </div>
                      </td>
                      <td className="max-w-xs px-4 py-4 text-slate-600">
                        {registration.notes || "No notes provided"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
