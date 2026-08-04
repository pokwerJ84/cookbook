# Japan Protein Cookbook v14 – Test report

## Passed
- JavaScript syntax: `app.js` and `app-v14.js`
- Manifest JSON validation
- 63 original recipes + 12 low-calorie recipes = 75 built-in recipes
- Recipe IDs 1–75 are unique
- All service-worker assets exist
- All active HTML references use cache version v14
- No active reference to app-v13.js
- TheMealDB, Open Food Facts and USDA proxy modules are present
- Custom nutrition-food storage is included in local and Supabase state
- Supabase SQL migration is idempotent (`add column if not exists`)
- Mobile filters are grouped into goal, meal type and practical sections

## Environment limitation
A full live browser/API test could not be completed in the build environment because browser navigation to local or test URLs is blocked administratively. The files passed syntax, structure, asset and data-integrity validation. Live API behavior should be confirmed once after deployment on GitHub Pages.
