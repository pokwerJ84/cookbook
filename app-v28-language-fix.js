/* Japan Protein Cookbook v28 - English language cleanup */
(() => {
  'use strict';

  const exact = new Map([
    ['Proteinové snídaně','Protein Breakfasts'],
    ['Proteinové chlebíčky','Protein Loaves'],
    ['Muffiny','Muffins'],
    ['Brownies','Brownies'],
    ['Cheesecakes','Cheesecakes'],
    ['Cookies','Cookies'],
    ['Dezerty','Desserts'],
    ['Slané pečení','Savory Baking'],
    ['Meal prep','Meal Prep'],
    ['Mrazák a do 5 minut','Freezer & Under 5 Minutes'],
    ['Snídaně','Breakfast'],
    ['Svačina','Snack'],
    ['Oběd','Lunch'],
    ['Večeře','Dinner'],
    ['Dezert','Dessert'],
    ['Snadné','Easy'],
    ['Střední','Medium'],
    ['Obtížné','Advanced'],
    ['porce','serving'],
    ['porcí','servings'],
    ['kus','piece'],
    ['kusy','pieces'],
    ['kusů','pieces'],
    ['Ano','Yes'],
    ['Ne','No'],
    ['Mrazák','Freezer'],
    ['Lednice','Refrigerator']
  ]);

  const rules = [
    [/Připrav večer nebo upeč 2–4 porce najednou\./gi,'Prepare in the evening or bake 2–4 servings at once.'],
    [/Lívance, vafle a baked oats ano; jogurtové misky ne\./gi,'Pancakes, waffles and baked oats can be frozen; yogurt bowls cannot.'],
    [/Lednice 1–3 dny podle receptu\./gi,'Keep refrigerated for 1–3 days depending on the recipe.'],
    [/Nahraď 25–30 g proteinového prášku 25 g ovesné mouky a 50 g jogurtu\./gi,'Replace 25–30 g protein powder with 25 g oat flour and 50 g yogurt.'],
    [/AEON, Seiyu, Ito-Yokado, Life nebo Gyomu Super/gi,'AEON, Seiyu, Ito-Yokado, Life or Gyomu Super'],

    [/neslazeného řeckého jogurtu/gi,'unsweetened Greek yogurt'],
    [/řeckého jogurtu/gi,'Greek yogurt'],
    [/řecký jogurt/gi,'Greek yogurt'],
    [/proteinového prášku/gi,'protein powder'],
    [/vanilkového proteinu/gi,'vanilla protein powder'],
    [/čokoládového proteinu/gi,'chocolate protein powder'],
    [/proteinu/gi,'protein powder'],
    [/proteinové/gi,'protein'],
    [/proteinový/gi,'protein'],
    [/proteinová/gi,'protein'],
    [/ovesných vloček/gi,'oats'],
    [/ovesné vločky/gi,'oats'],
    [/ovesné mouky/gi,'oat flour'],
    [/ovesná mouka/gi,'oat flour'],
    [/vloček/gi,'oats'],
    [/vločky/gi,'oats'],
    [/sójového mléka/gi,'soy milk'],
    [/sójové mléko/gi,'soy milk'],
    [/mléka/gi,'milk'],
    [/mléko/gi,'milk'],
    [/jogurtové/gi,'yogurt'],
    [/jogurtová/gi,'yogurt'],
    [/jogurtem/gi,'yogurt'],
    [/jogurtu/gi,'yogurt'],
    [/jogurt/gi,'yogurt'],
    [/vejce/gi,'eggs'],
    [/vajíčko/gi,'egg'],
    [/vody/gi,'water'],
    [/voda/gi,'water'],
    [/borůvek/gi,'blueberries'],
    [/borůvky/gi,'blueberries'],
    [/mražených borůvek/gi,'frozen blueberries'],
    [/mraženého manga/gi,'frozen mango'],
    [/mražené/gi,'frozen'],
    [/mražených/gi,'frozen'],
    [/banánu/gi,'banana'],
    [/banán/gi,'banana'],
    [/jablka/gi,'apple'],
    [/jablko/gi,'apple'],
    [/jablečné/gi,'apple'],
    [/jablečno/gi,'apple'],
    [/cukety/gi,'zucchini'],
    [/cuketa/gi,'zucchini'],
    [/cuketové/gi,'zucchini'],
    [/mrkve/gi,'carrot'],
    [/mrkev/gi,'carrot'],
    [/dýně/gi,'pumpkin'],
    [/kabocha dýňový/gi,'kabocha pumpkin'],
    [/rýže/gi,'rice'],
    [/rýži/gi,'rice'],
    [/kuře/gi,'chicken'],
    [/kuřecí/gi,'chicken'],
    [/makrela/gi,'mackerel'],
    [/tuňák/gi,'tuna'],
    [/losos/gi,'salmon'],
    [/tofu/gi,'tofu'],
    [/natto/gi,'natto'],
    [/edamame/gi,'edamame'],
    [/ovoce/gi,'fruit'],
    [/ovocem/gi,'fruit'],
    [/zeleniny/gi,'vegetables'],
    [/zelenina/gi,'vegetables'],
    [/zeleninou/gi,'vegetables'],
    [/špenát/gi,'spinach'],
    [/jarní cibulka/gi,'green onion'],
    [/skořice/gi,'cinnamon'],
    [/kakaa/gi,'cocoa'],
    [/kakao/gi,'cocoa'],
    [/kokosu/gi,'coconut'],
    [/kokos/gi,'coconut'],
    [/arašídového másla/gi,'peanut butter'],
    [/arašídové máslo/gi,'peanut butter'],
    [/citronové šťávy/gi,'lemon juice'],
    [/citronová šťáva/gi,'lemon juice'],
    [/citronu/gi,'lemon'],
    [/citron/gi,'lemon'],
    [/prášku do pečiva/gi,'baking powder'],
    [/prášek do pečiva/gi,'baking powder'],
    [/chia semínek/gi,'chia seeds'],
    [/chia semínka/gi,'chia seeds'],
    [/psyllia/gi,'psyllium'],
    [/erythritolu/gi,'erythritol'],
    [/erythritol/gi,'erythritol'],
    [/vanilka/gi,'vanilla'],
    [/čokoláda/gi,'chocolate'],
    [/borůvkový/gi,'blueberry'],
    [/borůvkové/gi,'blueberry'],
    [/banánové/gi,'banana'],
    [/citronový/gi,'lemon'],
    [/citronové/gi,'lemon'],
    [/čokoládový/gi,'chocolate'],
    [/čokoládové/gi,'chocolate'],
    [/kokosové/gi,'coconut'],
    [/ovesné/gi,'oat'],

    [/Všechny suroviny/gi,'All ingredients'],
    [/Všechny ingredience/gi,'All ingredients'],
    [/Vše promíchej/gi,'Mix everything'],
    [/Všechno promíchej/gi,'Mix everything'],
    [/Vše smíchej/gi,'Mix everything'],
    [/Smíchej/gi,'Mix'],
    [/Promíchej/gi,'Mix'],
    [/Vmíchej/gi,'Stir in'],
    [/Rozmixuj/gi,'Blend'],
    [/Rozmačkej/gi,'Mash'],
    [/Nakrájej/gi,'Cut'],
    [/Nastrouhej/gi,'Grate'],
    [/Nalij/gi,'Pour'],
    [/Přidej/gi,'Add'],
    [/Přimíchej/gi,'Stir in'],
    [/Peč/gi,'Bake'],
    [/Upeč/gi,'Bake'],
    [/Opékej/gi,'Cook'],
    [/Osmahni/gi,'Sauté'],
    [/Ohřívej/gi,'Heat'],
    [/Nech/gi,'Leave'],
    [/Podávej/gi,'Serve'],
    [/Připrav/gi,'Prepare'],
    [/Rozděl/gi,'Divide'],
    [/Zmraz/gi,'Freeze'],
    [/Uchovávej/gi,'Store'],
    [/Vytvaruj/gi,'Shape'],
    [/Zakryj/gi,'Cover'],
    [/Vyšlehej/gi,'Whisk'],
    [/Uvař/gi,'Cook'],
    [/Povař/gi,'Simmer'],
    [/Opeč/gi,'Cook'],
    [/Potři/gi,'Brush'],
    [/Posyp/gi,'Sprinkle'],
    [/Rozpusť/gi,'Melt'],
    [/Přendej/gi,'Transfer'],
    [/Ochlaď/gi,'Cool'],
    [/Vychlaď/gi,'Chill'],
    [/Dej/gi,'Put'],

    [/suché suroviny/gi,'dry ingredients'],
    [/mokré suroviny/gi,'wet ingredients'],
    [/suroviny/gi,'ingredients'],
    [/ingredience/gi,'ingredients'],
    [/těsta/gi,'batter'],
    [/těsto/gi,'batter'],
    [/do formy/gi,'into the pan'],
    [/do misky/gi,'into a bowl'],
    [/do sklenice/gi,'into a jar'],
    [/ve sklenici/gi,'in a jar'],
    [/na pánvi/gi,'in a pan'],
    [/na nepřilnavé pánvi/gi,'in a non-stick pan'],
    [/ve vaflovači/gi,'in a waffle maker'],
    [/v mikrovlnce/gi,'in the microwave'],
    [/v troubě/gi,'in the oven'],
    [/v lednici/gi,'in the refrigerator'],
    [/do lednice/gi,'into the refrigerator'],
    [/přes noc/gi,'overnight'],
    [/dozlatova/gi,'until golden'],
    [/do hladka/gi,'until smooth'],
    [/hladkého/gi,'smooth'],
    [/malé kostičky/gi,'small cubes'],
    [/malé/gi,'small'],
    [/trochu/gi,'a little'],
    [/podle chuti/gi,'to taste'],
    [/případně/gi,'if needed'],
    [/minimálně/gi,'at least'],
    [/přibližně/gi,'about'],
    [/krátce/gi,'briefly'],
    [/pomalu/gi,'slowly'],
    [/jemně/gi,'gently'],
    [/najednou/gi,'at once'],
    [/navrch/gi,'on top'],
    [/zbytek/gi,'the rest'],
    [/polovinu/gi,'half'],
    [/druhou polovinu/gi,'the other half'],
    [/ráno/gi,'in the morning'],
    [/večer/gi,'in the evening'],
    [/podle receptu/gi,'depending on the recipe'],
    [/pro rodinu/gi,'for the family'],
    [/bez cukru/gi,'unsweetened'],
    [/bez pečení/gi,'no-bake'],
    [/po tréninku/gi,'post-workout'],
    [/do 5 minut/gi,'under 5 minutes'],
    [/mrazák/gi,'freezer'],
    [/lednice/gi,'refrigerator'],
    [/porcí/gi,'servings'],
    [/porce/gi,'serving'],
    [/kusů/gi,'pieces'],
    [/kusy/gi,'pieces'],
    [/minuty/gi,'minutes'],
    [/minut/gi,'minutes'],
    [/hodiny/gi,'hours'],
    [/hodin/gi,'hours'],
    [/dny/gi,'days'],
    [/dní/gi,'days'],
    [/týdny/gi,'weeks'],
    [/týdnů/gi,'weeks'],
    [/měsíce/gi,'months'],
    [/měsíců/gi,'months'],
    [/nebo/gi,'or'],
    [/ano/gi,'yes'],
    [/ ne\./gi,' no.'],
    [/ na 180 °C/gi,' at 180°C'],
    [/ na 175 °C/gi,' at 175°C'],
    [/ na 170 °C/gi,' at 170°C']
  ];

  const czechSignal = /[áčďéěíňóřšťúůýž]|\b(jogurt|ovoce|vejce|voda|mrazák|lednice|porce|porcí|suroviny|ingredience|těsto|mléko|proteinový|proteinové|vločky|mouka|banán|jablko|rýže|kuře|zelenina|nebo|ano|připrav|smíchej|promíchej|peč|nech|podávej)\b/i;

  function translate(value) {
    if (value == null) return value;
    let out = String(value);
    const direct = exact.get(out.trim());
    if (direct) return direct;
    for (const [re, replacement] of rules) out = out.replace(re, replacement);
    return out;
  }

  function isEnglish() {
    return document.getElementById('language')?.value === 'en' || document.documentElement.lang === 'en';
  }

  // Wrap the application's own line translator when it is available.
  try {
    if (typeof trLine === 'function') {
      const previous = trLine;
      trLine = function(value) {
        const out = previous(value);
        return isEnglish() && czechSignal.test(String(out)) ? translate(out) : out;
      };
    }
  } catch (e) { console.warn('v28 trLine wrapper skipped', e); }

  // Final DOM safety pass catches labels or recipe text rendered outside trLine.
  function cleanTextNode(node) {
    if (!isEnglish() || !node?.nodeValue || !czechSignal.test(node.nodeValue)) return;
    const parent = node.parentElement;
    if (!parent || ['SCRIPT','STYLE','TEXTAREA','INPUT','OPTION'].includes(parent.tagName)) return;
    const next = translate(node.nodeValue);
    if (next !== node.nodeValue) node.nodeValue = next;
  }

  function cleanTree(root = document.body) {
    if (!root || !isEnglish()) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(cleanTextNode);
  }

  let cleaning = false;
  const observer = new MutationObserver(mutations => {
    if (!isEnglish() || cleaning) return;
    cleaning = true;
    try {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') cleanTextNode(mutation.target);
        mutation.addedNodes?.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) cleanTextNode(node);
          else if (node.nodeType === Node.ELEMENT_NODE) cleanTree(node);
        });
      }
    } finally { cleaning = false; }
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.dataset.appVersion = '28';
    cleanTree();
    observer.observe(document.body, {subtree:true, childList:true, characterData:true});
    document.getElementById('language')?.addEventListener('change', () => {
      setTimeout(cleanTree, 30);
      setTimeout(cleanTree, 150);
    });
  });
})();
