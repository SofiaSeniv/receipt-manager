import { recipes, Recipe } from "./data";

const params = new URLSearchParams(window.location.search);
const recipeId = Number(params.get("id"));

const recipe: Recipe | undefined = recipes.find(r => r.id === recipeId);
 
if (!recipe) {
  window.location.href = "index.html";
  throw new Error("Recipe not found");
}
 
let currentServings: number = recipe.servings;

function renderSteps(): void {
  const stepsList = document.querySelector(".steps-list");
  if (!stepsList) return;
 
  stepsList.innerHTML = recipe!.steps.map(step => `
    <li class="step-item">
      <p class="step-technique">${step.technique}</p>
      <p class="step-text">${step.text}</p>
      <p class="step-time">${step.time}</p>
    </li>
  `).join('');
}

function renderIngredients(): void {
  const ingredientsList = document.querySelector(".ingredients-list");
  const servingsNum = document.querySelector(".servings-num");
  const statServings = document.getElementById("stat-servings");
  if (!ingredientsList) return;
 
  const ratio = currentServings / recipe!.servings;
 
  ingredientsList.innerHTML = recipe!.ingredients.map(ing => {
    const scaled = Math.round(ing.amount * ratio * 10) / 10;
    return `
      <li class="ingredient-item">
        <span class="ingredient-name">${ing.name}</span>
        <span class="ingredient-amount">${scaled} ${ing.unit}</span>
      </li>
    `;
  }).join("");
 
  if (servingsNum) servingsNum.textContent = String(currentServings);
  if (statServings) statServings.textContent = String(currentServings);
}

const detailTitle = document.getElementById("detail-title");
const detailCategory = document.getElementById("detail-category");
const statTime = document.getElementById("stat-time");
const detailHeroImg = document.getElementById("detail-hero-img");
 
if (detailTitle)    detailTitle.textContent = recipe.title;
if (detailCategory) detailCategory.textContent = recipe.category_display_name;
if (statTime)       statTime.textContent = recipe.cookTime;
if (detailHeroImg)  detailHeroImg.innerHTML = `<img src="${recipe.photoPath}" alt="${recipe.title}">`;
 
const btnMinus = document.getElementById("btn-minus");
const btnPlus  = document.getElementById("btn-plus");
 
btnMinus?.addEventListener("click", () => {
  if (currentServings > 1) {
    currentServings--;
    renderIngredients();
  }
});
 
btnPlus?.addEventListener("click", () => {
  if (currentServings < 20) {
    currentServings++;
    renderIngredients();
  }
});
 
renderIngredients();
renderSteps();