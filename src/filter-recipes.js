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

export { filterByTag, filterByName, getRecipeInstructions };
