/* Japan Protein Cookbook v12
   Universal recipe editing + automatic ingredient nutrition calculator.
   This file intentionally extends the stable v11 build without rewriting its recipe database. */
(() => {
  'use strict';

  const VERSION = '12';
  const MAX_SERVINGS = 30;
  let formBaseline = null;

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
    {key:'natto', re:/natto|納豆/i, per100:N(200,17,12,10,5), defaultGrams:40},
    {key:'rice', re:/rýže|rice|ご飯|米/i, per100:N(156,2.5,35,.3,.3), defaultGrams:120},
    {key:'mozzarella', re:/mozzarella|モッツァレラ/i, per100:N(280,28,3,17,0), defaultGrams:40},
    {key:'tomato-sauce', re:/rajčat.*omáč|tomato sauce|トマトソース/i, per100:N(35,1.5,7,.3,1.5), defaultGrams:50},
    {key:'miso-soup', re:/miso polév|miso soup|味噌汁/i, perItem:N(40,3,5,1,1), itemWeight:1},
    {key:'kimchi', re:/kimchi|キムチ/i, per100:N(23,1.1,4,.5,2.4), defaultGrams:50},
    {key:'broccoli', re:/brokol|broccoli|ブロッコリー/i, per100:N(34,2.8,7,.4,2.6), defaultGrams:100},
    {key:'spinach', re:/špenát|spinach|ほうれん草/i, per100:N(23,2.9,3.6,.4,2.2), defaultGrams:50},
    {key:'cucumber', re:/okurka|cucumber|きゅうり/i, per100:N(15,.7,3.6,.1,.5), defaultGrams:100},
    {key:'tomatoes', re:/cherry rajč|tomato|トマト/i, per100:N(18,.9,3.9,.2,1.2), defaultGrams:100},
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
  function findFood(text) {
    return FOOD_DB.find(item => item.re.test(String(text))) || null;
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

  window.__cookbookV12 = {version:VERSION, calculateIngredients, inferServings, deriveFamilyIngredients, effectiveIngredients, nutritionForLine, adjustNutritionFromBaseline};

  document.addEventListener('DOMContentLoaded', () => {
    bindV12Controls();
    document.documentElement.dataset.appVersion = VERSION;
    render();
  });
})();
