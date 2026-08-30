import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 py-24 sm:px-8">
      <div className="glass w-full max-w-lg px-8 py-14 text-center sm:px-12">
        <p className="font-mono text-sm text-cca-red">404 · WRONG ANSWER</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">This page does not compile</h1>
        <p className="mt-4 text-white/50">No penalty for a wrong submission — head back and try another.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-xl bg-cca-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cca-red/90"
        >
          Back to the homepage
        </Link>
      </div>
    </section>
  );
}
