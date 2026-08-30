import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="wrap text-center">
        <p className="font-mono text-sm text-cca-red">404 · WRONG ANSWER</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight">This page does not compile</h1>
        <p className="mt-4 text-ink-soft">No penalty for a wrong submission — head back and try another.</p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-cca-deep px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
