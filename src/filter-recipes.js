const filterByTag = (recipes, tag) => {
  let recipesFilteredByTag = recipes.filter(recipe => {
    // return tag.every((tag) => {
    return recipe.tags.includes(tag.toLowerCase());
    // })
  });
  return recipesFilteredByTag;
};

const filterByName = (recipeList, name) => {
  return recipeList.filter(recipe => {
    if (recipe.name.includes(name)) {
      return recipe;
    }
  });
};

//want to iterate through the ingredientsData, targeting the id.
//map through the ingredients data, which returns a new array
//forEach, iterate one step inside of that into the ingredients key and look at the ingredients.id

const getIngredientsByRecipe = (recipeList, ingredientsList, name) => {
  const recipeObject = recipeList.find(recipe => {
    if (recipe.name === name) {
      return recipe;
    } else {
      return false;
    }
  });
  // console.log(recipeObject);

  let recipeIngredientId = recipeObject.ingredients.map(
    ingredient => ingredient.id
  );

  let filteredIngredients = ingredientsList.filter(ingredient =>
    recipeIngredientId.includes(ingredient.id)
  );
  // console.log(filteredIngredients);

  let ingredientNames = filteredIngredients.map(ingredient => ingredient.name);

  return ingredientNames;
};
//find ingredient in recipe - access ingredient id
//get ingredient id that's sitting in the recipe
//math for estimated cost
//return array of total cost of each ingredient based on their amount
//reduce()? - add all numbers up to get total cost

const calculateRecipeCost = (recipeList, ingredientsList, name) => {
  //find the recipe!
  const recipeObject = recipeList.find(recipe => {
    if (recipe.name === name) {
      return recipe;
    } else {
      return false;
    }
  });
  // console.log('recipeObject', recipeObject);
  //get ingredient id from the recipe

  let recipeIngredientId = recipeObject.ingredients.map(
    ingredient => ingredient.id
  );

  let filteredIngredients = ingredientsList.filter(ingredient =>
    recipeIngredientId.includes(ingredient.id)
  );
  console.log(filteredIngredients);

  let ingredientCostInCents = filteredIngredients.map(
    ingredient => ingredient.estimatedCostInCents
  );
  console.log('ingredientCostInCents', ingredientCostInCents);

  let ingredientCostInDollars = ingredientCostInCents * 100;
  console.log('ingredientCostInDollars', ingredientCostInDollars);
};

// const getIngredientsByRecipe = (recipeObj, ingredientsList) => {
//   console.log("recipeObj:=====", recipeObj);

//invoke filterByName()
//error handling (sad path)

const getRecipeInstructions = (recipes, name) => {
  const targetRecipe = recipes.find(recipe => recipe.name === name);

  if (targetRecipe) {
    return targetRecipe.instructions;
  } else {
    return []; // Return an empty array if the recipe is not found
  }
};

//2nd version of getRecipeInstructions
// const recipeInstructions = (recipe) => {
//   let recipeInstructions = recipe.instructions.map((step) => {
//     `${step.number}. ${step.instruction}`
//   })
//   return recipeInstructions
// }

export {
  filterByTag,
  filterByName,
  getRecipeInstructions,
  getIngredientsByRecipe,
  calculateRecipeCost,
};
