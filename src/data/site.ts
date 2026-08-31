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
  /* Codeforces' own list is long and changes over time, so state the rule
     rather than pinning a snapshot of it here. */
  languages: 'Any language supported by Codeforces',
  languagesShort: 'All Codeforces languages',

  date: 'October 17, 2026',
  venue: 'Canyon Crest Academy',
  address: '5951 Village Center Loop Road, San Diego, CA 92130',
  /** Room is not announced yet. */
  room: null as string | null,

  discordUrl: 'https://discord.gg/Gf5M4JFxEY',
  /** Posted closer to the contest. */
  codeforcesGroupUrl: null as string | null,

  /** Set when the guide PDF exists; until then the button renders disabled. */
  guideUrl: '/ccapc-2026-contest-guide.pdf' as string | null,

  /** Set to a real URL to turn on the Register button. */
  registrationUrl: null as string | null,
} as const;

export const divisions = [
  {
    name: 'Beginner',
    accent: 'emerald' as const,
    blurb: 'For competitors new to contest programming.',
    range: 'Recommended for everyone else.',
  },
  {
    name: 'Advanced',
    accent: 'violet' as const,
    blurb: 'For experienced competitors who want a real challenge.',
    range: 'Recommended for Codeforces 1500+ / high USACO Silver and above.',
  },
] as const;

/** Tentative day-of schedule, Pacific Time. */
export const schedule = [
  { time: '8:15am – 9:15am', event: 'Check In / Opening Ceremony' },
  { time: '9:15am – 12:45pm', event: 'Contest' },
  { time: '12:45pm – 1:45pm', event: 'Lunch' },
  { time: '1:45pm – 2:45pm', event: 'Activities' },
  { time: '2:45pm – 3:15pm', event: 'Closing' },
] as const;

/** Shown under the schedule table. */
export const scheduleNote = 'The actual contest is from 9:15am – 12:45pm.';

export const rules = [
  'Internet usage is allowed — you may look at helpful resources online.',
  'Pre-written code (templates) are allowed.',
  'You may copy code from the internet that was written prior to the start of the competition.',
  'Teams of up to 3 are allowed.',
  'The AI policy is adopted from Codeforces.',
  'No using AI to help on problems in any way, besides autocomplete and translation between spoken languages (not programming languages).',
  'No communicating with other teams during the competition to gain an advantage.',
  'You may communicate within your own team and share code.',
  'All submissions must be made during the 3.5 hour window.',
  'In the case of technical issues, please contact an organizer.',
  'Use common sense.',
  'Breaking rules may result in disqualification.',
] as const;

/** Replace with real prizes once confirmed. */
export const prizes = { status: 'TBD' } as const;

/** Organizers. Roles render as a comma-separated list after the name. */
export const team = [
  { name: 'Aidan Bai', roles: ['Founder', 'Problem Setter', 'Organizer'] },
  { name: 'Dylan Kim', roles: ['Problem Setter', 'Organizer'] },
  { name: 'William Allen', roles: ['Problem Setter', 'Organizer'] },
  { name: 'Smaran Mukkavilli', roles: ['Problem Setter', 'Organizer', 'Website Developer'] },
  { name: 'Jake Kuo', roles: ['Problem Setter', 'Organizer'] },
] as const;

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#rules', label: 'Rules' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#team', label: 'Team' },
] as const;
