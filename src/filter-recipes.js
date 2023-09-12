export const filterByTag = (recipes, tag) => {
  let recipesFilteredByTag = recipes.filter(recipe => {
    return recipe.tags.includes(tag);
  });
  return recipesFilteredByTag;
};

export const filterByName = (recipeList, name) => {
  return recipeList.filter(recipe => {
    if (recipe.name.toLowerCase().includes(name.toLowerCase())) {
      return recipe;
    }
  });
};

export const findRecipe = (recipeList, name) => {
  const recipe = recipeList.find(recipeName => {
    return recipeName.name === name;
  });
  return recipe;
};

export const getIngredientsByRecipe = (recipeList, ingredientsList, name) => {
  const recipeObject = recipeList.find(recipe => recipe.name === name);
  if (recipeObject && recipeObject.ingredients) {
    const recipeIngredientIds = recipeObject.ingredients.map(
      ingredient => ingredient.id
    );
    const filteredIngredients = ingredientsList.filter(ingredient =>
      recipeIngredientIds.includes(ingredient.id)
    );
    const ingredientNames = filteredIngredients.map(
      ingredient => ingredient.name
    );
    return ingredientNames;
  } else {
    return [];
  }
};

export const formatIngredients = ingredients => {
  return ingredients
    .map(ingredient => {
      return `${ingredient}\n`;
    })
    .join('');
};

export const calculateRecipeCost = (recipe, ingredients) => {
  const totalCost = recipe[0].ingredients.reduce((sum, ingredient) => {
    const recipeIngredId = ingredient.id;
    const recipeAmount = ingredient.quantity.amount;
    const matchingIngredient = ingredients.find(ingredient => {
      return ingredient.id === recipeIngredId;
    });
    const estimatedCostInCents = matchingIngredient.estimatedCostInCents;
    return (sum += (recipeAmount / 100) * estimatedCostInCents);
  }, 0);

  return totalCost.toFixed(2);
};

export const getRecipeInstructions = (recipes, name) => {
  const targetRecipe = recipes.find(recipe => recipe.name === name);
  if (targetRecipe) {
    return targetRecipe.instructions;
  } else {
    return [];
  }
};

export const formatInstructions = recipe => {
  let recipeInstructions = recipe.map(step => {
    return `${step.number}. ${step.instruction}`;
  });
  return recipeInstructions;
};


export const chooseRecipeByCost = (recipes, ingredients, costCriteria) => {
return  recipes.filter((recipe) => {
    const recipeCost = calculateRecipeCost(recipe, ingredients)
    return recipeCost <= costCriteria
    // recipeCost to be equal to or less than costCriteria
  })

}
// returns a new array of recipes that are filtered based on some cost criteria.

// what are we comparing? all recipes, 
// use calculateRecipeCost to comparing the cost of a recipe to the user

// recipeCost =< costCriteria
// 