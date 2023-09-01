//NOTE: Your DOM manipulation will occur in this file
import ingredientsData from '../sample-data/sample-ingredients';
import recipeData from '../sample-data/sample-recipes.js';
import { filterByTag, filterByName, calculateRecipeCost, getIngredientsByRecipe, getRecipeInstructions, findRecipe} from '../src/filter-recipes'
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
const renderRecipeCards = recipeList => {
  console.log('getting here');
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


const renderRecipeDetails = (event) =>{
  console.log("hellllo")
  // console.log(event.target.id)
removeHiddenClass([individualRecipeView])
addHiddenClass([recipeContainer, homeView])
  individualRecipeView.innerHTML += ' '
  const recipeName = event.target.id


  const chosenRecipe = findRecipe(recipeData, recipeName)
  console.log("RECIPE", chosenRecipe)
  console.log("clickedOnRecipe:", chosenRecipe) // 
  const recipeCost = calculateRecipeCost(recipeData, ingredientsData)
  const instructions = getRecipeInstructions(recipeData, ingredientsData)
  // console.log("recipe instructions:", instructions) // returns empty array
  const ingredientDetails = getIngredientsByRecipe(recipeData, ingredientsData, recipeName)
  // console.log("Ingredients:", ingredientDetails) // returns undefined

  individualRecipeView.innerHTML += `
  <div class="recipe-name-wrapper">
    <h3 class="recipe-name">${chosenRecipe}</h3>
  </div>
  <div class="recipe-image-wrapper">
  <img
          src="${chosenRecipe[0].image}" alt="${chosenRecipe[0].name}" class="recipe-image">
  </div>
  <div class="recipe-ingredients-wrapper">
    <h3 class="individual-recipe-headings">Ingredients</h3>
    <div class="recipe-ingredients-list">${ingredientDetails[0].ingredients}</div>
    <p class="recipe-cost">This recipe costs $${recipeCost} to make.</p>
  </div>
  <div class="recipe-instructions-wrapper">
    <h3 class="individual-recipe-headings">Instructions</h3>
    <div class="recipe-instructions-list">${instructions[0].instructions}</div>
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




export { renderRecipeCards, renderRecipeDetails };
// recipeContainer