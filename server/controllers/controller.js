import model from '../models';

const { Cloth } = model;

class Cloths {
    static CreatItem(req,res) {
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
}

export default Cloths;