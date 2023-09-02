export const filterByTag = (recipes, tag) => {
  let recipesFilteredByTag = recipes.filter(recipe => {
    // return tag.every((tag) => {
   
    return recipe.tags.includes(tag.toLowerCase());
    // })
  });
  return recipesFilteredByTag;
};

export const filterByName = (recipeList, name) => {
  return recipeList.filter(recipe => {
    if (recipe.name.toLowerCase().includes(name.toLowerCase())) {
      return recipe
    }
  });
};

export const findRecipe = (recipeList, name) => {
  const recipe = recipeList.find((recipeName) => {
    return recipeName.name === name
  })
  return recipe
}

export const getIngredientsByRecipe = (recipeList, ingredientsList, name) => {
  const recipeObject = recipeList.find(recipe => {
    if (recipe.name === name) {
      return recipe;
    } else {
      return false;
    }
  });
  const recipeIngredientId = recipeObject.ingredients.map((ingredient) => {

    return ingredient.id
  });
  const filteredIngredients = ingredientsList.filter(ingredient =>
    recipeIngredientId.includes(ingredient.id)
  );
  const ingredientNames = filteredIngredients.map(ingredient => ingredient.name);
  return ingredientNames;
};

export const calculateRecipeCost = (recipe, ingredients) => {
  const totalCost = recipe[0].ingredients.reduce((sum, ingredient) => {
    const recipeIngredId = ingredient.id;
    const recipeAmount = ingredient.quantity.amount;
    const matchingIngredient = ingredients.find(ingredient => {
      return  ingredient.id === recipeIngredId
    });
    const estimatedCostInCents = matchingIngredient.estimatedCostInCents;
    return sum += (recipeAmount / 100) * estimatedCostInCents;
  }, 0);

  return totalCost.toFixed(2);
};

export const getRecipeInstructions = (recipes, name) => {
  const targetRecipe = recipes.find(recipe => recipe.name === name);

  if (targetRecipe) {
    return targetRecipe.instructions;
  } else {
    return []; // Return an empty array if the recipe is not found
  }
};

export const formatInstructions = (recipe) => { // need to write test
  let recipeInstructions = recipe.map((step) => {
   return `${step.number}. ${step.instruction}`
  })
  return recipeInstructions
}

