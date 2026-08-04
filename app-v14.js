/* Japan Protein Cookbook v14
   Universal recipe editing + automatic ingredient nutrition calculator.
   This file intentionally extends the stable v11 build without rewriting its recipe database. */
(() => {
  'use strict';

  const VERSION = '14';
  const MAX_SERVINGS = 30;
  let formBaseline = null;

  Object.assign(CHAPTERS, {"10. Nízkokalorické snídaně":{"en":"10. Low-Calorie Breakfasts","ja":"10. 低カロリー朝食"},"11. Nízkokalorické večeře":{"en":"11. Low-Calorie Dinners","ja":"11. 低カロリー夕食"}});
  Object.assign(NAME_EXACT, {"Nattó tofu don bez rýže":{"en":"Natto Tofu Bowl Without Rice","ja":"ご飯なし納豆豆腐丼"},"Tamagoyaki se špenátem a miso polévkou":{"en":"Spinach Tamagoyaki with Miso Soup","ja":"ほうれん草の卵焼きと味噌汁"},"Matcha Oikos miska s borůvkami":{"en":"Matcha Oikos Bowl with Blueberries","ja":"抹茶オイコス・ブルーベリーボウル"},"Tofu scramble z bílků a hub":{"en":"Egg-White Tofu Scramble with Mushrooms","ja":"卵白と豆腐のきのこスクランブル"},"Tuňáková tofu miska s okurkou":{"en":"Tuna Tofu Bowl with Cucumber","ja":"ツナ豆腐きゅうりボウル"},"Kuřecí miso polévka s tofu":{"en":"Chicken Miso Soup with Tofu","ja":"鶏肉と豆腐の味噌汁"},"Shirataki nudle s kuřecím masem":{"en":"Chicken Shirataki Noodles","ja":"鶏むね肉のしらたき焼きそば"},"Treska v páře se zázvorem":{"en":"Steamed Cod with Ginger","ja":"たらの生姜蒸し"},"Tofu kimchi polévka s vejcem":{"en":"Tofu Kimchi Soup with Egg","ja":"豆腐キムチ卵スープ"},"Kuřecí pánev se zelím a ponzu":{"en":"Chicken, Cabbage and Ponzu Skillet","ja":"鶏むね肉とキャベツのポン酢炒め"},"Losos v alobalu s houbami a špenátem":{"en":"Salmon Foil Bake with Mushrooms and Spinach","ja":"鮭ときのことほうれん草のホイル焼き"},"Tuňáková miska s edamame a okurkou":{"en":"Tuna Edamame Cucumber Bowl","ja":"ツナ枝豆きゅうりボウル"}});
  const V13_LINE_EXACT = {"45 g nattó (1 balení)":{"en":"45 g natto (1 pack)","ja":"納豆 45 g（1パック）"},"150 g hedvábného tofu":{"en":"150 g silken tofu","ja":"絹ごし豆腐 150 g"},"10 g jarní cibulky":{"en":"10 g green onion","ja":"青ねぎ 10 g"},"5 ml sójové omáčky se sníženým obsahem soli":{"en":"5 ml reduced-salt soy sauce","ja":"減塩しょうゆ 5 ml"},"3 ml sójové omáčky se sníženým obsahem soli":{"en":"3 ml reduced-salt soy sauce","ja":"減塩しょうゆ 3 ml"},"Tofu zlehka rozmačkej v misce jako základ místo rýže.":{"en":"Lightly mash the tofu in a bowl to use as the base instead of rice.","ja":"豆腐をボウルで軽く崩し、ご飯の代わりの土台にします。"},"Nattó důkladně promíchej s přiloženou omáčkou, až bude lehce pěnové.":{"en":"Mix the natto thoroughly with its sauce until slightly foamy.","ja":"納豆を付属のたれとよく混ぜ、少し泡立つまで混ぜます。"},"Nattó dej na tofu, přidej jarní cibulku a zakápni sójovou omáčkou.":{"en":"Spoon the natto over the tofu, add green onion and drizzle with soy sauce.","ja":"豆腐に納豆をのせ、青ねぎを加えてしょうゆをかけます。"},"Nattó a kinu tofu koupíš v každém japonském supermarketu nebo konbini.":{"en":"Natto and silken tofu are available in every Japanese supermarket and convenience store.","ja":"納豆と絹ごし豆腐は日本のスーパーやコンビニで購入できます。"},"Jarní cibulku můžeš nakrájet večer. Tofu otevři až před podáváním.":{"en":"Chop the green onion the night before. Open the tofu just before serving.","ja":"青ねぎは前日に切っておけます。豆腐は食べる直前に開けます。"},"Nezamrazuj.":{"en":"Do not freeze.","ja":"冷凍しないでください。"},"Nejlepší je čerstvé; v lednici maximálně 1 den.":{"en":"Best fresh; keep for no more than 1 day in the refrigerator.","ja":"できたてがおすすめです。冷蔵で最大1日保存できます。"},"Pro děti použij méně sójové omáčky a nattó podávej odděleně, pokud jim jeho chuť nevyhovuje.":{"en":"For children, use less soy sauce and serve the natto separately if they do not enjoy its flavor.","ja":"子ども用はしょうゆを減らし、納豆が苦手な場合は別添えにします。"},"2 vejce":{"en":"2 eggs","ja":"卵 2個"},"50 g čerstvého špenátu":{"en":"50 g fresh spinach","ja":"ほうれん草 50 g"},"200 ml dashi vývaru":{"en":"200 ml dashi stock","ja":"だし 200 ml"},"10 g miso pasty":{"en":"10 g miso paste","ja":"味噌 10 g"},"3 g sušené wakame (asi 30 g po namočení)":{"en":"3 g dried wakame (about 30 g after soaking)","ja":"乾燥わかめ 3 g（戻した状態で約30 g）"},"1 g oleje na pánev":{"en":"1 g oil for the pan","ja":"フライパン用の油 1 g"},"7 g miso pasty":{"en":"7 g miso paste","ja":"味噌 7 g"},"Vejce rozšlehej a vmíchej nasekaný špenát.":{"en":"Beat the eggs and stir in the chopped spinach.","ja":"卵を溶き、刻んだほうれん草を混ぜます。"},"Na nepřilnavé pánvi potřené minimem oleje směs postupně sroluj do tamagoyaki.":{"en":"Lightly oil a nonstick pan and roll the egg mixture in stages to make tamagoyaki.","ja":"フッ素加工のフライパンに少量の油を塗り、卵液を少しずつ巻いて卵焼きを作ります。"},"Dashi zahřej, odstav z varu, rozmíchej v něm miso a přidej namočenou wakame.":{"en":"Heat the dashi, remove it from the heat, dissolve in the miso and add the soaked wakame.","ja":"だしを温めて火を止め、味噌を溶き、戻したわかめを加えます。"},"Tamagoyaki podávej společně s teplou miso polévkou.":{"en":"Serve the tamagoyaki with the warm miso soup.","ja":"卵焼きを温かい味噌汁と一緒に盛り付けます。"},"Vejce, špenát, miso a wakame koupíš v běžném supermarketu. Dashi je také v konbini nebo drogerii.":{"en":"Eggs, spinach, miso and wakame are available in regular supermarkets. Dashi is also sold in convenience stores and drugstores.","ja":"卵、ほうれん草、味噌、わかめは一般的なスーパーで購入できます。だしはコンビニやドラッグストアでも販売されています。"},"Špenát můžeš umýt a nakrájet večer. Miso přidávej až po odstavení vývaru.":{"en":"Wash and chop the spinach the night before. Add the miso only after removing the stock from the heat.","ja":"ほうれん草は前日に洗って切っておけます。味噌はだしを火から下ろしてから加えます。"},"Tamagoyaki lze zamrazit na 2–3 týdny; polévku nezamrazuj.":{"en":"Tamagoyaki can be frozen for 2–3 weeks; do not freeze the soup.","ja":"卵焼きは2〜3週間冷凍できます。味噌汁は冷凍しません。"},"Tamagoyaki 2 dny v lednici, polévka 1 den.":{"en":"Keep tamagoyaki for 2 days and soup for 1 day in the refrigerator.","ja":"卵焼きは冷蔵で2日、味噌汁は1日保存できます。"},"Pro děti sniž množství miso pasty, aby byla polévka méně slaná.":{"en":"Use less miso for children to make the soup less salty.","ja":"子ども用は味噌を減らし、塩分を控えます。"},"170 g Oikos natural bez cukru":{"en":"170 g unsweetened plain Oikos","ja":"無糖プレーンオイコス 170 g"},"70 g borůvek":{"en":"70 g blueberries","ja":"ブルーベリー 70 g"},"5 g chia semínek":{"en":"5 g chia seeds","ja":"チアシード 5 g"},"2 g matcha":{"en":"2 g matcha","ja":"抹茶 2 g"},"erythritol podle chuti":{"en":"Erythritol to taste","ja":"エリスリトール 適量"},"170 g řeckého jogurtu":{"en":"170 g Greek yogurt","ja":"ギリシャヨーグルト 170 g"},"1 g matcha":{"en":"1 g matcha","ja":"抹茶 1 g"},"1 lžička medu":{"en":"1 tsp honey","ja":"はちみつ 小さじ1"},"Matchu rozmíchej v jedné lžíci jogurtu, aby nevznikly hrudky.":{"en":"Mix the matcha with one spoonful of yogurt until smooth.","ja":"抹茶をヨーグルト大さじ1杯分と混ぜ、ダマをなくします。"},"Přidej zbytek jogurtu a chia semínka.":{"en":"Add the remaining yogurt and chia seeds.","ja":"残りのヨーグルトとチアシードを加えます。"},"Navrch dej borůvky a podle chuti oslaď.":{"en":"Top with blueberries and sweeten to taste.","ja":"ブルーベリーをのせ、好みの甘さに調整します。"},"Oikos, mražené borůvky a matcha jsou běžně v AEON, Seiyu, Costco nebo konbini.":{"en":"Oikos, frozen blueberries and matcha are commonly available at AEON, Seiyu, Costco and convenience stores.","ja":"オイコス、冷凍ブルーベリー、抹茶はAEON、SEIYU、Costco、コンビニなどで購入できます。"},"Borůvky nech přes noc povolit v lednici, pokud je nechceš jíst zmrzlé.":{"en":"Thaw the blueberries overnight in the refrigerator if you do not want to eat them frozen.","ja":"冷凍のまま食べない場合は、ブルーベリーを冷蔵庫で一晩解凍します。"},"Hotovou misku nezamrazuj.":{"en":"Do not freeze the assembled bowl.","ja":"完成したボウルは冷凍しないでください。"},"V lednici přibližně 24 hodin.":{"en":"Keeps for about 24 hours in the refrigerator.","ja":"冷蔵で約24時間保存できます。"},"Pro děti použij méně matcha a místo erythritolu malé množství medu.":{"en":"For children, use less matcha and a small amount of honey instead of erythritol.","ja":"子ども用は抹茶を減らし、エリスリトールの代わりにはちみつを少量使います。"},"150 g vaječných bílků":{"en":"150 g egg whites","ja":"卵白 150 g"},"100 g kinu tofu":{"en":"100 g silken tofu","ja":"絹ごし豆腐 100 g"},"100 g žampionů nebo shimeji":{"en":"100 g button mushrooms or shimeji","ja":"マッシュルームまたはしめじ 100 g"},"Houby nasucho orestuj na nepřilnavé pánvi.":{"en":"Dry-fry the mushrooms in a nonstick pan.","ja":"きのこをフッ素加工のフライパンで油を使わずに炒めます。"},"Přidej rozdrobené tofu a krátce prohřej.":{"en":"Add the crumbled tofu and warm it briefly.","ja":"崩した豆腐を加えて軽く温めます。"},"Přilij bílky a míchej, dokud neztuhnou.":{"en":"Pour in the egg whites and stir until fully set.","ja":"卵白を加え、完全に固まるまで混ぜます。"},"Dochuť sójovou omáčkou a posyp jarní cibulkou.":{"en":"Season with soy sauce and top with green onion.","ja":"しょうゆで味付けし、青ねぎをのせます。"},"Tekuté bílky lze nahradit bílky ze 3 vajec. Tofu a houby koupíš v každém supermarketu.":{"en":"Liquid egg whites can be replaced with the whites from 3 eggs. Tofu and mushrooms are available in every supermarket.","ja":"液体卵白は卵3個分の卵白で代用できます。豆腐ときのこはどのスーパーでも購入できます。"},"Houby můžeš nakrájet večer a uchovat v uzavřené krabičce.":{"en":"Slice the mushrooms the night before and keep them in a closed container.","ja":"きのこは前日に切り、密閉容器で保存できます。"},"Nedoporučuje se.":{"en":"Freezing is not recommended.","ja":"冷凍はおすすめしません。"},"V lednici maximálně 1 den.":{"en":"Keep for no more than 1 day in the refrigerator.","ja":"冷蔵で最大1日保存できます。"},"Pro rodinnou verzi můžeš použít dvě celá vejce místo bílků.":{"en":"For the family version, use two whole eggs instead of egg whites.","ja":"家族向けは卵白の代わりに全卵2個を使えます。"},"100 g tuňáka ve vlastní šťávě, okapaného":{"en":"100 g tuna in water, drained","ja":"水煮ツナ（汁を切る）100 g"},"100 g okurky":{"en":"100 g cucumber","ja":"きゅうり 100 g"},"2 g nori":{"en":"2 g nori","ja":"のり 2 g"},"Tofu dej do misky a lehce ho rozděl lžící.":{"en":"Place the tofu in a bowl and gently break it up with a spoon.","ja":"豆腐をボウルに入れ、スプーンで軽く崩します。"},"Přidej okapaného tuňáka a nakrájenou okurku.":{"en":"Add the drained tuna and sliced cucumber.","ja":"汁を切ったツナと切ったきゅうりを加えます。"},"Posyp nori a zakápni sójovou omáčkou.":{"en":"Top with nori and drizzle with soy sauce.","ja":"のりをのせ、しょうゆをかけます。"},"Tuňáka ve vlastní šťávě, tofu, okurku a nori koupíš v každém japonském supermarketu.":{"en":"Tuna in water, tofu, cucumber and nori are available in every Japanese supermarket.","ja":"水煮ツナ、豆腐、きゅうり、のりは日本のスーパーで購入できます。"},"Okurku můžeš nakrájet večer; tuňáka otevři až před jídlem.":{"en":"Slice the cucumber the night before; open the tuna just before eating.","ja":"きゅうりは前日に切れます。ツナは食べる直前に開けます。"},"Po smíchání spotřebuj do 24 hodin.":{"en":"Eat within 24 hours after mixing.","ja":"混ぜた後は24時間以内に食べます。"},"Pro děti použij méně sójové omáčky a všechny části nech případně oddělené.":{"en":"For children, use less soy sauce and serve the components separately if helpful.","ja":"子ども用はしょうゆを減らし、必要なら材料を別々に盛り付けます。"},"100 g kuřecích prsou":{"en":"100 g chicken breast","ja":"鶏むね肉 100 g"},"3 g sušené wakame":{"en":"3 g dried wakame","ja":"乾燥わかめ 3 g"},"250 ml dashi vývaru":{"en":"250 ml dashi stock","ja":"だし 250 ml"},"Kuřecí maso nakrájej na malé kousky a povař ho v dashi do úplného propečení.":{"en":"Cut the chicken into small pieces and simmer it in the dashi until fully cooked.","ja":"鶏肉を小さく切り、だしで中心まで完全に火が通るまで煮ます。"},"Přidej tofu, špenát a namočenou wakame.":{"en":"Add the tofu, spinach and soaked wakame.","ja":"豆腐、ほうれん草、戻したわかめを加えます。"},"Hrnec odstav z varu a rozmíchej v polévce miso pastu.":{"en":"Remove the pot from the heat and dissolve in the miso paste.","ja":"鍋を火から下ろし、味噌を溶きます。"},"Kuřecí prsa, tofu, miso, špenát a wakame jsou běžné v japonských supermarketech.":{"en":"Chicken breast, tofu, miso, spinach and wakame are common supermarket ingredients in Japan.","ja":"鶏むね肉、豆腐、味噌、ほうれん草、わかめは日本のスーパーで一般的に購入できます。"},"Kuře můžeš uvařit předem a ráno ho jen ohřát v polévce.":{"en":"Cook the chicken ahead and simply reheat it in the soup in the morning.","ja":"鶏肉を事前に加熱しておけば、朝はスープで温めるだけです。"},"Základ bez tofu a miso lze zamrazit na 1 měsíc.":{"en":"The base without tofu and miso can be frozen for 1 month.","ja":"豆腐と味噌を入れる前のスープは1か月冷凍できます。"},"V lednici 2 dny.":{"en":"Keeps for 2 days in the refrigerator.","ja":"冷蔵で2日保存できます。"},"Pro děti použij méně miso a kuře nakrájej na malé měkké kousky.":{"en":"For children, use less miso and cut the chicken into small tender pieces.","ja":"子ども用は味噌を減らし、鶏肉を小さく柔らかい状態にします。"},"200 g shirataki nudlí":{"en":"200 g shirataki noodles","ja":"しらたき 200 g"},"100 g pekingského zelí":{"en":"100 g napa cabbage","ja":"白菜 100 g"},"50 g mrkve":{"en":"50 g carrot","ja":"にんじん 50 g"},"15 ml yakisoba omáčky":{"en":"15 ml yakisoba sauce","ja":"焼きそばソース 15 ml"},"10 ml yakisoba omáčky":{"en":"10 ml yakisoba sauce","ja":"焼きそばソース 10 ml"},"Shirataki důkladně propláchni a 3–4 minuty je opékej na suché pánvi, aby ztratily vodu.":{"en":"Rinse the shirataki thoroughly and dry-fry for 3–4 minutes to remove excess water.","ja":"しらたきをよく洗い、余分な水分を飛ばすために乾煎りで3〜4分炒めます。"},"Přidej nakrájené kuře a tepelně ho uprav do úplného propečení.":{"en":"Add the sliced chicken and cook it completely through.","ja":"切った鶏肉を加え、中心まで完全に火を通します。"},"Přidej zelí a mrkev, krátce orestuj a nakonec vmíchej omáčku.":{"en":"Add the cabbage and carrot, stir-fry briefly and mix in the sauce at the end.","ja":"白菜とにんじんを加えて軽く炒め、最後にソースを混ぜます。"},"Shirataki, kuřecí prsa, hakusai a yakisoba omáčku koupíš v běžném japonském supermarketu.":{"en":"Shirataki, chicken breast, napa cabbage and yakisoba sauce are available in regular Japanese supermarkets.","ja":"しらたき、鶏むね肉、白菜、焼きそばソースは一般的な日本のスーパーで購入できます。"},"Shirataki předem propláchni a kuře se zeleninou si můžeš nakrájet večer.":{"en":"Rinse the shirataki ahead and cut the chicken and vegetables the night before.","ja":"しらたきは先に洗い、鶏肉と野菜は前日に切っておけます。"},"Nezamrazuj; shirataki po rozmrazení mění strukturu.":{"en":"Do not freeze; shirataki changes texture after thawing.","ja":"しらたきは解凍後に食感が変わるため冷凍しません。"},"V lednici maximálně 2 dny.":{"en":"Keep for no more than 2 days in the refrigerator.","ja":"冷蔵で最大2日保存できます。"},"Pro děti použij méně omáčky a nudle před podáváním zkrať nůžkami.":{"en":"For children, use less sauce and cut the noodles shorter with kitchen scissors before serving.","ja":"子ども用はソースを減らし、盛り付け前にキッチンばさみで麺を短くします。"},"150 g filetu z tresky":{"en":"150 g cod fillet","ja":"たら切り身 150 g"},"50 g hub enoki":{"en":"50 g enoki mushrooms","ja":"えのき 50 g"},"20 g čerstvého zázvoru":{"en":"20 g fresh ginger","ja":"生姜 20 g"},"10 ml vody":{"en":"10 ml water","ja":"水 10 ml"},"5 ml rýžového octa":{"en":"5 ml rice vinegar","ja":"米酢 5 ml"},"10 g čerstvého zázvoru":{"en":"10 g fresh ginger","ja":"生姜 10 g"},"Rybu polož na pečicí papír nebo do nádoby vhodné pro vaření v páře.":{"en":"Place the fish on baking paper or in a steam-safe dish.","ja":"魚をクッキングシートまたは蒸し器対応の容器に置きます。"},"Přidej plátky zázvoru, enoki, vodu a rýžový ocet.":{"en":"Add sliced ginger, enoki, water and rice vinegar.","ja":"薄切り生姜、えのき、水、米酢を加えます。"},"Zakryj a vař v páře přibližně 12–15 minut, dokud není ryba úplně hotová.":{"en":"Cover and steam for about 12–15 minutes, until the fish is fully cooked.","ja":"ふたをして、魚に完全に火が通るまで約12〜15分蒸します。"},"Posyp jarní cibulkou a podávej.":{"en":"Top with green onion and serve.","ja":"青ねぎをのせて盛り付けます。"},"Tresku, enoki, zázvor a jarní cibulku koupíš v rybím oddělení běžného supermarketu.":{"en":"Cod, enoki, ginger and green onion are available in the fish section of regular supermarkets.","ja":"たら、えのき、生姜、青ねぎは一般的なスーパーの鮮魚売り場などで購入できます。"},"Balíček můžeš sestavit několik hodin předem a uchovat v lednici.":{"en":"Assemble the parcel several hours ahead and keep it refrigerated.","ja":"数時間前に包みを準備し、冷蔵庫で保管できます。"},"Syrovou připravenou rybu lze zamrazit; po tepelné úpravě je lepší čerstvá.":{"en":"The prepared raw fish can be frozen; after cooking it is best eaten fresh.","ja":"調理前の魚は冷凍できます。加熱後はできたてがおすすめです。"},"Po uvaření spotřebuj do 1 dne.":{"en":"Eat within 1 day after cooking.","ja":"加熱後は1日以内に食べます。"},"Pro děti použij polovinu zázvoru a před podáváním pečlivě zkontroluj kosti.":{"en":"For children, use half the ginger and carefully check for bones before serving.","ja":"子ども用は生姜を半量にし、盛り付け前に骨がないか丁寧に確認します。"},"150 g kinu tofu":{"en":"150 g silken tofu","ja":"絹ごし豆腐 150 g"},"1 vejce":{"en":"1 egg","ja":"卵 1個"},"100 g kimchi":{"en":"100 g kimchi","ja":"キムチ 100 g"},"100 g hub shimeji":{"en":"100 g shimeji mushrooms","ja":"しめじ 100 g"},"250 ml vody":{"en":"250 ml water","ja":"水 250 ml"},"50 g jemného kimchi":{"en":"50 g mild kimchi","ja":"辛さ控えめキムチ 50 g"},"Vodu přiveď k mírnému varu a přidej houby a kimchi.":{"en":"Bring the water to a gentle simmer and add the mushrooms and kimchi.","ja":"水を弱く沸騰させ、きのことキムチを加えます。"},"Přidej tofu nakrájené na větší kostky.":{"en":"Add the tofu cut into large cubes.","ja":"豆腐を大きめの角切りにして加えます。"},"Vejce rozklepni do polévky a vař, dokud není bílek zcela pevný.":{"en":"Crack the egg into the soup and cook until the white is completely firm.","ja":"卵をスープに割り入れ、白身が完全に固まるまで加熱します。"},"Odstav z varu a rozmíchej miso pastu.":{"en":"Remove from the heat and dissolve in the miso paste.","ja":"火を止めて味噌を溶きます。"},"Kimchi, tofu, vejce, shimeji a miso koupíš v běžném japonském supermarketu.":{"en":"Kimchi, tofu, eggs, shimeji and miso are available in regular Japanese supermarkets.","ja":"キムチ、豆腐、卵、しめじ、味噌は一般的な日本のスーパーで購入できます。"},"Houby si můžeš očistit a rozdělit předem.":{"en":"Clean and separate the mushrooms ahead of time.","ja":"きのこは事前にほぐしておけます。"},"Nezamrazuj s tofu a vejcem.":{"en":"Do not freeze with the tofu and egg.","ja":"豆腐と卵を入れた状態では冷凍しません。"},"V lednici 1 den.":{"en":"Keeps for 1 day in the refrigerator.","ja":"冷蔵で1日保存できます。"},"Pro děti použij jemné kimchi nebo ho vynech a sniž množství miso.":{"en":"For children, use mild kimchi or omit it, and reduce the miso.","ja":"子ども用は辛さ控えめキムチにするか省き、味噌も減らします。"},"120 g kuřecích prsou":{"en":"120 g chicken breast","ja":"鶏むね肉 120 g"},"200 g zelí":{"en":"200 g cabbage","ja":"キャベツ 200 g"},"15 ml ponzu omáčky":{"en":"15 ml ponzu sauce","ja":"ポン酢 15 ml"},"5 g sezamových semínek":{"en":"5 g sesame seeds","ja":"ごま 5 g"},"10 ml ponzu omáčky":{"en":"10 ml ponzu sauce","ja":"ポン酢 10 ml"},"3 g sezamových semínek":{"en":"3 g sesame seeds","ja":"ごま 3 g"},"Kuře nakrájej na tenké kousky a opeč ho na nepřilnavé pánvi do úplného propečení.":{"en":"Slice the chicken thinly and cook it completely through in a nonstick pan.","ja":"鶏肉を薄く切り、フッ素加工のフライパンで中心まで完全に火を通します。"},"Přidej zelí a houby a podlij malým množstvím vody.":{"en":"Add the cabbage and mushrooms with a small splash of water.","ja":"キャベツときのこを加え、少量の水を入れます。"},"Přikryj a nech zeleninu změknout.":{"en":"Cover and cook until the vegetables soften.","ja":"ふたをして野菜が柔らかくなるまで加熱します。"},"Vmíchej ponzu a posyp sezamem.":{"en":"Mix in the ponzu and sprinkle with sesame.","ja":"ポン酢を混ぜ、ごまをふります。"},"Kuřecí prsa, zelí, shimeji a ponzu jsou dostupné v každém větším supermarketu.":{"en":"Chicken breast, cabbage, shimeji and ponzu are available in every larger supermarket.","ja":"鶏むね肉、キャベツ、しめじ、ポン酢は大型スーパーで購入できます。"},"Zeleninu a kuře můžeš nakrájet předem a uchovat odděleně.":{"en":"Cut the vegetables and chicken ahead and store them separately.","ja":"野菜と鶏肉は事前に切り、別々に保存できます。"},"Hotové jídlo lze zamrazit na 1 měsíc.":{"en":"The cooked dish can be frozen for 1 month.","ja":"完成した料理は1か月冷凍できます。"},"V lednici 2–3 dny.":{"en":"Keeps for 2–3 days in the refrigerator.","ja":"冷蔵で2〜3日保存できます。"},"Pro děti použij méně ponzu a zelí nech změknout o něco déle.":{"en":"For children, use less ponzu and cook the cabbage a little longer.","ja":"子ども用はポン酢を減らし、キャベツを少し長めに加熱します。"},"120 g filetu z lososa":{"en":"120 g salmon fillet","ja":"鮭切り身 120 g"},"100 g čerstvého špenátu":{"en":"100 g fresh spinach","ja":"ほうれん草 100 g"},"10 ml citronové šťávy":{"en":"10 ml lemon juice","ja":"レモン汁 10 ml"},"Lososa polož na pečicí papír nebo alobal a přidej houby a špenát.":{"en":"Place the salmon on baking paper or foil and add the mushrooms and spinach.","ja":"鮭をクッキングシートまたはアルミホイルに置き、きのことほうれん草を加えます。"},"Zakápni citronovou šťávou a sójovou omáčkou.":{"en":"Drizzle with lemon juice and soy sauce.","ja":"レモン汁としょうゆをかけます。"},"Balíček uzavři a peč přibližně 18–20 minut na 190 °C, dokud není losos hotový.":{"en":"Seal the parcel and bake at 190°C for about 18–20 minutes, until the salmon is fully cooked.","ja":"包みを閉じ、鮭に完全に火が通るまで190°Cで約18〜20分焼きます。"},"Lososa, houby a špenát koupíš v čerstvém nebo mraženém oddělení supermarketu.":{"en":"Salmon, mushrooms and spinach are available in the fresh or frozen section of supermarkets.","ja":"鮭、きのこ、ほうれん草はスーパーの生鮮または冷凍売り場で購入できます。"},"Balíček lze připravit několik hodin dopředu a uchovat v lednici.":{"en":"Assemble the parcel several hours ahead and keep it refrigerated.","ja":"数時間前に包みを準備し、冷蔵庫で保管できます。"},"Syrový připravený balíček lze zamrazit bez špenátu na 1 měsíc.":{"en":"The raw prepared parcel can be frozen without the spinach for 1 month.","ja":"ほうれん草を除いた調理前の包みは1か月冷凍できます。"},"Po upečení spotřebuj do 1 dne.":{"en":"Eat within 1 day after baking.","ja":"焼いた後は1日以内に食べます。"},"Pro děti použij méně sójové omáčky a před podáváním rybu rozděl na malé kousky.":{"en":"For children, use less soy sauce and break the fish into small pieces before serving.","ja":"子ども用はしょうゆを減らし、盛り付け前に魚を小さくほぐします。"},"100 g edamame bez lusků":{"en":"100 g shelled edamame","ja":"むき枝豆 100 g"},"Okapaného tuňáka dej do misky.":{"en":"Place the drained tuna in a bowl.","ja":"汁を切ったツナをボウルに入れます。"},"Přidej uvařené edamame a nakrájenou okurku.":{"en":"Add the cooked edamame and sliced cucumber.","ja":"加熱した枝豆と切ったきゅうりを加えます。"},"Zakápni citronovou a sójovou omáčkou a posyp sezamem.":{"en":"Drizzle with lemon juice and soy sauce, then sprinkle with sesame.","ja":"レモン汁としょうゆをかけ、ごまをふります。"},"Tuňáka ve vlastní šťávě, mražené edamame, okurku a sezam koupíš v běžném supermarketu.":{"en":"Tuna in water, frozen edamame, cucumber and sesame are available in regular supermarkets.","ja":"水煮ツナ、冷凍枝豆、きゅうり、ごまは一般的なスーパーで購入できます。"},"Edamame uvař předem a uchovej je v lednici.":{"en":"Cook the edamame ahead and keep it refrigerated.","ja":"枝豆は事前に加熱し、冷蔵庫で保存できます。"},"Pro děti použij méně sójové omáčky a edamame můžeš lehce rozmačkat.":{"en":"For children, use less soy sauce and lightly mash the edamame if needed.","ja":"子ども用はしょうゆを減らし、必要なら枝豆を軽くつぶします。"}};
  const trLineBeforeV13 = trLine;
  trLine = function trLineV13(value) {
    const source = String(value ?? '');
    if (lang !== 'cs' && V13_LINE_EXACT[source]?.[lang]) return V13_LINE_EXACT[source][lang];
    return trLineBeforeV13(source);
  };
  const V13_RECIPES = [{"id":64,"name":"Nattó tofu don bez rýže","chapter":"10. Nízkokalorické snídaně","emoji":"🥢","kind":"Nízkokalorická snídaně","flavor":"natto tofu","kcal":186,"p":18.2,"c":9.1,"f":9.8,"fiber":3.4,"time":"8 min","diff":"Velmi snadné","cost":180,"servings":1,"stores":"Nattó a kinu tofu koupíš v každém japonském supermarketu nebo konbini.","prep":"Jarní cibulku můžeš nakrájet večer. Tofu otevři až před podáváním.","freeze":"Nezamrazuj.","keep":"Nejlepší je čerstvé; v lednici maximálně 1 den.","ingredients":["45 g nattó (1 balení)","150 g hedvábného tofu","10 g jarní cibulky","5 ml sójové omáčky se sníženým obsahem soli"],"familyIngredients":["45 g nattó (1 balení)","150 g hedvábného tofu","10 g jarní cibulky","3 ml sójové omáčky se sníženým obsahem soli"],"steps":["Tofu zlehka rozmačkej v misce jako základ místo rýže.","Nattó důkladně promíchej s přiloženou omáčkou, až bude lehce pěnové.","Nattó dej na tofu, přidej jarní cibulku a zakápni sójovou omáčkou."],"familySwap":["Pro děti použij méně sójové omáčky a nattó podávej odděleně, pokud jim jeho chuť nevyhovuje."],"image":""},{"id":65,"name":"Tamagoyaki se špenátem a miso polévkou","chapter":"10. Nízkokalorické snídaně","emoji":"🍳","kind":"Nízkokalorická snídaně","flavor":"vejce miso","kcal":191,"p":16.4,"c":6.5,"f":11.4,"fiber":2.7,"time":"15 min","diff":"Snadné","cost":210,"servings":1,"stores":"Vejce, špenát, miso a wakame koupíš v běžném supermarketu. Dashi je také v konbini nebo drogerii.","prep":"Špenát můžeš umýt a nakrájet večer. Miso přidávej až po odstavení vývaru.","freeze":"Tamagoyaki lze zamrazit na 2–3 týdny; polévku nezamrazuj.","keep":"Tamagoyaki 2 dny v lednici, polévka 1 den.","ingredients":["2 vejce","50 g čerstvého špenátu","200 ml dashi vývaru","10 g miso pasty","3 g sušené wakame (asi 30 g po namočení)","1 g oleje na pánev"],"familyIngredients":["2 vejce","50 g čerstvého špenátu","200 ml dashi vývaru","7 g miso pasty","3 g sušené wakame (asi 30 g po namočení)","1 g oleje na pánev"],"steps":["Vejce rozšlehej a vmíchej nasekaný špenát.","Na nepřilnavé pánvi potřené minimem oleje směs postupně sroluj do tamagoyaki.","Dashi zahřej, odstav z varu, rozmíchej v něm miso a přidej namočenou wakame.","Tamagoyaki podávej společně s teplou miso polévkou."],"familySwap":["Pro děti sniž množství miso pasty, aby byla polévka méně slaná."],"image":""},{"id":66,"name":"Matcha Oikos miska s borůvkami","chapter":"10. Nízkokalorické snídaně","emoji":"🍵","kind":"Nízkokalorická snídaně","flavor":"matcha borůvky","kcal":171,"p":19.4,"c":21,"f":1.9,"fiber":4.2,"time":"5 min","diff":"Velmi snadné","cost":260,"servings":1,"stores":"Oikos, mražené borůvky a matcha jsou běžně v AEON, Seiyu, Costco nebo konbini.","prep":"Borůvky nech přes noc povolit v lednici, pokud je nechceš jíst zmrzlé.","freeze":"Hotovou misku nezamrazuj.","keep":"V lednici přibližně 24 hodin.","ingredients":["170 g Oikos natural bez cukru","70 g borůvek","5 g chia semínek","2 g matcha","erythritol podle chuti"],"familyIngredients":["170 g řeckého jogurtu","70 g borůvek","5 g chia semínek","1 g matcha","1 lžička medu"],"steps":["Matchu rozmíchej v jedné lžíci jogurtu, aby nevznikly hrudky.","Přidej zbytek jogurtu a chia semínka.","Navrch dej borůvky a podle chuti oslaď."],"familySwap":["Pro děti použij méně matcha a místo erythritolu malé množství medu."],"image":""},{"id":67,"name":"Tofu scramble z bílků a hub","chapter":"10. Nízkokalorické snídaně","emoji":"🍄","kind":"Nízkokalorická snídaně","flavor":"tofu houby","kcal":169,"p":26.6,"c":8.3,"f":4.1,"fiber":3.3,"time":"12 min","diff":"Snadné","cost":230,"servings":1,"stores":"Tekuté bílky lze nahradit bílky ze 3 vajec. Tofu a houby koupíš v každém supermarketu.","prep":"Houby můžeš nakrájet večer a uchovat v uzavřené krabičce.","freeze":"Nedoporučuje se.","keep":"V lednici maximálně 1 den.","ingredients":["150 g vaječných bílků","100 g kinu tofu","100 g žampionů nebo shimeji","5 ml sójové omáčky se sníženým obsahem soli","10 g jarní cibulky"],"familyIngredients":["2 vejce","100 g kinu tofu","100 g žampionů nebo shimeji","3 ml sójové omáčky se sníženým obsahem soli","10 g jarní cibulky"],"steps":["Houby nasucho orestuj na nepřilnavé pánvi.","Přidej rozdrobené tofu a krátce prohřej.","Přilij bílky a míchej, dokud neztuhnou.","Dochuť sójovou omáčkou a posyp jarní cibulkou."],"familySwap":["Pro rodinnou verzi můžeš použít dvě celá vejce místo bílků."],"image":""},{"id":68,"name":"Tuňáková tofu miska s okurkou","chapter":"10. Nízkokalorické snídaně","emoji":"🐟","kind":"Nízkokalorická snídaně","flavor":"tuňák tofu","kcal":200,"p":34,"c":6.5,"f":4.5,"fiber":1.8,"time":"7 min","diff":"Velmi snadné","cost":290,"servings":1,"stores":"Tuňáka ve vlastní šťávě, tofu, okurku a nori koupíš v každém japonském supermarketu.","prep":"Okurku můžeš nakrájet večer; tuňáka otevři až před jídlem.","freeze":"Nezamrazuj.","keep":"Po smíchání spotřebuj do 24 hodin.","ingredients":["100 g tuňáka ve vlastní šťávě, okapaného","100 g kinu tofu","100 g okurky","2 g nori","5 ml sójové omáčky se sníženým obsahem soli"],"familyIngredients":["100 g tuňáka ve vlastní šťávě, okapaného","100 g kinu tofu","100 g okurky","2 g nori","3 ml sójové omáčky se sníženým obsahem soli"],"steps":["Tofu dej do misky a lehce ho rozděl lžící.","Přidej okapaného tuňáka a nakrájenou okurku.","Posyp nori a zakápni sójovou omáčkou."],"familySwap":["Pro děti použij méně sójové omáčky a všechny části nech případně oddělené."],"image":""},{"id":69,"name":"Kuřecí miso polévka s tofu","chapter":"10. Nízkokalorické snídaně","emoji":"🍲","kind":"Nízkokalorická snídaně","flavor":"kuře miso","kcal":266,"p":41.5,"c":7.7,"f":8,"fiber":3.2,"time":"18 min","diff":"Snadné","cost":260,"servings":1,"stores":"Kuřecí prsa, tofu, miso, špenát a wakame jsou běžné v japonských supermarketech.","prep":"Kuře můžeš uvařit předem a ráno ho jen ohřát v polévce.","freeze":"Základ bez tofu a miso lze zamrazit na 1 měsíc.","keep":"V lednici 2 dny.","ingredients":["100 g kuřecích prsou","100 g kinu tofu","50 g čerstvého špenátu","10 g miso pasty","3 g sušené wakame","250 ml dashi vývaru"],"familyIngredients":["100 g kuřecích prsou","100 g kinu tofu","50 g čerstvého špenátu","7 g miso pasty","3 g sušené wakame","250 ml dashi vývaru"],"steps":["Kuřecí maso nakrájej na malé kousky a povař ho v dashi do úplného propečení.","Přidej tofu, špenát a namočenou wakame.","Hrnec odstav z varu a rozmíchej v polévce miso pastu."],"familySwap":["Pro děti použij méně miso a kuře nakrájej na malé měkké kousky."],"image":""},{"id":70,"name":"Shirataki nudle s kuřecím masem","chapter":"11. Nízkokalorické večeře","emoji":"🍜","kind":"Nízkokalorická večeře","flavor":"kuře shirataki","kcal":236,"p":33.3,"c":18.8,"f":4.2,"fiber":8.2,"time":"20 min","diff":"Snadné","cost":300,"servings":1,"stores":"Shirataki, kuřecí prsa, hakusai a yakisoba omáčku koupíš v běžném japonském supermarketu.","prep":"Shirataki předem propláchni a kuře se zeleninou si můžeš nakrájet večer.","freeze":"Nezamrazuj; shirataki po rozmrazení mění strukturu.","keep":"V lednici maximálně 2 dny.","ingredients":["200 g shirataki nudlí","100 g kuřecích prsou","100 g pekingského zelí","50 g mrkve","15 ml yakisoba omáčky"],"familyIngredients":["200 g shirataki nudlí","100 g kuřecích prsou","100 g pekingského zelí","50 g mrkve","10 ml yakisoba omáčky"],"steps":["Shirataki důkladně propláchni a 3–4 minuty je opékej na suché pánvi, aby ztratily vodu.","Přidej nakrájené kuře a tepelně ho uprav do úplného propečení.","Přidej zelí a mrkev, krátce orestuj a nakonec vmíchej omáčku."],"familySwap":["Pro děti použij méně omáčky a nudle před podáváním zkrať nůžkami."],"image":""},{"id":71,"name":"Treska v páře se zázvorem","chapter":"11. Nízkokalorické večeře","emoji":"🐟","kind":"Nízkokalorická večeře","flavor":"treska zázvor","kcal":156,"p":29.1,"c":6.6,"f":1.4,"fiber":1.9,"time":"22 min","diff":"Snadné","cost":360,"servings":1,"stores":"Tresku, enoki, zázvor a jarní cibulku koupíš v rybím oddělení běžného supermarketu.","prep":"Balíček můžeš sestavit několik hodin předem a uchovat v lednici.","freeze":"Syrovou připravenou rybu lze zamrazit; po tepelné úpravě je lepší čerstvá.","keep":"Po uvaření spotřebuj do 1 dne.","ingredients":["150 g filetu z tresky","50 g hub enoki","20 g čerstvého zázvoru","10 ml vody","5 ml rýžového octa","10 g jarní cibulky"],"familyIngredients":["150 g filetu z tresky","50 g hub enoki","10 g čerstvého zázvoru","10 ml vody","5 ml rýžového octa","10 g jarní cibulky"],"steps":["Rybu polož na pečicí papír nebo do nádoby vhodné pro vaření v páře.","Přidej plátky zázvoru, enoki, vodu a rýžový ocet.","Zakryj a vař v páře přibližně 12–15 minut, dokud není ryba úplně hotová.","Posyp jarní cibulkou a podávej."],"familySwap":["Pro děti použij polovinu zázvoru a před podáváním pečlivě zkontroluj kosti."],"image":""},{"id":72,"name":"Tofu kimchi polévka s vejcem","chapter":"11. Nízkokalorické večeře","emoji":"🌶️","kind":"Nízkokalorická večeře","flavor":"tofu kimchi","kcal":229,"p":21.6,"c":14.2,"f":11.4,"fiber":6.2,"time":"18 min","diff":"Snadné","cost":260,"servings":1,"stores":"Kimchi, tofu, vejce, shimeji a miso koupíš v běžném japonském supermarketu.","prep":"Houby si můžeš očistit a rozdělit předem.","freeze":"Nezamrazuj s tofu a vejcem.","keep":"V lednici 1 den.","ingredients":["150 g kinu tofu","1 vejce","100 g kimchi","100 g hub shimeji","10 g miso pasty","250 ml vody"],"familyIngredients":["150 g kinu tofu","1 vejce","50 g jemného kimchi","100 g hub shimeji","7 g miso pasty","250 ml vody"],"steps":["Vodu přiveď k mírnému varu a přidej houby a kimchi.","Přidej tofu nakrájené na větší kostky.","Vejce rozklepni do polévky a vař, dokud není bílek zcela pevný.","Odstav z varu a rozmíchej miso pastu."],"familySwap":["Pro děti použij jemné kimchi nebo ho vynech a sniž množství miso."],"image":""},{"id":73,"name":"Kuřecí pánev se zelím a ponzu","chapter":"11. Nízkokalorické večeře","emoji":"🥬","kind":"Nízkokalorická večeře","flavor":"kuře zelí","kcal":309,"p":44.3,"c":18.5,"f":7.3,"fiber":8.1,"time":"20 min","diff":"Snadné","cost":290,"servings":1,"stores":"Kuřecí prsa, zelí, shimeji a ponzu jsou dostupné v každém větším supermarketu.","prep":"Zeleninu a kuře můžeš nakrájet předem a uchovat odděleně.","freeze":"Hotové jídlo lze zamrazit na 1 měsíc.","keep":"V lednici 2–3 dny.","ingredients":["120 g kuřecích prsou","200 g zelí","100 g hub shimeji","15 ml ponzu omáčky","5 g sezamových semínek"],"familyIngredients":["120 g kuřecích prsou","200 g zelí","100 g hub shimeji","10 ml ponzu omáčky","3 g sezamových semínek"],"steps":["Kuře nakrájej na tenké kousky a opeč ho na nepřilnavé pánvi do úplného propečení.","Přidej zelí a houby a podlij malým množstvím vody.","Přikryj a nech zeleninu změknout.","Vmíchej ponzu a posyp sezamem."],"familySwap":["Pro děti použij méně ponzu a zelí nech změknout o něco déle."],"image":""},{"id":74,"name":"Losos v alobalu s houbami a špenátem","chapter":"11. Nízkokalorické večeře","emoji":"🍣","kind":"Nízkokalorická večeře","flavor":"losos houby","kcal":302,"p":30.4,"c":9,"f":16.4,"fiber":4.8,"time":"25 min","diff":"Snadné","cost":450,"servings":1,"stores":"Lososa, houby a špenát koupíš v čerstvém nebo mraženém oddělení supermarketu.","prep":"Balíček lze připravit několik hodin dopředu a uchovat v lednici.","freeze":"Syrový připravený balíček lze zamrazit bez špenátu na 1 měsíc.","keep":"Po upečení spotřebuj do 1 dne.","ingredients":["120 g filetu z lososa","100 g hub shimeji","100 g čerstvého špenátu","5 ml sójové omáčky se sníženým obsahem soli","10 ml citronové šťávy"],"familyIngredients":["120 g filetu z lososa","100 g hub shimeji","100 g čerstvého špenátu","3 ml sójové omáčky se sníženým obsahem soli","10 ml citronové šťávy"],"steps":["Lososa polož na pečicí papír nebo alobal a přidej houby a špenát.","Zakápni citronovou šťávou a sójovou omáčkou.","Balíček uzavři a peč přibližně 18–20 minut na 190 °C, dokud není losos hotový."],"familySwap":["Pro děti použij méně sójové omáčky a před podáváním rybu rozděl na malé kousky."],"image":""},{"id":75,"name":"Tuňáková miska s edamame a okurkou","chapter":"11. Nízkokalorické večeře","emoji":"🥗","kind":"Nízkokalorická večeře","flavor":"tuňák edamame","kcal":274,"p":39.2,"c":14.2,"f":7.4,"fiber":5.9,"time":"10 min","diff":"Velmi snadné","cost":340,"servings":1,"stores":"Tuňáka ve vlastní šťávě, mražené edamame, okurku a sezam koupíš v běžném supermarketu.","prep":"Edamame uvař předem a uchovej je v lednici.","freeze":"Hotovou misku nezamrazuj.","keep":"V lednici maximálně 1 den.","ingredients":["100 g tuňáka ve vlastní šťávě, okapaného","100 g edamame bez lusků","100 g okurky","5 ml sójové omáčky se sníženým obsahem soli","3 g sezamových semínek","10 ml citronové šťávy"],"familyIngredients":["100 g tuňáka ve vlastní šťávě, okapaného","100 g edamame bez lusků","100 g okurky","3 ml sójové omáčky se sníženým obsahem soli","3 g sezamových semínek","10 ml citronové šťávy"],"steps":["Okapaného tuňáka dej do misky.","Přidej uvařené edamame a nakrájenou okurku.","Zakápni citronovou a sójovou omáčkou a posyp sezamem."],"familySwap":["Pro děti použij méně sójové omáčky a edamame můžeš lehce rozmačkat."],"image":""}];
  for (const recipe of V13_RECIPES) {
    if (!baseRecipes.some(item => Number(item.id) === Number(recipe.id))) baseRecipes.push(recipe);
  }
  Object.assign(UI.cs, {filterUnder300:'Do 300 kcal',filterBreakfast:'Snídaně',filterDinner:'Večeře'});
  Object.assign(UI.en, {filterUnder300:'Up to 300 kcal',filterBreakfast:'Breakfasts',filterDinner:'Dinners'});
  Object.assign(UI.ja, {filterUnder300:'300 kcal以下',filterBreakfast:'朝食',filterDinner:'夕食'});
  const passesFilterBeforeV13 = passesFilter;
  passesFilter = function passesFilterV13(recipe, key) {
    const n = nutritionFor(recipe);
    if (key === 'under300') return n.kcal <= 300;
    if (key === 'breakfast') return /snídaně/i.test(recipe.kind || '') || String(recipe.chapter).startsWith('10.');
    if (key === 'dinner') return /večeře/i.test(recipe.kind || '') || String(recipe.chapter).startsWith('11.');
    return passesFilterBeforeV13(recipe, key);
  };


  Object.assign(UI.cs, {
    editRecipeAny: 'Upravit recept',
    resetRecipe: 'Obnovit původní recept',
    confirmReset: 'Vrátit tento recept do původní verze? Vlastní fotografie zůstane zachovaná.',
    servings: 'Počet porcí z celého receptu',
    autoNutrition: 'Automaticky spočítat výživu ze surovin',
    autoNutritionHelp: 'Množství piš například „100 g“, „1 vejce“ nebo „1 lžička arašídového másla“. Hodnoty se dělí počtem porcí.',
    nutritionRecognized: 'Rozpoznané suroviny',
    nutritionMissing: 'Nezapočítané řádky',
    allRecognized: 'Všechny suroviny byly započítané.',
    manualNutrition: 'Ruční zadání výživy',
    familyIngredients: 'Přesné suroviny pro rodinnou verzi',
    familyIngredientsHint: 'Každou surovinu napiš na nový řádek. Tyto řádky se použijí pro výpočet i nákupní seznam.',
    quickAddPeanut: '+ 1 lžička arašídového másla',
    calculatedPerServing: 'Automatický výpočet na 1 porci',
    originalRecipe: 'Upravený původní recept',
    recipeSaved: 'Recept a výživové hodnoty byly uloženy.',
    unknownIngredient: 'nezapočítáno',
    nutritionWarning: 'Některé řádky nejsou rozpoznané. Doplň množství, uprav název nebo vypni automatický výpočet a zadej hodnoty ručně.',
    addIngredientExample: 'Příklad: 1 lžička arašídového másla',
    portionsShort: 'porcí'
  });
  Object.assign(UI.en, {
    editRecipeAny: 'Edit recipe',
    resetRecipe: 'Restore original recipe',
    confirmReset: 'Restore the original recipe? Your custom photo will be kept.',
    servings: 'Servings from the whole recipe',
    autoNutrition: 'Calculate nutrition automatically from ingredients',
    autoNutritionHelp: 'Enter amounts such as “100 g”, “1 egg” or “1 tsp peanut butter”. Values are divided by the number of servings.',
    nutritionRecognized: 'Recognized ingredients',
    nutritionMissing: 'Uncounted lines',
    allRecognized: 'All ingredients were counted.',
    manualNutrition: 'Manual nutrition entry',
    familyIngredients: 'Exact family-version ingredients',
    familyIngredientsHint: 'Enter one ingredient per line. These lines are used for nutrition and the shopping list.',
    quickAddPeanut: '+ 1 tsp peanut butter',
    calculatedPerServing: 'Automatic calculation per serving',
    originalRecipe: 'Edited built-in recipe',
    recipeSaved: 'Recipe and nutrition values were saved.',
    unknownIngredient: 'not counted',
    nutritionWarning: 'Some lines are not recognized. Add an amount, adjust the ingredient name, or turn off automatic calculation and enter values manually.',
    addIngredientExample: 'Example: 1 tsp peanut butter',
    portionsShort: 'servings'
  });
  Object.assign(UI.ja, {
    editRecipeAny: 'レシピを編集',
    resetRecipe: '元のレシピに戻す',
    confirmReset: '元のレシピに戻しますか？自分の写真は残ります。',
    servings: 'レシピ全体の食数',
    autoNutrition: '材料から栄養を自動計算',
    autoNutritionHelp: '「100 g」「卵1個」「ピーナッツバター小さじ1」のように入力します。栄養値は食数で割られます。',
    nutritionRecognized: '計算できた材料',
    nutritionMissing: '計算されない行',
    allRecognized: 'すべての材料を計算しました。',
    manualNutrition: '栄養値を手動入力',
    familyIngredients: '家族向けの正確な材料',
    familyIngredientsHint: '材料を1行ずつ入力します。栄養計算と買い物リストに使用されます。',
    quickAddPeanut: '+ ピーナッツバター小さじ1',
    calculatedPerServing: '1食分の自動計算',
    originalRecipe: '編集した標準レシピ',
    recipeSaved: 'レシピと栄養値を保存しました。',
    unknownIngredient: '未計算',
    nutritionWarning: '計算できない行があります。分量や材料名を修正するか、自動計算をオフにして手動入力してください。',
    addIngredientExample: '例：ピーナッツバター小さじ1',
    portionsShort: '食分'
  });

  const N = (kcal, p, c, f, fiber = 0) => ({ kcal, p, c, f, fiber });
  const FOOD_DB = [
    {key:'protein-muffin', re:/proteinov(?:é|y|ý).*muffin|protein muffin|プロテイン.*マフィン/i, perItem:N(115,10,13,3,2), itemWeight:1},
    {key:'okara-brownie', re:/okara.*brown|おから.*ブラウニー/i, perItem:N(90,8,8,3,3), itemWeight:1},
    {key:'oikos', re:/\boikos\b|オイコス/i, per100:N(59,10.3,4.7,0,0), itemGrams:113, defaultGrams:113},
    {key:'rice-cake', re:/rýžov.*chleb|rice cake|ライスケーキ/i, per100:N(387,8,81,3,4), itemGrams:9, defaultGrams:18},
    {key:'protein-powder', re:/proteinov(?:ého|ý|á|é)?\s*(?:prášku|prášek)|\bproteinu\b|protein powder|プロテインパウダー/i, per100:N(400,78,10,7,1), defaultGrams:25},
    {key:'greek-yogurt', re:/řeck.*jog|greek yogurt|ギリシャヨーグルト/i, per100:N(59,10,3.6,.4,0), defaultGrams:170},
    {key:'yogurt', re:/jogurt|yogurt|ヨーグルト/i, per100:N(65,5,7,2,0), defaultGrams:150},
    {key:'oats', re:/oves|vloček|vločky|oat|オート/i, per100:N(380,13,67,7,10), defaultGrams:50},
    {key:'chia', re:/chia|チア/i, per100:N(486,16.5,42.1,30.7,34.4), defaultGrams:10, tspGrams:4},
    {key:'blueberry', re:/borův|blueber|ブルーベリー/i, per100:N(57,.7,14.5,.3,2.4), defaultGrams:100},
    {key:'berries', re:/bobul|mražen.*ovoce|\bovoce\b|mixed berr|fruit|ベリー|フルーツ/i, per100:N(50,1,12,.4,4), defaultGrams:100},
    {key:'banana', re:/banán|banana|バナナ/i, per100:N(89,1.1,22.8,.3,2.6), itemGrams:120, smallItemGrams:90, defaultGrams:120},
    {key:'apple', re:/jabl|apple|りんご/i, per100:N(52,.3,13.8,.2,2.4), itemGrams:150, smallItemGrams:120, defaultGrams:150},
    {key:'egg', re:/vejce|egg|卵/i, per100:N(143,12.6,.7,9.5,0), itemGrams:50, defaultGrams:50},
    {key:'soy-milk', re:/sójov.*mlék|soy milk|豆乳/i, per100:N(40,3.6,2.5,2,.5), defaultGrams:100},
    {key:'milk', re:/mlék|milk|牛乳/i, per100:N(47,3.4,4.8,1.6,0), defaultGrams:100},
    {key:'shirataki', re:/shirataki|širataki|konjak|しらたき|白滝/i, per100:N(7,.2,3,.1,2.8), defaultGrams:200},
    {key:'cod', re:/tresk|cod|タラ|たら/i, per100:N(82,18,0,.7,0), defaultGrams:150},
    {key:'salmon', re:/losos|salmon|鮭/i, per100:N(208,20,0,13,0), defaultGrams:120},
    {key:'tuna', re:/tuňák|tuna|ツナ/i, per100:N(116,25.5,0,.8,0), defaultGrams:100},
    {key:'egg-white', re:/vaječn(?:ých|é)?\s*bílk|egg whites?|卵白/i, per100:N(52,10.9,.7,.2,0), defaultGrams:150},
    {key:'miso-paste', re:/miso past|miso paste|味噌/i, per100:N(199,12,26,6,5), defaultGrams:10},
    {key:'dashi', re:/dashi|出汁|だし/i, per100:N(2,.3,.1,0,0), defaultGrams:200},
    {key:'wakame', re:/wakame|わかめ/i, per100:N(138,18,41,4,35), defaultGrams:3},
    {key:'mushrooms', re:/žampion|shimeji|enoki|houb|mushroom|しめじ|えのき|きのこ/i, per100:N(25,3.1,4.5,.3,2.5), defaultGrams:100},
    {key:'nori', re:/nori|のり/i, per100:N(306,41,44,4,36), defaultGrams:2},
    {key:'rice-vinegar', re:/rýžov.*oct?|rice vinegar|米酢/i, per100:N(18,0,.7,0,0), defaultGrams:5, tspGrams:5, tbspGrams:15},
    {key:'ponzu', re:/ponzu|ポン酢/i, per100:N(47,3.5,8.5,.1,0), defaultGrams:15, tbspGrams:15, tspGrams:5},
    {key:'yakisoba-sauce', re:/yakisoba omáč|yakisoba sauce|焼きそばソース/i, per100:N(135,1.5,31,.5,0), defaultGrams:15, tbspGrams:15, tspGrams:5},
    {key:'tofu', re:/tofu|豆腐/i, per100:N(60,6.6,1.8,3.5,.5), defaultGrams:150},
    {key:'okara', re:/okara|おから/i, per100:N(350,25,15,15,40), defaultGrams:50},
    {key:'cottage', re:/cottage/i, per100:N(90,12,4,2.5,0), defaultGrams:200},
    {key:'cocoa', re:/kaka|cocoa|ココア/i, per100:N(228,19.6,57.9,13.7,37), defaultGrams:10, tspGrams:2.5},
    {key:'peanut-butter', re:/arašíd.*más|peanut butter|ピーナッツバター/i, per100:N(588,25,20,50,6), defaultGrams:15, tspGrams:5, tbspGrams:16},
    {key:'peanut', re:/arašíd|peanut|ピーナッツ/i, per100:N(567,25.8,16.1,49.2,8.5), defaultGrams:15},
    {key:'almond', re:/mandl|almond|アーモンド/i, per100:N(579,21,22,50,12), defaultGrams:15},
    {key:'coconut', re:/kokos|coconut|ココナッツ/i, per100:N(660,7,24,65,16), defaultGrams:15},
    {key:'zucchini', re:/cuket|zucchini|ズッキーニ/i, per100:N(17,1.2,3.1,.3,1), defaultGrams:200},
    {key:'carrot', re:/mrkv|carrot|にんじん/i, per100:N(41,.9,10,.2,2.8), defaultGrams:100},
    {key:'pumpkin', re:/dýně|pumpkin|kabocha|かぼちゃ/i, per100:N(49,1.8,12,.2,2.7), defaultGrams:180},
    {key:'sweet-potato', re:/batát|sweet potato|さつまいも/i, per100:N(86,1.6,20,.1,3), defaultGrams:150},
    {key:'black-beans', re:/čern.*fazol|black bean|黒豆/i, per100:N(132,8.9,23.7,.5,8.7), defaultGrams:200},
    {key:'starch', re:/škrob|starch|片栗粉|コーンスターチ/i, per100:N(350,.3,87,.1,.5), defaultGrams:20},
    {key:'flour', re:/mouka|flour|粉/i, per100:N(364,10,76,1,3), defaultGrams:50},
    {key:'psyllium', re:/psyll|サイリウム|オオバコ/i, per100:N(190,2.5,4,.6,78), defaultGrams:10, tspGrams:3},
    {key:'matcha', re:/matcha|抹茶/i, per100:N(324,30.6,38.5,5.3,38.5), defaultGrams:2, tspGrams:2},
    {key:'chocolate', re:/čokolád|chocolate|チョコ/i, per100:N(530,7,60,30,7), defaultGrams:25},
    {key:'raisins', re:/rozin|raisin|レーズン/i, per100:N(299,3.1,79,.5,3.7), defaultGrams:20},
    {key:'honey', re:/med|honey|はちみつ/i, per100:N(304,.3,82,0,0), defaultGrams:10, tspGrams:7, tbspGrams:21},
    {key:'sugar', re:/cukr|sugar|砂糖/i, per100:N(400,0,100,0,0), defaultGrams:5, tspGrams:4},
    {key:'erythritol', re:/erythritol|エリスリトール/i, per100:N(0,0,0,0,0), defaultGrams:5, tspGrams:4},
    {key:'olive-oil', re:/oliv.*olej|olive oil|オリーブオイル/i, per100:N(884,0,0,100,0), defaultGrams:5, tspGrams:5, tbspGrams:14},
    {key:'oil', re:/olej|oil|オイル/i, per100:N(884,0,0,100,0), defaultGrams:5, tspGrams:5, tbspGrams:14},
    {key:'butter', re:/máslo|butter|バター/i, per100:N(717,.9,.1,81,0), defaultGrams:10, tspGrams:5, tbspGrams:14},
    {key:'chicken', re:/kuře|kuřec|chicken|鶏/i, per100:N(165,31,0,3.6,0), defaultGrams:120},
    {key:'mackerel', re:/makrel|mackerel|さば|サバ/i, per100:N(205,19,0,14,0), defaultGrams:100},
    {key:'edamame', re:/edamame|枝豆/i, per100:N(121,12,9,5,5), defaultGrams:100},
    {key:'natto', re:/natt[oó]|納豆/i, per100:N(200,17,12,10,5), defaultGrams:40},
    {key:'rice', re:/rýže|rice|ご飯|米/i, per100:N(156,2.5,35,.3,.3), defaultGrams:120},
    {key:'mozzarella', re:/mozzarella|モッツァレラ/i, per100:N(280,28,3,17,0), defaultGrams:40},
    {key:'tomato-sauce', re:/rajčat.*omáč|tomato sauce|トマトソース/i, per100:N(35,1.5,7,.3,1.5), defaultGrams:50},
    {key:'miso-soup', re:/miso polév|miso soup|味噌汁/i, perItem:N(40,3,5,1,1), itemWeight:1},
    {key:'kimchi', re:/kimchi|キムチ/i, per100:N(23,1.1,4,.5,2.4), defaultGrams:50},
    {key:'broccoli', re:/brokol|broccoli|ブロッコリー/i, per100:N(34,2.8,7,.4,2.6), defaultGrams:100},
    {key:'spinach', re:/špenát|spinach|ほうれん草/i, per100:N(23,2.9,3.6,.4,2.2), defaultGrams:50},
    {key:'cucumber', re:/okurk|cucumber|きゅうり/i, per100:N(15,.7,3.6,.1,.5), defaultGrams:100},
    {key:'tomatoes', re:/cherry rajč|tomato|トマト/i, per100:N(18,.9,3.9,.2,1.2), defaultGrams:100},
    {key:'napa-cabbage', re:/pekingsk.*zelí|napa cabbage|白菜/i, per100:N(16,1.2,3.2,.2,1.2), defaultGrams:100},
    {key:'cabbage', re:/zelí|cabbage|キャベツ/i, per100:N(25,1.3,5.8,.1,2.5), defaultGrams:100},
    {key:'daikon', re:/daikon|ředkev|大根/i, per100:N(18,.6,4.1,.1,1.6), defaultGrams:100},
    {key:'vegetables', re:/zelenina|vegetable|野菜/i, per100:N(30,1.5,6,.3,2.5), defaultGrams:100},
    {key:'spring-onion', re:/jarní cibul|spring onion|ねぎ/i, per100:N(32,1.8,7.3,.2,2.6), defaultGrams:10},
    {key:'soy-sauce', re:/sójov.*omáč|soy sauce|醤油/i, per100:N(53,8.1,4.9,.6,.8), defaultGrams:15, tbspGrams:15, tspGrams:5},
    {key:'lemon-juice', re:/citronov.*šťáv|lemon juice|レモン汁/i, per100:N(22,.4,6.9,.2,.3), defaultGrams:15, tbspGrams:15, tspGrams:5},
    {key:'sesame', re:/sezam|sesame|ごま/i, per100:N(573,17.7,23.4,49.7,11.8), defaultGrams:5, tspGrams:3},
    {key:'baking-powder', re:/práš(?:ek|ku) do pečiva|baking powder|ベーキングパウダー/i, per100:N(53,0,28,0,0), defaultGrams:4, tspGrams:4},
    {key:'coffee', re:/káv|coffee|espresso|コーヒー/i, per100:N(0,0,0,0,0), defaultGrams:2, tspGrams:2},
    {key:'water', re:/\bvoda\b|\bvody\b|water|水/i, per100:N(0,0,0,0,0), defaultGrams:100},
    {key:'ginger', re:/zázvor|ginger|生姜|しょうが/i, per100:N(80,1.8,17.8,.8,2), defaultGrams:10, tspGrams:2},
    {key:'spices', re:/vanilka|skořice|zázvor|rozmarýn|citronov.*kůra|vanilla|cinnamon|ginger|rosemary|lemon zest|バニラ|シナモン|しょうが|ローズマリー/i, per100:N(0,0,0,0,0), defaultGrams:1, tspGrams:2}
  ];

  const round = (v, digits = 1) => {
    const m = 10 ** digits;
    return Math.round((Number(v) || 0) * m) / m;
  };
  const emptyNutrition = () => N(0, 0, 0, 0, 0);
  const addNutrition = (a, b) => {
    for (const k of ['kcal', 'p', 'c', 'f', 'fiber']) a[k] += Number(b[k]) || 0;
    return a;
  };
  const divideNutrition = (n, divisor) => {
    const d = Math.max(1, Number(divisor) || 1);
    return {
      kcal: Math.round(n.kcal / d),
      p: round(n.p / d),
      c: round(n.c / d),
      f: round(n.f / d),
      fiber: round(n.fiber / d)
    };
  };

  function cleanText(value) {
    return String(value ?? '')
      .replace(/[<>]/g, '')
      .replace(/"/g, '”')
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .trim();
  }
  function cleanLines(value) {
    const lines = Array.isArray(value) ? value : String(value ?? '').split('\n');
    return lines.map(cleanText).filter(Boolean).slice(0, 250);
  }
  function sanitizeRecord(record) {
    if (!record || typeof record !== 'object') return null;
    const n = value => Math.max(0, Number(value) || 0);
    return {
      ...record,
      id: Number(record.id),
      name: cleanText(record.name),
      chapter: cleanText(record.chapter),
      emoji: cleanText(record.emoji || '🍽️').slice(0, 8),
      kind: cleanText(record.kind || 'Snídaně'),
      flavor: cleanText(record.flavor || 'custom'),
      time: cleanText(record.time || '20 min'),
      diff: cleanText(record.diff),
      cost: n(record.cost),
      kcal: Math.round(n(record.kcal)),
      p: round(n(record.p)),
      c: round(n(record.c)),
      f: round(n(record.f)),
      fiber: round(n(record.fiber)),
      servings: Math.min(MAX_SERVINGS, Math.max(1, Number(record.servings) || 1)),
      stores: cleanText(record.stores),
      prep: cleanText(record.prep),
      freeze: cleanText(record.freeze),
      keep: cleanText(record.keep),
      ingredients: cleanLines(record.ingredients),
      familyIngredients: cleanLines(record.familyIngredients),
      steps: cleanLines(record.steps),
      familySwap: cleanLines(record.familySwap),
      image: typeof record.image === 'string' ? record.image : ''
    };
  }

  function rawStoredRecords() {
    let records;
    if (cloudUser && cloudState) records = cloudState.custom_recipes || [];
    else {
      try { records = JSON.parse(localStorage.getItem('cookCustom') || '[]'); }
      catch { records = []; }
    }
    return Array.isArray(records) ? records.map(sanitizeRecord).filter(Boolean) : [];
  }
  function persistStoredRecords(records) {
    const safe = records.map(sanitizeRecord).filter(Boolean);
    localStorage.setItem('cookCustom', JSON.stringify(safe));
    if (cloudState) cloudState.custom_recipes = safe;
    cloudChanged();
  }

  customRecipes = rawStoredRecords;
  allRecipes = function allRecipesV12() {
    const records = rawStoredRecords();
    const overrides = new Map(records.filter(r => r.override).map(r => [Number(r.id), r]));
    const builtIns = baseRecipes.map(base => {
      const override = overrides.get(Number(base.id));
      return override ? {...base, ...override, id:base.id, custom:false, override:true, baseId:base.id} : {...base, custom:false, override:false};
    });
    const own = records.filter(r => !r.override).map(r => ({...r, custom:true, override:false}));
    return [...builtIns, ...own];
  };

  function normalizeNumberText(text) {
    return String(text)
      .toLowerCase()
      .replace(/,/g, '.')
      .replace(/[–—]/g, '-')
      .replace(/½/g, ' 1/2 ')
      .replace(/¼/g, ' 1/4 ')
      .replace(/¾/g, ' 3/4 ')
      .replace(/⅓/g, ' 1/3 ')
      .replace(/⅔/g, ' 2/3 ');
  }
  function numericValue(token) {
    const s = String(token || '').trim();
    if (/^\d+\s+\d+\/\d+$/.test(s)) {
      const [whole, fraction] = s.split(/\s+/);
      const [a, b] = fraction.split('/').map(Number);
      return Number(whole) + (b ? a / b : 0);
    }
    if (/^\d+\/\d+$/.test(s)) {
      const [a, b] = s.split('/').map(Number);
      return b ? a / b : 0;
    }
    return Number(s) || 0;
  }
  function firstQuantity(text) {
    const s = normalizeNumberText(text);
    const japaneseSpoon = s.match(/(小さじ|大さじ)\s*(\d+(?:\.\d+)?|\d+\/\d+)/i);
    if (japaneseSpoon) return {value:numericValue(japaneseSpoon[2]), unit:japaneseSpoon[1]};
    const range = s.match(/(\d+(?:\.\d+)?|\d+\/\d+)\s*-\s*(\d+(?:\.\d+)?|\d+\/\d+)\s*(lžíce|lžičky|lžička|tbsp|tsp|大さじ|小さじ|cups?|hrnky?|hrnek|kg|ml|g|l)?/i);
    if (range) return {value:(numericValue(range[1]) + numericValue(range[2])) / 2, unit:(range[3] || '').toLowerCase()};
    const mixed = s.match(/(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)\s*(lžíce|lžičky|lžička|tbsp|tsp|大さじ|小さじ|cups?|hrnky?|hrnek|kelímky?|kelímek|vejce|eggs?|kusy?|ks|個|本|kg|ml|g|l)?/i);
    return mixed ? {value:numericValue(mixed[1]), unit:(mixed[2] || '').toLowerCase()} : null;
  }

  function customFoodLibrary() {
    try {
      const value = JSON.parse(localStorage.getItem('cookFoodLibrary') || '[]');
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }
  function customFoodRule(text) {
    const normalized = String(text || '').toLocaleLowerCase().replace(/\s+/g, ' ').trim();
    if (!normalized) return null;
    const foods = customFoodLibrary();
    for (const item of foods) {
      const aliases = [item.name, ...(Array.isArray(item.aliases) ? item.aliases : []), item.barcode]
        .filter(Boolean)
        .map(value => String(value).toLocaleLowerCase().replace(/\s+/g, ' ').trim())
        .filter(value => value.length >= 3)
        .sort((a, b) => b.length - a.length);
      if (!aliases.some(alias => normalized.includes(alias))) continue;
      const per100 = item.per100 || {};
      return {
        key:`custom-${item.id || item.barcode || item.name}`,
        per100:N(Number(per100.kcal)||0, Number(per100.p)||0, Number(per100.c)||0, Number(per100.f)||0, Number(per100.fiber)||0),
        defaultGrams:Number(item.defaultGrams)||100,
        itemGrams:Number(item.itemGrams)||undefined,
        tspGrams:Number(item.tspGrams)||undefined,
        tbspGrams:Number(item.tbspGrams)||undefined,
        customName:item.name || ''
      };
    }
    return null;
  }

  function findFood(text) {
    return customFoodRule(text) || FOOD_DB.find(item => item.re.test(String(text))) || null;
  }
  function amountFor(text, food) {
    const s = normalizeNumberText(text);
    const q = firstQuantity(s);
    if (!q) return {grams:food?.defaultGrams || 0, items:food?.perItem ? 1 : 0, approximate:true};
    let {value, unit} = q;
    if (!unit) {
      if (food?.perItem) return {grams:0, items:value, approximate:false};
      if (food?.key === 'egg' || /vejce|egg|卵/.test(s)) return {grams:value * (food.itemGrams || 50), items:0, approximate:false};
      if (food?.key === 'banana' || food?.key === 'apple') {
        const size = /mal(?:ý|é|á)|small|小/.test(s) ? (food.smallItemGrams || food.itemGrams) : food.itemGrams;
        return {grams:value * size, items:0, approximate:true};
      }
      if (food?.key === 'oikos') return {grams:value * food.itemGrams, items:0, approximate:false};
      if (food?.key === 'rice-cake') return {grams:value * food.itemGrams, items:0, approximate:false};
      return {grams:value * (food?.itemGrams || food?.defaultGrams || 1), items:0, approximate:true};
    }
    if (unit === 'kg' || unit === 'l') value *= 1000;
    else if (/lžíce|tbsp|大さじ/.test(unit)) value *= food?.tbspGrams || 15;
    else if (/lžič|tsp|小さじ/.test(unit)) value *= food?.tspGrams || 5;
    else if (/cup|hrnek/.test(unit)) value *= food?.cupGrams || 240;
    else if (/ks|kus|vejce|egg|個|本|kelím/.test(unit)) {
      if (food?.perItem) return {grams:0, items:value, approximate:false};
      value *= food?.itemGrams || 50;
    }
    return {grams:value, items:0, approximate:false};
  }
  function nutritionForLine(text) {
    const food = findFood(text);
    if (!food) return {...emptyNutrition(), recognized:false, approximate:false, food:null, amount:0};
    const amount = amountFor(text, food);
    let result = emptyNutrition();
    if (food.perItem) {
      const count = amount.items || 1;
      for (const k of ['kcal','p','c','f','fiber']) result[k] = (food.perItem[k] || 0) * count;
    } else {
      const factor = Math.max(0, amount.grams) / 100;
      for (const k of ['kcal','p','c','f','fiber']) result[k] = (food.per100[k] || 0) * factor;
    }
    return {...result, recognized:true, approximate:amount.approximate, food:food.key, amount:amount.grams || amount.items};
  }
  function calculateIngredients(lines, servings = 1) {
    const clean = cleanLines(lines);
    const totalWhole = emptyNutrition();
    const breakdownWhole = clean.map(line => {
      const n = nutritionForLine(line);
      if (n.recognized) addNutrition(totalWhole, n);
      return {line, ...n};
    });
    const divisor = Math.max(1, Number(servings) || 1);
    const total = divideNutrition(totalWhole, divisor);
    const breakdown = breakdownWhole.map(n => ({
      ...n,
      kcal:n.kcal / divisor,
      p:n.p / divisor,
      c:n.c / divisor,
      f:n.f / divisor,
      fiber:n.fiber / divisor
    }));
    return {
      total,
      totalWhole,
      breakdown,
      recognized:breakdown.filter(x => x.recognized).length,
      unknown:breakdown.filter(x => !x.recognized).map(x => x.line),
      lines:clean
    };
  }
  function inferServings(recipe) {
    if (Number(recipe?.servings) > 0) return Math.min(MAX_SERVINGS, Math.max(1, Number(recipe.servings)));
    const raw = calculateIngredients(recipe?.ingredients || [], 1);
    if (!raw.totalWhole.kcal || !recipe?.kcal) return 1;
    let best = 1, bestError = Infinity;
    for (let servings = 1; servings <= 24; servings++) {
      const n = divideNutrition(raw.totalWhole, servings);
      const error = Math.abs(n.kcal - recipe.kcal) / Math.max(80, recipe.kcal)
        + .5 * Math.abs(n.p - (recipe.p || 0)) / Math.max(8, recipe.p || 8)
        + .2 * Math.abs(n.c - (recipe.c || 0)) / Math.max(15, recipe.c || 15)
        + .2 * Math.abs(n.f - (recipe.f || 0)) / Math.max(5, recipe.f || 5);
      if (error < bestError) { bestError = error; best = servings; }
    }
    return best;
  }

  function proteinIngredient(line) {
    return /proteinov(?:ého|ý|á|é)?\s*(?:prášku|prášek)|\bproteinu\b|protein powder|プロテインパウダー/i.test(line)
      && !/muffin|brownie|cookie|pancake|waffle|マフィン|ブラウニー/i.test(line);
  }
  function amountFromProteinLine(line) {
    const q = firstQuantity(line);
    if (!q) return 25;
    if (q.unit === 'kg') return q.value * 1000;
    return q.value || 25;
  }
  function deriveFamilyIngredients(recipe) {
    if (Array.isArray(recipe?.familyIngredients) && recipe.familyIngredients.length) return cleanLines(recipe.familyIngredients);
    let lines = cleanLines(recipe?.ingredients || []);
    const instructions = cleanLines(recipe?.familySwap || []).join(' ').toLowerCase();
    if (!instructions) return lines;
    const removeProtein = /vynech|nahraď|nahrad|omit|replace|省|置き換/.test(instructions);
    const removed = lines.filter(proteinIngredient);
    if (removeProtein) lines = lines.filter(line => !proteinIngredient(line));

    if (/oves|oat|オート/.test(instructions)) {
      if (/stejném množství|same amount|同量/.test(instructions) && removed.length) {
        for (const source of removed) lines.push(`${round(amountFromProteinLine(source), 0)} g ovesné mouky`);
      } else if (/25\s*g\s*oves|25\s*g\s*oat/.test(instructions)) {
        lines.push('25 g ovesné mouky');
      }
    }
    if (/50\s*g\s*jogurt|50\s*g\s*yogurt/.test(instructions)) lines.push('50 g jogurtu');
    const yogurt250 = instructions.match(/250\s*g[^.]{0,35}(jogurt|yogurt)/i);
    if (yogurt250) {
      let replaced = false;
      lines = lines.map(line => {
        if (!replaced && /jogurt|yogurt|ヨーグルト/i.test(line)) { replaced = true; return '250 g řeckého jogurtu'; }
        return line;
      });
      if (!replaced) lines.push('250 g řeckého jogurtu');
    }
    return [...new Set(lines)];
  }
  function effectiveIngredients(recipe, useFamily = family) {
    return useFamily ? deriveFamilyIngredients(recipe) : cleanLines(recipe?.ingredients || []);
  }

  familyNutrition = function familyNutritionV12(recipe) {
    const servings = Number(recipe.servings) || inferServings(recipe);
    const baseCalc = calculateIngredients(recipe.ingredients || [], servings);
    const familyCalc = calculateIngredients(deriveFamilyIngredients(recipe), servings);
    if (recipe.nutritionMode === 'calculated') return familyCalc.total;
    const result = {};
    for (const key of ['kcal','p','c','f','fiber']) {
      const baseStored = Number(recipe[key]) || 0;
      const delta = (familyCalc.total[key] || 0) - (baseCalc.total[key] || 0);
      result[key] = key === 'kcal' ? Math.max(0, Math.round(baseStored + delta)) : Math.max(0, round(baseStored + delta));
    }
    return result;
  };

  ingredientAmount = function ingredientAmountV12(text) {
    const food = findFood(text);
    if (!food) return 0;
    const amount = amountFor(text, food);
    return amount.grams || amount.items || 0;
  };
  rawIngredientNutrition = function rawIngredientNutritionV12(text) {
    return nutritionForLine(text);
  };
  ingredientNutritionBreakdown = function ingredientNutritionBreakdownV12(recipe, ingredients) {
    const servings = Number(recipe.servings) || inferServings(recipe);
    const calc = calculateIngredients(ingredients, servings);
    const target = nutritionFor(recipe);
    const shouldScale = recipe.nutritionMode !== 'calculated';
    if (!shouldScale) return calc.breakdown;
    const output = calc.breakdown.map(x => ({...x}));
    for (const key of ['kcal','p','c','f','fiber']) {
      const sum = calc.breakdown.reduce((acc, item) => acc + (item[key] || 0), 0);
      for (const item of output) item[key] = item.recognized && sum > 0 ? (item[key] || 0) / sum * (target[key] || 0) : 0;
    }
    return output;
  };

  addIngredientsToShopping = function addIngredientsToShoppingV12(recipe) {
    const items = shoppingItems();
    for (const text of effectiveIngredients(recipe, family)) {
      const normalized = text.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
      if (!items.some(item => item.text.toLocaleLowerCase().replace(/\s+/g, ' ').trim() === normalized)) {
        items.push({id:crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, text, done:false});
      }
    }
    saveShopping(items);
    toast(t('addToShopping'));
  };

  function ensureV12Controls() {
    const formGrid = document.querySelector('#recipeForm .form-grid');
    if (!formGrid || document.getElementById('fServings')) return;

    const photoField = document.getElementById('fPhoto')?.closest('.field');
    const servingsField = document.createElement('div');
    servingsField.className = 'field';
    servingsField.innerHTML = `<label data-i18n="servings"></label><input id="fServings" type="number" min="1" max="${MAX_SERVINGS}" step="1" value="1">`;
    photoField?.after(servingsField);

    const nutritionHeading = [...formGrid.querySelectorAll('.field.full h3')].find(h => h.getAttribute('data-i18n') === 'nutrition')?.parentElement;
    const autoPanel = document.createElement('div');
    autoPanel.className = 'field full auto-nutrition-panel';
    autoPanel.innerHTML = `
      <label class="auto-nutrition-toggle"><input id="fAutoNutrition" type="checkbox" checked><span data-i18n="autoNutrition"></span></label>
      <small class="note" data-i18n="autoNutritionHelp"></small>
      <div id="nutritionLivePreview" class="nutrition-live-preview"></div>`;
    nutritionHeading?.after(autoPanel);

    const ingredientField = document.getElementById('fIngredients')?.closest('.field');
    const quick = document.createElement('div');
    quick.className = 'ingredient-quick-actions';
    quick.innerHTML = `<button type="button" class="btn" id="quickPeanut" data-i18n="quickAddPeanut"></button>`;
    ingredientField?.appendChild(quick);

    const familyIngredientsField = document.createElement('div');
    familyIngredientsField.className = 'field full';
    familyIngredientsField.innerHTML = `<label data-i18n="familyIngredients"></label><textarea id="fFamilyIngredients"></textarea><small class="note" data-i18n="familyIngredientsHint"></small>`;
    ingredientField?.after(familyIngredientsField);

    const imageActions = document.querySelector('#recipeModal .image-actions');
    if (imageActions && !document.getElementById('resetRecipe')) {
      const reset = document.createElement('button');
      reset.type = 'button';
      reset.id = 'resetRecipe';
      reset.className = 'btn';
      reset.style.display = 'none';
      reset.setAttribute('data-i18n', 'resetRecipe');
      imageActions.appendChild(reset);
    }

    applyLanguage();
  }

  function setMacroReadonly(auto) {
    ['fKcal','fP','fC','fF','fFiber'].forEach(id => {
      const input = document.getElementById(id);
      if (!input) return;
      input.readOnly = auto;
      input.classList.toggle('calculated-input', auto);
    });
  }
  function formIngredientLines() { return cleanLines(document.getElementById('fIngredients')?.value || ''); }
  function formServings() { return Math.min(MAX_SERVINGS, Math.max(1, Number(document.getElementById('fServings')?.value) || 1)); }
  function adjustNutritionFromBaseline(baseline, ingredients, servings) {
    const current = calculateIngredients(ingredients, servings);
    if (!baseline || baseline.mode === 'calculated') return current;
    const currentWhole = calculateIngredients(ingredients, 1).totalWhole;
    const baselineWhole = calculateIngredients(baseline.ingredients, 1).totalWhole;
    const trustedWhole = {
      kcal:(baseline.nutrition.kcal || 0) * baseline.servings,
      p:(baseline.nutrition.p || 0) * baseline.servings,
      c:(baseline.nutrition.c || 0) * baseline.servings,
      f:(baseline.nutrition.f || 0) * baseline.servings,
      fiber:(baseline.nutrition.fiber || 0) * baseline.servings
    };
    const adjustedWhole = {};
    for (const key of ['kcal','p','c','f','fiber']) adjustedWhole[key] = Math.max(0, trustedWhole[key] + (currentWhole[key] || 0) - (baselineWhole[key] || 0));
    return {...current, total:divideNutrition(adjustedWhole, servings), adjusted:true};
  }
  function calculatedFormNutrition() {
    return adjustNutritionFromBaseline(formBaseline, formIngredientLines(), formServings());
  }
  function renderNutritionPreview(forceValues = true) {
    const auto = Boolean(document.getElementById('fAutoNutrition')?.checked);
    setMacroReadonly(auto);
    const calc = calculatedFormNutrition();
    if (auto && forceValues) {
      document.getElementById('fKcal').value = calc.total.kcal;
      document.getElementById('fP').value = calc.total.p;
      document.getElementById('fC').value = calc.total.c;
      document.getElementById('fF').value = calc.total.f;
      document.getElementById('fFiber').value = calc.total.fiber;
    }
    const root = document.getElementById('nutritionLivePreview');
    if (!root) return calc;
    const missing = calc.unknown.length
      ? `<div class="nutrition-warning"><b>${escapeHtml(t('nutritionMissing'))}:</b> ${calc.unknown.map(escapeHtml).join(', ')}</div>`
      : `<div class="nutrition-ok">✓ ${escapeHtml(t('allRecognized'))}</div>`;
    root.innerHTML = `
      <div class="nutrition-preview-head"><b>${escapeHtml(t('calculatedPerServing'))}</b><span>${calc.recognized}/${calc.lines.length} ${escapeHtml(t('nutritionRecognized').toLowerCase())}</span></div>
      ${nutritionCells(calc.total)}
      ${missing}`;
    return calc;
  }

  const openFormV11 = openForm;
  openForm = function openFormV12(recipe = null) {
    ensureV12Controls();
    openFormV11(recipe);
    const editingBuiltIn = Boolean(recipe && baseRecipes.some(base => Number(base.id) === Number(recipe.id)));
    document.getElementById('formTitle').textContent = recipe ? t('editRecipeAny') : t('newRecipe');
    document.getElementById('recipeForm').dataset.editingBuiltIn = editingBuiltIn ? '1' : '0';
    const initialServings = recipe ? (Number(recipe.servings) || inferServings(recipe)) : 1;
    document.getElementById('fServings').value = initialServings;
    const derivedFamily = recipe ? deriveFamilyIngredients(recipe).join('\n') : '';
    document.getElementById('fFamilyIngredients').value = derivedFamily;
    document.getElementById('fFamilyIngredients').dataset.autoValue = derivedFamily;
    formBaseline = recipe ? {
      mode:recipe.nutritionMode || 'adjusted',
      ingredients:cleanLines(recipe.ingredients),
      servings:initialServings,
      nutrition:{kcal:Number(recipe.kcal)||0,p:Number(recipe.p)||0,c:Number(recipe.c)||0,f:Number(recipe.f)||0,fiber:Number(recipe.fiber)||0}
    } : null;
    const auto = recipe ? recipe.nutritionMode !== 'manual' : true;
    document.getElementById('fAutoNutrition').checked = auto;
    renderNutritionPreview(auto);
  };

  async function savePhotoFromForm(id) {
    const file = document.getElementById('fPhoto')?.files?.[0];
    if (!file) return;
    try {
      if (cloudUser) await uploadPhotoToStorage(id, await resizeImageBlob(file));
      else setPhotoOverride(id, await resizeImage(file));
    } catch (error) {
      console.error(error);
      toast('Photo upload error');
    }
  }
  function currentRecordById(id) { return allRecipes().find(r => Number(r.id) === Number(id)); }

  document.getElementById('recipeForm').onsubmit = async event => {
    event.preventDefault();
    ensureV12Controls();
    const oldId = Number(document.getElementById('editId').value) || 0;
    const editingBuiltIn = document.getElementById('recipeForm').dataset.editingBuiltIn === '1';
    const id = oldId || Date.now();
    const previous = oldId ? currentRecordById(oldId) : null;
    const auto = Boolean(document.getElementById('fAutoNutrition').checked);
    const servings = formServings();
    const ingredients = formIngredientLines();
    const calc = calculatedFormNutrition();
    const familyField = document.getElementById('fFamilyIngredients');
    const familyLines = cleanLines(familyField.value);
    const autoFamilyLines = cleanLines(familyField.dataset.autoValue || '');
    const familyIngredients = JSON.stringify(familyLines) === JSON.stringify(autoFamilyLines) ? [] : familyLines;
    const numberField = fieldId => Math.max(0, Number(document.getElementById(fieldId).value) || 0);
    const nutrition = auto ? calc.total : {
      kcal:Math.round(numberField('fKcal')),
      p:round(numberField('fP')),
      c:round(numberField('fC')),
      f:round(numberField('fF')),
      fiber:round(numberField('fFiber'))
    };
    const record = sanitizeRecord({
      ...(previous || {}),
      id,
      custom:!editingBuiltIn,
      override:editingBuiltIn,
      baseId:editingBuiltIn ? id : undefined,
      name:document.getElementById('fName').value,
      chapter:document.getElementById('fChapter').value,
      emoji:document.getElementById('fEmoji').value || '🍽️',
      kind:previous?.kind || 'Snídaně',
      flavor:previous?.flavor || 'custom',
      ...nutrition,
      nutritionMode:auto ? ((!previous || previous.nutritionMode === 'calculated') ? 'calculated' : 'adjusted') : 'manual',
      servings,
      time:document.getElementById('fTime').value,
      diff:document.getElementById('fDiff').value,
      cost:numberField('fCost'),
      stores:document.getElementById('fStores').value,
      prep:document.getElementById('fPrep').value,
      freeze:document.getElementById('fFreeze').value,
      keep:document.getElementById('fKeep').value,
      ingredients,
      familyIngredients,
      steps:cleanLines(document.getElementById('fSteps').value),
      familySwap:cleanLines(document.getElementById('fFamily').value),
      image:previous?.image || ''
    });
    let records = rawStoredRecords().filter(item => Number(item.id) !== id);
    records = editingBuiltIn ? [...records, record] : [record, ...records];
    persistStoredRecords(records);
    await savePhotoFromForm(id);
    closeModal('formModal');
    buildSelects();
    render();
    openRecipe(id);
    toast(t('recipeSaved'));
  };

  function renderSafeSteps(recipe) {
    const root = document.getElementById('mSteps');
    if (!root) return;
    root.innerHTML = '';
    for (const step of cleanLines(recipe.steps)) {
      const li = document.createElement('li');
      li.textContent = trLine(step);
      root.appendChild(li);
    }
  }
  function renderV12Ingredients(recipe) {
    const ingredients = effectiveIngredients(recipe, family);
    const breakdown = ingredientNutritionBreakdown(recipe, ingredients);
    const total = nutritionFor(recipe);
    const root = document.getElementById('mIngredients');
    if (!root) return;
    root.innerHTML = ingredients.map((line, index) => {
      const n = breakdown[index] || emptyNutrition();
      const recognized = n.recognized !== false;
      const share = total.p ? Math.round((n.p || 0) / total.p * 100) : 0;
      const compact = recognized
        ? `${fmtN(n.kcal,'kcal')} kcal · ${fmtN(n.p)} g ${escapeHtml(t('protein'))}`
        : escapeHtml(t('unknownIngredient'));
      return `<li class="ingredient-nutrition${recognized ? '' : ' ingredient-unknown'}">
        <div class="ingredient-main">
          <input type="checkbox" data-ing="${index}">
          <div><div class="ingredient-name">${escapeHtml(trLine(line))}</div><div class="ingredient-compact">${compact}</div></div>
          <button class="ingredient-expand" type="button" aria-label="${escapeHtml(t('ingredientNutrition'))}">⌄</button>
        </div>
        <div class="ingredient-details">${nutritionCells(n)}<div class="protein-share">${escapeHtml(t('proteinShare'))}: ${share}%</div></div>
      </li>`;
    }).join('');
    root.querySelectorAll('.ingredient-expand').forEach(button => button.onclick = () => {
      const li = button.closest('.ingredient-nutrition');
      li.classList.toggle('open');
      button.textContent = li.classList.contains('open') ? '⌃' : '⌄';
    });
    root.parentElement.querySelectorAll('.ingredient-total-box').forEach(el => el.remove());
    const box = document.createElement('div');
    box.className = 'ingredient-total-box';
    box.innerHTML = `<div class="ingredient-total-title">${escapeHtml(t('perPortion'))} · ${Number(recipe.servings) || inferServings(recipe)} ${escapeHtml(t('portionsShort'))}</div>
      <div class="ingredient-total-grid"><span><b>${total.kcal}</b>kcal</span><span><b>${total.p} g</b>${escapeHtml(t('protein'))}</span><span><b>${total.c} g</b>${escapeHtml(t('carbs'))}</span><span><b>${total.f} g</b>${escapeHtml(t('fat'))}</span><span><b>${total.fiber || 0} g</b>${escapeHtml(t('fiber'))}</span></div>
      <div class="ingredient-estimate-note">${escapeHtml(t('ingredientEstimate'))}</div>`;
    root.after(box);
  }

  const openRecipeV11 = openRecipe;
  openRecipe = function openRecipeV12(id) {
    openRecipeV11(id);
    const recipe = currentRecordById(id);
    if (!recipe) return;
    renderV12Ingredients(recipe);
    renderSafeSteps(recipe);
    const edit = document.getElementById('editCustom');
    edit.style.display = 'inline-flex';
    edit.setAttribute('data-i18n', 'editRecipeAny');
    edit.textContent = t('editRecipeAny');
    document.getElementById('deleteCustom').style.display = recipe.custom ? 'inline-flex' : 'none';
    const reset = document.getElementById('resetRecipe');
    if (reset) reset.style.display = recipe.override ? 'inline-flex' : 'none';
    const familyText = document.getElementById('mFamily');
    if (familyText) familyText.textContent = trLine((recipe.familySwap || []).join(' '));
  };

  function bindV12Controls() {
    ensureV12Controls();
    document.getElementById('fIngredients')?.addEventListener('input', () => renderNutritionPreview(true));
    document.getElementById('fServings')?.addEventListener('input', () => renderNutritionPreview(true));
    document.getElementById('fAutoNutrition')?.addEventListener('change', () => renderNutritionPreview(true));
    document.getElementById('quickPeanut')?.addEventListener('click', () => {
      const textarea = document.getElementById('fIngredients');
      const line = lang === 'ja' ? 'ピーナッツバター 小さじ1' : lang === 'en' ? '1 tsp peanut butter' : '1 lžička arašídového másla';
      textarea.value = `${textarea.value.trim()}${textarea.value.trim() ? '\n' : ''}${line}`;
      textarea.dispatchEvent(new Event('input', {bubbles:true}));
      textarea.focus();
    });
    document.getElementById('editCustom').onclick = () => {
      const recipe = currentRecordById(currentId);
      if (!recipe) return;
      closeModal('recipeModal');
      openForm(recipe);
    };
    document.getElementById('resetRecipe')?.addEventListener('click', () => {
      if (!currentId || !confirm(t('confirmReset'))) return;
      const records = rawStoredRecords().filter(item => !(item.override && Number(item.id) === Number(currentId)));
      persistStoredRecords(records);
      closeModal('recipeModal');
      buildSelects();
      render();
      openRecipe(currentId);
    });
    document.getElementById('deleteCustom').onclick = async () => {
      const recipe = currentRecordById(currentId);
      if (!recipe?.custom || !confirm(t('confirmDelete'))) return;
      const old = photoOverrides()[currentId], path = photoPath(old);
      if (path && sb && cloudUser) await sb.storage.from(PHOTO_BUCKET).remove([path]);
      delete photoUrlCache[currentId];
      persistStoredRecords(rawStoredRecords().filter(item => Number(item.id) !== Number(currentId)));
      setPhotoOverride(currentId, null);
      closeModal('recipeModal');
      buildSelects();
      render();
    };
  }

  window.__cookbookV14 = window.__cookbookV13 = {version:VERSION, calculateIngredients, inferServings, deriveFamilyIngredients, effectiveIngredients, nutritionForLine, adjustNutritionFromBaseline};

  document.addEventListener('DOMContentLoaded', () => {
    bindV12Controls();
    document.documentElement.dataset.appVersion = VERSION;
    render();
  });
})();


/* v14: mobile filter workspace + online recipe and nutrition sources */
(() => {
  'use strict';

  const API = {
    meal: 'https://www.themealdb.com/api/json/v1/1',
    off: 'https://world.openfoodfacts.org/api/v2/product'
  };
  let currentMeal = null;
  let onlineTab = 'recipes';

  const TEXT = {
    cs: {
      online:'Online inspirace', filterTitle:'Najdi přesně to, na co máš chuť', filterBasics:'Základní výběr',
      filterGoal:'Podle cíle', filterMeal:'Typ jídla', filterPractical:'Praktické', clearFilters:'Vymazat vše',
      showRecipes:'Zobrazit recepty', selectedFilters:'Vybrané filtry', noSelectedFilters:'Nejsou vybrané žádné filtry',
      recipeIdeas:'Recepty z internetu', productLookup:'Výrobek podle čárového kódu', nutritionSearch:'Databáze výživy',
      myFoods:'Moje uložené potraviny', onlineSearchPlaceholder:'Hledej třeba chicken, tofu nebo curry', searchOnline:'Hledat',
      japanese:'Japonská', seafood:'Ryby', chicken:'Kuře', vegetarian:'Vegetariánská', breakfast:'Snídaně', randomMeal:'Náhodný recept',
      onlineIntro:'Najdi inspiraci v TheMealDB a ulož si recept do své kuchařky.', loading:'Načítám…', onlineError:'Online data se nepodařilo načíst.',
      importRecipe:'Uložit do kuchařky', imported:'Recept byl uložen do tvé kuchařky.', alreadyImported:'Tento recept už v kuchařce máš.',
      ingredients:'Ingredience', instructions:'Postup', source:'Zdroj', openSource:'Otevřít původní recept',
      barcodePlaceholder:'Napiš čárový kód výrobku', findProduct:'Najít výrobek', saveFood:'Uložit do kalkulačky',
      foodSaved:'Potravina byla uložena do kalkulačky.', foodExists:'Tato potravina už je uložená.', productNotFound:'Výrobek nebyl nalezen.',
      useIngredientLine:'Příklad do receptu', per100:'Na 100 g', delete:'Smazat', noSavedFoods:'Zatím nemáš uložené žádné vlastní potraviny.',
      usdaPlaceholder:'Hledej potravinu anglicky, například peanut butter', searchUsda:'Hledat v USDA',
      usdaSetup:'USDA vyžaduje bezpečnou Supabase funkci. V ZIPu je připravená ve složce supabase/functions.',
      usdaUnavailable:'USDA proxy zatím není nasazená.', addFood:'Přidat do kalkulačky', close:'Zavřít',
      filters:'Filtry', sortAndMode:'Řazení a režim', searchLabel:'Hledat v kuchařce', countSuffix:'filtrů',
      onlineChapter:'12. Online recepty', estimatedNutrition:'Výživa je orientačně vypočítaná z rozpoznaných ingrediencí.',
      networkNeeded:'Pro online inspiraci je potřeba internetové připojení.'
    },
    en: {
      online:'Online inspiration', filterTitle:'Find exactly what you feel like eating', filterBasics:'Basic selection',
      filterGoal:'By goal', filterMeal:'Meal type', filterPractical:'Practical', clearFilters:'Clear all', showRecipes:'Show recipes',
      selectedFilters:'Selected filters', noSelectedFilters:'No filters selected', recipeIdeas:'Online recipes',
      productLookup:'Product by barcode', nutritionSearch:'Nutrition database', myFoods:'My saved foods',
      onlineSearchPlaceholder:'Try chicken, tofu or curry', searchOnline:'Search', japanese:'Japanese', seafood:'Seafood', chicken:'Chicken',
      vegetarian:'Vegetarian', breakfast:'Breakfast', randomMeal:'Random meal', onlineIntro:'Find ideas in TheMealDB and save a recipe to your cookbook.',
      loading:'Loading…', onlineError:'Online data could not be loaded.', importRecipe:'Save to cookbook', imported:'Recipe saved to your cookbook.',
      alreadyImported:'This recipe is already in your cookbook.', ingredients:'Ingredients', instructions:'Instructions', source:'Source',
      openSource:'Open original recipe', barcodePlaceholder:'Enter a product barcode', findProduct:'Find product', saveFood:'Save to calculator',
      foodSaved:'Food saved to the calculator.', foodExists:'This food is already saved.', productNotFound:'Product not found.',
      useIngredientLine:'Example recipe line', per100:'Per 100 g', delete:'Delete', noSavedFoods:'You have no saved custom foods yet.',
      usdaPlaceholder:'Search in English, for example peanut butter', searchUsda:'Search USDA',
      usdaSetup:'USDA requires the secure Supabase function included in supabase/functions.', usdaUnavailable:'The USDA proxy is not deployed yet.',
      addFood:'Add to calculator', close:'Close', filters:'Filters', sortAndMode:'Sorting and mode', searchLabel:'Search cookbook', countSuffix:'filters',
      onlineChapter:'12. Online Recipes', estimatedNutrition:'Nutrition is estimated from recognized ingredients.', networkNeeded:'Internet access is required for online inspiration.'
    },
    ja: {
      online:'オンラインレシピ', filterTitle:'食べたいものをすぐに見つける', filterBasics:'基本', filterGoal:'目的別', filterMeal:'食事タイプ',
      filterPractical:'便利な条件', clearFilters:'すべて解除', showRecipes:'レシピを表示', selectedFilters:'選択中のフィルター', noSelectedFilters:'フィルターは選択されていません',
      recipeIdeas:'オンラインレシピ', productLookup:'バーコード商品検索', nutritionSearch:'栄養データベース', myFoods:'保存した食品',
      onlineSearchPlaceholder:'chicken、tofu、curry などを検索', searchOnline:'検索', japanese:'日本料理', seafood:'魚料理', chicken:'鶏肉',
      vegetarian:'ベジタリアン', breakfast:'朝食', randomMeal:'ランダム', onlineIntro:'TheMealDBからレシピを探して自分の料理本に保存できます。',
      loading:'読み込み中…', onlineError:'オンラインデータを取得できませんでした。', importRecipe:'料理本に保存', imported:'レシピを保存しました。',
      alreadyImported:'このレシピはすでに保存されています。', ingredients:'材料', instructions:'作り方', source:'出典', openSource:'元のレシピを開く',
      barcodePlaceholder:'商品のバーコードを入力', findProduct:'商品を検索', saveFood:'計算機に保存', foodSaved:'食品を計算機に保存しました。',
      foodExists:'この食品はすでに保存されています。', productNotFound:'商品が見つかりません。', useIngredientLine:'レシピ入力例', per100:'100 g あたり',
      delete:'削除', noSavedFoods:'保存した食品はまだありません。', usdaPlaceholder:'英語で検索（例: peanut butter）', searchUsda:'USDAを検索',
      usdaSetup:'USDAにはZIP内のSupabase安全関数が必要です。', usdaUnavailable:'USDAプロキシはまだ設定されていません。', addFood:'計算機に追加',
      close:'閉じる', filters:'フィルター', sortAndMode:'並べ替え・モード', searchLabel:'料理本を検索', countSuffix:'件',
      onlineChapter:'12. オンラインレシピ', estimatedNutrition:'認識できた材料から栄養値を推定しています。', networkNeeded:'オンラインレシピにはインターネット接続が必要です。'
    }
  };

  const tx = key => (TEXT[window.lang || lang] || TEXT.cs)[key] || TEXT.cs[key] || key;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const round14 = (value, digits = 1) => { const m = 10 ** digits; return Math.round((Number(value) || 0) * m) / m; };

  function addTranslations() {
    Object.assign(CHAPTERS, {'12. Online recepty':{en:'12. Online Recipes', ja:'12. オンラインレシピ'}});
    for (const code of ['cs','en','ja']) {
      if (!UI[code]) UI[code] = {};
      UI[code].online = TEXT[code].online;
    }
  }

  function ensureOnlineModal() {
    if (document.getElementById('onlineModal')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal" id="onlineModal">
        <div class="sheet online-sheet">
          <div class="sheet-head online-head"><div><h2>🌐 <span data-v14="online"></span></h2><p class="note" data-v14="onlineIntro"></p></div><button class="btn" id="closeOnline">×</button></div>
          <div class="online-tabs" role="tablist">
            <button class="online-tab active" data-online-tab="recipes">🍲 <span data-v14="recipeIdeas"></span></button>
            <button class="online-tab" data-online-tab="product">▦ <span data-v14="productLookup"></span></button>
            <button class="online-tab" data-online-tab="usda">📊 <span data-v14="nutritionSearch"></span></button>
            <button class="online-tab" data-online-tab="library">★ <span data-v14="myFoods"></span></button>
          </div>
          <section class="online-pane active" data-online-pane="recipes">
            <form class="online-search" id="mealSearchForm"><input id="mealSearch" data-v14-placeholder="onlineSearchPlaceholder"><button class="btn primary" data-v14="searchOnline"></button></form>
            <div class="online-quick">
              <button class="filter-chip" data-meal-area="Japanese" data-v14="japanese"></button>
              <button class="filter-chip" data-meal-category="Seafood" data-v14="seafood"></button>
              <button class="filter-chip" data-meal-ingredient="chicken_breast" data-v14="chicken"></button>
              <button class="filter-chip" data-meal-category="Vegetarian" data-v14="vegetarian"></button>
              <button class="filter-chip" data-meal-category="Breakfast" data-v14="breakfast"></button>
              <button class="filter-chip" data-meal-random="1" data-v14="randomMeal"></button>
            </div>
            <div id="mealResults" class="online-results"></div>
            <div id="mealDetail" class="online-detail"></div>
          </section>
          <section class="online-pane" data-online-pane="product">
            <form class="online-search" id="barcodeForm"><input id="barcodeInput" inputmode="numeric" autocomplete="off" data-v14-placeholder="barcodePlaceholder"><button class="btn primary" data-v14="findProduct"></button></form>
            <div id="productResult" class="online-detail"></div>
          </section>
          <section class="online-pane" data-online-pane="usda">
            <form class="online-search" id="usdaForm"><input id="usdaInput" data-v14-placeholder="usdaPlaceholder"><button class="btn primary" data-v14="searchUsda"></button></form>
            <p class="note" data-v14="usdaSetup"></p><div id="usdaResults" class="online-results"></div>
          </section>
          <section class="online-pane" data-online-pane="library"><div id="foodLibrary"></div></section>
        </div>
      </div>`);
  }

  function applyV14Text() {
    document.querySelectorAll('[data-v14]').forEach(el => el.textContent = tx(el.dataset.v14));
    document.querySelectorAll('[data-v14-placeholder]').forEach(el => el.placeholder = tx(el.dataset.v14Placeholder));
    const button = document.getElementById('onlineBtn');
    if (button) button.querySelector('span').textContent = tx('online');
    updateFilterSummary();
  }

  function groupFilterChips() {
    const panel = document.getElementById('filterPanel');
    const chips = document.getElementById('filterChips');
    const compact = document.querySelector('.compact-tools');
    if (!panel || !chips || !compact || panel.dataset.v14Ready) return;
    panel.dataset.v14Ready = '1';

    const searchControl = document.getElementById('search')?.closest('.control');
    const searchDock = document.createElement('div');
    searchDock.className = 'v14-search-dock';
    searchDock.innerHTML = `<span class="v14-search-icon">⌕</span>`;
    if (searchControl) {
      searchControl.classList.add('v14-main-search');
      searchDock.appendChild(searchControl);
    }
    compact.before(searchDock);

    const onlineBtn = document.createElement('button');
    onlineBtn.id = 'onlineBtn'; onlineBtn.className = 'btn compact-action';
    onlineBtn.innerHTML = `🌐 <span>${esc(tx('online'))}</span>`;
    compact.insertBefore(onlineBtn, document.getElementById('historyBtn'));
    const countBadge = document.getElementById('activeFilterCount');
    const filterButton = document.getElementById('filterDrawerBtn');
    if (countBadge && filterButton) filterButton.appendChild(countBadge);

    const header = document.createElement('div');
    header.className = 'filter-sheet-head';
    header.innerHTML = `<div><small>${esc(tx('filters'))}</small><h2>${esc(tx('filterTitle'))}</h2></div><button class="btn filter-close" type="button">×</button>`;
    panel.prepend(header);

    const existingControls = [...panel.querySelectorAll(':scope > .control')];
    const basics = document.createElement('section'); basics.className = 'filter-section filter-basics';
    basics.innerHTML = `<h3>${esc(tx('filterBasics'))}</h3><div class="filter-control-grid"></div>`;
    basics.querySelector('.filter-control-grid').append(...existingControls);
    panel.appendChild(basics);

    const groups = [
      {title:'filterGoal', keys:['under150','lowcal','under300','highprotein','protein30','highfiber','lowcarb','lowfat']},
      {title:'filterMeal', keys:['breakfast','dinner','family']},
      {title:'filterPractical', keys:['quick','mealprep','cheap']}
    ];
    for (const group of groups) {
      const sec = document.createElement('section'); sec.className = 'filter-section';
      sec.innerHTML = `<h3>${esc(tx(group.title))}</h3><div class="filter-choice-grid"></div>`;
      const grid = sec.querySelector('.filter-choice-grid');
      group.keys.forEach(key => {
        const chip = chips.querySelector(`[data-filter="${key}"]`);
        if (chip) grid.appendChild(chip);
      });
      panel.appendChild(sec);
    }
    const allChip = chips.querySelector('[data-filter="all"]');
    if (allChip) allChip.hidden = true;
    chips.hidden = true;

    const actions = document.createElement('div');
    actions.className = 'filter-sheet-actions';
    actions.innerHTML = `<button class="btn" id="v14ClearFilters" type="button">${esc(tx('clearFilters'))}</button><button class="btn primary" id="v14ApplyFilters" type="button">${esc(tx('showRecipes'))}</button>`;
    panel.appendChild(actions);

    const backdrop = document.createElement('div'); backdrop.className = 'filter-backdrop'; backdrop.id = 'filterBackdrop';
    panel.before(backdrop);
    const summary = document.createElement('div'); summary.className = 'v14-active-summary'; summary.id = 'v14ActiveSummary';
    compact.after(summary);

    document.getElementById('filterDrawerBtn')?.addEventListener('click', () => requestAnimationFrame(syncFilterOpen));
    header.querySelector('.filter-close').onclick = closeFilterSheet;
    backdrop.onclick = closeFilterSheet;
    document.getElementById('v14ApplyFilters').onclick = closeFilterSheet;
    document.getElementById('v14ClearFilters').onclick = () => {
      allChip?.click();
      const chapter = document.getElementById('chapter'); chapter.value='all'; chapter.dispatchEvent(new Event('change',{bubbles:true}));
      const sort = document.getElementById('sort'); sort.value='default'; sort.dispatchEvent(new Event('change',{bubbles:true}));
      document.getElementById('search').value=''; document.getElementById('search').dispatchEvent(new Event('input',{bubbles:true}));
      render(); updateFilterSummary();
    };
    document.querySelectorAll('.filter-chip').forEach(chip => chip.addEventListener('click', () => requestAnimationFrame(updateFilterSummary)));
    document.getElementById('chapter')?.addEventListener('change', updateFilterSummary);
    document.getElementById('sort')?.addEventListener('change', updateFilterSummary);
    document.getElementById('search')?.addEventListener('input', updateFilterSummary);
  }

  function syncFilterOpen() {
    const open = document.getElementById('filterPanel')?.classList.contains('open');
    document.body.classList.toggle('filters-open', Boolean(open));
  }
  function closeFilterSheet() {
    document.getElementById('filterPanel')?.classList.remove('open');
    document.body.classList.remove('filters-open');
  }
  function updateFilterSummary() {
    const root = document.getElementById('v14ActiveSummary'); if (!root) return;
    const labels = [...document.querySelectorAll('.filter-chip.active:not([data-filter="all"])')].map(el => el.textContent.trim()).filter(Boolean);
    const chapter = document.getElementById('chapter'); if (chapter?.value && chapter.value !== 'all') labels.unshift(chapter.selectedOptions[0]?.textContent || chapter.value);
    const query = document.getElementById('search')?.value?.trim(); if (query) labels.unshift(`“${query}”`);
    root.innerHTML = labels.length ? labels.map(label => `<span>${esc(label)}</span>`).join('') : `<small>${esc(tx('noSelectedFilters'))}</small>`;
    const badge = document.getElementById('activeFilterCount');
    if (badge) { badge.textContent = labels.length ? String(labels.length) : ''; badge.classList.toggle('has-count', labels.length > 0); }
  }

  async function fetchJson(url, options = {}) {
    if (!navigator.onLine) throw new Error(tx('networkNeeded'));
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(url, {...options, signal:controller.signal, headers:{'Accept':'application/json', ...(options.headers||{})}});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  function mealIngredients(meal) {
    const out=[];
    for (let i=1;i<=20;i++) {
      const ingredient=String(meal[`strIngredient${i}`]||'').trim();
      const measure=String(meal[`strMeasure${i}`]||'').trim();
      if (ingredient) out.push(`${measure} ${ingredient}`.replace(/\s+/g,' ').trim());
    }
    return out;
  }
  function splitInstructions(text) {
    const raw=String(text||'').replace(/\r/g,'\n').split(/\n+|(?<=[.!?])\s+(?=[A-Z0-9])/).map(x=>x.trim()).filter(x=>x.length>2);
    return raw.length ? raw.slice(0,40) : [String(text||'').trim()].filter(Boolean);
  }
  function setMealLoading() { document.getElementById('mealResults').innerHTML=`<div class="online-state">${esc(tx('loading'))}</div>`; document.getElementById('mealDetail').innerHTML=''; }
  function renderMealCards(meals) {
    const root=document.getElementById('mealResults');
    if (!meals?.length) {root.innerHTML=`<div class="online-state">${esc(t('noResults'))}</div>`;return;}
    root.innerHTML=meals.slice(0,30).map(meal=>`<button class="online-card" data-meal-id="${esc(meal.idMeal)}"><img src="${esc(meal.strMealThumb||'')}" alt=""><span><b>${esc(meal.strMeal)}</b><small>${esc([meal.strArea,meal.strCategory].filter(Boolean).join(' · '))}</small></span></button>`).join('');
    root.querySelectorAll('[data-meal-id]').forEach(btn=>btn.onclick=()=>loadMealDetail(btn.dataset.mealId));
  }
  async function searchMeals(type, value) {
    setMealLoading();
    try {
      let url;
      if (type==='search') url=`${API.meal}/search.php?s=${encodeURIComponent(value)}`;
      if (type==='area') url=`${API.meal}/filter.php?a=${encodeURIComponent(value)}`;
      if (type==='category') url=`${API.meal}/filter.php?c=${encodeURIComponent(value)}`;
      if (type==='ingredient') url=`${API.meal}/filter.php?i=${encodeURIComponent(value)}`;
      if (type==='random') url=`${API.meal}/random.php`;
      const data=await fetchJson(url); renderMealCards(data.meals || []);
      if (type==='random' && data.meals?.[0]) renderMealDetail(data.meals[0]);
    } catch (error) { document.getElementById('mealResults').innerHTML=`<div class="online-state error">${esc(error.message||tx('onlineError'))}</div>`; }
  }
  async function loadMealDetail(id) {
    document.getElementById('mealDetail').innerHTML=`<div class="online-state">${esc(tx('loading'))}</div>`;
    try { const data=await fetchJson(`${API.meal}/lookup.php?i=${encodeURIComponent(id)}`); renderMealDetail(data.meals?.[0]); }
    catch(error){document.getElementById('mealDetail').innerHTML=`<div class="online-state error">${esc(tx('onlineError'))}</div>`;}
  }
  function renderMealDetail(meal) {
    if (!meal) return; currentMeal=meal;
    const ingredients=mealIngredients(meal);
    const source=meal.strSource || meal.strYoutube || '';
    document.getElementById('mealDetail').innerHTML=`
      <article class="online-meal-detail"><img class="online-detail-image" src="${esc(meal.strMealThumb||'')}" alt=""><div class="online-detail-body">
      <small>${esc([meal.strArea,meal.strCategory].filter(Boolean).join(' · '))}</small><h3>${esc(meal.strMeal)}</h3>
      <h4>${esc(tx('ingredients'))}</h4><ul>${ingredients.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>
      <h4>${esc(tx('instructions'))}</h4><ol>${splitInstructions(meal.strInstructions).map(x=>`<li>${esc(x)}</li>`).join('')}</ol>
      <div class="online-detail-actions"><button class="btn primary" id="importMeal">${esc(tx('importRecipe'))}</button>${source?`<a class="btn" href="${esc(source)}" target="_blank" rel="noopener">${esc(tx('openSource'))}</a>`:''}</div></div></article>`;
    document.getElementById('importMeal').onclick=()=>importMeal(meal);
  }
  function importMeal(meal) {
    if (customRecipes().some(r=>String(r.sourceMealId||'')===String(meal.idMeal))) {toast(tx('alreadyImported'));return;}
    const ingredients=mealIngredients(meal); const calc=window.__cookbookV14.calculateIngredients(ingredients,1).total;
    const id=Date.now();
    const record={id,custom:true,name:meal.strMeal,chapter:'12. Online recepty',emoji:'🌐',kind:'Meal prep',flavor:'online',
      kcal:calc.kcal,p:calc.p,c:calc.c,f:calc.f,fiber:calc.fiber,servings:1,nutritionMode:'calculated',cost:0,time:'30 min',diff:'Online recipe',
      ingredients,steps:splitInstructions(meal.strInstructions),familySwap:[],familyIngredients:[],stores:`TheMealDB${meal.strSource?` · ${meal.strSource}`:''}`,
      prep:tx('estimatedNutrition'),freeze:'',keep:'',image:meal.strMealThumb||'',sourceMealId:meal.idMeal,sourceUrl:meal.strSource||meal.strYoutube||''};
    const list=[record,...customRecipes()]; localStorage.setItem('cookCustom',JSON.stringify(list)); if (cloudState) cloudState.custom_recipes=list; cloudChanged();
    buildSelects(); render(); closeOnline(); openRecipe(id); toast(tx('imported'));
  }

  function nutrientsFromProduct(product) {
    const n=product?.nutriments||{}; const val=(...keys)=>{for(const key of keys){const x=Number(n[key]);if(Number.isFinite(x))return x;}return 0;};
    return {kcal:val('energy-kcal_100g','energy-kcal'),p:val('proteins_100g','proteins'),c:val('carbohydrates_100g','carbohydrates'),f:val('fat_100g','fat'),fiber:val('fiber_100g','fiber')};
  }
  function foodLibrary(){try{const x=JSON.parse(localStorage.getItem('cookFoodLibrary')||'[]');return Array.isArray(x)?x:[]}catch{return[]}}
  function saveFoodLibrary(list){localStorage.setItem('cookFoodLibrary',JSON.stringify(list));if(cloudState)cloudState.food_library=list;cloudChanged();renderFoodLibrary();}
  function saveFoodItem(item) {
    const list=foodLibrary(); const signature=String(item.barcode||item.fdcId||item.name).toLowerCase();
    if(list.some(x=>String(x.barcode||x.fdcId||x.name).toLowerCase()===signature)){toast(tx('foodExists'));return;}
    saveFoodLibrary([item,...list]); toast(tx('foodSaved'));
  }
  async function lookupProduct(barcode) {
    const root=document.getElementById('productResult'); root.innerHTML=`<div class="online-state">${esc(tx('loading'))}</div>`;
    try {
      const fields='code,product_name,product_name_en,brands,quantity,nutriments,image_front_small_url,image_front_url';
      const data=await fetchJson(`${API.off}/${encodeURIComponent(barcode)}.json?fields=${fields}`,{});
      if(!data.product) throw new Error(tx('productNotFound')); renderProduct(data.product);
    } catch(error){root.innerHTML=`<div class="online-state error">${esc(error.message||tx('productNotFound'))}</div>`;}
  }
  function renderProduct(product) {
    const n=nutrientsFromProduct(product); const name=product.product_name||product.product_name_en||product.brands||product.code;
    const item={id:`off-${product.code}`,name,aliases:[product.brands,product.product_name_en,product.code].filter(Boolean),barcode:product.code,source:'Open Food Facts',per100:n,defaultGrams:100};
    document.getElementById('productResult').innerHTML=`<article class="product-card">${product.image_front_small_url||product.image_front_url?`<img src="${esc(product.image_front_small_url||product.image_front_url)}" alt="">`:''}<div><small>${esc(product.brands||'Open Food Facts')}</small><h3>${esc(name)}</h3><p class="note">${esc(product.quantity||'')}</p>${macroRow(n)}<p><b>${esc(tx('useIngredientLine'))}:</b> 100 g ${esc(name)}</p><button class="btn primary" id="saveProductFood">${esc(tx('saveFood'))}</button></div></article>`;
    document.getElementById('saveProductFood').onclick=()=>saveFoodItem(item);
  }
  function macroRow(n){return `<div class="online-macros"><span><b>${Math.round(n.kcal||0)}</b> kcal</span><span><b>${round14(n.p||0)}</b> P</span><span><b>${round14(n.c||0)}</b> C</span><span><b>${round14(n.f||0)}</b> F</span><span><b>${round14(n.fiber||0)}</b> Fib</span></div>`;}

  function usdaProxyUrl() {
    const base=String(SUPABASE_CONFIG?.url||'').replace(/\/$/,'');
    if(!base || /YOUR_|example/i.test(base)) return '';
    return `${base}/functions/v1/usda-food-search`;
  }
  async function searchUsda(query) {
    const root=document.getElementById('usdaResults'); const url=usdaProxyUrl();
    if(!url){root.innerHTML=`<div class="online-state">${esc(tx('usdaUnavailable'))}</div>`;return;}
    root.innerHTML=`<div class="online-state">${esc(tx('loading'))}</div>`;
    try{
      const headers={'Content-Type':'application/json'}; if(SUPABASE_CONFIG.anonKey){headers.Authorization=`Bearer ${SUPABASE_CONFIG.anonKey}`;headers.apikey=SUPABASE_CONFIG.anonKey;}
      const data=await fetchJson(url,{method:'POST',headers,body:JSON.stringify({query})}); renderUsda(data.foods||[]);
    }catch(error){root.innerHTML=`<div class="online-state error">${esc(error.message||tx('onlineError'))}</div>`;}
  }
  function renderUsda(foods){const root=document.getElementById('usdaResults');if(!foods.length){root.innerHTML=`<div class="online-state">${esc(t('noResults'))}</div>`;return;}root.innerHTML=foods.map((food,index)=>`<article class="usda-card"><div><small>${esc(food.dataType||'USDA')}</small><h3>${esc(food.description)}</h3>${macroRow(food.per100||{})}</div><button class="btn" data-usda-save="${index}">${esc(tx('addFood'))}</button></article>`).join('');root.querySelectorAll('[data-usda-save]').forEach(btn=>btn.onclick=()=>{const food=foods[Number(btn.dataset.usdaSave)];saveFoodItem({id:`usda-${food.fdcId}`,fdcId:food.fdcId,name:food.description,aliases:[food.description],source:'USDA FoodData Central',per100:food.per100||{},defaultGrams:100});});}
  function renderFoodLibrary(){const root=document.getElementById('foodLibrary');if(!root)return;const list=foodLibrary();if(!list.length){root.innerHTML=`<div class="online-state">${esc(tx('noSavedFoods'))}</div>`;return;}root.innerHTML=list.map((item,index)=>`<article class="library-card"><div><small>${esc(item.source||'Custom')}</small><h3>${esc(item.name)}</h3>${macroRow(item.per100||{})}<p class="note">100 g ${esc(item.name)}</p></div><button class="btn danger" data-food-delete="${index}">${esc(tx('delete'))}</button></article>`).join('');root.querySelectorAll('[data-food-delete]').forEach(btn=>btn.onclick=()=>{const next=foodLibrary();next.splice(Number(btn.dataset.foodDelete),1);saveFoodLibrary(next);});}

  function switchOnlineTab(name){onlineTab=name;document.querySelectorAll('.online-tab').forEach(x=>x.classList.toggle('active',x.dataset.onlineTab===name));document.querySelectorAll('.online-pane').forEach(x=>x.classList.toggle('active',x.dataset.onlinePane===name));if(name==='library')renderFoodLibrary();}
  function openOnline(){applyV14Text();document.getElementById('onlineModal').classList.add('open');if(!document.getElementById('mealResults').children.length)searchMeals('area','Japanese');}
  function closeOnline(){document.getElementById('onlineModal').classList.remove('open');}
  function bindOnline(){
    document.getElementById('onlineBtn').onclick=openOnline;document.getElementById('closeOnline').onclick=closeOnline;
    document.querySelectorAll('.online-tab').forEach(btn=>btn.onclick=()=>switchOnlineTab(btn.dataset.onlineTab));
    document.getElementById('mealSearchForm').onsubmit=e=>{e.preventDefault();const q=document.getElementById('mealSearch').value.trim();if(q)searchMeals('search',q);};
    document.querySelectorAll('[data-meal-area]').forEach(b=>b.onclick=()=>searchMeals('area',b.dataset.mealArea));
    document.querySelectorAll('[data-meal-category]').forEach(b=>b.onclick=()=>searchMeals('category',b.dataset.mealCategory));
    document.querySelectorAll('[data-meal-ingredient]').forEach(b=>b.onclick=()=>searchMeals('ingredient',b.dataset.mealIngredient));
    document.querySelectorAll('[data-meal-random]').forEach(b=>b.onclick=()=>searchMeals('random',''));
    document.getElementById('barcodeForm').onsubmit=e=>{e.preventDefault();const code=document.getElementById('barcodeInput').value.replace(/\D/g,'');if(code)lookupProduct(code);};
    document.getElementById('usdaForm').onsubmit=e=>{e.preventDefault();const q=document.getElementById('usdaInput').value.trim();if(q)searchUsda(q);};
    document.getElementById('language').addEventListener('change',()=>setTimeout(applyV14Text));
  }

  document.addEventListener('DOMContentLoaded',()=>{
    addTranslations(); ensureOnlineModal(); groupFilterChips(); bindOnline(); applyV14Text();
    document.documentElement.dataset.appVersion='14';
  });
})();
