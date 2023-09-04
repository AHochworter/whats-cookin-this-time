import { expect } from 'chai';

import {
  filterByTag,
  filterByName,
  getRecipeInstructions,
  getIngredientsByRecipe,
  calculateRecipeCost,
} from '../src/filter-recipes.js';
import { getRandomUser, deleteRecipe, saveRecipe, savedRecipes } from '../src/user-recipes.js';

// import ingredientsData from '../sample-data/sample-ingredients';
import usersData from '../sample-data/sample-users';
import recipeData from '../sample-data/sample-recipes';
import ingredientsData from '../sample-data/sample-ingredients';

describe('getRandomUser', () => {
  it('should be a function', () => {
    expect(getRandomUser).to.be.a('function'); 
  });

  it('should return a user from user list', () => {
    const users = [
      { id: 1, name: 'Sadye Welch' },
      { id: 2, name: 'Jordyn West' },
      { id: 3, name: 'Willie Eichmann' },
    ];
    const randomUser = getRandomUser(users);

    expect(users).to.include(randomUser);
  });
});

describe('Save recipes', () => {
  it('should be a function', () => {
    expect(saveRecipe).to.be.a('function');
  });

  it('should save a recipe to the savedRecipe array', () => {
    const currentUser = {
      name: "Saige O'Kon",
      id: 1,
      pantry: [
        {
          ingredient: 11297,
          amount: 4,
        }
      ],
      recipesToCook: [],
    } 
    const filtered1 = filterByName(recipeData, 'Maple Dijon Apple Cider Grilled Pork Chops');
      const myFirstFavoriteRecipe = saveRecipe(recipeData, filtered1[0].name, currentUser); 
    
      expect(filtered1.length).to.equal(1);
      expect(currentUser.recipesToCook.length).to.equal(1);

      expect(myFirstFavoriteRecipe).to.deep.equal([
        {
          id: 678353,
          image: 'https://spoonacular.com/recipeImages/678353-556x370.jpg',
          ingredients: [
            { id: 1009016, quantity: { amount: 1.5, unit: 'cups' } },
            { id: 9003, quantity: { amount: 2, unit: '' } },
            { id: 20027, quantity: { amount: 1, unit: 'tablespoon' } },
            { id: 1002046, quantity: { amount: 1, unit: 'tablespoon' } },
            { id: 11215, quantity: { amount: 1, unit: 'clove' } },
            { id: 1012046, quantity: { amount: 1, unit: 'tablespoon' } },
            { id: 19911, quantity: { amount: 0.25, unit: 'cup' } },
            { id: 16112, quantity: { amount: 1, unit: 'tablespoon' } },
            { id: 10010062, quantity: { amount: 24, unit: 'ounce' } },
            { id: 1102047, quantity: { amount: 4, unit: 'servings' } },
            { id: 16124, quantity: { amount: 1, unit: 'tablespoon' } },
            { id: 1016168, quantity: { amount: 1, unit: 'tablespoon' } },
          ],
          instructions: [
            {
              instruction:
                'Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!',
              number: 1,
            },
          ],
          name: 'Maple Dijon Apple Cider Grilled Pork Chops',
          tags: ['lunch', 'main course', 'main dish', 'dinner'],
        },
      ]);
    });
  // it('should be a function', () => {
  //   expect(deleteRecipe).to.be.a('function');
  //   });

  //   it('should delete a recipe from the saved recipe array', () => {
  //     const currentUser = {
  //       name: "Saige O'Kon",
  //       id: 1,
  //       pantry: [
  //         {
  //           ingredient: 11297,
  //           amount: 4,
  //         }
  //       ],
  //       recipesToCook: [],
  //     } 
  //   const filtered1 = filterByName(recipeData, 'Maple Dijon Apple Cider Grilled Pork Chops');
  //   const myFirstFavoriteRecipe = saveRecipe(recipeData, filtered1[0].name, currentUser); 
  //     const deleteARecipe = deleteRecipe(savedRecipes, filtered1.name);
  //     const filtered2 = filterByName(recipeData, 'Sesame Cookies');
  //     const mySecondFavoriteRecipe = saveRecipe(recipeData, filtered2[0].name, currentUser);
  //     const deleteBRecipe = deleteRecipe(savedRecipes, filtered2.name); 
  //     expect(savedRecipes.length).to.equal(0);
  //   });
  // });












  