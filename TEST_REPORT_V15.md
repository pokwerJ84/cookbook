# Japan Protein Cookbook v15 – Test report

Checked:
- JavaScript syntax: `app.js`, `app-v14.js`, `app-v15.js`
- Manifest JSON syntax
- 91 built-in recipes with unique IDs 1–91
- 16 new okara/tofu/soy recipes with ingredients, steps, family ingredients and servings
- chapter numbering: 12 local soy collection, 13 online recipes, 14 Japan Shopping Guide
- version 15 asset references and service-worker cache
- FatSecret Edge Function source and setup documentation are included

A live browser navigation test could not run in this environment because Chromium blocks local/test URLs administratively. Static source, data, syntax, manifest and package integrity checks passed. Live FatSecret calls require the user's own FatSecret credentials and deployed Supabase Edge Function.
