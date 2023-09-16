import { postRecipe, getUsers } from "./apiCalls"

export function getRandomUser(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}
//async helps it run in order
export const saveRecipe = (recipeList, recipeName, currentUser) => {
  const recipeFullInfo = recipeList.find(recipe => recipe.name === recipeName);
  console.log("recipeFullInfo:=====", recipeFullInfo); //gives you the full object back
  if (!currentUser.recipesToCook.some(currentRecipe => recipeFullInfo.id === currentRecipe.id)) {
    return postRecipe(recipeFullInfo, currentUser.id) //need to pass in recipe's full info to get the object
    .then(postData =>  {
     currentUser.recipesToCook.push(postData.recipeFullInfo)
     return getUsers(); //get the new information 
  })
    .then(usersDataResponse => {
    const usersData = usersDataResponse.users;
    const updatedUserObj = usersData.find(user => user.id === currentUser.id);
    if (updatedUserObj) {
      currentUser.recipesToCook = updatedUserObj.recipesToCook;
    }
    return currentUser.recipesToCook
  })
} else {
  //if the recipe is already in the user's list, return it
  return Promise.resolve(currentUser.recipesToCook);
  }
}

  // recipesToCook will be populated by fetch call. separate reliance on data model. do immediate fetch after post to get the data that was posted. GET and POST calls populate data.
// iterate through recipe list to get ID. 

export const deleteRecipe = (savedRecipes, recipeName) => {
  const recipeToDelete = savedRecipes.findIndex(recipe => recipe.name === recipeName);
  savedRecipes.splice(recipeToDelete , 1)
  return savedRecipes
}




