/**
 * Created by malsha_h on 7/17/2017.
 */
var User = require('../models/user');
module.exports = function (router) {
    // user registration route
    //http://localhost:port/users
    router.post('/users',function (req,res) {
        var passwordHash = require('password-hash');
        console.log(req.body);
        var user = new User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.password = passwordHash.generate(req.body.password);
        user.save(function (err) {
            if (err) {
                console.log(err);
                // res.send('Error');
                res.json({success:false, message:'Invalid data!!!'});
            } else {
                res.json({success:true, message:'User Created!!!'});
            }
        });
    });
    // user login route
    //http://localhost:8080/authenticate
    router.post('/authenticate', function (req, res) {
        User.findOne({email:req.body.email}).select('firstname lastname email password').exec(function (err, user) {
            if(err) throw err;
            if(!user){
                res.json({success:false, message:'Could not authenticate user'});
            }else if(user){
                if(req.body.password){
                    var validPassword = user.comparePassword(req.body.password);
                }else{
                    res.json({success:false, message:'No password provided'});
                }
                if(!validPassword){
                    res.json({success:false, methods:'Invalid Password'});
                }else {
                    res.json({success:true, message:'User Authenticated'});
                }

            }
            
        });
    });
    return router;
};