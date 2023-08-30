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
      return recipe
    }
  });
};

//want to iterate through the ingredientsData, targeting the id.
//map through the ingredients data, which returns a new array
//forEach, iterate one step inside of that into the ingredients key and look at the ingredients.id

// const getIngredientsByRecipe = (recipeObject, ingredientsList) => {
//   const ingredientsInRecipe = recipeObject.ingredients.map((ingredient) => {
//     ingredient.id
//   });
//   console.log("ingredientsInRecipe:=====", ingredientsInRecipe);
//   console.log("recipeObject=====", recipeObject.name)
//   // const targetRecipe = recipes.find(recipe => recipe.name ===  )
// }


const getIngredientsByRecipe = (recipeList, ingredientsList, name) => {
  const recipeObject = recipeList.find((recipe) => {
    if (recipe.name === name){
      return recipe
    } else {
      return false;
    }
  });

  let recipeIngredientId = recipeObject.ingredients.map(ingredient => ingredient.id)

  let filteredIngredients = ingredientsList.filter(ingredient => recipeIngredientId.includes(ingredient.id))
  
  let ingredientNames = filteredIngredients.map(ingredient => ingredient.name)

  return ingredientNames;
};



// const getIngredientsByRecipe = (recipeObj, ingredientsList) => {
//   console.log("recipeObj:=====", recipeObj);

  
//   const ingredientsInRecipe = recipeObj.ingredients.map(
//     ingredient => ingredient.id
//   );

//   const ingredientNamesInRecipe = ingredientsList
//     .filter(ingredient => ingredientsInRecipe.includes(ingredient.id))
//     .map(ingredient => ingredient.name);

//   return ingredientNamesInRecipe;
// };


//   const ingredientNamesInRecipe = ingredientsList
//     .filter(ingredient => ingredientsInRecipe.includes(ingredient.id))
//     .map(ingredient => ingredient.name);

//   return ingredientNamesInRecipe;
// };

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

export { filterByTag, filterByName, getRecipeInstructions, getIngredientsByRecipe };
