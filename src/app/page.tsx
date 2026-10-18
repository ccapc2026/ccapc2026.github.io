import Image from 'next/image';
import {
  asset,
  campusMap,
  contest,
  divisions,
  prizes,
  rules,
  schedule,
  scheduleNote,
  site,
  sponsors,
  team,
  tracks,
} from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <FactStrip />
      <About />
      <Schedule />
      <Rules />
      <Prizes />
      <Sponsors />
      <Team />
    </>
  );
}

/** Section header: a number, a left-aligned title, and a heavy rule under it. */
function Rail({ num, title, lede }: { num: string; title: string; lede?: string }) {
  return (
    <>
      <div className="rail">
        <span className="rail-num">{num}</span>
        <h2 className="section-title">{title}</h2>
      </div>
      {lede && <p className="lede">{lede}</p>}
    </>
  );
}

/** Logo beside the title rather than stacked above it, and everything flush
 *  left — the hero is the clearest place to break from a centred layout. */
function Hero() {
  return (
    <section id="top" className="hero-weave relative overflow-hidden bg-cca-deep text-white">
      <div className="wrap relative py-16 sm:py-20">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-12">
          <span className="shrink-0 rounded-2xl bg-white p-3.5">
            {/* Tight crop: the source art only fills ~76% of its frame, so the
                padded original renders visibly smaller at the same box size. */}
            <Image
              src="/ccapc-logo-tight.webp"
              alt="CCAPC"
              width={1553}
              height={1553}
              priority
              className="h-32 w-auto sm:h-40"
            />
          </span>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-white/65">
              {contest.venue} · {site.year}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Canyon Crest Academy
              <br />
              Programming Contest
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/90">
              A 3.5-hour contest for teams of 1–3, on {contest.platform}. Compete in person at
              CCA or online — problems range from low USACO Bronze to high USACO Gold.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {contest.registrationUrl && (
            <a
              href={contest.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-cca-deep transition-transform hover:-translate-y-0.5"
            >
              Register
            </a>
          )}
          {contest.guideUrl && (
            <a
              href={asset(contest.guideUrl)}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/55 px-6 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:border-white"
            >
              Contest Guide
            </a>
          )}
          <a
            href={contest.discordUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/55 px-6 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:border-white"
          >
            Join Discord
          </a>
          {contest.codeforcesGroupUrl ? (
            <a
              href={contest.codeforcesGroupUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/55 px-6 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 hover:border-white"
            >
              Codeforces Group
            </a>
          ) : (
            <p className="font-mono text-xs text-white/60 sm:ml-2">
              Codeforces group link posted closer to the contest
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/** A dark band of key facts directly under the hero — the page's signature. */
function FactStrip() {
  const facts: [string, string][] = [
    ['Date', contest.date],
    ['Where', `${contest.venue} · or online`],
    ['Judge', contest.platform],
    ['Languages', contest.languagesShort],
  ];
  return (
    <section className="border-b border-rule bg-ink text-white">
      <div className="wrap grid grid-cols-2 gap-x-8 gap-y-6 py-7 lg:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{k}</p>
            <p className="mt-1.5 text-sm font-semibold">{v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Asymmetric: the two tracks take a wide panel, shorter facts stack beside. */
function About() {
  return (
    <section id="about" className="py-20">
      <div className="wrap">
        <Rail num="01" title={`About ${site.name}`} lede={`${contest.difficulty} ${contest.accessibility}`} />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <article className="rounded-xl border-l-4 border-cca-red bg-band p-7">
            <h3 className="font-semibold">Two Ways to Compete</h3>
            <dl className="mt-5 space-y-5">
              {tracks.map((t) => (
                <div key={t.name}>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-cca-deep">{t.name}</dt>
                  <dd className="mt-1.5 text-sm text-ink-soft">
                    <span className="text-ink">{t.blurb}</span> {t.detail}
                    {/* Beginner / Advanced exist online only, so they nest
                        under that track rather than sitting beside it. */}
                    {t.hasDivisions && (
                      <ul className="mt-3 space-y-2 border-l border-rule pl-4">
                        {divisions.map((d) => (
                          <li key={d.name}>
                            <span className="font-semibold text-ink">{d.name}</span> — {d.blurb} {d.range}
                          </li>
                        ))}
                      </ul>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          <div className="grid gap-5">
            <article className="card">
              <h3 className="font-semibold">Format</h3>
              <p className="mt-2 text-sm text-ink-soft">
                3.5 hours, teams of 1–3, in a private {contest.platform} group. Problems are weighted
                equally; standings rank teams by problems solved, with ties broken on penalty.
              </p>
            </article>
            <article className="card">
              <h3 className="font-semibold">What you can use</h3>
              <p className="mt-2 text-sm text-ink-soft">
                {contest.languages}. Pre-written templates and online resources are allowed; AI
                assistance on problems is not.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Full-width table with a red rail, rather than a centred card. */
function Schedule() {
  return (
    <section id="schedule" className="bg-band py-20">
      <div className="wrap">
        <Rail num="02" title="Schedule" lede="All times Pacific" />

        <div className="mt-10 overflow-hidden rounded-xl border border-rule bg-white">
          <table className="w-full text-left">
            <tbody>
              {schedule.map((row, i) => (
                <tr key={row.time} className={i % 2 ? 'bg-band/60' : ''}>
                  <td className="w-2 border-l-4 border-cca-red p-0" aria-hidden />
                  {/* Fixed width on the time column; auto-layout otherwise
                      spreads it and leaves a gulf before the event name. */}
                  <td className="w-52 py-4 pr-6 pl-5 font-mono text-[13px] whitespace-nowrap text-ink-soft">
                    {row.time}
                  </td>
                  <td className="py-4 pr-6 font-semibold">{row.event}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 max-w-2xl text-sm text-ink-soft">
          {scheduleNote} The in-person day runs at {contest.venue}, {contest.address}.
        </p>

        {/* The map is dense, so it opens full size in a new tab for anyone
            reading on a phone. */}
        <figure id="map" className="mt-8 overflow-hidden rounded-xl border border-rule bg-white">
          <a href={asset(campusMap.src)} target="_blank" rel="noreferrer">
            <Image
              src={campusMap.src}
              alt={campusMap.alt}
              width={campusMap.width}
              height={campusMap.height}
              className="h-auto w-full"
            />
          </a>
          <figcaption className="border-t border-rule px-6 py-4 text-sm text-ink-soft">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cca-deep">
              Campus map
            </span>
            <span className="mt-1.5 block">{campusMap.caption}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/** Numbered rules, which reads more like a rulebook than a bulleted list. */
function Rules() {
  return (
    <section id="rules" className="py-20">
      <div className="wrap">
        <Rail num="03" title="Rules" />
        <ol className="mt-10 sm:columns-2 sm:gap-x-12">
          {rules.map((r, i) => (
            <li key={r} className="mb-4 flex break-inside-avoid gap-3 text-sm text-ink-soft">
              <span className="mt-px font-mono text-xs font-bold text-cca-red">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Prizes() {
  return (
    <section id="prizes" className="bg-band py-20">
      <div className="wrap">
        <Rail num="04" title="Prizes" lede={prizes.lede} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {prizes.packages.map((pkg) => (
            <article key={pkg.value} className="rounded-xl border-l-4 border-cca-red bg-white p-7">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-cca-deep">Prize package</p>
              <p className="mt-2 text-3xl font-extrabold tracking-tight">{pkg.value}</p>
              <p className="mt-2 text-sm text-ink-soft">{pkg.detail}</p>
            </article>
          ))}
        </div>

        {/* items-start: the Beginner table has a single row, and stretching it
            to match the others would leave a tall empty card. */}
        <div className="mt-5 grid items-start gap-5 lg:grid-cols-3">
          {prizes.tables.map((t) => (
            <article key={t.title} className="overflow-hidden rounded-xl border border-rule bg-white">
              <div className="border-b border-rule px-6 py-4">
                <h3 className="font-semibold">{t.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                  {t.caption}
                </p>
              </div>
              <dl className="divide-y divide-rule">
                {t.rows.map((r) => (
                  <div key={r.place} className="flex items-baseline justify-between gap-4 px-6 py-3.5">
                    <dt className="font-mono text-[13px] text-ink-soft">{r.place}</dt>
                    <dd className="text-sm font-semibold">{r.package} package</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className="mt-5 max-w-2xl text-sm text-ink-soft">{prizes.note}</p>
      </div>
    </section>
  );
}

function Sponsors() {
  return (
    <section id="sponsors" className="py-20">
      <div className="wrap">
        <Rail num="05" title="Sponsors" />
        <ul className="mt-10 flex flex-wrap gap-4">
          {sponsors.map((sp) => (
            <li key={sp.name}>
              <a
                href={sp.url}
                target="_blank"
                rel="noreferrer sponsored"
                aria-label={`${sp.name} (opens in a new tab)`}
                className="flex min-h-[104px] items-center justify-center rounded-xl border border-rule px-10 py-7 transition-colors hover:border-ink/35 hover:bg-band"
              >
                {'logo' in sp && sp.logo ? (
                  <Image src={sp.logo} alt={sp.name} width={sp.width} height={sp.height} className="h-9 w-auto" />
                ) : (
                  <span className="text-xl font-semibold tracking-tight">{sp.name}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Card grid rather than a list. */
function Team() {
  return (
    <section id="team" className="bg-band py-20">
      <div className="wrap">
        <Rail num="06" title="The Team" lede={`${site.name} is written and run by students at Canyon Crest Academy.`} />

        {/* items-start so a card without a bio is not stretched to match a tall
            neighbour, which left large empty boxes in the grid. */}
        <ul className="mt-10 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="rounded-xl border border-rule bg-white p-5">
              <p className="font-semibold">{m.name}</p>
              <p className="mt-1.5 text-sm text-cca-deep">{m.roles.join(' · ')}</p>
              {'bio' in m && m.bio && (
                <p className="mt-3 border-t border-rule pt-3 text-sm leading-relaxed text-ink-soft">{m.bio}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
