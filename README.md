# Japan Protein Cookbook v23

GitHub Pages-ready multilingual PWA for fitness and family recipes in Japan.

## Main features

- 100 built-in recipes plus user-created recipes
- Czech, English and Japanese interface
- Fitness and family ingredient versions
- Every recipe can be edited, including built-in recipes
- Automatic nutrition calculation from ingredient amounts
- Trusted-value adjustment for edited existing recipes
- Favorites and cooking history
- Supabase account sync and private recipe-photo storage
- Camera barcode scanner with photo and manual-entry fallback
- FatSecret healthy-recipe search with a visible live connection status
- Installable PWA with offline cache and update prompt

## v18 stability change

The application now uses one JavaScript file only:

- `app-v18.js`

The old chain of `app.js`, `app-v14.js`, `app-v16.js` and `app-v17.js` is no longer used. This prevents missing-file and script-order problems during GitHub uploads.

FatSecret search also uses one Supabase call per action. The connection test checks the real `recipes/search/v3` endpoint and displays both the application version and the deployed Supabase function version.

## Main files

- `index.html` – application shell
- `app.css` – styles
- `app-v18.js` – complete application, recipe database and integrations
- `service-worker.js` – v18 offline cache and update flow
- `manifest.webmanifest` – installation metadata
- `supabase_cookbook_setup.sql` – database and private image-storage policies
- `supabase/functions/fatsecret-recipes/index.ts` – secure FatSecret OAuth 2.0 proxy
- `supabase/functions/usda-food-search/index.ts` – optional USDA nutrition proxy

## Deploy to GitHub Pages

1. Upload every file from this folder to the repository root.
2. Commit the changes.
3. Keep GitHub Pages set to the `main` branch and `/ (root)`.
4. Replace the existing Supabase `fatsecret-recipes/index.ts` with the v18 file and deploy it again.

A successful FatSecret test must display:

- `App v18`
- `Function v18`

The existing Supabase database remains compatible. No destructive migration is required.


## v19 FatSecret
FatSecret now runs through the `fly-fatsecret-proxy` service with an app-scoped static egress IP. See `V19_SETUP_CZ.md`.

## v20 recipes
Added 9 editable okara and kinako protein-cookie recipes from the user-provided collection. The nutrition calculator now recognizes kinako and mango. Recipes 2–9 default to 10 cookies because the source did not specify a yield; this can be edited in the app.


## v21 online detail behavior
- Clicking an Online Recipes card now opens the recipe immediately in a full-screen detail overlay.
- The same immediate detail overlay is used for FatSecret recipe details.
- Use the back/close button at the top to return to results.


## v23 updates
Installed PWA copies check for a new version on launch, resume, reconnect, and hourly. A safe update banner lets the user reload only when ready.
