/* Japan Protein Cookbook v26 safe loader.
   Loads the proven v24 core first, then applies small v26 UI improvements. */
(() => {
  'use strict';

  function currentLang() {
    const value = document.documentElement.lang || 'cs';
    return value.startsWith('ja') ? 'ja' : value.startsWith('en') ? 'en' : 'cs';
  }

  function label(cs, en, ja) {
    return { cs, en, ja }[currentLang()];
  }

  function decorateFavorites(root = document) {
    root.querySelectorAll('.fav,.hero-fav').forEach(button => {
      button.classList.add('v26-heart');
      button.setAttribute('aria-label', label('Oblíbené', 'Favorite', 'お気に入り'));
    });
  }

  function redesignNutritionBox() {
    const box = document.querySelector('.ingredient-total-box');
    if (!box || box.dataset.v26Done === '1') return;

    const originalGrid = box.querySelector('.ingredient-total-grid');
    if (!originalGrid) return;

    box.dataset.v26Done = '1';
    const originalTitle = box.querySelector('.ingredient-total-title');
    const note = box.querySelector('.ingredient-estimate-note');

    const header = document.createElement('div');
    header.className = 'ingredient-total-head';
    header.innerHTML = `<div><div class="ingredient-total-title">${label('Přehled výživy receptu', 'Recipe nutrition summary', 'レシピの栄養まとめ')}</div><div class="ingredient-total-subtitle">${label('Hodnoty jsou uvedené přehledně pro připravený recept.', 'Values are shown clearly for the prepared recipe.', '調理したレシピの栄養を見やすく表示しています。')}</div></div>`;

    const section = document.createElement('div');
    section.className = 'ingredient-total-section';
    section.innerHTML = `<div class="ingredient-total-section-title">${label('Celý recept', 'Whole recipe', 'レシピ全体')}</div>`;
    section.appendChild(originalGrid);

    if (originalTitle) originalTitle.remove();
    box.insertBefore(header, box.firstChild);
    if (note) box.insertBefore(section, note); else box.appendChild(section);
  }

  function applyV26() {
    document.documentElement.dataset.appVersion = '26';
    decorateFavorites();
    redesignNutritionBox();
  }

  function installHooks() {
    applyV26();

    if (typeof window.openRecipe === 'function' && !window.openRecipe.__v26Wrapped) {
      const originalOpenRecipe = window.openRecipe;
      const wrapped = function (...args) {
        const result = originalOpenRecipe.apply(this, args);
        setTimeout(applyV26, 0);
        return result;
      };
      wrapped.__v26Wrapped = true;
      window.openRecipe = wrapped;
    }

    document.addEventListener('click', event => {
      if (event.target.closest('[data-open],[data-fav],#detailFav')) setTimeout(applyV26, 0);
    }, true);
  }

  const core = document.createElement('script');
  core.src = './app-v24.js?v=26-core';
  core.defer = true;
  core.onload = installHooks;
  core.onerror = () => {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = label('Aplikaci se nepodařilo načíst. Obnov stránku.', 'The app could not load. Refresh the page.', 'アプリを読み込めませんでした。ページを更新してください。');
      toast.classList.add('show');
    }
  };
  document.head.appendChild(core);
})();
