import Image from 'next/image';
import { contest, divisions, rules, schedule, scheduleNote, site, team } from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Schedule />
      <Rules />
      <Prizes />
      <Team />
    </>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-weave relative overflow-hidden bg-cca-deep py-20 text-center text-white">
      <div className="wrap relative">
        <span className="mb-7 inline-flex rounded-2xl bg-white p-4">
          <Image src="/ccapc-logo.webp" alt="CCAPC" width={756} height={756} priority className="h-[72px] w-auto" />
        </span>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Canyon Crest Academy
          <br />
          Programming Contest
        </h1>

        <p className="mt-5 font-mono text-sm text-white/85">
          {contest.date} &nbsp;·&nbsp; {contest.venue}, San Diego
        </p>
        <p className="mt-3 text-lg text-white/95">
          A 3.5-hour team contest on {contest.platform}. Two divisions, 12 problems each.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {contest.guideUrl && (
            <a
              href={contest.guideUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white bg-white px-6 py-2.5 text-sm font-semibold text-cca-deep transition-transform hover:-translate-y-0.5"
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
        </div>

        <p className="mt-5 font-mono text-xs text-white/70">
          {contest.codeforcesGroupUrl
            ? 'Codeforces group is open — join before the contest starts.'
            : 'Codeforces group link will be posted closer to the contest'}
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20">
      <div className="wrap">
        <h2 className="section-title">About {site.name}</h2>
        <p className="lede">
          {contest.difficulty} {contest.accessibility}
        </p>

        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="card">
            <span className="font-mono text-lg font-bold text-cca-red">&lt;/&gt;</span>
            <h3 className="mt-3 font-semibold">Format</h3>
            <p className="mt-2 text-sm text-ink-soft">
              3.5 hours, teams of up to 3, hosted in a private {contest.platform} group. 12 problems per division,
              weighted equally, ranked by penalty.
            </p>
          </article>

          <article className="card">
            <span className="font-mono text-lg font-bold text-cca-red">2×</span>
            <h3 className="mt-3 font-semibold">Two Divisions</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-soft">
              {divisions.map((d) => (
                <li key={d.name}>
                  <span className="font-semibold text-ink">{d.name}:</span> {d.range.replace(/^Recommended for /, '')}
                </li>
              ))}
            </ul>
          </article>

          <article className="card">
            <span className="font-mono text-lg font-bold text-cca-red">{'{ }'}</span>
            <h3 className="mt-3 font-semibold">Languages</h3>
            <p className="mt-2 text-sm text-ink-soft">
              {contest.languages.join(', ')}. Pre-written templates are allowed, and internet access is permitted
              during the round.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="bg-band py-20">
      <div className="wrap">
        <h2 className="section-title">Schedule</h2>

        <div className="mx-auto mt-11 max-w-xl rounded-xl border border-rule bg-white p-7">
          <h3 className="font-semibold text-cca-deep">Contest Day</h3>
          <p className="mt-1 font-mono text-xs text-ink-soft">Tentative · all times Pacific</p>

          <ol className="mt-6">
            {schedule.map((row) => (
              <li key={row.time} className="grid grid-cols-[7.5rem_auto_1fr] items-start gap-3 py-2.5 sm:grid-cols-[9rem_auto_1fr]">
                <span className="text-right font-mono text-[13px] text-ink-soft">{row.time}</span>
                <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-cca-red" />
                <span className="text-sm font-semibold">{row.event}</span>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm text-ink-soft">
            {scheduleNote} Held in person at {contest.venue}, {contest.address}.
          </p>
        </div>
      </div>
    </section>
  );
}

function Rules() {
  return (
    <section id="rules" className="py-20">
      <div className="wrap">
        <h2 className="section-title">Rules</h2>
        {/* Column flow rather than a grid: grid rows size to their tallest item
            and leave ragged gaps between rules. */}
        <ul className="mt-10 sm:columns-2 sm:gap-x-10">
          {rules.map((r) => (
            <li key={r} className="mb-3 flex break-inside-avoid gap-2.5 text-sm text-ink-soft">
              <span aria-hidden className="text-cca-red">
                ▸
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Prizes() {
  return (
    <section id="prizes" className="bg-band py-20">
      <div className="wrap text-center">
        <h2 className="section-title">Prizes</h2>
        <p className="mt-6">
          <span className="inline-block rounded border border-cca-deep/35 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-cca-deep">
            TBD
          </span>
        </p>
        <p className="lede mt-5">Prize details will be announced closer to the contest.</p>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="py-20">
      <div className="wrap">
        <h2 className="section-title">The Team</h2>
        <p className="lede">{site.name} is written and run by students at Canyon Crest Academy.</p>

        <ul className="mx-auto mt-10 max-w-xl">
          {team.map((m) => (
            <li key={m.name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-rule py-3 last:border-0">
              <span aria-hidden className="text-cca-red">
                ▸
              </span>
              <span className="font-semibold">{m.name}</span>
              <span className="text-sm italic text-ink-soft">{m.roles.join(', ')}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
