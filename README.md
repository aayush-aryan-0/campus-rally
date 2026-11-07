# Campus Rally

Responsive event management website built for the **K Explore – Web Designing** task.

## What it does
- Hero section with a live countdown to the next event
- Event cards (name, date, venue, banner, short description)
- Search by name, venue or topic, plus category filters
- Event detail popup with a registration form
- JavaScript validation: name (letters only), email format, 10-digit mobile number, duplicate-registration check
- Confirmation message on success
- Bonus: dark/light mode, countdown timer, animations, registrations saved in Local Storage (view or cancel under "My registrations")

## Tech
HTML5, CSS3, vanilla JavaScript. No frameworks, no build step.

## Files
- `index.html` – page structure
- `style.css` – styling, theme variables, responsive rules (breakpoint at 640px)
- `script.js` – event data, filtering, countdown, form validation, Local Storage

## How it works
Events live in the `EVENTS` array in `script.js`. Filtering re-renders the card grid from that array. The registration form validates each field on input and on submit, then stores the entry in `localStorage` under `kx-regs`. The theme choice is stored under `kx-theme`.

## Run locally
Open `index.html` in a browser.

## Live site
<paste your deployed link here>
