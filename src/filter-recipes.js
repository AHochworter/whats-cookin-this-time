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
    
      return recipe
    }
  });
};

const findRecipe = (recipeList, name) => {
  const recipe = recipeList.find((recipeName) => {
    // console.log(recipeName)
    return recipeName.name === name
  })
  console.log("FIND RECIPE", recipe)
  return recipe
}

// const findRecipe = (recipeData, recipeName) => {
//   const recipe = recipeData.find(({ name }) => name === recipeName);
//   return recipe
// };

const getIngredientsByRecipe = (recipeList, ingredientsList, name) => {
  const recipeObject = recipeList.find(recipe => {
    if (recipe.name === name) {
      return recipe;
    } else {
      return false;
    }
  });
  const recipeIngredientId = recipeObject.ingredients.map((ingredient) => {
    // console.log("INGRED ID", ingredient.id)
    return ingredient.id
  });
  // console.log("Recipe ingredient id:", recipeIngredientId)


  const filteredIngredients = ingredientsList.filter(ingredient =>
    recipeIngredientId.includes(ingredient.id)
  );
  const ingredientNames = filteredIngredients.map(ingredient => ingredient.name);
  return ingredientNames;
};

const calculateRecipeCost = (recipe, ingredients) => {
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
}

const getRecipeInstructions = (recipes, name) => {
  const targetRecipe = recipes.find(recipe => recipe.name === name);

  if (targetRecipe) {
    return targetRecipe.instructions;
  } else {
    return []; // Return an empty array if the recipe is not found
  }
};

//2nd version of getRecipeInstructions
// const getRecipeInstructions = (recipe) => {
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
  findRecipe,
};
