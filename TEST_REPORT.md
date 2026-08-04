# Japan Protein Cookbook v12 – Test Report

## Automated checks passed
- `node --check app.js`
- `node --check app-v12.js`
- Valid `manifest.webmanifest` JSON
- HTML parsed successfully
- All local HTML assets exist
- Service-worker cache is `japan-protein-cookbook-v12`
- ZIP integrity test
- 63 built-in recipes detected
- All 147 unique built-in ingredient lines recognized by the nutrition engine
- Fraction parsing: `1/2 lžičky prášku do pečiva` = 2 g
- Small-item parsing: `1 malý banán` = approximately 90 g
- Family substitutions remove protein powder and add specified replacements
- Built-in recipe overrides merge without duplicate recipe IDs

## Verified nutrition example
Jarda's original breakfast remains based on its saved values:
- 523 kcal
- 50 g protein
- 59 g carbohydrates
- 10 g fat
- 12 g fiber

After adding `1 lžička arašídového másla`, the trusted-value adjustment returns approximately:
- 552 kcal
- 51.3 g protein
- 60 g carbohydrates
- 12.5 g fat
- 12.3 g fiber

## Functional fixes included
- Universal edit button for built-in and custom recipes
- Restore-original button for edited built-in recipes
- Automatic nutrition preview while ingredients or servings are changed
- Manual nutrition mode remains available
- Exact family ingredient list for nutrition and shopping
- Previous ingredient-total panel is removed before a new recipe is rendered
- User text is normalized before storage and safely rendered in ingredient/step views

## Manual tests recommended after GitHub deployment
- Edit Jarda's breakfast on iPhone and add peanut butter using the quick button
- Save, close and reopen the recipe
- Sign in on a second device and confirm the edited built-in recipe syncs
- Restore the original recipe and confirm the custom photo remains
- Upload/remove a photo through Supabase Storage
- Test Add to Home Screen and first offline launch
- Review Japanese translations for newly added editor labels

## Accuracy note
Nutrition is an estimate based on common food averages. Exact values depend on the product brand, preparation method and actual measured amount. Existing recipes use trusted-value adjustment to avoid replacing their established values with broad database averages.
