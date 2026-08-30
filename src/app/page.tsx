import Image from 'next/image';
import { Box, BoxGrid } from '@/components/ui';
import { contest, divisions, rules, schedule, scheduleNote, site, team } from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <Boxes />
    </>
  );
}

/**
 * Title card on the left, guide on the right. The card is translucent and
 * lifted off the black with a ring and a shadow, so it reads as raised even
 * before the animated curve lands behind it.
 */
function Hero() {
  return (
    <section className="relative px-5 py-20 sm:px-10 sm:py-28 lg:px-14">
      <div className="mx-auto grid max-w-[88rem] items-stretch gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="glass p-10 shadow-2xl shadow-black/60 ring-1 ring-white/5 sm:p-16">
          {/* Black artwork needs a light ground, so it gets a panel of its own. */}
          <div className="mb-10 inline-flex rounded-2xl bg-white p-5 sm:p-6">
            <Image
              src="/ccapc-logo.webp"
              alt="CCAPC"
              width={756}
              height={756}
              priority
              className="h-24 w-auto sm:h-28"
            />
          </div>

          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">{site.title}</h1>
          <p className="mt-5 text-xl font-medium text-white/80 sm:text-2xl">{site.subtitle}</p>

          <ul className="mt-12 space-y-7">
            {contest.highlights.map((h) => (
              <li key={h} className="flex items-start gap-4">
                <Check />
                <span className="text-base leading-relaxed text-white/70 sm:text-lg">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <GuideCard />
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="mt-1 h-5 w-5 shrink-0 text-white/70"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12.5l5.5 5.5L20 6" />
    </svg>
  );
}

function GuideCard() {
  const enabled = Boolean(contest.guideUrl);

  /* A circle wants a short label, so the explanation sits outside it. */
  const circle = (
    <span
      className={`grid aspect-square w-52 place-items-center rounded-full text-center transition-transform ${
        enabled
          ? 'bg-cca-red text-white shadow-lg shadow-cca-red/25 hover:scale-[1.04]'
          : 'cursor-not-allowed border border-dashed border-white/20 text-white/30'
      }`}
    >
      <span className="px-4">
        <span className="block text-sm font-semibold leading-tight">Contest guide</span>
        <span className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] ${enabled ? 'text-white/70' : 'text-white/25'}`}>
          {enabled ? 'Download' : 'Coming soon'}
        </span>
      </span>
    </span>
  );

  return (
    <aside className="glass flex flex-col items-center justify-center p-9 text-center sm:p-10 shadow-2xl shadow-black/60 ring-1 ring-white/5">
      {enabled ? (
        <a href={contest.guideUrl!} target="_blank" rel="noreferrer" className="rounded-full">
          {circle}
        </a>
      ) : (
        <span aria-disabled="true">{circle}</span>
      )}

      <p className="mt-8 text-sm leading-relaxed text-white/50">
        Everything you need to know before contest day — format, what to bring, and how the judge works.
      </p>
    </aside>
  );
}

/**
 * The tiled box layout: divisions paired across the top, contest details full
 * width beneath them, then schedule and prizes paired again.
 */
function Boxes() {
  return (
    <BoxGrid className="pb-32">
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
        {divisions.map((d) => (
          <Box key={d.name} eyebrow="Division" title={d.name}>
            <p className="text-white">{d.blurb}</p>
            <p className="mt-3 text-sm text-white/40">{d.range}</p>
          </Box>
        ))}
      </div>

      <Box id="details" eyebrow="Contest" title="Details">
        <dl className="divide-y divide-white/10">
          {(
            [
              ['Date', contest.date],
              ['Venue', `${contest.venue} — ${contest.address}`],
              ['Format', contest.format],
              ['Platform', contest.platform],
              ['Languages', contest.languages.join(', ')],
              ['Divisions', divisions.map((d) => d.name).join(' \u00b7 ')],
              ['Teams', 'Up to 3 people'],
              ['Problems', '12 per division'],
            ] as [string, string][]
          ).map(([label, value], i) => (
            <div key={label} className={`flex flex-wrap gap-x-10 gap-y-1 py-4 ${i === 0 ? 'pt-0' : ''}`}>
              <dt className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-white/35">
                {label}
              </dt>
              <dd className="text-white">{value}</dd>
            </div>
          ))}
        </dl>
      </Box>

      <Box id="rules" eyebrow="Before you compete" title="Rules">
        {/* Multi-column flow rather than a grid: rows in a 2-col grid size to
            their tallest item, which left ragged gaps between rules. */}
        <ul className="sm:columns-2 sm:gap-x-12">
          {rules.map((r) => (
            <li key={r} className="mb-3 flex break-inside-avoid gap-3 text-white/70">
              <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
              <span className="leading-relaxed">{r}</span>
            </li>
          ))}
        </ul>
      </Box>

      <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
        <Box id="schedule" eyebrow="Contest day" title="Schedule">
          <p className="mb-6 text-sm text-white/40">Tentative · all times Pacific</p>
          <table className="w-full border-collapse text-left">
            <tbody>
              {schedule.map((row) => (
                <tr key={row.time} className="border-b border-white/10 last:border-0">
                  <td className="py-3 pr-6 align-top font-mono text-sm whitespace-nowrap text-white/60">
                    {row.time}
                  </td>
                  <td className="py-3 align-top text-white">{row.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-sm text-white/50">{scheduleNote}</p>
          <p className="mt-3 text-sm text-white/40">
            The Codeforces group link will be posted closer to the contest. Join the{' '}
            <a
              href={contest.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 underline underline-offset-4 hover:text-white"
            >
              Discord
            </a>{' '}
            for questions and announcements.
          </p>
        </Box>
        <Box id="prizes" eyebrow="Awards" title="Prizes">
          <Tbd>Prize details will be announced closer to the contest.</Tbd>
        </Box>
      </div>
      <Box id="team" eyebrow="Organizers" title="The Team">
        <p className="mb-8 max-w-2xl leading-relaxed text-white/50">
          CCAPC is written and run by students at Canyon Crest Academy.
        </p>
        <ul className="space-y-4">
          {team.map((m) => (
            <li key={m.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-semibold text-white">{m.name}</span>
              <span aria-hidden className="text-white/20">
                |
              </span>
              <span className="italic text-white/55">{m.roles.join(', ')}</span>
            </li>
          ))}
        </ul>
      </Box>
    </BoxGrid>
  );
}

/** Shared empty state, so an unfinished section reads as intentional. */
function Tbd({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <span className="rounded-md border border-white/15 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.15em] text-white/50">
        TBD
      </span>
      <p className="text-white/50">{children}</p>
    </div>
  );
}
