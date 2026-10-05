# سودانيين في ألمانيا — Phase 1

Next.js App Router + TypeScript (strict) + Tailwind CSS 4. Arabic-first, RTL, mobile-first. Homepage, four data-driven journeys, device-local progress, Arabic search/category filtering, six starter guides plus 36 filtered WordPress archive articles with bookmarks, an association directory, and topic-based discussion communities. No production WordPress changes. Supabase email login and shared-discussion adapters are implemented but require your project configuration and SQL migration before activation.

## Local development

The navigation label is now «المقالات». `/events` provides a responsive monthly calendar, month navigation, today shortcut, category filters, date selection and event details. Dates/times are presented in Europe/Berlin. Edit `data/events.ts` to add confirmed events and `config/events.ts` to change categories or week labels. The three supplied events are explicitly labeled illustrative samples, not real announcements; replace them before publishing. The calendar does not create bookings, send invitations, or sync with external calendars.

Use Node.js 22.18+ and npm. From this directory:

```sh
npm ci
cp .env.example .env.local
npm run dev
```

On PowerShell use `Copy-Item .env.example .env.local`. Open http://localhost:3000. Fonts are bundled locally via Fontsource; no Google Fonts request is needed. Phase one requires no secrets.

```sh
npm run lint
npm test
npm run build
npm run start
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

Run build before typecheck on a fresh clone to generate Next route types. Browser tests run on desktop and mobile Chromium against a production build. The development/production preview binds to loopback by default. CI also runs these checks.

## Editing the platform

| Location                       | What to edit                                               |
| ------------------------------ | ---------------------------------------------------------- |
| `config/site.ts`               | Brand, hero copy, descriptions                             |
| `config/navigation.ts`         | Navigation links                                           |
| `config/categories.ts`         | Category IDs, labels, icon keys                            |
| `data/journeys/index.ts`       | Paths, stable step IDs, order, descriptions, linked guides |
| `data/guides.ts`               | Starter guide content and imported-guide composition       |
| `data/imported-guides.ts`      | Filtered WordPress articles, stored as safe plain text     |
| `scripts/import-wordpress.ps1` | Repeatable WXR filtering and conversion script             |
| `app/globals.css`              | Shared colors, typography, responsive layout               |
| `components/`                  | Layout, homepage, guide, journey, and UI components        |
| `lib/types.ts`                 | Content, auth and progress contracts                       |

Add a new journey object with a unique `id`, supported `icon`, `title`, `heading`, `description`, `color`, and `steps`. It automatically appears on the homepage and dashboard. Each step needs a stable unique ID and an existing guide slug. Do not rename published step IDs without a storage migration. Run `npm test` to verify references. To add an icon, update the typed icon map in `components/ui/icon.tsx` and `IconName` in `lib/types.ts`. UI-specific microcopy is colocated with its component; reusable branding and all editorial/journey data are outside components.

Progress is stored under `sig:journey:v1` in localStorage, separately per journey. It persists on the same browser, does not sync between devices, and is lost if browser storage is cleared. Invalid/outdated stored records are validated and repaired. If storage is blocked, the UI keeps working in memory and shows a notice. Users can uncheck a step or confirm a reset of the current path.

## Environment variables

| Variable                               | Phase-one behavior                                                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                 | Reserved deployment origin; not used to generate production canonical URLs yet                                     |
| `WORDPRESS_API_URL`                    | Optional future server-only REST base, e.g. `https://cms.example.org/wp-json/wp/v2`; unused until explicitly wired |
| `NEXT_PUBLIC_SUPABASE_URL`             | Supabase project origin; enables shared community when paired with its public key                                  |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable or legacy anon key; never a service-role key                                                           |

Never commit `.env.local`, credentials, service-role keys, or production exports. `.gitignore` preserves only `.env.example`.

## Git and GitHub

The source is ready to push; no GitHub repository is created by this delivery. From the project directory, if Git is not initialized:

```sh
git init -b main
git add .
git commit -m "Build Arabic platform phase one"
git remote add origin https://github.com/YOUR_ACCOUNT/sudanese-in-germany.git
git push -u origin main
```

Create an empty repository first; replace the URL with your own. The lockfile is included. Avoid adding node_modules, .next or browser test output.

## Deployment

Import the repository into a Next.js-compatible provider such as Vercel; use `npm ci` and `npm run build`, with the Next.js framework preset. Alternatively run `npm run build` followed by `npm run start` on a Node host behind a reverse proxy; update the start hostname for that environment if external binding is required. Use a preview domain first. Keep the existing WordPress hosting and DNS unchanged. No production deployment or domain migration is included in phase one.

Before public release: review the starter guides and imported archive articles, verify official references and any legal requirements for the actual operator, add operator-specific legal/privacy pages, and test the real hosting environment. Imported articles are labeled as archive content and remind readers to verify time-sensitive requirements.

## WordPress article import and future connection

The supplied WXR export was filtered into 36 published articles relevant to study, work, medicine, residence, language and everyday life. News, currency prices, sports, drafts and unrelated articles were excluded. HTML was converted to structured plain text; images were intentionally omitted.

To repeat the import from a newer export, run:

```powershell
./scripts/import-wordpress.ps1 -InputPath "C:\path\to\WordPress-export.xml"
```

For a future live connection, keep WordPress on its current host and test REST access first. `lib/wordpress/adapter.ts` is a server-only, GET-only adapter with timeout, response checks and caching. Add pagination, taxonomy/media mapping, canonical URLs, redirects, sanitization and fallback behavior before switching from the reviewed static import. Do not expose WordPress credentials to the browser.

## Communities, associations and accounts

The supplied HTML reference informed bookmarks, topic filters, associations and discussions. Local demo posts are explicitly illustrative, with no invented users, likes or reply counts. Local posting, replies, reversible likes, owner deletion and storage recovery work without accounts. Bookmarks and journeys always remain device-local in this release.

- `/community`: four communities; questions, experiences, tips and discussion topics. Without Supabase, clearly marked local-only mode. With both environment variables, authenticated shared mode with manual refresh and loading older topics.
- `/#associations`: compact directory at the bottom of the homepage with source links. The header's «الجمعيات» link jumps directly here from any page. The standalone page was removed; the old `/associations` URL redirects to this section. Records remain in `data/associations.ts`.
- `/account`: email magic-link sign-in, public display name and sign-out when Supabase is configured. Shows a setup state otherwise.
- `config/community.ts`: labels, community IDs, types and guidelines. `data/discussions.ts`: sample prompts only.

Follow [COMMUNITY_SETUP.md](COMMUNITY_SETUP.md) to activate Supabase. The official browser client uses persisted browser sessions; all database operations are authenticated by Supabase and protected by RLS. There is no server-rendered private session, service-role key, or implicit import of local demo content. `lib/supabase/community-schema.sql` is the independent shared-community migration. `schema.sql` remains an unapplied draft for future journey sync. Add SSR session handling only if introducing private server-rendered pages.

Live email delivery, two-user visibility, and RLS tests require a real configured project and have not been executed without one. Add moderation/reporting and anti-spam controls before a public community launch. The reviewed static WordPress import is complete; live REST synchronization remains a separate future step.

## References

- [Next.js installation and scripts](https://nextjs.org/docs/app/getting-started/installation)
- [Tailwind CSS with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

The retrieved conversation included the visual direction but not the embedded prototype source. This implementation follows its warm neutral/green palette, Arabic typography, clear search, four paths, guide cards and interactive journey concept.
