const filterByTag = (recipes, tag) => {
  let recipesFilteredByTag = recipes.filter((recipe) => {
    // return tag.every((tag) => {
     return recipe.tags.includes(tag.toLowerCase())
    // })
  })
  return recipesFilteredByTag
}

const filterByName = (recipe, name) => {
  const recipesFilteredByName = recipe.filter(recipe => recipe.name.includes(name))
 return recipesFilteredByName
 }



export { filterByTag, filterByName };
