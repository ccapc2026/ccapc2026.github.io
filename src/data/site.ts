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
  accessibility: 'Compete in person or online, with Beginner and Advanced divisions online so the contest is accessible to everyone.',

  /** Bullets inside the hero card. */
  highlights: [
    'Problems range from low USACO Bronze to high USACO Gold.',
    'Compete in person at Canyon Crest Academy or online.',
    'Teams of 1–3, on Codeforces.',
  ],

  format: 'In person at Canyon Crest Academy, or online',
  platform: 'Codeforces',
  /* Codeforces' own list is long and changes over time, so state the rule
     rather than pinning a snapshot of it here. */
  languages: 'All coding languages supported by Codeforces',
  languagesShort: 'All coding languages supported by Codeforces',

  date: 'October 18, 2026',
  venue: 'Canyon Crest Academy',
  address: '5951 Village Center Loop Road, San Diego, CA 92130',
  /** Check-in is outdoors; the opening ceremony and contest are in C205. */
  checkIn: 'The CCA side entrance',
  room: 'Room C205' as string | null,

  discordUrl: 'https://discord.gg/qDF68NdgCS',
  codeforcesGroupUrl: 'https://codeforces.com/group/pzg20FJ2vN/' as string | null,

  /** Set when the guide PDF exists; until then the button renders disabled. */
  guideUrl: '/ccapc-2026-contest-guide.pdf' as string | null,

  /** Set to a real URL to turn on the Register button. */
  registrationUrl: 'https://forms.gle/WRrfYEzTNSofF8eQA' as string | null,
} as const;

/**
 * The Beginner / Advanced split applies to the ONLINE contest only — every
 * in-person team competes in one combined division. `tracks` renders the
 * outer choice; `divisions` renders the online sub-choice beneath it.
 */
export const tracks = [
  {
    name: 'In person',
    hasDivisions: false,
    blurb: 'One combined division for all in-person teams.',
    detail: 'At Canyon Crest Academy. Check in at the CCA side entrance; the opening ceremony and contest are in Room C205.',
  },
  {
    name: 'Online',
    hasDivisions: true,
    blurb: 'Two separate divisions, chosen at registration.',
    detail: null as string | null,
  },
] as const;

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

/** Day-of schedule, Pacific Time. Everything but the contest is in person. */
export const schedule = [
  { time: '8:30am – 9:00am', event: 'Check in · CCA side entrance' },
  { time: '9:00am – 9:30am', event: 'Opening ceremony · Room C205' },
  { time: '9:30am – 1:00pm', event: 'Contest' },
  { time: '1:00pm – 2:00pm', event: 'Lunch' },
  { time: '2:00pm – 3:00pm', event: 'Solutions discussion, programming Kahoot and 1v1 tournament' },
  { time: '3:00pm – 3:30pm', event: 'Closing ceremony and awards' },
] as const;

/** Shown under the schedule table. */
export const scheduleNote =
  'The contest itself runs 9:30am – 1:00pm; online teams compete during the same window.';

/**
 * Day-of notice pinned above the nav. Set `active: false` after the contest
 * — everything else here outlives the banner.
 */
export const notice = {
  active: true,
  headline: 'Check-in has moved to the CCA side entrance',
  /** Phones get the short form; the sticky header has to stay small. */
  headlineShort: 'Check-in: CCA side entrance',
  detail: 'Not the Administration Building. The map still shows the old spot.',
  href: '#map',
  cta: 'See the map',
} as const;

/**
 * Campus map from the participant guide. `next/image` prefixes basePath on
 * its own; a plain href to the same file does not, hence `asset()`.
 */
export const campusMap = {
  src: '/cca-campus-map.webp',
  width: 1431,
  height: 818,
  alt:
    'Canyon Crest Academy campus map, marked up by the organizers. A heavy hand-drawn loop sits over the P2 parking lot at the top with a line running down past Building C. The map also marks the opening ceremony and contest in Building C, lunch at the lunch tables on the left, and the closing ceremony at the Learning Commons on the right. Check-in is at the side entrance, not at the building the map marks.',
  caption:
    'Check in at the CCA side entrance — this has moved since the map was drawn, so ignore its check-in marker — then head to Room C205 in Building C for the opening ceremony and the contest. Lunch is at the lunch tables; the closing ceremony is in the Learning Commons.',
} as const;

/** Prefixes a /public path with the deployment's basePath, if any. */
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;

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

/**
 * Prizes are Devin subscriptions and credits, not cash, and the package is
 * awarded to EACH member of a winning team rather than split across it.
 */
export const prizes = {
  lede:
    'Prizes are awarded as Devin subscriptions and credits rather than cash. Each member of a winning team receives the package individually.',
  packages: [
    { value: '$3,000', detail: '12 months of Devin + $600 in Devin credits' },
    { value: '$500', detail: '2 months of Devin + $100 in Devin credits' },
  ],
  tables: [
    {
      title: 'In person',
      caption: 'All in-person teams',
      rows: [
        { place: '1st', package: '$3,000' },
        { place: '2nd – 5th', package: '$500' },
      ],
    },
    {
      title: 'Online · Beginner',
      caption: 'Online teams in Beginner',
      rows: [{ place: '1st', package: '$500' }],
    },
    {
      title: 'Online · Advanced',
      caption: 'Online teams in Advanced',
      rows: [
        { place: '1st', package: '$3,000' },
        { place: '2nd', package: '$500' },
      ],
    },
  ],
  note: 'Medals also go to every member of the top 6 in-person teams.',
} as const;

/** Organizers. Roles render as a comma-separated list after the name. */
/** `bio` is optional — members without one render name and roles only. */
export const team = [
  {
    name: 'Aidan Bai',
    roles: ['Founder', 'Problem Setter', 'Organizer'],
    bio:
      'Aidan is a senior at CCA. He has been part of the CCA Programming and Problem Solving Club since freshman year and enjoys doing competitive programming problems. He is in the USACO Platinum division and has a peak rating of 2026 on Codeforces. Outside of coding, he also likes solving the Rubik’s Cube and playing ice hockey.',
  },
  {
    name: 'Dylan Kim',
    roles: ['Co-Founder', 'Problem Setter', 'Organizer'],
    bio:
      'Dylan is a senior at CCA. He started competitive programming in 9th grade and is currently competing in the USACO Gold division and is an Expert on Codeforces. Outside of programming, he enjoys playing the clarinet and watching baseball.',
  },
  {
    name: 'William Allen',
    roles: ['Problem Setter', 'Organizer'],
    bio: 'William is a sophomore at CCA. He is in the USACO silver division. Outside of programming he enjoys playing video games and some competitive math.',
  },
  {
    name: 'Smaran Mukkavilli',
    roles: ['Problem Setter', 'Organizer', 'Website Developer'],
    bio:
      'Smaran is a sophomore at CCA and has been interested in coding from a young age. He is in the USACO Silver division. Outside of the USACO series, he enjoys competing in college competitions like CALICO and MITIT. Smaran’s favorite areas of coding are number theory and greedy algorithms. Aside from coding, he enjoys math, guitar, and chess.',
  },
  { name: 'Jake Kuo', roles: ['Problem Setter', 'Organizer'] },
] as const;

/** `logo` is a path under /public; without one the name renders as text. */
export const sponsors = [
  { name: 'Cognition', logo: '/cognition.webp', width: 548, height: 119, url: 'https://cognition.ai' },
] as const;

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#rules', label: 'Rules' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#team', label: 'Team' },
] as const;
