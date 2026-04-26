function renderSteps() {
  document.getElementById('steps-list').innerHTML = recipe.steps.map(step => `
    <li class="step-item">
      <p class="step-technique">${step.technique}</p>
      <p class="step-text">${step.text}</p>
      <p class="step-time">${step.time}</p>
    </li>
  `).join('');
}

function renderIngredients() {
  const ratio = currentServings / recipe.servings;

  document.getElementById('ingredients-list').innerHTML = recipe.ingredients.map(ing => {
    const scaled = Math.round(ing.amount * ratio * 10) / 10;

    return `
      <li class="ingredient-item">
        <span class="ingredient-name">${ing.name}</span>
        <span class="ingredient-amount">${scaled} ${ing.unit}</span>
      </li>
    `;
  }).join('');

  document.getElementById('servings-num').textContent = currentServings;
  document.getElementById('stat-servings').textContent = currentServings;
}

const params = new URLSearchParams(window.location.search);
const recipeId = Number(params.get('id'));

const recipe = recipes.find(r => r.id === recipeId);

if (!recipe) {
  window.location.href = 'index.html';
}

document.getElementById('detail-title').textContent = recipe.title;
document.getElementById('detail-category').textContent = recipe.category_display_name;
document.getElementById('stat-time').textContent = recipe.cookTime;
document.getElementById('detail-hero-img').innerHTML = `<img src="${recipe.photoPath}" alt="${recipe.title}">`;

let currentServings = recipe.servings;

document.getElementById('btn-minus').addEventListener('click', () => {
  if (currentServings > 1) {
    currentServings--;
    renderIngredients();
  }
});

document.getElementById('btn-plus').addEventListener('click', () => {
  if (currentServings < 20) {
    currentServings++;
    renderIngredients();
  }
});

renderIngredients();
renderSteps();