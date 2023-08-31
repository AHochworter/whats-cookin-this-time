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
  const recipeIngredientId = recipeObject.ingredients.map(
    ingredient => ingredient.id
  );

  const filteredIngredients = ingredientsList.filter(ingredient =>
    recipeIngredientId.includes(ingredient.id)
  );
  const ingredientNames = filteredIngredients.map(ingredient => ingredient.name);
  return ingredientNames;
};



// const calculateRecipeCost = (recipe, ingredients) => {
//   const totalCost = recipe[0].ingredients.reduce((sum, ingredient) => {
//     let ingredientQuantity = recipe[0].ingredients.find((dish) => {
//       return dish.id ===  ingredient.id
//     })
//     sum += (ingredientQuantity.quantity.amount * ingredient.estimatedCostInCents)
//     return sum
//   }, 0)
// }

const calculateRecipeCost = (recipe, ingredients) => {
  const totalCost = recipe[0].ingredients.reduce((sum, ingredient) => {
    // console.log("Ingred", ingredient)
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
