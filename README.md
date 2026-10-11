# PetShop

A small pet catalog I built as a university web project. You can browse animals, filter the catalog, view details and manage a demo cart and profile.

Everything runs in the browser; there's no backend or real payment system.

## Built with

JavaScript · AngularJS 1.8 · HTML · CSS · Bootstrap · localStorage

## Features

- Pet catalog with search and filters
- Individual pet pages
- Cart and reservation-style actions
- Local profile and sign-in simulation
- Reviews and ratings saved in the browser
- A simple chat widget with predefined responses

The chat uses predefined responses, and the app's login is only a demo. Data is saved to your browser's `localStorage`, so it isn't shared between users.

## Run locally

From the project root:

```bash
cd PetShop
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000). The app loads AngularJS and other libraries from CDNs, so you'll need an internet connection.

Clear the site's browser storage if you want to reset the sample data.

## Project structure

```text
PetShop/
├── index.html
├── app.js
├── controllers/
├── services/
├── views/
├── css/
└── assets/pets/
```

This is a frontend prototype built with an older framework. If I extend it, the main work will be improving the demo authentication flow, cleaning up unused routes, optimising images and adding tests. Those ideas are tracked in [the improvement plan](docs/IMPROVEMENT_PLAN.md).
