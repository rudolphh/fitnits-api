process.env.NODE_ENV = 'test'

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Fitnits APIs', () => {

    describe('Test GET route /users', () => {
        it("It should return all users", (done) => {
            chai.request(server)
                .get('/users')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.property('data');
                    done();
                })
        });
    });

    
});