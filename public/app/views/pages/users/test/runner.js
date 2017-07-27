/**
 * Created by malsha_h on 7/25/2017.
 */
process.env.NODE_ENV = 'test';

var path = require('path');
//
var globalRoot = __dirname;
var base = path.join(__dirname, '../../../../../../');

var config = require(base +'/config'),
    mongoose = require('mongoose');
console.log('vars are defined');
var users = require(base + 'public/app/controllers/userCtrl.js');

var   User = require(base + 'app/models/user'),
    should = require('should'),
    testUtils = require(base + 'public/app/views/pages/users/test/utils.js');
//testUtils path may be wrong


description("Post API", function () {
    var dummUser, id;
    before(function (done) {
        mongoose.connect(config.testDb, function () {
            console.log('Connected to' + config.testDb);
            done();
        });
        dummUser = new User({
            'firstname' : 'testfirstname',
            'lastname' : 'testlastname',
            'email' : 'test@email.com',
            'password' : 'testPassword'
        });
        dummUser.save(function (err, post) {
            if(err){
                console.log(err);
            }
            id = post._id;
        });

    });

    describe("User creates", function () {
        if("should create a new user", function (done) {
               var req = {
                   body : {
                       'firstname' : 'anotherFirstName',
                       'lastname' : 'AnotherLastname',
                       'email' : 'another@email.com',
                       'password' : 'AnotherPassword'
                   }
               };
               var res = testUtils.responseValidator(200, function (post) {
                   post.should.have.property('firstname');
                   post.should.have.equal('anotherFirstName');
                   post.should.have.property('lastname');
                   post.should.have.equal('AnotherLastname');
                   post.should.have.property('email');
                   post.should.have.equal('another@email.com');
                   post.should.have.property('password');
                   post.should.have.equal('AnotherPassword');
                   dine();
               });
               users.regUser(req, res);
            });
    });

});