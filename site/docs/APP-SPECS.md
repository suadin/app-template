# App specs — Demo

## Content

- The page shows Lorem Ipsum in cards and a short reader.
- Mode A and Mode B change only the label and the address.
- There is no server, no account and no private data.

## Not applicable

- The page is static and read-only.
- There is no search, no date list and no pager.

## Automated tests

Unit tests:

- `[BASIC-READER-02] a heading becomes a slug`
- `[BASIC-READER-02] a document is split at level-two headings`
- `[BASIC-READER-03] sections pick an icon and fall back to a dot`
- `[BASIC-READER-04] html is escaped before markup is added`
- `[BASIC-LINKS-01] mode lives in the address`
- `[BASIC-FOOTER-02] metric labels show count and coverage`
- `[BASIC-VERSION-01] the app version has a SPECS tooltip`
- `[BASIC-VERSION-02] the Basic Specs version has a Basic Specs tooltip`
- `[BASIC-VERSION-03] only major updates are red`
- `[BASIC-VERSION-04] the latest version is compared as semver`

E2E tests:

- `[BASIC-FOOTER-01] footer shows six icons`
- `[BASIC-FOOTER-02] footer shows counts and coverage`
- `[BASIC-FOOTER-03] tooltip has three rows`
- `[BASIC-READER-01] README opens the reader`
- `[BASIC-READER-05] SPECS starts with Changelog`
- `[BASIC-LINKS-01] a reload restores the reader section`
- `[BASIC-VERSION-01] the app version opens SPECS and stays neutral`
- `[BASIC-VERSION-02] the Basic Specs version opens BASIC SPECS`
- `[BASIC-VERSION-03] only a major update turns red`
- `[BASIC-VERSION-04] an unavailable latest version stays neutral`
- `[BASIC-DESIGN-01] the page follows the OS colour scheme`
- `[BASIC-LAYOUT-01] header and footer stay visible`
