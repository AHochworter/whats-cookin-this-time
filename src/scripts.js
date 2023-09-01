//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import ingredientsData from './data/ingredients.js';
import recipeData from './data/recipes.js';
// import userData from './data/users.js';
// import { renderRecipeCards, showSearchResults } from '../src/domUpdates';
import { renderRecipeCards } from '../src/domUpdates';
// import { filterByName } from './filter-recipes';

// import { recipes } from './src/recipes-to-cook.js';
window.addEventListener('load', () => renderRecipeCards(recipeData));
