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
    // console.log(recipe)
    if (recipe.name.toLowerCase().includes(name.toLowerCase())) {
      // console.log("FILTER RECIPE", recipe)

      return recipe;
    }
  });
};

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

const calculateRecipeCost = (recipe, ingredients) => {
  const totalCost = recipe[0].ingredients.reduce(
    (acc, { id, quantity: { amount } }) =>
      acc +
      (amount / 100) *
        ingredients.find(ingredient => ingredient.id === id)
          .estimatedCostInCents,
    0
  );
  return totalCost.toFixed(2);
};

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
