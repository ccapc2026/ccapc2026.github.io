'use client';

import { useState } from 'react';
import { contest, navLinks, site } from '@/data/site';

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-cca-deep text-white">
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
          {contest.guideUrl && (
            <a
              href={contest.guideUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-1 rounded bg-white px-3 py-1 text-[13px] font-semibold text-cca-deep transition-colors hover:bg-white/90"
            >
              Guide
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
