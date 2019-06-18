import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../../app";

/*global it*/
/*global describe*/


chai.use(chaiHttp);
chai.should();
let itemId;

describe("Cloths", () => {
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
                    res.body.should.be.a('object');
                    done();
                });
        })
    })
    describe("PATCH/", () => {
        it("should update an item in the stock", (done) => {
            const item = {
                "name": "Shirt",
                "price": 10000,
                "description": "long sleeves shirt"
            };
            chai.request(app)
                .patch(`/api/v1/cloths/1`)
                .send(item)
                .end((req, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not update item", (done) => {
            const item = {
                "name": "Shirt",
                "price": "10000hgf",
                "description": "long sleeves shirt"
            };
            chai.request(app)
                .patch(`/api/v1/cloths/1`)
                .send(item)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
        it("should not update item whith wrong id", (done) => {
            const item = {
                "name": "Shirt",
                "price": "10000hgf",
                "description": "long sleeves shirt"
            };
            chai.request(app)
                .patch(`/api/v1/cloths/nb`)
                .send(item)
                .end((req, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe("DELETE/", () =>{
    it(`Sucessfully deleted item`, (done) => {
        chai.request(app)
            .delete(`/api/v1/cloths/${itemId}`)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    })

})

