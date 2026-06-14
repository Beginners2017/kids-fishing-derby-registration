import Link from "next/link";
import { BRAND_NAME, EVENT_NAME } from "@/lib/constants";

export default async function ThankYouPage({
  searchParams
}: {
  searchParams: Promise<{ child?: string }>;
}) {
  const params = await searchParams;
  const childName = params.child?.trim() || "your child";

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/60 bg-white/90 p-8 text-center shadow-card backdrop-blur sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-600">
          {BRAND_NAME}
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-lake">Registration Received</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Thank you for registering <span className="font-semibold text-lake">{childName}</span> for the{" "}
          {EVENT_NAME}. We&apos;ll be in touch with event details if needed.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-lake px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
          href="/"
        >
          Register another child
        </Link>
      </div>
    </main>
  );
}
