/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CCAPC — single source of truth
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything the site renders comes from this file. Fields marked TBD are
 *  genuinely undecided — leave them as TBD until the real value is known
 *  rather than putting a placeholder that reads as fact.
 */

export const site = {
  name: 'CCAPC',
  year: '2026',
  title: 'CCAPC 2026',
  subtitle: "CCA's annual competitive programming contest",
  email: 'TBD',
} as const;

export const contest = {
  /** Difficulty range, stated in the terms competitors actually calibrate on. */
  difficulty: 'Problems range from low USACO Bronze to high USACO Gold.',
  accessibility: 'Two divisions — Beginner and Advanced — so the contest is accessible to everyone.',

  /** Bullets inside the hero card. */
  highlights: [
    'Problems range from low USACO Bronze to high USACO Gold.',
    'Two divisions — Beginner and Advanced — accessible to everyone.',
    'Held in person at Canyon Crest Academy, on Codeforces.',
  ],

  format: 'In person at Canyon Crest Academy',
  platform: 'Codeforces',
  languages: ['Python', 'Java', 'C++'],

  /** Set when the guide PDF exists; until then the button renders disabled. */
  guideUrl: null as string | null,

  /** Set to a real URL to turn on the Register button. */
  registrationUrl: null as string | null,
} as const;

export const divisions = [
  {
    name: 'Beginner',
    accent: 'emerald' as const,
    blurb: 'For competitors new to contest programming.',
    range: 'Roughly low USACO Bronze through Silver.',
  },
  {
    name: 'Advanced',
    accent: 'violet' as const,
    blurb: 'For experienced competitors who want a real challenge.',
    range: 'Roughly USACO Silver through high Gold.',
  },
] as const;

/** Replace with real rows when the day is planned. */
export const schedule = { status: 'TBD' } as const;

/** Replace with real prizes once confirmed. */
export const prizes = { status: 'TBD' } as const;

/** Organizers. Roles render as a comma-separated list after the name. */
export const team = [
  { name: 'Aidan Bai', roles: ['Problem Setter', 'Organizer'] },
  { name: 'Dylan Kim', roles: ['Problem Setter', 'Organizer'] },
  { name: 'William Allen', roles: ['Problem Setter', 'Organizer'] },
  { name: 'Smaran Mukkavilli', roles: ['Problem Setter', 'Organizer'] },
  { name: 'Jake Kuo', roles: ['Problem Setter', 'Organizer'] },
] as const;

export const navLinks = [
  { href: '#details', label: 'Details' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#team', label: 'Team' },
] as const;
