//Import all the functions that you run in scripts
import { expect } from 'chai';
import recipeData from '../sample-data/sample-recipes';
import ingredientsData from '../sample-data/sample-ingredients';
import {
  filterByTag,
  filterByName,
  getRecipeInstructions,
  getIngredientsByRecipe,
  calculateRecipeCost,
} from '../src/filter-recipes.js';

//import all functions from scripts files

describe('filter recipes', () => {
  it('should be a function', () => {
    expect(filterByTag).to.be.a('function');
  });

  it('should filter recipes data based on a tag', () => {
    const filtered1 = filterByTag(recipeData, 'lunch');
    const filtered2 = filterByTag(recipeData, 'snack');
    expect(filtered1.length).to.equal(1);
    expect(filtered2.length).to.equal(2);

    expect(filtered1).to.deep.equal([
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

  it('should be a function', () => {
    expect(filterByName).to.be.a('function');
  });

  it('should filter recipes based on a name', () => {
    const recipeName1 = filterByName(
      recipeData,
      'Loaded Chocolate Chip Pudding Cookie Cups'
    );
    const recipeName2 = filterByName(
      recipeData,
      'Maple Dijon Apple Cider Grilled Pork Chops'
    );
    expect(recipeName1[0].name).to.equal(
      'Loaded Chocolate Chip Pudding Cookie Cups'
    );
    expect(recipeName2[0].name).to.equal(
      'Maple Dijon Apple Cider Grilled Pork Chops'
    );
  });

  it('should be a function', () => {
    expect(getIngredientsByRecipe).to.be.a('function');
  });

  it('should return a list of ingredients by recipe', () => {
    const ingredientNames = getIngredientsByRecipe(
      recipeData,
      ingredientsData,
      'Maple Dijon Apple Cider Grilled Pork Chops'
    );

    expect(ingredientNames).to.deep.equal([
      'apple cider',
      'apple',
      'corn starch',
      'dijon style mustard',
      'whole garlic clove',
      'whole grain dijon mustard',
      'maple',
      'miso',
      'pork chop',
      's&p',
      'soy sauce',
      'sriracha sauce',
    ]);
  });

  //create sad path here

  it('should be a function', () => {
    expect(getRecipeInstructions).to.be.a('function');
  });

  it('should return instructions for a given recipe', () => {
    const favRecipe = getRecipeInstructions(
      recipeData,
      'Maple Dijon Apple Cider Grilled Pork Chops'
    );

    expect(favRecipe).to.deep.equal([
      {
        instruction:
          'Season the pork chops with salt and pepper and grill or pan fry over medium high heat until cooked, about 3-5 minutes per side. (If grilling, baste the chops in the maple dijon apple cider sauce as you grill.)Meanwhile, mix the remaining ingredients except the apple slices, bring to a simmer and cook until the sauce thickens, about 2-5 minutes.Grill or saute the apple slices until just tender but still crisp.Toss the pork chops and apple slices in the maple dijon apple cider sauce and enjoy!',
        number: 1,
      },
    ]);
  });

  it('should return an empty array if no recipe is found', () => {
    const favRecipe = getRecipeInstructions(recipeData, 'Maple Baked Bread');
    expect(favRecipe).to.deep.equal([]);
  });

  it('should be a function', () => {
    expect(calculateRecipeCost).to.be.a('function');
  });

  it('should calculate a recipe cost', () => {
    const recipeSample = filterByName(
      recipeData,
      'Maple Dijon Apple Cider Grilled Pork Chops'
    );
    // console.log('recipeSample', recipeSample);
    const recipeSampleCost = calculateRecipeCost(
      recipeSample,
      ingredientsData,
    );

    expect(recipeSampleCost).to.equal('272.97');
  });
});
