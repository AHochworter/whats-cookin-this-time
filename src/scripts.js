//NOTE: Data model and non-dom manipulating logic will live in this file.

import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import ingredientsData from './data/ingredients.js';
import recipeData from './data/recipes.js';
// import userData from './data/users.js';

import { renderRecipeCards } from '../src/domUpdates';
//  renderRecipeDetails, recipeContainer,

window.addEventListener('load', () => renderRecipeCards(recipeData));



//Example of one way to import functions from the domUpdates file. You will delete these examples.
// import { exampleFunction1, exampleFunction2 } from './domUpdates.js';


