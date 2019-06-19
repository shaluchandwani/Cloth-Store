import model from '../models';
import Joi from '@hapi/joi';
import numvalidation from '../validation/numvalidation.js';
//import createValidation from '../middleware/validations';

const { Cloth } = model;

class Cloths {
    static CreatItem(req, res) {
        const { error } = Joi.validate(req.body, numvalidation.createValidation);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const { name, price, description } = req.body;
        let purchaseDate = new Date();
        return Cloth
            .create({
                name,
                price,
                purchaseDate,
                description
            })
            .then(itemData => res.status(201).json({
                status: 201,
                message: 'Item successfully created',
                itemData
            }))
    }

    static updateItem(req, res) {
        const { name, description, price, purchaseDate, soldDate } = req.body;
        return Cloth
            .findByPk(req.params.id)
            .then((item) => {
                item.update({
                    name: name || item.name,
                    description: description || item.description,
                    price: price || item.price,
                    purchaseDate: purchaseDate || item.purchaseDate,
                    soldDate: soldDate || item.soldDate,
                })
                    .then((updatedItem) => {
                        res.status(200).json({
                            status: 200,
                            message: 'Item update succesfully',
                            data: {
                                name: name || item.name,
                                description: description || item.description,
                                price: price || item.price,
                                purchaseDate: purchaseDate || item.purchaseDate,
                                soldDate: soldDate || item.soldDate,
                            }
                        })
                    })
                    .catch(error => res.status(400).json(error));
            }).catch(error => res.status(400).json(error));

    }

    static DeleteItem (req,res) {
        const num = {
            inputparamnumber: req.params.clothId
        };
        const result = Joi.validate(num, numvalidation.numvalidation);
        if (result.error){
            return res.status(400).send({
                status: 400,
                message: 'only positive numbers are allowed in the Cloth Id field'
            });
        } else {
            return Cloth
            .findByPk(parseInt(req.params.clothId))
            .then(Cloth => {
                if(!Cloth) {
                  return res.status(400).send({
                  message: 'Item to be deleted not found',
                  });
                }
                return Cloth
                  .destroy()
                  .then(() => res.status(200).send({
                    message: `Item successfully deleted`
                  }))
                  .catch(error => res.status(400).send(error));
              })
          }
        }
}

export default Cloths;