# CCAPC — Canyon Crest Academy Programming Contest

The contest website. Next.js 15 (App Router) + Tailwind CSS 4, exported as a fully
static site so it can be hosted free on GitHub Pages.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site → ./out
```

## Editing content

**Almost everything lives in [`src/data/site.ts`](src/data/site.ts).** Dates, the
registration link, divisions, the schedule, prizes, rules, FAQ, sponsors, staff,
and the past-contest archive are all defined there, and every page reads from it.
For a normal year's update you should not need to touch a component.

Things to change first for a new edition:

| What | Where in `site.ts` |
| --- | --- |
| Contest date & times | `contest.startsAt` / `endsAt` / `dateLabel` / `timeLabel` |
| Registration form link | `contest.registrationUrl` |
| "Registration opens soon" state | `contest.registrationOpen` |
| Contact email & socials | `site.email`, `site.socials` |
| Officers | `team` |
| Sponsors as they sign | `sponsors` |
| Last year's results | `archive` |

`contest.startsAt` drives the homepage countdown, so it must be a real ISO 8601
timestamp with an offset (`-08:00` for PST, `-07:00` for PDT).

Sponsor logos go in `public/sponsors/` and are referenced as `/sponsors/name.svg`.

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
   builds and publishes automatically.

The workflow sets `BASE_PATH` for you: a project repo publishes to
`https://<user>.github.io/<repo>/`, while a repo named `<user>.github.io`
publishes to the domain root with no base path.

### Custom domain (e.g. ccapc.org)

Add the domain under Settings → Pages, then create `public/CNAME` containing just
the domain. A custom domain serves from the root, so also drop the `BASE_PATH`
from the build step in the workflow (use the plain `npm run build` line).

## Notes on the static export

`next.config.mjs` sets `output: 'export'`, which means no API routes, no server
components fetching at request time, no middleware, and no on-demand image
optimization (`images.unoptimized` is on). Nothing on this site needs them —
registration goes to an external form, and the judge is hosted elsewhere.
