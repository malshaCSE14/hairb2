/**
 * Created by malsha_h on 7/17/2017.
 */
var User    = require('../models/user');
var jwt     = require('jsonwebtoken');
var secret  = 'supesecret';

module.exports = function (router) {
    // user registration route
    //http://localhost:port/users
    router.post('/users',function (req,res) {
        var passwordHash = require('password-hash');
        // console.log(req.body);
        var user = new User();
        user.firstname = req.body.firstname;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.password = passwordHash.generate(req.body.password);
        user.save(function (err) {
            if (err) {
                console.log(err);
                res.send('Error');
                res.json({success:false, message:'Invalid data!!!'});
            } else {
                res.json({success:true, message:'User Created!!!'});
            }
        });
    });
    // update-stylist
    router.put('/update-stylist', function (req, res) {
        var token = req.headers['x-access-token'];
        res.json({success:true, message: 'Arrived'});
        console.log(req.body);
        var editStylist = req.body.email;
        if (req.body.firstname){
            var newFirstname = req.body.firstname;
        }
        if (req.body.lastname){
            var newLastname = req.body.lastname;
        }
        if (req.body.description){
            var newDescription = req.body.description;
            console.log(newDescription);
        }
        User.findOne({email: req.body.email},function (err, mainUser) {
           if(err){
               throw err;
           }
           if(!mainUser){
               res.json({success:false, message: 'No user found'});
           }else{
               // console.log(mainUser.firstname);
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newLastname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.lastname = newLastname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }
               if(newFirstname){
                   User.findOne({ email: req.body.email }, function (err, user) {

                       // console.log(user.firstname);
                       if(!user){
                           console.log('A');
                       }else{
                           user.firstname = newFirstname;
                           // user.profile.description = newDescription;
                           user.save(function (err) {
                               if(err){
                                   console.log('error at b');
                               }
                               else{
                                   console.log('no error at b');
                               }
                           });
                       }
                   });
               }

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
                    var token = jwt.sign({
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email : user.email
                    },
                        secret,
                    {
                        expiresIn: '24h'
                    });
                    res.json({success:true, message:'User Authenticated', token:token});
                }
            }
            
        });
    });
    // middleware
    router.use('/me',function (req,res,next) {
        var token = req.body.token || req.body.query || req.headers['x-access-token'];
        if(token){
            // verify token
            jwt.verify(token, secret, function (err, decoded) {
                if(err) {
                    res.json({success:false, message:'Token Invalid'});
                }else{
                    req.decoded  =decoded;
                    next();
                }
            });
        }
        else{
            res.json({success:false, message: 'No token provided'})
        }
    });
    // router.use('/update-stylist',function (req,res,next) {
    //     var token = req.body.token || req.body.query || req.headers['x-access-token'];
    //     if(token){
    //         // verify token
    //         jwt.verify(token, secret, function (err, decoded) {
    //             if(err) {
    //                 res.json({success:false, message:'Token Invalid'});
    //             }else{
    //                 req.decoded  =decoded;
    //                 next();
    //             }
    //         });
    //     }
    //     else{
    //         res.json({success:false, message: 'No token provided'})
    //     }
    // });

    router.post('/me', function (req,res) {
        res.send(req.decoded);
    });
    return router;
};
