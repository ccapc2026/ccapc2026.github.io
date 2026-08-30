import { contest, site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 font-mono text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.title} · Canyon Crest Academy
        </p>
        <p>{contest.format}</p>
      </div>
    </footer>
  );
}
