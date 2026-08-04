# Japan Protein Cookbook v12

GitHub Pages-ready multilingual PWA for fitness and family recipes in Japan.

## Main features
- 63 built-in recipes plus user-created recipes
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
- `app-v12.js` – universal editor, automatic nutrition engine and v12 fixes
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
