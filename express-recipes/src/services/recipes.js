const fs = require("fs").promises;
const path = require("path");

const recipesFilePath = path.join(__dirname, "../../db/recipes.json"); // Contruct the path to the recipes data

const getAll = async () => JSON.parse(await fs.readFile(recipesFilePath));

const get = async (id) => {
  const recipes = await getAll();

  return recipes.find((recipe) => recipe.id.toString() === id.toString());
}

const save = async (recipe) => {
  const recipes = await getAll();

  recipe.id = recipes.length + 1;

  recipes.push(recipe);

  await fs.writeFile(recipesFilePath, JSON.stringify(recipes));

  return recipes;
}

const update = async (id, updated) => {
  const recipes = await getAll();

  updated.id = parseInt(id);

  const updatedRecipes = recipes.map((recipe) => {
    return recipe.id === parseInt(id) ? updated : recipe;
  });

  await fs.writeFile(recipesFilePath, JSON.stringify(updatedRecipes));

  return updated;


}

const remove = async (id) => {
  const recipes = await getAll();
  const newRecipes = [];

  for(let i = 0; i < recipes.length; i++) {
    if (recipes[i].id.toString() !== id.toString()) {
      newRecipes.push(recipes[i]);
    }
  }

  await fs.writeFile(recipesFilePath, JSON.stringify(newRecipes));
}

module.exports = {
  getAll,
  get,
  save,
  update,
  remove,
}