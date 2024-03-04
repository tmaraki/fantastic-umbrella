const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({ include: Product });
    return res.json(tagDataData);
    } catch(err) {
    res.status(500).json(err);
      }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await tag.findByPk(req.params.id, {include: Product});
    return res.json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/', (req, res) => {
  // create a new tag
  const { tag_name, id } = req.body;
    Tag.create({
      id: req.body.id,
      tag_name: req.body.tag_name
    })
    .then((newCategory) => {
      res.json(newCategory)
    })
    .catch((err) => {
      res.json(err);
    })
  });

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(
    {  
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
res.json(updatedTag);
} catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Category.destroy ({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
