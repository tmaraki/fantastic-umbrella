const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
//defining columns
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    productID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    tagID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
