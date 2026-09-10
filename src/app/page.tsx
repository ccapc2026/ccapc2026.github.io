import Image from 'next/image';
import { contest, divisions, rules, schedule, scheduleNote, site, team } from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <FactStrip />
      <About />
      <Schedule />
      <Rules />
      <Prizes />
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
            <Image
              src="/ccapc-logo.webp"
              alt="CCAPC"
              width={756}
              height={756}
              priority
              className="h-28 w-auto sm:h-32"
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
              A 3.5-hour team contest on {contest.platform}. Two divisions, 12 problems each —
              from low USACO Bronze to high USACO Gold.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {contest.guideUrl && (
            <a
              href={contest.guideUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-cca-deep transition-transform hover:-translate-y-0.5"
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
          <p className="font-mono text-xs text-white/60 sm:ml-2">
            {contest.codeforcesGroupUrl
              ? 'Codeforces group is open'
              : 'Codeforces group link posted closer to the contest'}
          </p>
        </div>
      </div>
    </section>
  );
}

/** A dark band of key facts directly under the hero — the page's signature. */
function FactStrip() {
  const facts: [string, string][] = [
    ['Date', contest.date],
    ['Where', `${contest.venue}, San Diego`],
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

/** Asymmetric: divisions take a wide panel, the two shorter facts stack beside. */
function About() {
  return (
    <section id="about" className="py-20">
      <div className="wrap">
        <Rail num="01" title={`About ${site.name}`} lede={`${contest.difficulty} ${contest.accessibility}`} />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <article className="rounded-xl border-l-4 border-cca-red bg-band p-7">
            <h3 className="font-semibold">Two Divisions</h3>
            <dl className="mt-5 space-y-5">
              {divisions.map((d) => (
                <div key={d.name}>
                  <dt className="font-mono text-xs uppercase tracking-[0.16em] text-cca-deep">{d.name}</dt>
                  <dd className="mt-1.5 text-sm text-ink-soft">
                    <span className="text-ink">{d.blurb}</span> {d.range}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          <div className="grid gap-5">
            <article className="card">
              <h3 className="font-semibold">Format</h3>
              <p className="mt-2 text-sm text-ink-soft">
                3.5 hours, teams of up to 3, in a private {contest.platform} group. 12 problems per division,
                weighted equally and ranked by penalty.
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
        <Rail num="02" title="Schedule" lede="Tentative · all times Pacific" />

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
          {scheduleNote} Held in person at {contest.venue}, {contest.address}.
        </p>
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
        <Rail num="04" title="Prizes" />
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="rounded border border-cca-deep/35 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-cca-deep">
            TBD
          </span>
          <p className="text-ink-soft">Prize details will be announced closer to the contest.</p>
        </div>
      </div>
    </section>
  );
}

/** Card grid rather than a list. */
function Team() {
  return (
    <section id="team" className="py-20">
      <div className="wrap">
        <Rail num="05" title="The Team" lede={`${site.name} is written and run by students at Canyon Crest Academy.`} />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <li key={m.name} className="rounded-xl border border-rule p-5">
              <p className="font-semibold">{m.name}</p>
              <p className="mt-1.5 text-sm text-ink-soft">{m.roles.join(' · ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
