//NOTE: Your DOM manipulation will occur in this file

//Imports🤞
import {
  filterByTag,
  filterByName,
  calculateRecipeCost,
  getIngredientsByRecipe,
  formatIngredients,
  getRecipeInstructions,
  findRecipe,
  formatInstructions,
} from '../src/filter-recipes';

import { saveRecipe, deleteRecipe, getRandomUser } from '../src/user-recipes';
import {
  getUsers,
  getRecipes,
  getIngredients,
  refreshSavedRecipes,
} from './apiCalls';
import tagData from './data/tags';

//Global Variables👇
let currentRecipeName;
let currentUser;

export let usersData;
export let recipeData;
export let ingredientsData;
export let currentRecipeList;
export let savedRecipes = [];

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const individualRecipeView = document.querySelector('.individual-recipe-view');
const individualRecipeContainer = document.querySelector(
  '.individual-recipe-container'
);
const homeView = document.querySelector('.homepage-view');
const discoverRecipesHeader = document.querySelector('.discover-header');
const searchInput = document.getElementById('searchInput');
const dropDownMenu = document.querySelector('.drop-down-menu');
const selectButton = document.querySelector('.select-button');

//Buttons
const searchButton = document.querySelector('.search-btn');
const clearSearch = document.querySelector('.clear-search-btn');
const savedRecipesButton = document.querySelector('.saved-recipes-btn');
const saveRecipeBtn = document.querySelector('.save-button');
const deleteRecipeBtn = document.querySelector('.delete-button');
const homeBtn = document.querySelector('.home-btn');
const byCostButton = document.querySelector('.by-cost-button');
const welcomeUser = document.querySelector('.welcome-user');
const navCenter = document.querySelector('.nav-center');

//Event Listeners Here👇

const beginFetch = () => {
  Promise.all([getUsers(), getRecipes(), getIngredients()]).then(data => {
    usersData = data[0].users;
    recipeData = data[1].recipes;
    ingredientsData = data[2].ingredients;
    currentRecipeList = recipeData;
    currentUser = getRandomUser(usersData);

    homeBtn.addEventListener('click', function () {
      addHiddenClass([individualRecipeView]);
      removeHiddenClass([
        recipeContainer,
        homeView,
        dropDownMenu,
        selectButton,
        navCenter,
      ]);
      recipeContainer.innerHTML = '';
      currentRecipeList = recipeData;
      discoverRecipesHeader.innerText = 'Discover Recipes';
      renderRecipeCards(recipeData);
      dropDownMenu.value = 'all';
    });

    recipeContainer.addEventListener('click', event => {
      const recipeName = event.target.closest('div').id;
      currentRecipeName = recipeName;
      console.log(recipeName);
      renderRecipeDetails(recipeName);
    });

    searchButton.addEventListener('click', function (event) {
      renderSearchResults(currentRecipeList);
    });

    clearSearch.addEventListener('click', function (event) {
      searchInput.value = '';
      resetSearch();
      if (discoverRecipesHeader.innerText === 'Saved Recipes') {
        renderSavedRecipeResults();
      } else {
        renderSearchResults();
      }
    });

    byCostButton.addEventListener('click', function (event) {
      const maxCost = parseFloat(document.getElementById('maxCostInput').value);
      if (!isNaN(maxCost)) {
        renderFilteredRecipes(maxCost);
      }
    });

    selectButton.addEventListener('click', e => {
      e.preventDefault();
      renderRecipeCardsByTag(currentRecipeList, dropDownMenu.value);
      currentRecipeList = recipeData;
    });

    savedRecipesButton.addEventListener('click', function (event) {
      addHiddenClass([individualRecipeView]);
      removeHiddenClass([
        recipeContainer,
        homeView,
        dropDownMenu,
        selectButton,
        navCenter,
      ]);
      currentRecipeList = currentUser.recipesToCook;
      renderSavedRecipeResults();
      dropDownMenu.value = 'all';
    });

    deleteRecipeBtn.addEventListener('click', function () {
      // Debug: Log the currentRecipeName before calling the function
      console.log('Before calling deleteRecipeFromDOM:', currentRecipeName);

      // Delete the recipe from the DOM
      deleteRecipeFromDOM(currentRecipeName);

      // Update the currentUser.recipesToCook array
      currentUser.recipesToCook = deleteRecipe(
        currentUser.recipesToCook,
        currentRecipeName
      );

      // Refresh the saved recipes view
      refreshSavedRecipesView();
    });

    // Function to delete the recipe from the DOM
    function deleteRecipeFromDOM(recipeName) {
      // Remove the recipe's HTML element from the DOM
      const recipeElement = document.getElementById(recipeName);
      console.log(recipeElement);
      console.log('inside deleteRecipeFromDom', recipeName);
      if (recipeElement) {
        recipeElement.remove();
      }

      // Optionally, you can clear the individualRecipeView as well
      individualRecipeContainer.innerHTML = '';
    }

    // Function to refresh the saved recipes view
    function refreshSavedRecipesView() {
      addHiddenClass([individualRecipeView]);
      removeHiddenClass([
        recipeContainer,
        homeView,
        dropDownMenu,
        selectButton,
        navCenter,
      ]);
      currentRecipeList = currentUser.recipesToCook;
      renderSavedRecipeResults();
      dropDownMenu.value = 'all';
    }

    const handleSaveRecipeClick = event => {
      saveRecipe(recipeData, currentRecipeName, currentUser);
    };

    saveRecipeBtn.addEventListener('click', handleSaveRecipeClick);

    //Event Handlers Here👇
    const renderRecipeCards = recipeList => {
      recipeContainer.innerHTML = ' ';
      recipeList.forEach(recipe => {
        if (recipe.tags.length === 0) {
          recipeContainer.innerHTML += `
          <div class="recipe recipe-card" id="${recipe.name}">
            <img class="recipe-card" role="button"
              src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
            />
            <h3 class="recipe-tag recipe-card" id="${recipe.name}">category not indicated</h3>
            <h4 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h4>
          </div>`;
        } else {
          recipeContainer.innerHTML += `
          <div class="recipe recipe-card" id="${recipe.name}">
            <img class="recipe-card" role="button"
              src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
            />
            <h3 class="recipe-tag recipe-card" id="${recipe.name}">${recipe.tags[0]}</h3>
            <h4 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h4>
          </div>`;
        }
      });
    };

    const renderRecipeDetails = recipeName => {
      removeHiddenClass([individualRecipeView]);
      addHiddenClass([
        recipeContainer,
        homeView,
        selectButton,
        dropDownMenu,
        navCenter,
      ]);
      individualRecipeContainer.innerHTML = ' ';
      currentRecipeName = event.target.id;
      const chosenRecipe = findRecipe(recipeData, currentRecipeName);
      const recipeCost = calculateRecipeCost(chosenRecipe, ingredientsData);
      const instructions = getRecipeInstructions(recipeData, currentRecipeName);
      const formattedInstructions = formatInstructions(instructions);
      const ingredientDetails = getIngredientsByRecipe(
        recipeData,
        ingredientsData,
        currentRecipeName
      );
      const formattedIngredients = formatIngredients(ingredientDetails);
      individualRecipeContainer.innerHTML += `
    <div class="individual-recipe-container">    
      <div class="recipe-ingredients-wrapper">
        <div class="recipe-name-heading-wrapper">
        <h3 class="recipe-name-recipe-view">${chosenRecipe.name}</h3>
        </div>
        <div class="recipe-image-details-wrapper">
          <img
                  src="${chosenRecipe.image}" alt="${
        chosenRecipe.name
      }" class="recipe-image-details">
        </div>
          <div class="ingredients-heading-wrapper">
            <h3 class="ingredients-instructions-headings">Ingredients</h3>
          </div>
          <div class="recipe-ingredients-list">${formattedIngredients.replace(
            /\n/g,
            '<br>'
          )}</div>
          <div class="recipe-cost-wrapper">
            <p class="recipe-cost">This recipe costs $${recipeCost} to make.</p>
          </div>
      </div>
      <div class="recipe-instructions-wrapper">
        <div class="instructions-heading-wrapper">
          <h3 class="ingredients-instructions-headings">Instructions</h3>
        </div>
        <div class="recipe-instructions-list">${formattedInstructions.join(
          '<br>'
        )}</div>
      </div>
    </div>`;
    };

    const renderSearchResults = recipes => {
      let searchValue = searchInput.value;
      recipeContainer.innerHTML = '';
      const searchedRecipes = filterByName(currentRecipeList, searchValue);
      if (!searchedRecipes.length) {
        recipeContainer.innerHTML = `
          <div class="no-recipes-found-message">
            <p class="no-recipe-match">No recipes found</p>
          </div>`;
      } else {
        if (discoverRecipesHeader.innerText === 'Saved Recipes') {
          currentRecipeList = currentUser.recipesToCook;
          discoverRecipesHeader.innerText = 'Saved Recipes';
        }
        renderRecipeCards(searchedRecipes);
        currentRecipeList = searchedRecipes;
      }
    };

    const resetSearch = () => {
      searchInput.value = '';
      recipeContainer.innerHTML = '';
      if (discoverRecipesHeader.innerText === 'Saved Recipes') {
        currentRecipeList = currentUser.recipesToCook;
      } else {
        currentRecipeList = recipeData;
      }
    };

    const renderSavedRecipeResults = () => {
      if (currentUser.recipesToCook.length === 0) {
        discoverRecipesHeader.innerText = "You haven't saved any recipes yet.";
        recipeContainer.innerHTML = '';
      } else {
        discoverRecipesHeader.innerText = 'Saved Recipes';
        const savedRecipesToDisplay = recipeData.filter(recipe =>
          currentUser.recipesToCook.includes(recipe.id)
        );
        renderRecipeCards(savedRecipesToDisplay);
        currentRecipeList = savedRecipesToDisplay;
      }
    };

    // const renderDeleteRecipeResults = () => {
    //   renderRecipeCards(currentUser.recipesToCook);
    //   deleteRecipe(currentUser.recipesToCook, currentRecipeName);
    // };

    const renderRecipeCardsByTag = (recipeList, tag) => {
      const recipeByTagList = filterByTag(currentRecipeList, tag);
      recipeContainer.innerHTML = '';
      let defaultTag = '';
      if (tag === 'all') {
        renderRecipeCards(recipeList);
      } else {
        renderRecipeCards(recipeByTagList);
        currentRecipeList = recipeByTagList;
      }
    };

    const renderFilteredRecipes = maxCost => {
      const filteredRecipes = currentRecipeList.filter(recipe => {
        const recipeCostFiltered = calculateRecipeCost(recipe, ingredientsData);
        return !isNaN(recipeCostFiltered) && recipeCostFiltered <= maxCost;
      });

      if (filteredRecipes.length === 0) {
        recipeContainer.innerHTML = `
          <div class="no-recipes-found-message">
            <p class="no-recipe-match">No recipes found within the specified cost.</p>
          </div>`;
      } else {
        renderRecipeCards(filteredRecipes);
        currentRecipeList = filteredRecipes;
      }
    };

    const welcomeNewUser = () => {
      welcomeUser.innerText = `Welcome to the site ${currentUser.name}!`;
    };

    (window.onload = renderRecipeCards(recipeData)),
      renderSelectTagOptions(tagData),
      welcomeNewUser();

    //Helper Functions👇
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
  });
};

beginFetch();

const renderSelectTagOptions = tagData => {
  tagData.forEach(tag => {
    dropDownMenu.innerHTML += `
        <option value="${tag}">${tag}</option>
        `;
  });
};
