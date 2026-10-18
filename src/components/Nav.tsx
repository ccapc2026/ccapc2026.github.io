'use client';

import { useState } from 'react';
import { contest, navLinks, notice, site } from '@/data/site';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-cca-deep text-white">
      {/* Day-of notice rides inside the sticky header so it cannot be
          scrolled past — amber because the red band is the site's own colour
          and would read as decoration. */}
      {notice.active && (
        <div className="bg-amber-300 text-ink">
          <a href={notice.href} className="wrap flex flex-wrap items-center gap-x-3 gap-y-1 py-3">
            <span className="rounded bg-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">
              Update
            </span>
            <span className="text-base font-bold sm:hidden">{notice.headlineShort}</span>
            <span className="hidden text-base font-bold sm:inline sm:text-lg">{notice.headline}</span>
            <span className="hidden text-sm text-ink/75 sm:inline">{notice.detail}</span>
            <span className="text-sm font-semibold underline underline-offset-4">
              {notice.cta} →
            </span>
          </a>
        </div>
      )}

      <div className="wrap flex min-h-12 flex-wrap items-center gap-x-6 gap-y-2 py-2">
        <a href="#top" className="mr-auto text-sm font-bold tracking-tight">
          {site.title}
        </a>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Sections">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded px-2.5 py-1 text-[13px] text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          {contest.registrationUrl && (
            <a
              href={contest.registrationUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-1 rounded bg-white px-3 py-1 text-[13px] font-semibold text-cca-deep transition-colors hover:bg-white/90"
            >
              Register
            </a>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="rounded border border-white/40 px-2 py-1 text-xs sm:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/20 sm:hidden" aria-label="Sections">
          <div className="wrap py-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-2.5 text-sm text-white/85 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
