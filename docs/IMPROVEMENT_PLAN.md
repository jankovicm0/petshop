# PetShop — Improvement Plan

This is a forward-looking checklist, not a feature list.

## Quick fixes
- [ ] Remove the unused `/docs` route or implement its view/controller consistently.
- [ ] Compress and resize oversized image assets (one JPG is approximately 17 MB).
- [ ] Add screenshots of the actual UI and accessibility checks.
- [ ] Add a simple smoke test for catalog routing and core user interactions.

## Engineering improvements
- [ ] Separate demo authentication state from real authentication concepts, or migrate to a backend if that is a deliberate goal.
- [ ] Sanitize and validate forms and user reviews.
- [ ] Check responsive navigation and keyboard accessibility.
- [ ] Add linting and lightweight automated tests.
- [ ] Migrate away from deprecated AngularJS only if turning this into a maintained application is worth the effort.

## Portfolio scope
- [ ] Keep documentation accurate: client-side prototype, localStorage data, rule-based chat assistant.
- [ ] Preserve the original academic history and document future refactors separately.