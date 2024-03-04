const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

  // find all products and include associated Category and Tag data
router.get('/', async(req, res) => {
  try{
    const categoryData = await Product.findAll({ include: [{model: Category }, { model: Tag}] });
    return res.json(productData);
    } catch(err) {
    res.status(500).json(err);
      }
});

// get one product, find single product by its 'id', include associated Category and Tag data
router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Product.findByPk({ include: [{model: Category }, { model: Tag}] });
    return res.json(productData);
    } catch(err) {
    res.status(500).json(err);
      }
});

// create new product
router.post('/', (req, res) => {
 const { product_name, price, stock, tagIds } = req.body;
  Product.create({
    product_name,
    price,
    stock
  })
    .then((product) => {
      if (tagIds.length) {
        const productTagIdArr = tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy ({
      where: {
        id: req.params.id,
      },
    });
    res.json(deletedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
