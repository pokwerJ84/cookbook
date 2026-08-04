# v14 setup

## Normal GitHub update
Upload `index.html`, `app.css`, `app.js`, `app-v14.js`, `manifest.webmanifest`, `service-worker.js` and the icons. TheMealDB and Open Food Facts work without a private API key.

## Supabase update
Run `supabase_cookbook_setup.sql` once. It safely adds the `food_library` column if the table already exists.

## Optional USDA search
Deploy `supabase/functions/usda-food-search` and store the USDA key as the `USDA_API_KEY` Supabase secret. Do not put a USDA key into frontend JavaScript or GitHub.
