process.env.NODE_ENV = 'test'

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Fitnits APIs for measurements', () => {

    describe('Test GET route /users/60b32a1eaa1c55833eff415d/measurements', () => {
        it("It should return all measurements for user 60b32a1eaa1c55833eff415d", (done) => {
            chai.request(server)
                .get('/users/60b32a1eaa1c55833eff415d/measurements')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYjMyYTFlYWExYzU1ODMzZWZmNDE1ZCIsImlhdCI6MTYyMjY5MDY3NSwiZXhwIjoxNjIyNzc3MDc1fQ.2isK6Ug2s_JNt1kX7PbEDtWvwYsetWThq0_4FBiWFKg')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.property('data');
                    response.body['data'][0].should.have.property('weight');
                    done();
                })
        });
    });

    
});