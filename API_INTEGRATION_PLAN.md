# Recipe and nutrition API integration plan — v13

## Recommended architecture

Use two separate data sources instead of forcing one service to do everything:

1. **TheMealDB** for discovering external recipe ideas, photos and source instructions.
2. **USDA FoodData Central** for generic ingredient nutrition and **Open Food Facts** for packaged Japanese products and barcode lookup.

External recipes should appear in a separate **Online inspiration** area. A recipe is copied into the local cookbook only after the user reviews ingredient amounts, servings, language and nutrition. This prevents low-quality or incomplete community recipes from contaminating the curated cookbook.

## Important implementation rules

- Never place a private USDA, Edamam or other secret API key directly in GitHub Pages JavaScript. Use a Supabase Edge Function or another server-side proxy.
- Cache only data allowed by the provider's terms.
- Store source name, original URL, source recipe ID, attribution and import date.
- Normalize every ingredient into grams or millilitres before calculating nutrition.
- Mark imported nutrition as estimated until every ingredient is recognized.
- Keep the existing curated recipes available offline. Online search should fail gracefully when offline.

## Proposed stages

### Stage A — safest and cheapest
- Add barcode/product search through Open Food Facts.
- Let the user choose a product and copy its per-100-g macros into the personal ingredient database.
- Add USDA search as a fallback for unbranded foods.

### Stage B — recipe discovery
- Add TheMealDB search and category/cuisine filters.
- Show external cards without saving them automatically.
- Add an **Import and adapt** button that opens the existing recipe editor.

### Stage C — advanced paid option
- Consider Edamam only for live search with calorie and nutrient filters. Do not build or cache a permanent recipe library from Edamam unless the selected paid plan explicitly permits it.
