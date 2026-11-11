# Contributor and agent guidelines

These guidelines apply to everyone who changes this repository: group members
and coding agents (Claude Code, Codex, Cursor, Copilot, and others). Agents
should read this whole file before making changes. If a convention described
here changes, update this file in the same pull request.

## 1. Project overview

- Static site built with **Jekyll** and deployed by **GitHub Pages** from the
  `master` branch: <https://priesemann-group.github.io>.
- It started from the [Academic Pages](https://github.com/academicpages/academicpages.github.io)
  template, but the template has been heavily trimmed and rewritten. Treat this
  repository as its own codebase; the upstream Academic Pages documentation
  mostly does not apply.
- There is no build tooling beyond Jekyll and no automated test suite. Checking
  the rendered pages locally is the test (see section 3).

| Path | Contents |
|---|---|
| `_config.yml` | Site settings, Viola's profile (`author:`), Jekyll excludes |
| `_data/*.yml` | Structured content: members, collaborators, positions, blog cards, navigation |
| `content/*.html` | Top-level pages (each sets its own `permalink`) |
| `content/events/*.html` | Detail pages for individual events |
| `index.html`, `_includes/home.html` | Landing page |
| `blog/<slug>/index.html` | Blog articles, with their data in `blog/<slug>/files/` |
| `_layouts/`, `_includes/` | Page skeleton and reusable components |
| `_sass/` | Template Sass, theme colors (`_sass/theme/`), vendored libraries (`_sass/vendor/`) |
| `assets/css/site.css` | Site-specific styles (the main place for style changes) |
| `assets/css/blog.css` | Styles for the blog index and articles |
| `assets/js/` | Navigation, profile menu, blog plotting, bundled template JS |
| `assets/images/` | Images (`assets/images/blog/` for blog teasers) |

## 2. Git workflow

- Start every task from an up-to-date `master` and create **one short-lived
  branch per task**:
  - `content/<topic>` for content updates (people, events, positions, text)
  - `feature/<topic>` for new pages, components, or design changes
  - `fix/<topic>` for bug fixes
  - `docs/<topic>` for documentation
- Open a **pull request to `master`**. Do not push directly to `master`.
- **Delete the branch after the pull request is merged.**
- Keep each pull request to a single topic. Do not mix content updates with
  design or template changes.
- Commit messages: a short subject in the imperative mood, as in the existing
  history (`Add group member`, `Fix mobile profile menu`).
- **Agents must not use the `dev` branch.** Do not commit to it, merge from or
  into it, or base branches on it. It is kept for whoever currently uses it.
- Never commit build output or local dependencies: `_site/`, `vendor/`,
  `.bundle/`, `Gemfile.lock`, `.sass-cache/`, `local/`.

## 3. Local preview and checks

- Run `./preview.sh` and open <http://127.0.0.1:4000>. Opening `index.html`
  directly in a browser does not work. Setup is described in `README.md`.
- Before calling a change done, check every affected page:
  - in **light and dark** theme (toggle in the navigation bar);
  - at **mobile, intermediate (tablet), and desktop** widths. The navigation
    bar and the profile sidebar have broken at intermediate widths before;
  - that links work and the Jekyll build has no errors or warnings.
- Agents that cannot open a browser must say which checks they did not perform.

## 4. Content changes

Most changes are content updates. Where content lives in `_data/`, edit the
YAML, not the HTML that renders it.

General rules:

- **Do not invent content.** Names, titles, affiliations, dates, URLs, and
  descriptions must come from the person requesting the change. If something is
  missing, ask.
- Do not reorder, reformat, or rewrite existing entries unless asked.
- Keep names with their correct diacritics and spelling (Schäfer, Göttingen,
  Renée).
- Fields rendered with `| escape` (titles, names) are plain text. Fields like
  `description` and `details` are inserted as HTML, so they may contain
  `<a>`, `<strong>`, or `<p>` and must be valid HTML.

### Group members: `_data/group_members.yml`

```yaml
categories:
  - id: doctoral-researchers        # stable slug, used for HTML ids
    title: Doctoral Researchers
    members:
      - name: Jane Doe (with John Smith)   # co-supervision as "(with …)"
        url: https://example.org/         # optional personal or Scholar page
```

- Within a category, follow the existing order, which is alphabetical by surname.
- When someone leaves, move them to the `alumni` category. Their current position
  can be given in parentheses, e.g. `(Bosch)`. The `alumni` category is rendered
  as a collapsible section.

### Collaborators: `_data/collaborations.yml`

`areas[]` with `id`, `title`, and `collaborators[]` with `name` and `affiliation`.

### Positions and programs: `_data/join_us.yml`

- `specific_positions[]`: `id`, `title`, `level`, `posted` (`YYYY-MM-DD`),
  `deadline` (human-readable text), `deadline_iso` (`YYYY-MM-DD`, optional),
  `status` (`open` or `closed`), optional `summary`, and `details` (HTML).
  Positions are sorted by `posted` automatically. When a position ends, set
  `status: closed` rather than deleting it, unless asked to remove it.
- `recurring_programs[]`: `id`, `title`, `audience`, `application_window`,
  `description` (HTML allowed), `url`, `link_label`.

### Navigation: `_data/navigation.yml`

`main[]` with `title` and `url`. Changing the navigation affects every page
(see section 5).

### Events

1. For an event with its own page, create `content/events/<slug>.html` with
   front matter:
   ```yaml
   ---
   permalink: /events/<slug>/
   title: Event title
   description: One-sentence summary used for search engines and link previews.
   ---
   ```
   Copy the structure of an existing event page (identity header, then a card
   with date, venue, and description).
2. Add an `<article class="event-entry" id="<slug>">` entry to
   `content/events.html` under **Upcoming events** or **Past events**. Events
   hosted elsewhere get only this entry, linking externally.
3. When an event has passed, move its entry from Upcoming to Past.
4. The `routes` map in `_includes/head/custom.html` only redirects old
   `/#hash` links from the previous site. Do not add new pages to it.

### Blog articles

1. Create `blog/<slug>/index.html` with front matter (`permalink: /blog/<slug>/`,
   `title`, `description`) and put its data files in `blog/<slug>/files/`.
2. Add a card to `_data/blog_articles.yml` (`id`, `title`, `category`,
   `description`, `url`, `image`, `image_alt`), with the teaser image in
   `assets/images/blog/`.
3. Article-specific styles go in `assets/css/blog.css`. Pages that need math can
   set `mathjax: true` in their front matter.

### Dates and typography

- Follow the date format already used on the page you are editing (for example
  `30 November–2 December 2026` on the events overview). Do not normalize dates
  across the site unless asked.
- Use en dashes (`–`) for ranges, typographic apostrophes (`’`), and `&nbsp;`
  where the surrounding markup already uses it to keep dates on one line.

## 5. Pages that require sign-off

The following affect the group's public identity or are legally required.
**Do not change them unless the person requesting the change explicitly asks
for it**, and call out every change to them in the pull request description so
the maintainers can approve it:

- Landing page: `index.html`, `_includes/home.html`
- About Viola: `content/cv.html`
- Legal pages: `content/impressum.html`, `content/datenschutz.html` (German;
  keep the legal wording intact)
- Viola's profile column: the `author:` block in `_config.yml` and
  `_includes/author-profile.html` (shown on every page)

Template-wide files (section 7.1) also need extra care because they affect
every page.

## 6. Design guidelines

### Color palette

- The interface uses a strict three-color palette, defined as CSS variables in
  `_sass/theme/_priesemann_light.scss` and `_sass/theme/_priesemann_dark.scss`:
  - **Light theme:** Göttingen blue `#153268`, black, white.
  - **Dark theme:** MPI green `#006c66`, black, white.
- Scientific figures, plots, and external logos keep their own colors.
- If a request does not specify colors, follow this palette.
- **If a change introduces any other color, say so explicitly** in your reply
  and in the pull request description. The requester may not be aware that it
  deviates from the palette. Do not silently "correct" a color they explicitly
  asked for.
- In CSS, use the `--global-*` variables (e.g. `var(--global-accent-color)`,
  `var(--global-text-color)`, `var(--global-border-color)`) instead of
  hard-coded hex values, so both themes keep working.

### Layout and components

- Reuse existing patterns before creating new ones:
  - page header band: `<div class="row identity bg-light text-dark">` with an
    `<h1>` and an optional intro `<p>`;
  - content wrapper: `<div class="content … col col-xl-10 col-md-12 align-self-center">`;
  - lists of items: `.event-entry`, `.directory-section` with `.people-list`,
    `.join-position` (`<details>`), `.join-program`, Bootstrap `.card`;
  - metadata lines (dates, deadlines, venues): `<p class="entry-meta">`.
- Keep the look plain and text-first: no shadows, gradients, decorative
  animations, or icon clutter.
- Bootstrap 5.1 is available for grid, cards, and collapse. Its color utilities
  (`bg-light`, `text-dark`, `btn-info`) are restyled to the palette in
  `site.css`; do not add other Bootstrap color classes.
- Responsive sizing uses `clamp()` for spacing and type. Put media queries next
  to the rules they modify and reuse breakpoints already used for similar
  components.
- Every new element must work in both themes. For images that need a light and
  a dark version, follow the pattern used for the profile avatar
  (`author__avatar--light` / `author__avatar--dark`).

### Images and media

- Store images in `assets/images/` (blog teasers in `assets/images/blog/`) with
  lowercase, hyphenated file names.
- Every `<img>` needs meaningful `alt` text (or `alt=""` if purely decorative).
- Resize and compress images before adding them; avoid multi-megabyte files.
  Use `loading="lazy"` for images below the fold.

## 7. Code guidelines

### 7.1 Which files may be edited

| Tier | Files | Rule |
|---|---|---|
| **Do not hand-edit** | `_sass/vendor/`, `_layouts/compress.html`, `assets/js/main.min.js`, `assets/css/academicons.min.css`, `assets/css/fontawesome.css`, `assets/fonts/`, `assets/webfonts/` | Third-party or minified code without source in this repo. Override behavior in separate files instead (as `assets/js/navigation.js` does). |
| **Template-wide (edit with care)** | `_layouts/*`, `_includes/head.html`, `_includes/head/custom.html`, `_includes/seo.html`, `_includes/masthead.html`, `_includes/sidebar.html`, `_includes/author-profile.html`, `_includes/footer.html`, `_includes/footer/custom.html`, `_includes/scripts.html`, `_sass/**` (except vendor), `assets/css/main.scss`, `assets/js/navigation.js`, `assets/js/profile-menu.js` | Affect every page. Change them only when needed, in a dedicated pull request that explains why, and check **all page types** (landing, team, events, event detail, join us, blog index, blog article, about, contact) in both themes and at all widths. Never use them to fix a single page. |
| **Free to edit** | `_data/`, `content/`, `blog/`, page-specific includes (`*-card.html`, `*-category.html`), `assets/css/site.css`, `assets/css/blog.css`, `assets/js/plotting.js` | Normal changes, following the rules in this file. |

### 7.2 HTML and Liquid

- Use semantic elements: `<section aria-labelledby="…">`, `<article>`,
  `<details>/<summary>`, a single `<h1>` per page, and headings in order.
- Escape plain-text data in templates: `{{ item.title | escape }}`.
- Build internal links with `relative_url`:
  `{{ '/events/' | relative_url }}`.
- External links: `target="_blank" rel="noopener noreferrer"`.
- `id` values are lowercase and hyphenated, and existing ids must not change
  because they may be linked from elsewhere (e.g. `/group/#collaborators`).
- Indent with two spaces. New pages need front matter with `permalink`,
  `title`, and `description`.
- If the same markup is repeated for many items, put the data in `_data/` and
  render it with an include, following the existing `*-card.html` and
  `*-category.html` includes.

### 7.3 CSS

- Site-specific styles go in `assets/css/site.css`, in the section for the
  relevant page or component (sections are marked with comment headers). Add a
  new commented section for a new page or component.
- Use BEM-style class names, as in the existing code:
  `.event-entry`, `.event-entry__meta`, `.event-entry--featured`.
- Use the theme variables (section 6), not hard-coded colors.
- Prefer class selectors over ids. Use `!important` only where it is needed to
  override Bootstrap or template styles, as the existing overrides do.

### 7.4 JavaScript

- Plain JavaScript (ES modules where possible), no frameworks, no build step,
  no npm packages.
- Keep scripts small and accessible: keep `aria-*` attributes in sync and keep
  controls usable with the keyboard.
- HTML is compressed in production (`compress_html` in `_config.yml`). Inline
  scripts must not rely on line breaks; end statements with semicolons.
- Theme handling (`data-theme` on `<html>`, stored in `localStorage`) lives in
  `_includes/head.html` and the navigation scripts. Reuse it rather than adding
  a second mechanism.

### 7.5 Dependencies

- External libraries are loaded from CDNs with a **pinned version** (Bootstrap
  `5.1.0` with integrity hash, MathJax 3, D3 v7 on blog pages). Do not add
  unpinned or new dependencies without a clear need, and mention them in the
  pull request.
- GitHub Pages only supports a fixed set of Jekyll plugins. Do not add plugins
  without confirming that GitHub Pages supports them.

## 8. Writing style

- Site content is in **English**, except the German legal pages.
- Be concise and factual, and match the tone of the surrounding page.
- Use full official names for institutions on first mention (e.g. "Max Planck
  Institute for Dynamics and Self-Organization"); the existing short forms
  (MPI-DS, CIDAS) are fine afterwards.

## 9. Rules for agents

- Make the smallest change that fulfils the request. No drive-by refactoring,
  reformatting, or reordering.
- Do not invent content; ask when information is missing.
- Respect the sign-off list (section 5) and the file tiers (section 7.1).
- Point out any color outside the palette (section 6).
- Work on a task branch from `master`, never on `master` or `dev` (section 2).
- Verify the result in the local preview (section 3), and state clearly which
  checks were not possible.
- In the pull request description, summarize what changed, list affected
  pages, and flag any sign-off pages, template-wide files, palette deviations,
  or new dependencies.
