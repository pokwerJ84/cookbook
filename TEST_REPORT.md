# Japan Protein Cookbook v9 – Test Report

## Automated checks passed
- JavaScript syntax check (`node --check`)
- Valid `manifest.webmanifest` JSON
- ZIP integrity check
- Required PWA files present
- Relative links to CSS, JavaScript, icons and manifest resolve
- Service worker cache version updated to v9

## Functional changes included
- CSS and JavaScript split out of `index.html`
- Multiple filters can be active at the same time
- Sorting supports calories, protein, fiber, carbs, fat, active time and cost
- Family nutrition no longer uses the original fixed percentage multiplier; it uses substitution-aware estimates per recipe
- Shopping list with check-off and deletion
- Cooking history
- PWA update notification and update button
- Simplified mobile filter drawer
- Recipe text from custom recipes normalized before rendering

## Manual tests still recommended after GitHub deployment
- Sign-up, email confirmation, sign-in, password reset
- Supabase Storage image upload/remove on iPhone
- Add to Home Screen icon and safe-area layout
- Offline launch after first online load
- Verify Japanese recipe wording for recipes used most often

## Important data note
Nutrition remains an estimate unless values are entered from the exact product labels. Family values are calculated from the stated substitutions but should not be treated as laboratory-accurate.
