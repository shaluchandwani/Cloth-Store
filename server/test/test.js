import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../../app";

/*global it*/
/*global describe*/


chai.use(chaiHttp);
chai.should();
let itemId;

describe("Cloths", () => {
    describe("POST/", () =>{
        it("should create an Item in the stock", (done) => {
            const item = {
                "name":"pants",
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

    describe("DELETE/", () =>{
    it(`Sucessfully deleted item`, (done) => {
        chai.request(app)
            .delete(`/api/v1/cloths/1`)
            .end((req, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
    })

})

