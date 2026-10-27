# N Siva Bhadra · Personal portfolio

A custom single-page portfolio in React, TypeScript, Vite, and Motion. Dark editorial typography, lime accents, original CSS/SVG project artwork, a wireframe orbital hero, and responsive layouts. Personal information is sourced from the supplied resume.

## Run locally

Use Node 22.12+ (Node 24 also works).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally http://127.0.0.1:5173. If a server is already running, Vite chooses the next available port.

```sh
npm run build       # TypeScript validation + production build in dist/
npm run preview     # Serve dist/ on http://127.0.0.1:4173
npm run check       # TypeScript validation
npm run format      # Format source files
```

## Make it yours

- `src/content.ts`: name, biography, role, headline, projects, technology groups, employment, education, certifications, and links.
- `src/App.tsx`: navigation, hero, original artwork, project detail dialog, portfolio sections, and contact interactions.
- `src/Interactions.tsx`: custom pointer, spring-following ring, scroll reveals, and card tilt with listener cleanup.
- `src/styles.css`: design tokens, self-hosted fonts, orbital artwork, layouts, and motion/accessibility breakpoints.
- `public/resume.pdf`: the public copy of the supplied resume.
- `index.html`: title, description, and social metadata. Update these alongside major content changes.
- `public/social-preview.png`, `social-preview.svg`, `favicon.svg`: social artwork and monogram.
- `netlify.toml`: build, publish directory, asset caching, and response headers.

The artwork represents the subject of each project. It is not a screenshot of a shipped product. Null demo/repository values never render fake links. Add each actual project URL in `src/content.ts` when available.

### Information still needed

1. Start/end dates for the Miebach Consulting position; the resume does not include dates.
2. Direct repository and live-demo URLs for the three projects, if public.
3. Optional actual project screenshots, certification dates/credential URLs, and a portrait.

The resume includes a telephone number and email. Publishing `public/resume.pdf` makes the complete document publicly accessible. Replace it with a public-safe copy if desired. The site itself uses email and professional-profile links; it has no backend or form that collects visitor messages.

## Interactions and accessibility

- Fine pointers: direct pointer dot, spring ring, contextual project label, background spotlight, restrained card tilt. Native cursor remains visible.
- Touch: pointer tracking and tilt are disabled; project details open with a tap.
- Scroll: native anchors, top progress line, section reveals, active navigation, and back-to-top link. No scroll hijacking.
- Reduced motion: transforms, reveal entrances, marquee movement, smooth scrolling, and pointer effects are disabled as appropriate.
- Native modal dialog traps focus, closes with Escape/backdrop/close button, and returns focus to the trigger.
- Semantic sections, heading hierarchy, skip link, visible focus, menu state, real resume view/download, mailto links, and copy-email feedback.
- Fonts are self-hosted. No font service, paid API, video, WebGL, analytics, or runtime backend.

## Browser checks

Google Chrome must be installed for these scripts (or adapt the launch channel/path in the scripts).

```sh
# Start the dev server first. The checks default to port 5174.
# PowerShell:
$env:TEST_URL = 'http://127.0.0.1:5173'
npm run test:browser

# For Lighthouse, build and start npm run preview in a second terminal.
$env:TEST_URL = 'http://127.0.0.1:4173'
npm run test:performance
```

The browser checks exercise widths 320, 390, 768, 1024, 1440, and 1920; page overflow; project dialogs; focus restoration; mobile menus; hash destinations; resume availability; reduced motion; fine-pointer behavior; console errors; and axe WCAG checks on mobile/desktop. Lighthouse audits the production build using its mobile profile. Test results and screenshots go to ignored `qa/`; they are not deployed. These automated checks complement, rather than replace, real Safari/Firefox and assistive-technology testing.

## Publish for free with Netlify

The site is prepared for deployment; it is not live yet. A Netlify account is required. No secret or hosting token is stored in this project.

### Quick manual deployment (no GitHub required)

1. Confirm the resume is suitable for public download and fill any desired missing details above.
2. Run `npm ci`, then `npm run build`.
3. Sign in to [Netlify](https://app.netlify.com/) and choose **Add new project → Deploy manually**, or open [Netlify Drop](https://app.netlify.com/drop).
4. Drag the **dist folder**, which contains the built `index.html` and assets, into the upload area. Do not upload the source folder or `node_modules`.
5. Review the preview. If the project starts private, choose **Publish** when ready to expose it publicly.
6. Use the supplied `netlify.app` address. Rename the site in its settings if desired. A purchased custom domain is optional.
7. To update it, rebuild and upload the new `dist` folder on the project's Deploys page.

### Git-connected deployment (automatic updates)

1. Create a GitHub repository and push the project. Exclude `node_modules`, `dist`, `.env*`, and `qa` using the supplied `.gitignore`. Include the public resume only if intended for sharing.
2. In Netlify choose **Add new project → Import an existing project → GitHub** and authorize the selected repository.
3. Select the production branch, build command `npm run build`, publish directory `dist`, and Node 22. `netlify.toml` supplies these values.
4. Deploy, inspect the preview, and publish. Subsequent pushes rebuild automatically.

This is a single page with hash anchors; it needs no client-side routing rewrite. Unknown paths use the host's normal 404 response. Never configure an unnecessary catch-all that serves HTML in place of missing PDFs/assets.

For a consistent deployment configuration and security/cache headers, prefer Git-connected deployment, which reads `netlify.toml`.

### Free-tier limits and social sharing

Checked October 28, 2026: [Netlify's Free plan](https://www.netlify.com/pricing/) is $0 with 300 monthly credits. Its listed usage rates are 15 credits per production deployment, 20 per GB of bandwidth, and 2 per 10,000 web requests. Preview deployments are unlimited, but traffic and deploys still need to fit the plan. Keep the project on the Free plan and inspect usage before frequent production deployments. Requirements and limits may change; consult [Netlify deployment documentation](https://docs.netlify.com/deploy/create-deploys/).

After you have a public domain, set an absolute `og:image` URL in `index.html`, add `og:url` and a canonical URL with that domain, and rebuild. The current relative image path works locally but some social crawlers require an absolute address. A sitemap can also be added once the real public URL exists.
