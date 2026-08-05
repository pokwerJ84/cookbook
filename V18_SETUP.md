# Japan Protein Cookbook v18 setup

## GitHub
Upload every file from the `cookbook-main` folder to the root of your GitHub Pages repository.
The important files are:

- index.html
- app.css
- app-v18.js
- service-worker.js
- manifest.webmanifest
- all icon files

The old app.js, app-v14.js, app-v16.js and app-v17.js are no longer used.

## Supabase FatSecret function
Open:

`Supabase → Edge Functions → fatsecret-recipes → Code → index.ts`

Replace the entire code with:

`supabase/functions/fatsecret-recipes/index.ts`

Then click **Deploy updates**.
Do not change the existing secrets:

- FATSECRET_CLIENT_ID
- FATSECRET_CLIENT_SECRET

## Test
In the app open:

`Online → Zdravé recepty → Otestovat připojení`

A successful card must show both:

- App v18
- Function v18

If the function is old, the app will say that the Supabase function is not updated.
If FatSecret returns an invalid IP, the card will show the exact IP that must be added to the FatSecret allowlist.

## Refresh old PWA cache
After uploading, close the installed app completely and open it again. If the old version still appears, open the GitHub Pages URL in Safari/Chrome, refresh once, then reopen the installed app.
