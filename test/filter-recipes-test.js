//Import all the functions that you run in scripts
import { expect } from 'chai';
import recipeData from '../sample-data/sample-recipes';
import ingredientsData from '../sample-data/sample-ingredients';
import {
  filterByTag,
  filterByName,
  getRecipeInstructions,
  getIngredientsByRecipe,
  formatIngredients,
  calculateRecipeCost,
  findRecipe,
  formatInstructions,
} from '../src/filter-recipes.js';

describe('filter recipes', () => {
  let recipeName1, recipeName2;
  beforeEach(() => {
    recipeName1 = filterByName(
      recipeData,
      'Loaded Chocolate Chip Pudding Cookie Cups'
    );
    recipeName2 = filterByName(
      recipeData,
      'Maple Dijon Apple Cider Grilled Pork Chops'
    );
  });

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

  it('should return an empty array if a recipe does not have a tag', () => {
    const filtered3 = filterByTag(recipeData, []);
    expect(filtered3).to.deep.equal([]);
  });

  it('should be a function', () => {
    expect(filterByName).to.be.a('function');
  });

  it('should filter recipes based on a name', () => {
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

  it('should be a function', () => {
    expect(findRecipe).to.be.a('function');
  });

  it('should find a recipe based on a name', () => {
    const recipeName1 = findRecipe(
      recipeData,
      'Loaded Chocolate Chip Pudding Cookie Cups'
    );
    expect(recipeName1.name).to.equal(
      'Loaded Chocolate Chip Pudding Cookie Cups'
    );
  });

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
    const recipeSampleCost = calculateRecipeCost(recipeSample, ingredientsData);
    expect(recipeSampleCost).to.equal('272.97');
  });
});

describe('formatInstructions', () => {
  it('should be a function', () => {
    expect(formatInstructions).to.be.a('function');
  });

  it('should format recipe instructions correctly', () => {
    const instructions = [
      {
        instruction:
          'Cut the butter into small cubes and keep them refrigerated until ready to use (I cut on parchment paper and wrap up the butter for easy transfer.).In the food processor, combine the flour, almond meal, sugar, and salt. If you don’t have a food processor, you can simply use a bowl to mix all the ingredients.If you want your sesame seeds to be fine texture, add them now. If you prefer to keep the original shape of sesame seeds, add them with egg yolk later on.Take out the butter from the refrigerator and mix together. If you use a regular bowl to mix, use a dough/pastry blender to combine the butter into the dry ingredients.Lastly add egg yolk.If the food processor is small (like mine) and it doesn’t look like it’s mixed completely, take it out and mix well with a silicone spatula.Form the dough into a ball and cut in half.',
        number: 1,
      },
      {
        instruction:
          "Roll it to a log approximately 2” across. For me it’s easier to work when the dough is wrapped in plastic wrap. While rolling, unwrap some parts of plastic wrap then roll again. Form a nice shape. I wasn't paying attention so my log is flat on one side (see step 11)!Wrap the logs tightly in plastic wrap and refrigerate until firm, about 1 hour.Preheat the oven to 350° F (175° C).",
        number: 2,
      },
      {
        instruction:
          'Remove the dough from plastic wrap and cut into discs about ¼ inch thick (if you prefer thicker cookies, cut into discs about ½ inch and you get 20 cookies total).',
        number: 3,
      },
      {
        instruction:
          'Place them on two baking sheets lined with parchment paper.',
        number: 4,
      },
      {
        instruction:
          'Bake for about 15 minutes, or until lightly browned around the edges.',
        number: 5,
      },
      {
        instruction:
          'Remove from the oven and allow to cool on the baking sheet for about 10 minutes. Then transfer to a wire rack to cool completely. Store cookies in an airtight container. Cookies will last for a day or two.',
        number: 6,
      },
    ];
    const expectedFormattedInstructions = [
      '1. Cut the butter into small cubes and keep them refrigerated until ready to use (I cut on parchment paper and wrap up the butter for easy transfer.).In the food processor, combine the flour, almond meal, sugar, and salt. If you don’t have a food processor, you can simply use a bowl to mix all the ingredients.If you want your sesame seeds to be fine texture, add them now. If you prefer to keep the original shape of sesame seeds, add them with egg yolk later on.Take out the butter from the refrigerator and mix together. If you use a regular bowl to mix, use a dough/pastry blender to combine the butter into the dry ingredients.Lastly add egg yolk.If the food processor is small (like mine) and it doesn’t look like it’s mixed completely, take it out and mix well with a silicone spatula.Form the dough into a ball and cut in half.',
      "2. Roll it to a log approximately 2” across. For me it’s easier to work when the dough is wrapped in plastic wrap. While rolling, unwrap some parts of plastic wrap then roll again. Form a nice shape. I wasn't paying attention so my log is flat on one side (see step 11)!Wrap the logs tightly in plastic wrap and refrigerate until firm, about 1 hour.Preheat the oven to 350° F (175° C).",
      '3. Remove the dough from plastic wrap and cut into discs about ¼ inch thick (if you prefer thicker cookies, cut into discs about ½ inch and you get 20 cookies total).',
      '4. Place them on two baking sheets lined with parchment paper.',
      '5. Bake for about 15 minutes, or until lightly browned around the edges.',
      '6. Remove from the oven and allow to cool on the baking sheet for about 10 minutes. Then transfer to a wire rack to cool completely. Store cookies in an airtight container. Cookies will last for a day or two.',
    ];
    const result = formatInstructions(instructions);
    expect(result).to.deep.equal(expectedFormattedInstructions);
  });
  describe('formatIngredients', () => {
    it('should be a function', () => {
      expect(formatIngredients).to.be.a('function');
    });

    it('should format a list of ingredients to one per line', () => {
      const ingredientNames = getIngredientsByRecipe(
        recipeData,
        ingredientsData,
        'Maple Dijon Apple Cider Grilled Pork Chops'
      );

      const ingredientsFormatted = formatIngredients(ingredientNames);

      // Define the expected formatted string with line breaks
      const expectedFormattedString =
        'apple cider\napple\ncorn starch\ndijon style mustard\nwhole garlic clove\nwhole grain dijon mustard\nmaple\nmiso\npork chop\ns&p\nsoy sauce\nsriracha sauce';

      // Trim any trailing whitespace or newline characters from both strings
      expect(ingredientsFormatted.trim()).to.equal(
        expectedFormattedString.trim()
      );
    });
  });
});
