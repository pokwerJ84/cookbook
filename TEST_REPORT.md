# Japan Protein Cookbook v13 – Test Report

## Static and syntax checks

- `node --check app.js` — passed
- `node --check app-v13.js` — passed
- `node --check service-worker.js` — passed
- `manifest.webmanifest` parses as valid JSON
- All files referenced by `index.html` and the service worker are present
- No v12 asset reference remains in the active HTML, manifest or service worker

## Recipe database checks

- Original built-in recipes: 63
- New v13 recipes: 12
- Expected application total: 75
- New recipe IDs are unique: 64–75
- Chapter 10 contains 6 low-calorie breakfasts
- Chapter 11 contains 6 low-calorie dinners
- Shopping guide is displayed as chapter 12

## Nutrition checks

- Every ingredient line in all 12 new recipes is recognized by the automatic calculator
- Every family-version ingredient line in all 12 new recipes is recognized
- Stored nutrition values match the automatic ingredient calculation within rounding tolerance
- Existing quick addition `1 lžička arašídového másla` remains recognized

## Localization checks

- Every new recipe name has exact English and Japanese translations
- Every new ingredient, step, store note, meal-prep note, freezing note, storage note and family note has exact English and Japanese translations

## Environment limitation

A live Chromium navigation test was attempted, but this execution environment blocks localhost and file URL navigation by administrator policy. Syntax, data integrity, references, translations and nutrition calculations were therefore verified directly from the source files.
