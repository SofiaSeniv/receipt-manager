import { recipes, CategoryName, Recipe } from "./data";

function renderCard(recipe: Recipe): string {
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

function renderRecipes(recipes: Recipe[]): void {
  const recipeGrid = document.getElementById('recipe-grid');
  if (!recipeGrid) return;
  recipeGrid.innerHTML = recipes.map(r => renderCard(r)).join("")
}

function getFilteredRecipes(): Recipe[] {
  const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
  const query = searchInput?.value.toLowerCase() ?? "";

  const activeBtn = document.querySelector('.filter-btn.active') as HTMLElement | null;
  const activeFilter = activeBtn?.dataset.filter ?? "all";

  return recipes.filter(r => {
    const matchesCategory = activeFilter === 'all' || r.category_name === (activeFilter as CategoryName);
    const matchesQuery = r.title.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
}


const searchInput = document.getElementById("search-input") as HTMLInputElement | null;
searchInput?.addEventListener("input", () => {
  renderRecipes(getFilteredRecipes());
});

document.querySelectorAll<HTMLButtonElement>('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderRecipes(getFilteredRecipes());
  });
});


renderRecipes(recipes);