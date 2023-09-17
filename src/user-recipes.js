import { postRecipe, getUsers } from './apiCalls';

export function getRandomUser(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

//async helps it run in order
export const saveRecipe = async (recipeList, recipeName, currentUser) => {
  // Find the recipe object by name in the recipeList
  const recipeFullInfo = recipeList.find(recipe => recipe.name === recipeName);

  // Check if the recipe is already in the user's list
  if (
    !currentUser.recipesToCook.some(
      currentRecipe => currentRecipe.id === recipeFullInfo.id
    )
  ) {
    return postRecipe(recipeFullInfo.id, currentUser.id) // POST just the recipeId
      .then(() => {
        // After posting, fetch the updated list of saved recipes
        return getUsers().then(usersDataResponse => {
          const usersData = usersDataResponse.users;
          const updatedUserObj = usersData.find(
            user => user.id === currentUser.id
          );
          if (updatedUserObj) {
            currentUser.recipesToCook = updatedUserObj.recipesToCook;
          }
          return currentUser.recipesToCook; // Return the updated list of recipes to cook
        });
      });
  } else {
    // If the recipe is already in the user's list, return it
    return Promise.resolve(currentUser.recipesToCook);
  }
};

// recipesToCook will be populated by fetch call. separate reliance on data model. do immediate fetch after post to get the data that was posted. GET and POST calls populate data.
// iterate through recipe list to get ID.

export const deleteRecipe = (savedRecipes, recipeName) => {
  const recipeToDelete = savedRecipes.findIndex(
    recipe => recipe.name === recipeName
  );
  savedRecipes.splice(recipeToDelete, 1);
  return savedRecipes;
};
