const filterRecipeByTag = (recipes, tag) => {
  let filteredByTag = recipes.filter((recipe) => {
    // return tags.every((tag) => {
     return recipe.tags.includes(tag)
    // })
  })
  return filteredByTag
}



export { filterRecipeByTag };
