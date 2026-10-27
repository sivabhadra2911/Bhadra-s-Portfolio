# Verification · October 28, 2026

The final production build passed `npm run build` (TypeScript + Vite). The test suite ran against that build at `http://127.0.0.1:4173`.

## Measured Lighthouse mobile result

| Category | Score |
| --- | ---: |
| Performance | 97 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

First Contentful Paint: 1.9 s. Largest Contentful Paint: 2.0 s. Cumulative Layout Shift: 0.

These are local, simulated-mobile measurements, not guarantees of hosted or real-world scores. Remaining performance suggestions include unused JavaScript, main-thread work, and the CSS dependency chain. The production JavaScript bundle is approximately 125 kB gzip; fonts are locally served (approximately 62 kB combined).

The full Lighthouse HTML/JSON reports are in ignored `qa/lighthouse-mobile.html` and `qa/lighthouse-mobile.json`.

## Browser checks

Chromium / installed Google Chrome:

- Widths 320, 390, 768, 1024, 1440, and 1920: no horizontal overflow.
- Mobile navigation: open, close on selection, correct expanded state, navigation destination.
- Project detail dialog: opens, keyboard access, Escape close, focus restored to the trigger.
- Hash links: all internal destinations exist.
- Resume: HTTP 200 from the production build.
- Reduced motion: animated orbital rotation disabled, no pointer tracking; content remains visible.
- Fine pointer: ring responds to movement and interactive hover; native cursor preserved.
- Browser console/page errors: none during the automated test suite.
- Axe WCAG 2 / 2.1 AA checks: no violations at 390 and 1440 widths.
- Desktop hero, project presentation, and mobile layouts visually inspected; screenshots saved under ignored `qa/`.

`qa/verification.json` contains the machine-readable test result. Tests can be rerun using the README commands.

## Limits and remaining content

- Employment dates are absent from the resume and explicitly marked for confirmation.
- Direct project repository/demo links are absent from the resume and are not invented. The real GitHub profile is available instead.
- LinkedIn/GitHub profile URLs are copied from the resume. External page availability could not be independently confirmed through the browsing service.
- Artwork is original conceptual CSS/SVG work, not claimed product screenshots.
- The downloadable resume contains the complete supplied document, including contact details; publication makes it public.
- No account authorization was available for hosting. The site has not been published. Netlify build configuration and instructions are ready.
- Safari, Firefox, physical mobile devices, and screen-reader behavior were not independently tested. Automated accessibility scores do not prove complete accessibility.
