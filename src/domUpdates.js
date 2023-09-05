//NOTE: Your DOM manipulation will occur in this file

//Imports🤞
import {
  filterByTag,
  filterByName,
  calculateRecipeCost,
  getIngredientsByRecipe,
  getRecipeInstructions,
  findRecipe,
  formatInstructions,
} from '../src/filter-recipes';
import { saveRecipe, deleteRecipe, getRandomUser } from '../src/user-recipes';
import { getUsers, getRecipes, getIngredients } from './apiCalls';
import tagData from './data/tags';

//Global Variables👇
let currentRecipeName;
let currentUser;
let recipeCards;

export let usersData;
export let recipeData;
export let ingredientsData;
export let currentRecipeList;

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const individualRecipeView = document.querySelector('.individual-recipe-view');
const individualRecipeContainer = document.querySelector(
  '.individual-recipe-container'
);
const homeView = document.querySelector('.homepage-view');
const discoverRecipesHeader = document.querySelector('.discover-header');
const searchInput = document.getElementById('searchInput');

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

const beginFetch = () => {
  Promise.all([getUsers(), getRecipes(), getIngredients()]).then(data => {
    usersData = data[0].users;
    recipeData = data[1].recipes;
    ingredientsData = data[2].ingredients;
    currentRecipeList = recipeData;
    currentUser = getRandomUser(usersData);

    homeBtn.addEventListener('click', function () {
      addHiddenClass([individualRecipeView]);
      removeHiddenClass([recipeContainer, homeView, dropDownMenu, selectButton]);
      recipeContainer.innerHTML = '';
      currentRecipeList = recipeData;
      discoverRecipesHeader.innerText = 'Discover Recipes';
      renderRecipeCards(recipeData);
      dropDownMenu.value = 'all';
    });

    recipeContainer.addEventListener('click', event => {
      if (event.target.classList.contains('recipe-card')) {
        renderRecipeDetails(event);
      }
    });

    searchButton.addEventListener('click', function (event) {
      renderSearchResults(currentRecipeList);
    });

    clearSearch.addEventListener('click', function (event) {
      searchInput.value = '';
      renderSearchResults(currentRecipeList);
    });

    selectButton.addEventListener('click', e => {
      e.preventDefault();
      renderRecipeCardsByTag(currentRecipeList, dropDownMenu.value);
    });

    savedRecipesButton.addEventListener('click', function (event) {
      addHiddenClass([individualRecipeView, dropDownMenu, selectButton]);
      removeHiddenClass([recipeContainer, homeView]);
      renderSavedRecipeResults();
      currentRecipeList = currentUser.recipesToCook;
      dropDownMenu.value = 'all';
    });

    deleteRecipeBtn.addEventListener('click', function () {
      renderDeleteRecipeResults();
    });

    const handleSaveRecipeClick = event => {
      saveRecipe(recipeData, currentRecipeName, currentUser);
    };

    saveRecipeBtn.addEventListener('click', handleSaveRecipeClick);

    //Event Handlers Here👇
    const renderRecipeCards = recipeList => {
      recipeContainer.innerHTML = ' ';
      console.log("RECIPE LIST", recipeList)
      recipeList.forEach(recipe => {
        if (recipe.tags.length === 0) {
          recipeContainer.innerHTML += `
          <div class="recipe recipe-card" id="${recipe.name}">
            <img class="recipe-card"
              src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
            />
            <h4 class="recipe-card" id="${recipe.name}">category not indicated</h4>
            <h3 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h3>
          </div>`;
        } else {
          recipeContainer.innerHTML += `
          <div class="recipe recipe-card" id="${recipe.name}">
            <img class="recipe-card"
              src="${recipe.image}" alt="${recipe.name}" class="recipe-image" id="${recipe.name}"
            />
            <h4 class="recipe-card" id="${recipe.name}">${recipe.tags[0]}</h4>
            <h3 class="recipe-name recipe-card" id="${recipe.name}">${recipe.name}</h3>
          </div>`;
        }
      });
    };

    const renderRecipeDetails = event => {
      removeHiddenClass([individualRecipeView]);
      addHiddenClass([recipeContainer, homeView]);
      individualRecipeContainer.innerHTML = ' ';
      currentRecipeName = event.target.id;
      const chosenRecipe = findRecipe(recipeData, currentRecipeName);
      const recipeCost = calculateRecipeCost(recipeData, ingredientsData);
      const instructions = getRecipeInstructions(recipeData, currentRecipeName);
      const formattedInstructions = formatInstructions(instructions);
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

    const renderSearchResults = recipes => {
      let searchValue = searchInput.value;
      // console.log('currentRecipeList', currentRecipeList);
      recipeContainer.innerHTML = '';
      const searchedRecipes = filterByName(currentRecipeList, searchValue);
      if (!searchedRecipes.length) {
        recipeContainer.innerHTML = `
          <div class="no-recipes-found-message">
            <p class="no-recipe-match">No recipes found</p>
          </div>`;
      } else {
        searchedRecipes.forEach(recipe => {
          recipeContainer.innerHTML += `
            <div class="recipe recipe-card" id="${recipe.name}">
              <img
                src="${recipe.image}" alt="${recipe.name}" class="recipe-image recipe-card"
              />
              <h4 class="recipe-card">${recipe.tags[0]}</h4>
              <h3 class="recipe-name recipe-card">${recipe.name}</h3>
            </div>`;
        });

        // Update currentRecipeList with the searched recipes
        currentRecipeList = searchedRecipes;
  

        // Add event listeners to the new recipe cards
        recipeCards = document.querySelectorAll('.recipe-card');
        recipeCards.forEach(card => {
          card.addEventListener('click', function (event) {
            // console.log(event.target.id);
            currentRecipeName = event.target.id;
            renderRecipeDetails(event);
          });
        });
      }
    };

    const renderSavedRecipeResults = () => {
      console.log("currentUser.recipesToCook:", currentUser.recipesToCook)
      if (currentUser.recipesToCook.length === 0) {
        discoverRecipesHeader.innerText = "You haven't saved any recipes yet.";
        recipeContainer.innerHTML = '';
      } else {
        discoverRecipesHeader.innerText = 'Saved Recipes';
        renderRecipeCards(currentUser.recipesToCook);
      }
    };

    const renderDeleteRecipeResults = () => {
      renderRecipeCards(currentUser.recipesToCook);
      deleteRecipe(currentUser.recipesToCook, currentRecipeName);
    };

    const renderRecipeCardsByTag = (recipeList, tag) => {
      const recipeByTagList = filterByTag(currentRecipeList, tag);
      recipeContainer.innerHTML = '';
      let defaultTag = '';
      if (tag === 'all') {
        renderRecipeCards(recipeList);
      } else {
        recipeByTagList.forEach(recipe => {
          recipeContainer.innerHTML += `
        <div class="recipe recipe-card" id="${recipe.name}">
          <img
            src="${recipe.image}" alt="${recipe.name}" class="recipe-image recipe-card"
            />
            <h4 class="recipe-card">${recipe.tags[0]}</h4>
            <h3 class="recipe-name recipe-card">${recipe.name}</h3>
            </div>`;
        });
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
//========END OF FETCH/PROMISE.ALL=============
beginFetch();

const renderSelectTagOptions = tagData => {
  tagData.forEach(tag => {
    dropDownMenu.innerHTML += `
        <option value="${tag}">${tag}</option>
        `;
  });
};
