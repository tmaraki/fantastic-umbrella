const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

  // find all products
router.get('/', async(req, res) => {
  try{
    const productData = await Product.findAll({ include: [{ model: Category }, { model: Tag }] });
    return res.json(productData);
    } catch(err) {
    res.status(500).json(err);
      }
});

// get one product by 'id'
router.get('/:id', async (req, res) => {
  try{
    const productData = await Product.findByPk(req.params.id, { include: [{ model: Category }, { model: Tag }] });
    return res.json(productData);
    } catch(err) {
    res.status(500).json(err);
      }
});

// create new product
router.post('/', (req, res) => {
 const { product_name, price, stock, tagIds } = req.body;
  Product.create({ product_name, price, stock})
    .then((product) => {
      if (tagIds && tagIds.length) {
        const productTagIdArr = tagIds.map((tag_id) => ({
          product_id: product.id,
          tag_id,
        }));
        return ProductTag.bulkCreate(productTagIdArr);
      }
      return res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(product))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

//update product
router.put('/:id', async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => ({ product_id: req.params.id, tag_id }));

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      await Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    }

    const updatedProduct = await Product.findByPk(req.params.id, { include: [{ model: Category }, { model: Tag }] });
    return res.json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });
    res.json(deletedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
