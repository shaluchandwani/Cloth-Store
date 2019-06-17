'use strict';
export default (sequelize, DataTypes) => {
  const Cloth = sequelize.define('Cloth', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter cloth name'
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: {
        args: false,
        msg: 'Please enter the product price'
      }
    },
    purchaseDate: {
      type:DataTypes.DATE,
      allowNull: {
        args: false,
        msg: 'Please enter the purchesedDate'
      }
    },
    soldDate: {
      type: DataTypes.DATE,
      allowNull: {
        args: true,
        msg: 'it can be null'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the product description'
      }
    }
  }, {});
  Cloth.associate = function(models) {
    // associations can be defined here
  };
  return Cloth;
};