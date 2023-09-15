import { postRecipe } from "./apiCalls"

export function getRandomUser(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

export const saveRecipe = (recipeList, recipeName, currentUser) => {
  const recipeFullInfo = recipeList.find(recipe => recipe.name === recipeName);
  if (!currentUser.recipesToCook.some(currentRecipe => recipeFullInfo.id === currentRecipe.id)) {
    // currentUser.recipesToCook.push(recipeFullInfo);
    console.log(recipeFullInfo)
    console.log(currentUser)

    
    postRecipe(recipeFullInfo.id, currentUser.id)
    .then((data) =>  {
     currentUser.recipesToCook.push(data.recipeID)
  })
  return currentUser.recipesToCook; 
};
}

  // recipesToCook will be populated by fetch call. separate reliance on data model. do immediate fetch after post to get the data that was posted. GET and POST calls populate data.
// iterate through recipe list to get ID. 

export const deleteRecipe = (savedRecipes, recipeName) => {
  const recipeToDelete = savedRecipes.findIndex(recipe => recipe.name === recipeName);
  savedRecipes.splice(recipeToDelete , 1)
  return savedRecipes
}




