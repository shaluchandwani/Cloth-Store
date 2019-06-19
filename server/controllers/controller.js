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
        const up = { 
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            id: req.params.id,
        };
        const { error } = Joi.validate(up, numvalidation.updatevalidations);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        return Cloth
            .findByPk(req.params.id)
             .then((item) => {
                if(!item) {
                    return res.status(404).send({
                    message: 'Item to update not found',
                    });
                  }
                item.update({
                    name: up.name || item.name,
                    description: up.description || item.description,
                    price: up.price || item.price,
                })
                    .then(() => {                    
                        res.status(200).json({
                            message: 'Item updated succesfully',
                            data: {
                                name:  item.name,
                                description: item.description,
                                price: item.price,                          
                            }
                        })
                    })
            })
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
        static getOne (req,res) {
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
                .then(Cloth =>{
                    if(!Cloth){
                        return res.status(400).send({
                            message: 'Item Not Found', 
                        });
                    }else{
                        return res.status(200).json({
                            Cloth
                        })
                    }
                })
            }
        }

    static GetAllItems (req, res) {
        return Cloth
        .findAll()
        .then(cloths => {
            if (!cloths[0]) {
                return res.status(404)
                .json({
                    status: 404,
                    message: "No item in the store"
                })
            }
            res.status(200)
            .json({
                status: 200,
                data: cloths
            })
        })
    }
}

export default Cloths;