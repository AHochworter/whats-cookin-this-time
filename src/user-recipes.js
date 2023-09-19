import { postRecipe, getUsers } from './apiCalls';

export function getRandomUser(data) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex];
}

export const saveRecipe = async (recipeList, recipeName, currentUser) => {
  const recipeFullInfo = recipeList.find(recipe => recipe.name === recipeName);
  if (
    !currentUser.recipesToCook.some(
      currentRecipe => currentRecipe.id === recipeFullInfo.id
    )
  ) {
    return postRecipe(recipeFullInfo.id, currentUser.id).then(() => {
      return getUsers().then(usersDataResponse => {
        const usersData = usersDataResponse.users;
        const updatedUserObj = usersData.find(
          user => user.id === currentUser.id
        );
        if (updatedUserObj) {
          currentUser.recipesToCook = updatedUserObj.recipesToCook;
        }
        return currentUser.recipesToCook;
      });
    });
  } else {
    return Promise.resolve(currentUser.recipesToCook);
  }
};

export const deleteRecipe = (savedRecipes, recipeId) => {
  const recipeIndex = savedRecipes.findIndex(recipe => recipe.id === recipeId);
  if (recipeIndex !== -1) {
    savedRecipes.splice(recipeIndex, 1);
  }
  return savedRecipes;
};
