# Japan Protein Cookbook v15 setup

## GitHub update
Upload all files, especially `app-v15.js`, `app-v14.js`, `app.js`, `app.css`, `index.html`, `manifest.webmanifest` and `service-worker.js`.

## FatSecret healthy recipe search
The local okara/tofu collection works immediately. Live FatSecret search needs a free Platform API account and a Supabase Edge Function.

1. Register for FatSecret Platform API Basic and create an application.
2. Copy the Client ID and Client Secret.
3. In Supabase CLI run:
   `supabase secrets set FATSECRET_CLIENT_ID=YOUR_ID FATSECRET_CLIENT_SECRET=YOUR_SECRET`
4. Deploy:
   `supabase functions deploy fatsecret-recipes`
5. Reload the app. Open Online inspiration > Healthy recipes.

Do not put the FatSecret Client Secret in `app.js`, GitHub, or browser localStorage.

FatSecret permits recipe IDs to be stored indefinitely; the app therefore stores only bookmarked recipe IDs and fetches all recipe content live.
