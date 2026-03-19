# Project Overview

This is a simple, data-driven developer portfolio built with plain HTML, CSS, and vanilla JavaScript. All visible content is loaded from `data.json` via `fetch()` and rendered dynamically with reusable functions in `script.js`.

## Goals
- Clean, minimal UI with light glassmorphism
- Mobile-first, fully responsive layout
- Content is **not** hardcoded in HTML
- Easy to extend with new sections and data

## Folder Structure
- `index.html` – Shell layout with section containers and IDs
- `styles.css` – Styling, glassmorphism, gradients, animations
- `script.js` – Fetch + render logic (modular functions)
- `data.json` – All content data

## Data Flow
1. `script.js` runs `init()` on load.
2. `fetch("data.json")` loads all content.
3. Render functions build and insert DOM nodes:
   - `renderHero(data.hero)`
   - `renderAbout(data.about)`
   - `renderProjects(data.projects)`
   - `renderSkills(data.skills)`
   - `renderContact(data.contact)`
   - `renderFooter(data.footer)`
4. `setupMenu()` initializes mobile nav.
5. `setupScrollReveal()` applies scroll reveal classes.

## How to Add a New Section
1. Add a new section block in `index.html` with a unique `id` and an empty container.
2. Add the section data in `data.json`.
3. Create a new render function in `script.js`:
   - Use `createEl`, `setText`, `setHTML` helpers
   - Append into the section container
4. Call the new render function inside `init()` after data is loaded.
5. Add any required styles in `styles.css`.

## Conventions
- All text and links live in `data.json`.
- Avoid hardcoding copy in HTML.
- Use reusable helper functions for DOM creation.
- Keep sections modular and self-contained.

## Local Preview
`fetch()` will fail on `file://` URLs. Use a local server:
```powershell
npx serve .
```

## Notes for Agents
- Do not remove or hardcode data in `index.html`.
- Maintain the same render function pattern for new sections.
- Keep styles minimal and consistent with glassmorphism theme.
