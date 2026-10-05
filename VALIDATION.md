# Validation — updated 2026-09-23

Executed locally on Windows, Node.js 24.19.0, Next.js 16.3.6.

WordPress archive import (2026-09-24): imported 36 relevant published articles from the supplied WXR export and combined them with the six starter guides. News, currency prices, sports, drafts, unrelated topics, and images were excluded. Imported HTML was converted to structured plain text and marked as archive content with a time-sensitive-information notice. Production build generated all 49 pages; lint, typecheck, and six domain tests passed. In the final browser verification, 18 unchanged desktop/mobile scenarios passed, the two new imported-article scenarios passed, and the two association scenarios affected only by updated fixture counts passed after being made data-independent. Direct 390px and 1280px article checks found no horizontal overflow.

Final delivery check (2026-09-23): removed the association search and region controls and retained only the requested introduction above the compact association list. Production build, lint, typecheck, and six domain tests passed. The complete desktop/mobile browser suite passed all 18 scenarios in 16.9 seconds.

Compact content lists: restyled article and association cards as icon/content/action rows based on the supplied examples. Existing content, association URLs, search, filters, and bookmarks are preserved. Lint and production build passed; six focused desktop/mobile browser tests passed (8.5 seconds), covering bookmarks, article navigation/search, and the homepage directory. No horizontal overflow at 360px, 390px, or 1280px; inspected screenshots of both lists at 360px.

Mobile introduction update: replaced the long mobile hero with a configurable short title and search; hid the introductory copy, popular searches, and companion card below 760px. Lint and production build passed. Browser checks passed at 360px, 390px, and 1280px for responsive visibility and horizontal overflow. Visually inspected the refreshed mobile screenshot; the paths section starts at approximately 384px on mobile.

Associations update (2026-09-23): moved the directory to the bottom of the homepage, linked the header to `/#associations`, and removed the standalone page with a permanent redirect. Production build and lint passed. Both focused desktop/mobile browser tests passed (3.4 seconds), covering cross-page header navigation, region/search filtering, empty-state recovery, legacy redirect scrolling, and horizontal overflow.

Calendar update (2026-09-23): production build and lint passed after adding `/events` and renaming the navigation to «المقالات». Four focused desktop/mobile browser checks passed (exit code 0, 6.0 seconds): calendar navigation, exact-date filtering, category filtering, empty states, event details, overflow, and the existing navigation/search flow with its updated label. Earlier full-suite results below refer to the community delivery before this addition. Calendar sample dates are clearly labeled as illustrative, not confirmed events.

| Check                            | Result                                                                                                                      |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `npm run build`                  | Pass; production routes generated                                                                                           |
| `npm run lint`                   | Pass; no warnings/errors                                                                                                    |
| `npm run typecheck`              | Pass                                                                                                                        |
| `npm test`                       | 6 passing domain tests                                                                                                      |
| `npm run test:e2e`               | All 16 scenarios passed in the final full run on 2026-09-23 (14.1 seconds, exit code 0), across desktop and mobile Chromium |
| Production server                | Running at http://127.0.0.1:3000 during delivery                                                                            |
| Dependency audit at installation | 0 reported vulnerabilities                                                                                                  |

Browser tests cover RTL, home navigation, mobile menu, Arabic search and category filtering, empty results, guide navigation, reversible progress, per-path isolation, reload persistence, selected-path reload, reset confirmation, blocked storage, unknown-guide HTTP 404, and horizontal overflow on representative pages. Screenshots of the desktop homepage and mobile journey were visually inspected.

Community checks also cover saved-article persistence/removal, association search and region filtering, local topic creation, replies, likes, reload persistence, deletion, safe text rendering, malformed storage recovery, community filters, and the unconfigured account state. Desktop and mobile community screenshots were visually inspected. The two topic scenarios were rerun successfully on 2026-09-23 after changing the test to locate the community selector by its accessible combobox role; application code did not need a change.

Build and browser tests found and resolved incorrect status codes for unknown guides. Selection URLs now track path switches so reloading keeps the current path. A Windows sandbox incompatibility in the optional test runner was removed by using Node's native TypeScript test support.

Not tested or activated: live WordPress integration, Supabase accounts/database/RLS, Safari/Firefox, real production hosting, or DNS changes. Real Supabase browser-auth and shared-discussion adapters are implemented, with a separate SQL migration and activation instructions in COMMUNITY_SETUP.md. No project URL/public key has been supplied, so live email delivery and two-user authorization tests remain pending; these local tests do not validate the live backend. Six starter guides require editorial review/replacement before public launch. No GitHub remote or production deployment was created.
