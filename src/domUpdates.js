//NOTE: Your DOM manipulation will occur in this file
import ingredientsData from '../sample-data/sample-ingredients';
import recipeData from '../sample-data/sample-recipes.js';
import { filterByTag, filterByName, calculateRecipeCost, getRecipeInstructions } from '../src/filter-recipes'
// import userData from '../sample-data/sample-users';

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const individualRecipeDetails = document.querySelector('.individual-recipe-view');

//Buttons

//Event Handlers Here👇
const renderRecipeCards = recipeList => {
  console.log('getting here');
  //Note - if time! could add iterator for tags array
  recipeList.forEach(recipe => {
    recipeContainer.innerHTML += `
    <div class="recipe" id="${recipe.id}">
      <img
        src="${recipe.image}" alt="${recipe.name}" class="recipe-image"
      />
      <h4>${recipe.tags[0]}</h4>
      <h3 class="recipe-name">${recipe.name}</h3>
    </div>`;
  });
};

//loop through the data
//update each recipe card
//view all recipes

const renderRecipeDetails = (event) =>{
  console.log("hellllo")
  individualRecipeDetails.innerHTML += ' '
  const chosenRecipe = filterByName(recipeData, name)
  const recipeCost = calculateRecipeCost(recipeData, ingredientsData)
  const ingredientDetails = getIngredientsByRecipe(recipeData, ingredientsData, name)
  const instructions = getRecipeInstructions(recipeData, ingredientsData, name)


  individualRecipeDetails.innerHTML += `
  <div class="recipe-name-wrapper">
    <h3 class="recipe-name">${chosenRecipe[0].name}</h3>
  </div>
  <div class="recipe-image-wrapper">
  <img
          src="${chosenRecipe[0].image}" alt="${chosenRecipe[0].name}" class="recipe-image">
  </div>
  <div class="recipe-ingredients-wrapper">
    <h3 class="individual-recipe-headings">Ingredients</h3>
    <div class="recipe-ingredients-list">${ingredientDetails.ingredients}</div>
    <p class="recipe-cost">This recipe costs $${recipeCost} to make.</p>
  </div>
  <div class="recipe-instructions-wrapper">
    <h3 class="individual-recipe-headings">Instructions</h3>
    <div class="recipe-instructions-list">${instructions[0].instructions}</div>
  </div>`
}


export { renderRecipeCards, renderRecipeDetails };
