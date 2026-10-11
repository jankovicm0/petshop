# PetShop — Client-side Pet Catalog Prototype

> University web development project built with AngularJS, HTML, CSS and JavaScript. This is a **browser-only demo** with local mock data, not a real storefront.

## Features

- Pet catalog and detail pages
- Search and filters by several pet attributes
- Cart / reservation-style interactions
- Profile, registration and login *simulation*
- Ratings and reviews stored in the browser
- Rule-based FAQ/chat assistant responding to a limited set of predefined prompts

**Important:** Data is stored using `localStorage` in the visitor's browser. There is no backend database, real account authentication, payment processing or external AI/chat service.

## Technologies

- AngularJS 1.8.x and AngularJS routing
- JavaScript (ES6), HTML5, CSS3
- Bootstrap 5
- Browser localStorage
- Client-side asset/CDN dependencies

## Structure

```text
PetShop/
├── index.html                 # App entry
├── app.js                     # Routes / app initialization
├── controllers/               # Page controllers
├── services/
│   ├── data.service.js        # Sample data and UI state
│   └── storage.service.js     # Browser storage helper
├── views/                     # HTML page templates
├── css/
└── assets/pets/               # Pet imagery
```

## Run locally

No backend installation is required. Run a static HTTP server from the application directory:

```bash
cd PetShop
python3 -m http.server 8000
```

Then open `http://localhost:8000`. A network connection is required for CDN-loaded JavaScript and stylesheets.

To reset demo data, clear this site's `localStorage` in your browser and refresh.

## Known limitations

- Login/registration are UI simulations; credentials are not securely authenticated.
- Demo state is local to one browser, not shared between users.
- The chat assistant uses hard-coded matching rules; it is not an AI assistant.
- `app.js` references a `/docs` route, but the matching `views/docs.html` and controller implementation are missing from the current source tree.
- One pet photo is larger than 17 MB; asset optimization would improve page loading.
- AngularJS is a legacy framework; this is presented as an academic artifact, not a recommended production stack.

See [IMPROVEMENT_PLAN.md](docs/IMPROVEMENT_PLAN.md) for next steps.

## Project status

**Academic prototype.** No claims of live payments, real customer accounts, production hosting or automated tests.