/**
 * Created by malsha_h on 7/26/2017.
 */
process.env.NODE_ENV = 'test';
var assert = require('chai').assert;
var path = require('path');
var globalRoot = __dirname;
var base = path.join(__dirname, '../');
var config = require(base +'/config'),
    mongoose = require('mongoose');
var users = require(base + '/app/routes/api');
var User = require(base + 'app/models/user');
var should = require('should');
var testUtils = require(base + 'test/utils.js');
var sinon = require('sinon');
var chai = require('chai');
var passwordHash = require('password-hash');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);
// const chaiHttp = require('chai-http');
const expect = chai.expect;
// chai.use(chaiHttp);



describe('Post dummy user', function () {

    var dummyUser;
    before(function (done) {
        mongoose.connect(config.testDb,function (err) {
            if (err){
                console.log('Not connected to the database '+ err);

            }else {
                console.log('Successfully connected to '+config.testDb);
            }
            done();

        });
        dummyUser = new User({
            email : 'test@test.com',
            firstname : 'TestFirstname',
            lastname : 'TestLastname',
            password : passwordHash.generate('testPassword')
        });
        dummyUser.save(function (err, user) {
            if(err){
                console.log(err);
            }
        })
    });
    describe('User Authenticated', function () {
        it('Correct email and password', async function () {
            const request = {
                body:{
                    email : 'test@test.com',
                    password : 'testPassword'
                }
            };
            let statusStub = sinon.stub().returnsThis();
            let spyStub = sinon.spy();
            let response = {
                status:statusStub,
                json : spyStub
            };
            var result = await users.loginUser(request,response);
            // console.log(result);
            // console.log(statusStub)
            assert.equal(statusStub.calledWith(200), true);
            // assert.equal(result, 'Called');
        } );
    });
    describe('User not authenticated', function () {
        it('Wrong password', async function () {
            const request = {
                body:{
                    email : 'test@test.com',
                    password : 'wrongPassword'
                }
            };
            let statusStub = sinon.stub().returnsThis();
            let spyStub = sinon.spy();
            let response = {
                status:statusStub,
                json : spyStub
            };
            var result = await users.loginUser(request,response);
            // console.log(result);
            // console.log(statusStub)
            assert.equal(statusStub.calledWith(401), true);
            // assert.equal(result, 'Called');
        } );
    });
    after(function (done) {
        User.remove({}, function (err) {
            if(err) {
                console.log(err);
            }
        });
        mongoose.disconnect(done);
    });
});
// describe('Login for correct email and password', function () {
//     User.findOne = sinon.stub().returns({email:'test@test.com', password:'testPassword', firstname:'TestFirstname', lastname: 'TestLastname'});
//     it('Return correct user', function () {
//         const request = {
//             body:{
//                 email : 'test@test.com',
//                 password : 'testPassword'
//             }
//         };
//         let statusStub = sinon.stub().returnsThis();
//         let spyStub = sinon.spy();
//         let response = {
//             status:statusStub,
//             json : spyStub
//         };
//         var newUser = users.loginUser(request,response);
//
//         // let firstCall = response.json.args[0][0];
//         assert.equal(newUser.email, 'test@test.com');
//         assert.equal(newUser.firstname, 'TestFirstname');
//         assert.equal(newUser.lastname, 'TestLastname');
//         assert.equal(statusStub.calledWith(200), true);
//     });
//     it('Wrong username and password cannot signin', function () {
//
//         const request = {
//             body:{
//                 email : 'test@test.com',
//                 password : 'worngPassword'
//             }
//         };
//         let statusStub = sinon.stub().returnsThis();
//         let spyStub = sinon.spy();
//         let response = {
//             status:statusStub,
//             json : spyStub
//         };
//         var newUser = users.loginUser(request,response);
//
//         assert.equal(statusStub.calledWith(401), true);
//     });
//     //backend email validation
//     //
// });