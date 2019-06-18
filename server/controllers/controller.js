import model from '../models';

const { Cloth } = model;

class Cloths {
    static CreatItem(req, res) {
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
        return Cloth
        .findByPk(parseInt(req.params.clothId))
        .then(Cloth => {
            if(!Cloth) {
              return res.status(400).send({
              message: 'Item Not Found',
              });
            }
            return Cloth
              .destroy()
              .then(() => res.status(200).send({
                message: `Item successfully deleted`
              }))
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error))
      }
}

export default Cloths;