//NOTE: Your DOM manipulation will occur in this file

import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';
<<<<<<< HEAD
import {
  filterByTag,
  filterByName,
  calculateRecipeCost,
  getIngredientsByRecipe,
  getRecipeInstructions,
  findRecipe,
  formatInstructions,
} from '../src/filter-recipes';
=======
import { filterByTag, filterByName, calculateRecipeCost, getIngredientsByRecipe, getRecipeInstructions, findRecipe, formatInstructions } from '../src/filter-recipes'


// import recipeData from '../sample-data/sample-recipes.js';


// import { filterByTag } from './filter-recipes';


>>>>>>> bc389c98ac348d4686f120c8133d8a1b5c318761
// import userData from '../sample-data/sample-users';

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const individualRecipeView = document.querySelector('.individual-recipe-view');
const homeView = document.querySelector('.homepage-view');
const searchInput = document.getElementById('searchInput');

// drop-down-menu & select button DOM querySelector
const dropDownMenu = document.querySelector('.drop-down-menu');
const selectButton = document.querySelector('.select-button');

//Buttons
const searchButton = document.querySelector('.search-btn');
const clearSearch = document.querySelector('.clear-search-btn');

//Event Listeners Here👇
recipeContainer.addEventListener('click', event => {
  if (event.target.classList.contains('recipe')) {
    renderRecipeDetails(event);
  }
});

searchButton.addEventListener('click', function (event) {
  renderSearchResults();
});

clearSearch.addEventListener('click', function (event) {
  console.log('Not so Sucky!');
  searchInput.value = '';
  renderRecipeCards;
});

//Event Handlers Here👇

export const renderRecipeCards = recipeList => {
  recipeList.forEach(recipe => {
    recipeContainer.innerHTML += `
    <div class="recipe" id="${recipe.name}">
      <img
        src="${recipe.image}" alt="${recipe.name}" class="recipe-image"
      />
      <h4>${recipe.tags[0]}</h4>
      <h3 class="recipe-name">${recipe.name}</h3>
    <img
      src="src/images/notFavorite.png" id="unclickedHeart" alt="unclicked Favorite" class="favorite-toggle"
      />
      <img
      src="src/images/favorite.png" id="clickedHeart" alt="clicked Favorite" class="favorite-toggle"
      />
    </div>`;
  });
};

export const renderRecipeDetails = event => {
  removeHiddenClass([individualRecipeView]);
  addHiddenClass([recipeContainer, homeView]);
  individualRecipeView.innerHTML += ' ';
  const recipeName = event.target.id;
  const chosenRecipe = findRecipe(recipeData, recipeName);
  const recipeCost = calculateRecipeCost(recipeData, ingredientsData);
  const instructions = getRecipeInstructions(recipeData, recipeName);
  const formattedInstructions = formatInstructions(instructions);
  const ingredientDetails = getIngredientsByRecipe(
    recipeData,
    ingredientsData,
    recipeName
  );
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
  </div>`;
};

const removeHiddenClass = elements => {
  elements.forEach(element => {
    element.classList.remove('hidden');
  });
  return elements;
};

const addHiddenClass = elements => {
  elements.forEach(element => {
    element.classList.add('hidden');
  });
  return elements;
};

const renderSearchResults = () => {
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

const renderRecipeCardsByTag = (recipeList, tag) => {
  const recipeByTagList = filterByTag(recipeList, tag);
  recipeContainer.innerHTML = '';
  if (tag === 'all') {
    renderRecipeCards(recipeList);
  } else {
    recipeByTagList.forEach(recipe => {
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

const renderSelectTagOptions = tagData => {
  tagData.forEach(tag => {
    dropDownMenu.innerHTML += `
    <option value='${tag}'>${tag}</option>
    `;
<<<<<<< HEAD
  });
};
=======
  }); 
}


export { renderSearchResults, renderRecipeCardsByTag, renderSelectTagOptions, selectButton, dropDownMenu };

>>>>>>> bc389c98ac348d4686f120c8133d8a1b5c318761

export {
  // renderRecipeCards,
  renderSearchResults,
  renderRecipeCardsByTag,
  renderSelectTagOptions,
  selectButton,
  dropDownMenu,
};
