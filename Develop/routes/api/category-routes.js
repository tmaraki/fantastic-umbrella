const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories, include associate Products
router.get('/', async (req, res) => {
  try{
  const categoryData = await Category.findAll({ include: Product });
  return res.json(categoryData);
  } catch(err) {
  res.status(500).json(err);
    }
});

// find one category by its `id` value and include its associated Products
router.get('/:id', async (req, res) => {
  try {
  const categoryData = await Category.findByPk(req.params.id, {include: Product});
  return res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name
  })
  .then((newCategory) => {
    res.json(newCategory)
  })
  .catch((err) => {
    res.json(err);
  })
});


// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
  const updatedCategory = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
      id: req.params.id,
      },
    }
    );
res.json(updatedCategory);
} catch (err) {
  res.status(400).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const deletedCategory = await Category.destroy ({
    where: {
      id: req.params.id,
    },
  });
  res.json(deletedCategory);
} catch (err) {
  res.status(400).json(err);
}
});

module.exports = router;
