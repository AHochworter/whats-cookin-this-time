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

// const calculateRecipeCost = (recipe, ingredients) => {
//   // console.log("RECIPE", recipe)
//   return ingredients.reduce((sum, ingredient) => {
//     // console.log(sum)
//     // console.log(ingredient)
//     console.log(recipe[0].ingredients)
//     let ingredientQuantity = recipe[0].ingredients.find((dish) => {
//       // console.log("DISH", dish)
//       // console.log("Ing", ingredient)
//       return dish.id ===  ingredient.id
//     })
//     console.log("INGED QUANTITY:, ", ingredientQuantity)
//     sum += (ingredientQuantity.quantity.amount * ingredient.estimatedCostInCents)
//     return sum
//   }, 0)
// }

const calculateRecipeCost = (recipe, ingredients) => {
  const totalCost = recipe[0].ingredients.reduce((acc, {id, quantity: {amount}}) => 
    acc + (amount / 100) * (ingredients.find(ingredient => ingredient.id === id).estimatedCostInCents), 0)
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
