const services = require("../services/recipes");

const getAll = async (req, res, next) => {
  try {
    res.json({ status: 200, data: await services.getAll()})
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const recipe = await services.get(req.params.id);
    res.status(200).json({data: recipe})
  } catch (error) {
    next(error);
  }
}

const save = async (req, res, next) => {
  console.log('artem 2')
  try {
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const newRecipe = {
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients],
    };
    res.status(201).json({ data: await services.save(newRecipe)})
  } catch (error) {
    next(error);
  }
}

const update = async (req, res,next) => {
  try {
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients,
    } = req.body;

    const updated = await services.update(req.params.id, {
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients],
    });

    res.status(200).json({data: updated});
  } catch (error) {
    next(error);
  }
}

const remove = async (req, res, next) => {
  try {
    await services.remove(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const recipeExists = async (req, res, next) => {
  const recipe = await services.get(req.params.id);
  if (recipe === undefined) {
    const error = new Error("Recipe not found");
    error.statusCode = 404;
    next(error);
  } else {
    res.locals.recipe = recipe;
    next();
  }
}

module.exports = {
  getAll,
  get: [recipeExists, get],
  save,
  update: [recipeExists, update],
  remove: [recipeExists, remove],
}