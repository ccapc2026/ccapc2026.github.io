import { contest, site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="bg-cca-deep text-white/85">
      <div className="wrap flex flex-wrap justify-between gap-3 py-8 text-sm">
        <p>
          © {new Date().getFullYear()} {site.name} · Canyon Crest Academy
        </p>
        <a href={contest.discordUrl} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
          Discord
        </a>
      </div>
    </footer>
  );
}
