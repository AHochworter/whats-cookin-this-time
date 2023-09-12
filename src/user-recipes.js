export function getRandomUser(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

export const saveRecipe = (recipeList, recipeName, currentUser) => {
  const recipeFullInfo = recipeList.find(recipe => recipe.name === recipeName);
  if (!currentUser.recipesToCook.some(currentRecipe => recipeFullInfo.id === currentRecipe.id)) {
    currentUser.recipesToCook.push(recipeFullInfo);
  }
  return currentUser.recipesToCook;
};

export const deleteRecipe = (savedRecipes, recipeName) => {
  const recipeToDelete = savedRecipes.findIndex(recipe => recipe.name === recipeName);
  savedRecipes.splice(recipeToDelete , 1)
  return savedRecipes
}




