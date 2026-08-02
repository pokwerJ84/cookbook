# Japan Protein Cookbook PWA

## 1. Supabase
1. Create a Supabase project.
2. Run `supabase_cookbook_setup.sql` in Supabase SQL Editor.
3. Open `index.html` and replace:
   - `PASTE_YOUR_SUPABASE_PROJECT_URL`
   - `PASTE_YOUR_SUPABASE_ANON_KEY`
4. Use only the anon/publishable key, never the service-role key.

## 2. Publish on GitHub Pages
1. Create a new GitHub repository.
2. Upload all files and the `icons` folder to the repository root.
3. In GitHub open **Settings → Pages**.
4. Select **Deploy from a branch**, branch `main`, folder `/ (root)`.
5. Save and open the generated GitHub Pages URL.

## 3. Install on iPhone
1. Open the GitHub Pages URL in Safari.
2. Tap **Share**.
3. Tap **Add to Home Screen**.
4. Confirm **Add**.

## 4. Install on Android
Open the site in Chrome and choose **Install app** or **Add to Home screen**.

## Notes
- GitHub Pages must be used; opening `index.html` directly from Files cannot install the PWA or run the service worker.
- The app shell works offline after the first visit. Supabase synchronization requires internet.
- When changing app files, update the cache name in `service-worker.js` from `v1` to `v2`, etc.

## Supabase Storage for recipe photos

Run the **latest complete** `supabase_cookbook_setup.sql` in Supabase SQL Editor. It creates a private bucket named `recipe-images` and Row Level Security policies. Each user can access only the folder named with their own user UUID.

The application now:
- resizes photos in the browser before upload,
- uploads them to the private `recipe-images` bucket,
- stores only the Storage path in `cookbook_state.photos`,
- creates temporary signed URLs when displaying images,
- deletes the old file when an image is replaced or removed,
- automatically migrates older Base64/JSON images after login.

Do not manually make the bucket public.


## Supabase Auth setup (required)
1. Supabase Dashboard → Authentication → Providers → Email: enable Email provider.
2. Authentication → URL Configuration:
   - Site URL: your exact GitHub Pages URL, including repository path and trailing slash.
   - Redirect URLs: add the same URL and optionally the same path ending in `/**`.
3. For easiest testing, Authentication → Providers → Email → Confirm email can be temporarily disabled. If left enabled, the user must click the confirmation email before first login.
4. After uploading a new version, remove the old Home Screen app or refresh Safari with `?v=4` to clear the old service-worker cache.
