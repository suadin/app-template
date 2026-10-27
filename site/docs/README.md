# App Template

A vanilla static starter that follows [Basic Specs](https://github.com/suadin/basic-specs).
The content is Lorem Ipsum; the footer, reader, deep links, tooltips, dark mode and
test metrics are real.

Use this repository with **Use this template**, then replace the Lorem Ipsum with your
app. Keep the structure, the footer, the reader and the conformance check.

## Local setup

Needs Python 3 and Node 22.

```sh
python3 -m http.server 4173 --directory site
```

Open <http://127.0.0.1:4173/>.

```sh
pnpm install
pnpm check
```

`pnpm check` runs the unit suite, the Playwright suite, the metrics and the Basic
Specs check. A green run means the starter still follows the standard. The weekly
`Basics update` workflow syncs a new release and opens a pull request.

## What to replace

- `site/index.html` — title, description, header and Lorem Ipsum text.
- `site/app.js` — the app's own view logic.
- `docs/APP-SPECS.md` — the rules specific to this app.
- `README.md` and `RELEASE-NOTES.md` — setup and version history.
- `test/` and `e2e/` — keep at least one test per Basic rule and add app tests.

Do not edit `docs/BASIC-SPECS.md` or `basics/`: both are generated from the pinned
standard. Change `basics.json` instead and run `pnpm basics docs`.

## Tests

`pnpm metrics` runs the unit suite, the Playwright journeys and the line coverage.
`pnpm check` adds the Basic Specs check and the documentation drift check. A missing
run is shown as `not executed`, never as zero.

## Deployment

`./publish.sh` copies the source documents into `site/docs` and rebuilds the Pages
artifact. The workflow deploys `site/` on every push to `main`.

## Licence

MIT.
