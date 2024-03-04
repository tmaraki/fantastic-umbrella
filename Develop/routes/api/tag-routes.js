const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({ include: Product });
    return res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//find one tag by id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, { include: Product });
    return res.json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  const { tag_name } = req.body;
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

//update tag by id
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    res.json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete tag by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id }
    });
    res.json(deletedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;