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
