import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../../app";

/*global it*/
/*global describe*/


chai.use(chaiHttp);
chai.should();
let itemId;

describe("Cloths", () => {

    describe("GET/", () => {
        it("No item becouse the is on data in the database", (done) => {
            chai.request(app)
                .get(`/api/v1/cloths`)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.body.should.be.an('object');
                    res.body.should.have.property("message").eql("No item in the store");
                    done();
                })
        })
    })

    describe("POST/", () => {
        it("should create an Item in the stock", (done) => {
            const item = {
                "name": "tshit",
                "price": 5000,
                "description": "black pants"
            };
            chai.request(app)
                .post(`/api/v1/cloths`)
                .send(item)
                .end((req, res) => {
                    res.should.have.status(201);
                    itemId = res.body.itemData.id;
                    res.should.be.json;
                    res.body.should.have.property("itemData");
                    res.body.itemData.should.have.property("id").eql(itemId);
                    res.body.itemData.should.have.property('name').eql('tshit');
                    res.body.itemData.should.have.property('purchaseDate');
                    res.body.itemData.should.have.property('description').eql('black pants');
                    res.body.itemData.should.have.property('updatedAt');
                    res.body.itemData.should.have.property('createdAt');
                    res.body.itemData.should.have.property('soldDate');
                    res.body.should.have.property("message").eql("Item successfully created")
                    done();
                });

        })

        describe("GET/", () => {
            it("Should get all items", (done) => {
                chai.request(app)
                    .get(`/api/v1/cloths`)
                    .end((req, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.have.property("data");
                        res.body.data[0].should.have.property("id").eql(itemId);
                        done();
                    })
            })
        })

        it("It should not create an item because of empty name", (done) => {
            const item = {
                "name": "",
                "price": 5000,
                "description": "black pants"
            };
            chai.request(app)
                .post(`/api/v1/cloths`)
                .send(item)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('"name" is not allowed to be empty');
                    res.should.be.json;
                    done();
                });
        })
    })
    describe("GET/", () => {
        it("it should get one with the id", (done) => {
        chai.request(app) 
        .get(`/api/v1/cloths/${itemId}`)
        .end((req, res) => {
            res.should.be.json;
            res.should.have.status(200);
            res.body.should.have.property("Cloth").should.be.an('object');
            res.body.Cloth.should.have.property('id').eql(itemId);
            done(); 
        })
    })
    it(`Item with with wrong id not found `, (done) => {
        chai.request(app)
            .get(`/api/v1/cloths/35`)
            .end((req, res) => {
                res.should.be.json;
                res.should.have.status(400);
                res.body.should.have.property("message").eql("Item Not Found");
                done();
            });
        });
    it(`only positive numbers are allowed in the Cloth Id field`, (done) => {
        chai.request(app)
            .get(`/api/v1/cloths/asd`)
            .end((req, res) => {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message').eql("only positive numbers are allowed in the Cloth Id field");
                done();
            });
    });
    })
    describe("PATCH/", () => {
        it("should update an item in the stock", (done) => {
            const item = {
                "name": "Shirt",
                "price": 10000,
                "description": "long sleeves shirt"
            };
            chai.request(app)
                .patch(`/api/v1/cloths/${itemId}`)
                .send(item)
                .end((req, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql('Item updated succesfully');
                    res.body.should.have.property('data').should.be.an('object');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('description');
                    res.body.data.should.have.property('price');
                    done();
                });
        });
        it("should update an item in the stock when there is no data", (done) => {
            const item = {
            };
            chai.request(app)
                .patch(`/api/v1/cloths/${itemId}`)
                .send(item)
                .end((req, res) => {
                    res.should.be.json;
                    res.should.have.status(200);
                    res.body.should.have.property("message").eql('Item updated succesfully');
                    res.body.should.have.property('data').should.be.an('object');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('description');
                    res.body.data.should.have.property('price');
                    done();
                });
        });
        it("should not update item with wrong price", (done) => {
            const item = {
                "name": "Shirt",
                "price": "10000hgf",
                "description": "long sleeves shirt"
            };
            chai.request(app)
                .patch(`/api/v1/cloths/${itemId}`)
                .send(item)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.have.property('message').eql('"price" must be a number');
                    res.should.be.json;
                    done();
                });
        });
        it("should not update item whith wrong id", (done) => {
            const item = {
                "name": "Shirt",
                "price": 10000,
                "description": "long sleeves shirt"
            };
            chai.request(app)
                .patch(`/api/v1/cloths/45567`)
                .send(item)
                .end((req, res) => {
                    res.should.have.status(404);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Item to update not found');
                    done();
                });
        });
        it(`only positive numbers are allowed in the item Id field`, (done) => {
            chai.request(app)
                .patch(`/api/v1/cloths/abc`)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.message.should.be.eql('"id" must be a number');
                    done();
                });
        });
    });

    describe("DELETE/", () => {
        it(`Sucessfully deleted item`, (done) => {
            chai.request(app)
                .delete(`/api/v1/cloths/${itemId}`)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.message.should.be.eql('Item successfully deleted');
                    done();
                });
        });

        it(`Item to be deleted not found`, (done) => {
            chai.request(app)
                .delete(`/api/v1/cloths/345`)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.message.should.be.eql('Item to be deleted not found');
                    done();
                });
        });

        it(`only positive numbers are allowed in the Cloth Id field`, (done) => {
            chai.request(app)
                .delete(`/api/v1/cloths/abc`)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.message.should.be.eql('only positive numbers are allowed in the Cloth Id field');
                    done();
                });
        });
    })
})

