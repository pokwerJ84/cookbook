# Japan Protein Cookbook v16 setup

## GitHub update
Upload all files from the package, especially:

- `app.js`
- `app-v14.js`
- `app-v16.js`
- `app.css`
- `index.html`
- `manifest.webmanifest`
- `service-worker.js`

## FatSecret OAuth 2.0 integration

Version 16 follows FatSecret's recommended server-to-server flow:

1. Supabase Edge Function requests a token from `https://oauth.fatsecret.com/connect/token` using `client_credentials`.
2. The function sends the token in `Authorization: Bearer ...`.
3. It calls URL-path REST endpoints under `https://platform.fatsecret.com/rest/`.
4. Client credentials and access tokens never reach GitHub or the browser.

### Configure secrets

```bash
supabase secrets set FATSECRET_CLIENT_ID=YOUR_ID FATSECRET_CLIENT_SECRET=YOUR_SECRET
```

### Deploy

```bash
supabase functions deploy fatsecret-recipes
```

### Test

Open the Cookbook App and select:

**Online inspiration → Healthy recipes → Test connection**

A successful test verifies both OAuth 2.0 and a URL-path REST request.

## FatSecret endpoints used

- `GET /rest/recipes/search/v3`
- `GET /rest/recipe/v2`
- `GET /rest/recipe-types/v2` for the connection test

The app stores only FatSecret recipe IDs. Other recipe data is loaded live.
