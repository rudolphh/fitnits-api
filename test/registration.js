process.env.NODE_ENV = 'test'

const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Fitnits APIs for registration', () => {

    describe('Test POST route /register', () => {
        it("It should register a new user with 'normal' (default) role", (done) => {
            chai.request(server)
                .get('/register')
                .set('username', 'user1')
                .set('email', 'user1@gmail.com')
                .set('password', 'Imi123')
                .set('passwordConfirm', 'Imi123')
                .set('gender', 'female')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.be.a('object');
                    response.body.should.have.property('data');
                    console.log(response.body);
                    done();
                })
        });
    });

    
});