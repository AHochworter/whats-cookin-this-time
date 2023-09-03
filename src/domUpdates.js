//NOTE: Your DOM manipulation will occur in this file

import ingredientsData from './data/ingredients';
import recipeData from './data/recipes';
import {
  filterByTag,
  filterByName,
  calculateRecipeCost,
  getIngredientsByRecipe,
  getRecipeInstructions,
  findRecipe,
  formatInstructions,
} from '../src/filter-recipes';
import { saveRecipe, deleteRecipe, currentUser } from '../src/user-recipes';
import { render } from 'sass';
// import userData from '../sample-data/sample-users';
//Global Variables Here👇
let currentRecipeName;
let currentRecipeList = recipeData;

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const individualRecipeView = document.querySelector('.individual-recipe-view');
const individualRecipeContainer = document.querySelector(
  '.individual-recipe-container'
);
const homeView = document.querySelector('.homepage-view');
const discoverRecipesHeader = document.querySelector('.discoverHeader')
const searchInput = document.getElementById('searchInput');
const savedRecipesView = document.querySelector('.saved-recipes-view');

// drop-down-menu & select button DOM querySelector
const dropDownMenu = document.querySelector('.drop-down-menu');
const selectButton = document.querySelector('.select-button');

//Buttons
const searchButton = document.querySelector('.search-btn');
const clearSearch = document.querySelector('.clear-search-btn');
const savedRecipesButton = document.querySelector('.saved-recipes-btn');
const saveRecipeBtn = document.querySelector('.save-button');
const deleteRecipeBtn = document.querySelector('.delete-button');
const homeBtn = document.querySelector('.home-btn');
const welcomeUser = document.querySelector('.welcome-user');
 

//Event Listeners Here👇

homeBtn.addEventListener('click', function() {
  addHiddenClass([individualRecipeView]);
  removeHiddenClass([recipeContainer, homeView]);
  renderRecipeCards(recipeData);
});

recipeContainer.addEventListener('click', event => {
  if (event.target.classList.contains('recipe-card')) {
    renderRecipeDetails(event);
  }
});

searchButton.addEventListener('click', function (event) {
  renderSearchResults(currentRecipeList);
});

selectButton.addEventListener('click', e => {
  e.preventDefault();
  renderRecipeCardsByTag(currentRecipeList, dropDownMenu.value);
});

clearSearch.addEventListener('click', function (event) {
  searchInput.value = '';
  renderSearchResults(currentRecipeList);
});

savedRecipesButton.addEventListener('click', function (event) {
  addHiddenClass([individualRecipeView]);
  removeHiddenClass([recipeContainer, homeView]);
  renderSavedRecipeResults();
  currentRecipeList = currentUser.savedRecipes;
  console.log('Thanks Bret!!!');
  // saveRecipe();
  // console.log('Saved Recipes Array', savedRecipes);
});

deleteRecipeBtn.addEventListener('click', function() {
  renderDeleteRecipeResults()
})


const handleSaveRecipeClick = event => {
  saveRecipe(recipeData, currentRecipeName);
  console.log('Saved Recipe Array', currentUser.savedRecipes);
};



saveRecipeBtn.addEventListener('click', handleSaveRecipeClick);

//Event Handlers Here👇

export const renderRecipeCards = (recipeList) => {
  recipeContainer.innerHTML = ' ';
  recipeList.forEach(recipe => {
    recipeContainer.innerHTML += `
    <div class="recipe recipe-card" id="${recipe.name}">
      <img class="recipe-card"
        src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
      />
      <h4 class="recipe-card" id="${recipe.name}">${recipe.tags[0]}</h4>
      <h3 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h3>
    <img  id="${recipe.name}"
      src="src/images/notFavorite.png" id="unclickedHeart" alt="unclicked Favorite" class="favorite-toggle"
      />
      <img  id="${recipe.name}"
      src="src/images/favorite.png" id="clickedHeart" alt="clicked Favorite" class="favorite-toggle"
      />
    </div>`;
  });
};

export const renderRecipeDetails = event => {
  console.log(event.target)
  removeHiddenClass([individualRecipeView]);
  addHiddenClass([recipeContainer, homeView]);
  individualRecipeContainer.innerHTML = ' ';
  currentRecipeName = event.target.id;
  const chosenRecipe = findRecipe(recipeData, currentRecipeName);
  const recipeCost = calculateRecipeCost(recipeData, ingredientsData);
  const instructions = getRecipeInstructions(recipeData, currentRecipeName);
  const formattedInstructions = formatInstructions(instructions);
  // console.log({ recipeData, ingredientsData, currentRecipeName });
  const ingredientDetails = getIngredientsByRecipe(
    recipeData,
    ingredientsData,
    currentRecipeName
  );
  individualRecipeContainer.innerHTML += `
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

const renderSearchResults = recipes => {
  let searchValue = searchInput.value;
  console.log('You Searched:', searchValue);
  recipeContainer.innerHTML = '';
  const searchedRecipes = filterByName(recipes, searchValue);
  if (!searchedRecipes.length) {
    recipeContainer.innerHTML = `
    <div class="no-recipes-found-message">
    </div>`;
  } else {
    searchedRecipes.forEach(recipe => {
      recipeContainer.innerHTML += `
      <div class="recipe" id="${recipe.name}">
      <img
        src="${recipe.image}" alt="${recipe.name}" class="recipe-image"
      />
      <h4>${recipe.tags[0]}</h4>
      <h3 class="recipe-name">${recipe.name}</h3>
    </div>`;
    });
  }
};

const renderSavedRecipeResults = () => {
  renderRecipeCards(currentUser.savedRecipes);

};
// inside renderSavedRecipeResults, wanting to add conditional that checks if the savedRecipes array length is 0 then change "Discover Recipes" to "There are no saved recipes yet"
// if (!savedRecipes.length) {
//   discoverRecipesHeader.innerHTML = "There are no saved recipes yet."
// } else {
//   renderRecipeCards(savedRecipes);
// }

const renderDeleteRecipeResults = () => {
  renderRecipeCards(currentUser.savedRecipes);
  deleteRecipe(currentUser.savedRecipes, currentRecipeName)
}

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
    <option value="${tag}">${tag}</option>
    `;
  });
};

const welcomeNewUser = () => {
  welcomeUser.innerText = `Welcome to the site ${currentUser.name}!`
}

export {
  // renderRecipeCards,
  renderSearchResults,
  renderRecipeCardsByTag,
  renderSelectTagOptions,
  welcomeNewUser,
  selectButton,
  dropDownMenu,
};
