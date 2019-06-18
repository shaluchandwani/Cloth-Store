import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../../app";

chai.use(chaiHttp);
chai.should();

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
    });
})

