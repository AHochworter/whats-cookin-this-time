import { postRecipe, getUsers } from "./apiCalls";

export function getRandomUser(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}
//async helps it run in order 
export const saveRecipe = async (recipeList, recipeName, currentUser) => { //without the async. 2 tests were failing and it was saying "fetch is not defined". With the async in front of the parameters, only the saved recipes was failing and we can fix that once again...for the 3rd time. 
  const recipeFullInfo = recipeList.find(
    (recipe) => recipe.name === recipeName
  );
  if (
    !currentUser.recipesToCook.some(
      (currentRecipe) => recipeFullInfo.id === currentRecipe.id
      )
      ) {
    console.log("recipeFullInfo:=====", recipeFullInfo); //gives you the full object back
    return postRecipe (recipeFullInfo, currentUser.id) //need to pass in recipe's full info to get the object

      .then((postData) => {
        //this .then handles the response from the postRecipe function. It's now adding the newly saved recipe oistData.recipeFullInfo to the currentUser.recipesToCook array.
        currentUser.recipesToCook.push(postData.recipeFullInfo);
        return getUsers(); //get the new information, this will help us get an updated list of users after everything gets posted.
      })
      .then((usersDataResponse) => {
        //second .then will handle the response from the getUsers function we have invoked previously in the above line. This will extra the users array from the response & find the updated user object that matches the current user's ID.
        const usersData = usersDataResponse.users; //when the updated user object is found, the function will update the currentUser.recipesToCook array with the recipes from the updated user object.
        const updatedUserObj = usersData.find(
          (user) => user.id === currentUser.id
        );
        if (updatedUserObj) {
          currentUser.recipesToCook = updatedUserObj.recipesToCook;
        }
        return currentUser.recipesToCook; //this function here will update the list of recipes to cook for the current user.
      });
  } else {
    //if the recipe is already in the user's list, return it. If the initial if statement is not met, the function will return the existing list of recipes.
    return Promise.resolve(currentUser.recipesToCook); //return the promise. In lecture, there was an example to return the promise at the end. 
  }
};

// recipesToCook will be populated by fetch call. separate reliance on data model. do immediate fetch after post to get the data that was posted. GET and POST calls populate data.
// iterate through recipe list to get ID.

export const deleteRecipe = (savedRecipes, recipeName) => {
  const recipeToDelete = savedRecipes.findIndex(
    (recipe) => recipe.name === recipeName
  );
  savedRecipes.splice(recipeToDelete, 1);
  return savedRecipes;
};
