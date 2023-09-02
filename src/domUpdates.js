//NOTE: Your DOM manipulation will occur in this file
import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';
import { filterByTag, filterByName, calculateRecipeCost, getIngredientsByRecipe, getRecipeInstructions, findRecipe, formatInstructions } from '../src/filter-recipes'
// import userData from '../sample-data/sample-users';

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const individualRecipeView = document.querySelector('.individual-recipe-view');
const homeView = document.querySelector('.homepage-view')

//Event Listeners Here👇
recipeContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('recipe')) {
    renderRecipeDetails(event)
  }
})

//Buttons

//Event Handlers Here👇
export const renderRecipeCards = recipeList => {
  //Note - if time! could add iterator for tags array
  recipeList.forEach(recipe => {
    recipeContainer.innerHTML += `
    <div class="recipe" id="${recipe.name}">
      <img
        src="${recipe.image}" alt="${recipe.name}" class="recipe-image"
      />
      <h4>${recipe.tags[0]}</h4>
      <h3 class="recipe-name">${recipe.name}</h3>
    </div>`;
  });
};

export const renderRecipeDetails = (event) =>{
removeHiddenClass([individualRecipeView])
addHiddenClass([recipeContainer, homeView])
  individualRecipeView.innerHTML += ' '
  const recipeName = event.target.id
  const chosenRecipe = findRecipe(recipeData, recipeName)
  const recipeCost = calculateRecipeCost(recipeData, ingredientsData)
  const instructions = getRecipeInstructions(recipeData, recipeName)
  const formattedInstructions =  formatInstructions(instructions)
  const ingredientDetails = getIngredientsByRecipe(recipeData, ingredientsData, recipeName)
  individualRecipeView.innerHTML += `
  <div class="recipe-name-wrapper">
    <h3 class="recipe-name">${chosenRecipe.name}</h3>
  </div>
  <div class="recipe-image-wrapper">
  <img
          src="${chosenRecipe.image}" alt="${chosenRecipe.name}" class="recipe-image">
  </div>
  <div class="recipe-ingredients-wrapper">
    <h3 class="individual-recipe-headings">Ingredients</h3>
    <div class="recipe-ingredients-list">${ingredientDetails}</div>
    <p class="recipe-cost">This recipe costs $${recipeCost} to make.</p>
  </div>
  <div class="recipe-instructions-wrapper">
    <h3 class="individual-recipe-headings">Instructions</h3>
    <div class="recipe-instructions-list">${formattedInstructions}</div>
  </div>`
}

const removeHiddenClass = (elements) => {
  elements.forEach((element) => {
    element.classList.remove('hidden')
  })
return elements
};

const addHiddenClass = (elements) => {
  elements.forEach((element) => {
    element.classList.add('hidden')
  })
return elements
};

// export { renderRecipeCards, renderRecipeDetails };
