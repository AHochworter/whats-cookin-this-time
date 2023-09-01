//NOTE: Your DOM manipulation will occur in this file
import ingredientsData from '../sample-data/sample-ingredients';
import recipeData from '../sample-data/sample-recipes.js';
import { filterByTag } from './filter-recipes';
// import userData from '../sample-data/sample-users';

//Query Selectors Here👇
const recipeContainer = document.querySelector('.recipe-container');

// drop-down-menu & select button DOM querySelector
const dropDownMenu = document.querySelector('.drop-down-menu');
const selectButton = document.querySelector('.select-button');
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

const renderRecipeCardsByTag = (recipeList, tag) => {
  //Note - if time! could add iterator for tags array
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

const renderSelectTagOptions = (tagData) => {
  tagData.forEach(tag => {
    dropDownMenu.innerHTML += `
    <option value='${tag}'>${tag}</option>
    `;
  }); 
}




//loop through the data
//update each recipe card
//view all recipes

export { renderRecipeCards, renderRecipeCardsByTag, renderSelectTagOptions, selectButton, dropDownMenu };
