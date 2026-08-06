/* Japan Protein Cookbook v26 compatibility patch for the existing v24 bundle. */
(() => {
  'use strict';
  const VERSION = '26';

  function text(cs, en, ja) {
    const lang = document.documentElement.lang || 'cs';
    return lang.startsWith('ja') ? ja : lang.startsWith('en') ? en : cs;
  }

  function updateVersionLabels() {
    document.documentElement.dataset.appVersion = VERSION;
    const label = document.getElementById('appVersionLabel');
    if (label) label.textContent = `${text('Verze aplikace', 'App version', 'アプリバージョン')}: v${VERSION}`;
  }

  function styleFavoriteButtons(root = document) {
    root.querySelectorAll('.fav,.hero-fav').forEach(button => {
      button.classList.add('v26-heart');
      button.setAttribute('aria-label', text('Oblíbené', 'Favorite', 'お気に入り'));
    });
  }

  function nutritionValue(value, divisor, kcal = false) {
    const number = Number(value || 0) / Math.max(1, Number(divisor || 1));
    return kcal ? Math.round(number) : Math.round(number * 10) / 10;
  }

  function improveNutritionSummary() {
    const box = document.querySelector('.ingredient-total-box');
    if (!box || box.dataset.v26 === '1') return;

    let recipe = null;
    try {
      if (typeof allRecipes === 'function' && typeof currentId !== 'undefined') {
        recipe = allRecipes().find(item => Number(item.id) === Number(currentId));
      }
    } catch (_) {}
    if (!recipe) return;

    let total = recipe;
    try {
      if (typeof nutritionFor === 'function') total = nutritionFor(recipe);
    } catch (_) {}

    const servings = Math.max(1, Number(recipe.servings || 1));
    const yieldCount = Math.max(1, Number(recipe.yieldCount || servings));
    const yieldUnit = recipe.yieldUnit || text('porce', 'servings', '食分');
    const labels = {
      title: text('Přehled výživy receptu', 'Recipe nutrition summary', 'レシピの栄養まとめ'),
      yield: text('Výnos', 'Yield', '出来上がり'),
      whole: text('Celý recept', 'Whole recipe', 'レシピ全体'),
      serving: text('Na 1 porci', 'Per serving', '1食分'),
      protein: text('Bílkoviny', 'Protein', 'たんぱく質'),
      carbs: text('Sacharidy', 'Carbs', '炭水化物'),
      fat: text('Tuky', 'Fat', '脂質'),
      fiber: text('Vláknina', 'Fiber', '食物繊維'),
      estimate: text('Hodnoty jsou orientační a mohou se lišit podle konkrétní značky surovin.', 'Values are estimates and may vary by brand.', '数値は目安で、商品によって異なる場合があります。')
    };
    const cells = data => `
      <span><b>${data.kcal}</b><small>kcal</small></span>
      <span><b>${data.p} g</b><small>${labels.protein}</small></span>
      <span><b>${data.c} g</b><small>${labels.carbs}</small></span>
      <span><b>${data.f} g</b><small>${labels.fat}</small></span>
      <span><b>${data.fiber} g</b><small>${labels.fiber}</small></span>`;
    const whole = {
      kcal: Math.round(Number(total.kcal || 0) * servings),
      p: Math.round(Number(total.p || 0) * servings * 10) / 10,
      c: Math.round(Number(total.c || 0) * servings * 10) / 10,
      f: Math.round(Number(total.f || 0) * servings * 10) / 10,
      fiber: Math.round(Number(total.fiber || 0) * servings * 10) / 10
    };
    const perServing = {
      kcal: nutritionValue(whole.kcal, servings, true),
      p: nutritionValue(whole.p, servings),
      c: nutritionValue(whole.c, servings),
      f: nutritionValue(whole.f, servings),
      fiber: nutritionValue(whole.fiber, servings)
    };

    box.dataset.v26 = '1';
    box.innerHTML = `
      <div class="ingredient-total-head">
        <div><div class="ingredient-total-title">${labels.title}</div><div class="ingredient-total-subtitle">${labels.yield}: ${yieldCount} ${yieldUnit}</div></div>
        <div class="ingredient-total-badge">${servings} ${text('porcí', 'servings', '食分')}</div>
      </div>
      <div class="ingredient-total-section"><div class="ingredient-total-section-title">${labels.whole}</div><div class="ingredient-total-grid">${cells(whole)}</div></div>
      <div class="ingredient-total-section"><div class="ingredient-total-section-title">${labels.serving}</div><div class="ingredient-total-grid compact">${cells(perServing)}</div></div>
      <div class="ingredient-estimate-note">${labels.estimate}</div>`;
  }

  function applyEnhancements() {
    updateVersionLabels();
    styleFavoriteButtons();
    improveNutritionSummary();
  }

  document.addEventListener('DOMContentLoaded', applyEnhancements);
  document.addEventListener('click', () => setTimeout(applyEnhancements, 0), true);
  const observer = new MutationObserver(applyEnhancements);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
