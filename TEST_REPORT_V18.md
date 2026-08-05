# Japan Protein Cookbook v18 – Test Report

## Passed

- `app-v18.js` JavaScript syntax check
- `service-worker.js` JavaScript syntax check
- FatSecret Edge Function TypeScript parser check
- PWA manifest JSON validation
- Single application bundle referenced by `index.html`
- No references to the removed `app.js`, `app-v14.js`, `app-v16.js` or `app-v17.js`
- 91 built-in recipes rendered with 91 recipe cards
- Online inspiration opens correctly
- FatSecret pane opens correctly
- FatSecret connection test displays App v18 and Function v18
- FatSecret search renders returned recipe cards
- Product-by-barcode section contains camera scan and photo controls
- Recipe detail opens and contains centered image/edit controls
- Mobile interaction test completed without JavaScript console errors
- PWA cache uses the v18 cache name and includes `app-v18.js`

## FatSecret limitation

FatSecret can still reject a request if the current Supabase outgoing IP address has not been activated in the FatSecret allowlist. v18 displays the exact IP returned by FatSecret. This is an infrastructure restriction rather than an application-code error.
