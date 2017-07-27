/**
 * Created by malsha_h on 7/25/2017.
 */

process.env.NODE_ENV = 'test';
let assert = require('chai').assert;
let path = require('path');
let globalRoot = __dirname;
let base = path.join(__dirname, '../');
let config = require(base +'/config'),
    mongoose = require('mongoose');
let users = require(base + '/app/routes/api');

let User = require(base + 'app/models/user');
let should = require('should');
let testUtils = require(base + 'test/utils.js');

let sinon = require('sinon');
let chai = require('chai');
let passwordHash = require('password-hash');
let sinonChai = require('sinon-chai');
chai.use(sinonChai);
describe("Sign Up", function () {



    // console.log(passwordHash.verify('testPassword', resultingUser.password));
    it('User created with details', function () {
        let req = {
            body : {
                firstname: 'testFirstname',
                lastname : 'testLastname',
                email : 'test@test.com',
                password : passwordHash.generate('testPassword')
            }
        };
        // console.log(passwordHash.generate('testPassword'));
        let stub = sinon.stub.returnThis;
        let spy = sinon.spy();
        let res = {
            status : stub,
            json : spy
        };
        let resultingUser = users.postUser(req,res);
        assert.equal(resultingUser.firstname, 'testFirstname');
        assert.equal(resultingUser.lastname, 'testLastname');
        assert.equal(resultingUser.email, 'test@test.com');
    });


    // before(function (done) {
    //     console.log('before function started working');
    //     mongoose.connect(config.testDb, function () {
    //         console.log('Connected to' + config.testDb);
    //         done();
    //     });
    //     dummUser = new User({
    //         'firstname' : 'testfirstname',
    //         'lastname' : 'testlastname',
    //         'email' : 'test@email.com',
    //         'password' : 'testPassword'
    //     });
    //     dummUser.save(function (err, post) {
    //         if(err){
    //             console.log(err);
    //         }
    //         id = user._id;
    //     });
    //
    // });

    // describe("User creates", function () {
    //     if("should create a new user", function (done) {
    //             var req = {
    //                 body : {
    //                     'firstname' : 'anotherFirstName',
    //                     'lastname' : 'AnotherLastname',
    //                     'email' : 'another@email.com',
    //                     'password' : 'AnotherPassword'
    //                 }
    //             };
    //             var res = testUtils.responseValidator(200, function (post) {
    //                 post.should.have.property('firstname');
    //                 post.should.have.equal('anotherFirstName');
    //                 post.should.have.property('lastname');
    //                 post.should.have.equal('AnotherLastname');
    //                 post.should.have.property('email');
    //                 post.should.have.equal('another@email.com');
    //                 post.should.have.property('password');
    //                 post.should.have.equal('AnotherPassword');
    //                 dine();
    //             });
    //             users.regUser(req, res);
    //         });
    // });

});