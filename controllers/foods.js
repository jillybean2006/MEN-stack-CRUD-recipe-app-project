const express = require('express');
const router = express.Router();

const Food = require('../models/food');
const upload = require('../middleware/upload');

function getUserId(req) {
  return req.session?.user?._id || req.session?.userId;
}

function parseIngredients(ingredientsText) {
  if (!ingredientsText) return [];
  return ingredientsText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => ({ name: line }));
};


router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const foods = await Food.find({ owner: userId }).sort({ createdAt: -1 });

    res.render('foods/index.ejs', { foods });
  } catch (err) {
    console.log(err);
    res.send('Error loading recipes');
  }
});

router.get('/new', (req, res) => {
  res.render('foods/new.ejs');
});


router.post('/', upload.single('image'), async (req, res) => {
  try {
    const userId = getUserId(req);

    const ingredients = parseIngredients(req.body.ingredientsText);

    const newFood = {
      name: req.body.name,
      description: req.body.description,
      instructions: req.body.instructions,
      ingredients,
      owner: userId,
    };

  
    if (req.file?.path) {
      newFood.imageUrl = req.file.path;
    }

    const created = await Food.create(newFood);
    res.redirect(`/foods/${created._id}`);
  } catch (err) {
    console.log(err);
    res.send('Error creating recipe');
  }
});


router.get('/:id', async (req, res) => {
  try {
    const userId = getUserId(req);
    const food = await Food.findOne({ _id: req.params.id, owner: userId });

    if (!food) return res.send('Recipe not found');

    res.render('foods/show.ejs', { food });
  } catch (err) {
    console.log(err);
    res.send('Error showing recipe');
  }
});


router.get('/:id/edit', async (req, res) => {
  try {
    const userId = getUserId(req);
    const food = await Food.findOne({ _id: req.params.id, owner: userId });

    if (!food) return res.send('Recipe not found');

    res.render('foods/edit.ejs', { food });
  } catch (err) {
    console.log(err);
    res.send('Error loading edit form');
  }
});


router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const userId = getUserId(req);

    const updates = {
      name: req.body.name,
      description: req.body.description,
      instructions: req.body.instructions,
      ingredients: parseIngredients(req.body.ingredientsText),
    };

  
    if (req.file?.path) {
      updates.imageUrl = req.file.path;
    }

    const updated = await Food.findOneAndUpdate(
      { _id: req.params.id, owner: userId },
      updates,
      { new: true }
    );

    if (!updated) return res.send('Recipe not found');

    res.redirect(`/foods/${updated._id}`);
  } catch (err) {
    console.log(err);
    res.send('Error updating recipe');
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const userId = getUserId(req);

    await Food.findOneAndDelete({ _id: req.params.id, owner: userId });
    res.redirect('/foods');
  } catch (err) {
    console.log(err);
    res.send('Error deleting recipe');
  }
});

module.exports = router;
