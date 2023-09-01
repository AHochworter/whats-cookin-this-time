//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import ingredientsData from './data/ingredients.js';
import recipeData from './data/recipes.js';
import tagData from './data/tags';
// import userData from './data/users.js';
import { renderRecipeCards, renderRecipeCardsByTag, selectButton, dropDownMenu, renderSelectTagOptions } from '../src/domUpdates';

// import { recipes } from './src/recipes-to-cook.js';

//Event Listeners Here👇
window.addEventListener('load', (e) => {
renderRecipeCards(recipeData);
renderSelectTagOptions(tagData);
});

// drop-down-menu & select button DOM querySelector
// dropDownMenu.addEventListener("click", filterByTag);
selectButton.addEventListener('click', (e) => {
e.preventDefault();
renderRecipeCardsByTag(recipeData, dropDownMenu.value)
});

//Example of one way to import functions from the domUpdates file. You will delete these examples.
// import { exampleFunction1, exampleFunction2 } from './domUpdates.js';

// recipes('nicole');

// console.log(ingredientsData);
