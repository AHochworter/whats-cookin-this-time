const filterByTag = (recipes, tag) => {
  let recipesFilteredByTag = recipes.filter(recipe => {
    // return tag.every((tag) => {
    return recipe.tags.includes(tag.toLowerCase());
    // })
  });
  return recipesFilteredByTag;
};

const filterByName = (recipe, name) => {
  const recipesFilteredByName = recipe.filter(recipe =>
    recipe.name.includes(name)
  );
  return recipesFilteredByName;
};

const getRecipeInstructions = (recipe, name) => {
  const targetRecipe = recipe.find(recipe => recipe.name === name);

  if (targetRecipe) {
    return targetRecipe.instructions;
  } else {
    return []; // Return an empty array if the recipe is not found
  }
};



//want to iterate through the ingredientsData, targeting the id.
//map through the ingredients data, which returns a new array
//forEach, iterate one step inside of that into the ingredients key and look at the ingredients.id
const getIngredientsByRecipe = (recipe, ingredients) => {
  const targetRecipe = recipe.find(recipe => recipe.name === )
}
//invoke filterByName()

const recipeInstructions = (recipe) => {
  let recipeInstructions = recipe.instructions.map((step) => {
    `${step.number}. ${step.instruction}`
  })
  return recipeInstructions
}


export { filterByTag, filterByName, getRecipeInstructions, recipeInstructions };




