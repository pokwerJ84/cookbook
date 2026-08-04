# Japan Protein Cookbook v16

GitHub Pages-ready multilingual PWA for fitness and family recipes in Japan.

## Main features
- 91 built-in recipes plus user-created recipes
- Czech, English and Japanese interface
- Fitness and family ingredient versions
- Every recipe can be edited, including built-in recipes
- Automatic nutrition calculation from ingredient amounts
- Trusted-value adjustment: editing an existing recipe adds/subtracts only the nutrition difference instead of replacing its original values
- Number of servings for whole-batch recipes
- Per-ingredient calorie, protein, carbohydrate, fat and fiber estimates
- Favorites, shopping list and cooking history
- Supabase account sync and private recipe-photo storage
- Installable PWA with offline cache and update prompt

## Main files
- `index.html` – application shell
- `app.css` – styles
- `app.js` – original application logic and the 63-recipe database
- `app-v14.js` – mobile filters, online inspiration and food-data integrations
- `app-v16.js` – okara/tofu collection and verified FatSecret OAuth 2.0 integration
- `service-worker.js` – offline cache and update flow
- `manifest.webmanifest` – installation metadata
- `supabase_cookbook_setup.sql` – database and private image-storage policies

## Nutrition input examples
Write one ingredient per line with an amount, for example:

- `200 g řeckého jogurtu`
- `1 vejce`
- `1/2 lžičky prášku do pečiva`
- `1 lžička arašídového másla`

For existing recipes, the calculator keeps the original saved nutrition and applies the nutritional difference caused by an ingredient or portion change. New recipes are calculated directly from all recognized ingredients.

## Deploy to GitHub Pages
1. Upload all files from this folder to the repository root.
2. Commit the changes.
3. In **Settings → Pages**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.

The Supabase table structure remains compatible with earlier versions. Built-in recipe edits are stored inside the existing `custom_recipes` JSON column as overrides, so no destructive migration is required.


## Version 13

Version 13 contains 75 recipes, including two new chapters for low-calorie breakfasts and dinners. See `V13_CHANGES.txt` and `API_INTEGRATION_PLAN.md`.


## v14 highlights
- Mobile filter bottom sheet
- TheMealDB online inspiration
- Open Food Facts barcode nutrition lookup
- Optional USDA search through Supabase Edge Function


## v15 highlights
- 91 built-in recipes, including 16 okara/tofu/soy recipes
- ingredient filters for okara, tofu and soy/natto
- optional FatSecret healthy recipe search through a secure Supabase Edge Function


## v16 highlights
- verified OAuth 2.0 client-credentials flow through Supabase
- recommended FatSecret URL-path endpoints
- in-app FatSecret connection test and clearer diagnostics
