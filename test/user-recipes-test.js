import { expect } from 'chai';

import {
  filterByName,
} from '../src/filter-recipes.js';
import { getRandomUser, deleteRecipe, saveRecipe } from '../src/user-recipes.js';
import recipeData from '../sample-data/sample-recipes';

describe('getRandomUser', () => {
  let users, currentUser, filtered1, myFirstFavoriteRecipe
  beforeEach(() => {
    users = [
      { id: 1, name: 'Sadye Welch' },
      { id: 2, name: 'Jordyn West' },
      { id: 3, name: 'Willie Eichmann' },
    ];  
  
    currentUser = {
      name: "Saige O'Kon",
      id: 1,
      pantry: [
        {
          ingredient: 11297,
          amount: 4,
        }
      ],
      recipesToCook: []
    }

    filtered1 = filterByName(recipeData, 'Maple Dijon Apple Cider Grilled Pork Chops');

    myFirstFavoriteRecipe = saveRecipe(recipeData, filtered1[0].name, currentUser); 
  });

  it('should be a function', () => {
    expect(getRandomUser).to.be.a('function'); 
  });

  it('should return a user from user list', () => {
    const randomUser = getRandomUser(users);
    expect(users).to.include(randomUser);
  });
});

describe('Save recipes', () => {
  let currentUser, filtered1, myFirstFavoriteRecipe
  beforeEach(() => {
    currentUser = {
      name: "Saige O'Kon",
      id: 1,
      pantry: [
        {
          ingredient: 11297,
          amount: 4,
        }
      ],
      recipesToCook: []
    }
    filtered1 = filterByName(recipeData, 'Maple Dijon Apple Cider Grilled Pork Chops');

    myFirstFavoriteRecipe = saveRecipe(recipeData, filtered1[0].name, currentUser); 
  });

  it('should be a function', () => {
    expect(saveRecipe).to.be.a('function');
  });

    
    it('should be a function', () => {
      expect(deleteRecipe).to.be.a('function');
    });

    it('should delete a recipe from the saved recipe array', () => {
      const deleteARecipe = deleteRecipe(currentUser.recipesToCook, filtered1[0].name);
      const filtered2 = filterByName(recipeData, 'Sesame Cookies');
      const mySecondFavoriteRecipe = saveRecipe(recipeData, filtered2[0].name, currentUser);
      const deleteBRecipe = deleteRecipe(currentUser.recipesToCook, filtered2[0].name); 
      expect(currentUser.recipesToCook.length).to.equal(0);
    });
  });












  