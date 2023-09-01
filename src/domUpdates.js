//NOTE: Your DOM manipulation will occur in this file
import ingredientsData from '../sample-data/sample-ingredients';
import recipeData from '../sample-data/sample-recipes.js';
import {
  filterByTag,
  filterByName,
  getIngredientsByRecipe,
  calculateRecipeCost,
  getRecipeInstructions,
} from './filter-recipes';
// import userData from '../sample-data/sample-users';

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const searchInput = document.getElementById('searchInput');

//Buttons
const searchButton = document.querySelector('.search-btn');
const clearSearch = document.querySelector('.clear-search-btn');

//Event Listeners Here👇

searchButton.addEventListener('click', function (event) {
  showSearchResults();
});

clearSearch.addEventListener('click', function (event) {
  console.log('Not so Sucky!');
  searchInput.value = '';
  renderRecipeCards;
});

//Event Handlers Here👇
const renderRecipeCards = recipeList => {
  console.log('Getting Here!');
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

const showSearchResults = () => {
  let searchValue = searchInput.value;
  console.log('You Searched:', searchValue);
  recipeContainer.innerHTML = '';
  const searchedRecipes = filterByName(recipeData, searchValue);
  if (!searchedRecipes.length) {
    recipeContainer.innerHTML = `
    <div class="no-recipes-found-message">
    </div>`;
  } else {
    searchedRecipes.forEach(recipe => {
      recipeContainer.innerHTML += `
      <div class="recipe" id="${recipe.id}">
      <img
        src="${recipe.image}" alt="${recipe.name}" class="recipe-image"
      />
      <h4>${recipe.tags[0]}</h4>
      <h3 class="recipe-name">${recipe.name}</h3>
    </div>`;
    });
  }
};

export { renderRecipeCards, showSearchResults };
