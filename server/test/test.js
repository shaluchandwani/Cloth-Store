import chai from "chai";
import chaiHttp from "chai-http";
import app from "./../../app";

chai.use(chaiHttp);
chai.should();

describe("Cloths", () => {
    describe("POST/", () =>{
        it("should create an Item in the stock", (done) => {
            const item = {
                "name":"tshit",
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
})

