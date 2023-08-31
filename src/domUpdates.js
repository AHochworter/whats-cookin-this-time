//NOTE: Your DOM manipulation will occur in this file
import ingredientsData from '../sample-data/sample-ingredients';
import recipeData from '../sample-data/sample-recipes.js';
// import userData from '../sample-data/sample-users';

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');

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

export { renderRecipeCards };
