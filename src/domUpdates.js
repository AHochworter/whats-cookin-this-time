//NOTE: Your DOM manipulation will occur in this file

import ingredientsData from './data/ingredients';
//import recipeData from './data/recipes';
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
// import { render } from 'sass';
// import userData from '../sample-data/sample-users';

//Global Variables Here👇
let currentRecipeName;
let currentUser;

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');
const individualRecipeView = document.querySelector('.individual-recipe-view');
const individualRecipeContainer = document.querySelector(
  '.individual-recipe-container'
  );
  const homeView = document.querySelector('.homepage-view');
  const discoverRecipesHeader = document.querySelector('.discover-header');
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
  
  const beginFetch = () => {
    Promise.all([getUsers(), getRecipes(), getIngredients()]).then(data => {
      let usersData = data[0].users;
      console.log("usersData:=====", usersData);
      let recipeData = data[1].recipes;
      console.log("recipeData:=====", recipeData);
      let ingredientsData = data[2].ingredients;
      console.log("ingredientsData:=====", ingredientsData);
      currentUser = getRandomUser(usersData)
      currentUser.savedRecipes = [];
      let currentRecipeList = recipeData;
      
    homeBtn.addEventListener('click', function () {
      addHiddenClass([individualRecipeView]);
      removeHiddenClass([recipeContainer, homeView]);
      discoverRecipesHeader.innerText = 'Discover Recipes';
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
      currentRecipeList = currentUser.recipesToCook;
    });

    deleteRecipeBtn.addEventListener('click', function () {
      renderDeleteRecipeResults();
    });

    const handleSaveRecipeClick = event => {
      saveRecipe(recipeData, currentRecipeName);
    };

    saveRecipeBtn.addEventListener('click', handleSaveRecipeClick);

    //Event Handlers Here👇
    const renderRecipeCards = recipeList => {
      recipeContainer.innerHTML = ' ';
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
      if (currentUser.savedRecipes.length === 0) {
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
      const recipeByTagList = filterByTag(recipeList, tag);
      recipeContainer.innerHTML = '';
      if (tag === 'all') {
        renderRecipeCards(recipeList);
      } else {
        recipeByTagList.forEach(recipe => {
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

// export {
//   renderRecipeCards,
//   renderSearchResults,
//   renderRecipeCardsByTag,
//   renderSelectTagOptions,
//   welcomeNewUser,
//   selectButton,
//   dropDownMenu,
// };
