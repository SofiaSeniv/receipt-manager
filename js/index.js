function renderCard(recipe) {
  return `
    <article class="recipe-card">
        <a href="details.html?id=${recipe.id}">
          <img src="${recipe.photoPath}" alt="${recipe.title}">
          <div class="card-content">
              <p>${recipe.category_display_name}</p>
              <h2>${recipe.title}</h2>
              <dl>
                  <dt>Час</dt>
                  <dd>${recipe.cookTime}</dd>
                  <dt>Порції</dt> 
                  <dd>${recipe.servings}</dd>
              </dl>
              ${recipe.techniques.map(t => `<span class="tag">${t}</span>`).join("")}
              <p>${recipe.versionsCount} версії</p>
          </div>
        </a>
    </article>
  `;
}

function renderRecipes(recipes) {
    const recipeGrid = document.getElementById('recipe-grid');
    recipeGrid.innerHTML = recipes.map(r => renderCard(r)).join("")
}

function getFilteredRecipes() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const activeBtn = document.querySelector('.filter-btn.active');
  const activeFilter = activeBtn.dataset.filter;

  return recipes.filter(r => {
    const matchesCategory = activeFilter === 'all' || r.category_name === activeFilter;
    const matchesQuery = r.title.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}


document.getElementById('search-input').addEventListener('input', () => {
  renderRecipes(getFilteredRecipes());
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderRecipes(getFilteredRecipes());
  });
});


renderRecipes(recipes);