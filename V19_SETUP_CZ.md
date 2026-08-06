# Japan Protein Cookbook v19 – nasazení

## A. GitHub Pages
Nahraj všechny soubory ze složky `cookbook-main` do kořene GitHub repozitáře. Aplikace používá `app-v20.js`.

## B. Fly.io proxy
Otevři složku `fly-fatsecret-proxy` a postupuj podle `README_CZ.md`. Na Windows můžeš použít připravený `deploy-windows.ps1`.

## C. FatSecret whitelist
Po příkazu:

```text
fly ips allocate-egress --app TVUJ_NAZEV -r nrt
```

se zobrazí app-scoped static egress IPv4. Pouze tuto IPv4 vlož do FatSecret → IP Restrictions. Aktivace může podle FatSecret trvat až 24 hodin.

## D. Propojení v aplikaci
1. Otevři Cookbook App v19.
2. Přihlas se ke svému Supabase účtu.
3. Otevři Online → Zdravé recepty.
4. Do pole Fly.io proxy URL vlož `https://TVUJ_NAZEV.fly.dev`.
5. Klikni Uložit proxy.
6. Klikni Otestovat proxy a FatSecret.

Úspěch zobrazí `App v19 · Proxy v19`.

## E. Supabase
Pro FatSecret už v Supabase nic nenasazuj. Starou Edge Function `fatsecret-recipes` můžeš po úspěšném testu odstranit. Supabase dál zůstává pro účet, recepty, obrázky a synchronizaci.
