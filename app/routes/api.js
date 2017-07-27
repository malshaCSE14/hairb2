

//========================================================================================================
/**
 * Created by malsha_h on 7/17/2017.
 */
var User    = require('../models/user');
var jwt     = require('jsonwebtoken');
var secret  = 'supesecret';
var passwordHash = require('password-hash');
var mongoose    = require('mongoose');
var assert      = require('assert');
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);



module.exports = {
    loginUser : async function (req, res) {
        let newUser = User();
        var user = await User.findOne({email:req.body.email}).select('firstname lastname email password').exec();
        if(!user){
            res.json({success:false, message:'Could not authenticate user'});
        }else if(user){

            if(req.body.password){
                // var validPassword = user.comparePassword(req.body.password);
                var validPassword = passwordHash.verify(req.body.password, user.password);
            }else{
                res.json({success:false, message:'No password provided'});
            }
            if(!validPassword){
                res.status(401).json({success:false, methods:'Invalid Password'});
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
                // console.log(user);
                res.status(200).json({success:true, message:'User Authenticated', token:token});
            }

        }
    },
    execFunction : function (err, user) {
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
    },

    postUser : function (req,res) {
        var passwordHash = require('password-hash');
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
        if(user){
            return user;
        }
        else{
            return 'User already exists';
        }

    },
    route :function (router) {
        router.post('/users', this.postUser);
        // update-stylist
        router.use('/update-stylist',function (req,res,next) {
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

        router.put('/update-stylist', function (req, res) {
            console.log(req.body);
            var useremail = req.decoded.email;
            if (req.body.firstname){
                var newFirstname = req.body.firstname;
            }
            if (req.body.lastname){
                var newLastname = req.body.lastname;
            }
            if (req.body.description){
                var newDescription = req.body.description;
            }
            if (req.body.educatorset){
                var educatorset = req.body.educatorset;
            }
            if (req.body.stylistset){
                var stylistset = req.body.stylistset;
            }
            if (req.body.apperenticeset){
                var apperenticeset = req.body.apperenticeset;
            }
            if (req.body.educatorrate){
                var educatorrate = req.body.educatorrate;
            }
            if (req.body.stylistrate){
                var stylistrate = req.body.stylistrate;
            }
            if (req.body.apperenticerate){
                var apperenticerate = req.body.apperenticerate;
            }
            if (req.body.address){
                var address = req.body.address;
            }
            if (req.body.city){
                var city = req.body.city;
            }
            if (req.body.haircutting){
                var haircutting = req.body.haircutting;
            }
            if (req.body.coloring){
                var coloring = req.body.coloring;
            }
            if (req.body.rebonding){
                var rebonding = req.body.rebonding;
            }
            if (req.body.hairrelaxing){
                var hairrelaxing = req.body.hairrelaxing;
            }
            if (req.body.straightening){
                var straightening = req.body.straightening;
            }
            if (req.body.hairstyling){
                var hairstyling = req.body.hairstyling;
            }
            if (req.body.cleansing){
                var cleansing = req.body.cleansing;
            }
            if (req.body.scalpmassage){
                var scalpmassage = req.body.scalpmassage;
            }
            if (req.body.oiltreatments){
                var oiltreatments = req.body.oiltreatments;
            }
            if (req.body.haircareadvising){
                var haircareadvising = req.body.haircareadvising;
            }
            if (req.body.haircurling){
                var haircurling = req.body.haircurling;
            }
            if (req.body.perming){
                var perming = req.body.perming;
            }

            User.findOne({email: useremail},function (err, mainUser) {
                if(err){
                    throw err;
                }
                if(!mainUser){
                    res.json({success:false, message: 'No user found'});
                }
                else{
                    User.findOne({ email: useremail }, function (err, user) {
                        if(!user){
                            console.log('No user found once again');
                        }else{
                            if(newFirstname){
                                user.firstname = newFirstname;
                            }
                            if(newLastname){
                                user.lastname = newLastname;
                            }
                            if(newDescription){
                                user.profile.description = newDescription;
                            }
                            if(educatorset){
                                user.profile.jobcategories.educator.isset = educatorset;
                            }
                            if(educatorrate){
                                user.profile.jobcategories.educator.rate = educatorrate;
                            }
                            if(stylistset){
                                user.profile.jobcategories.stylist.isset = stylistset;
                            }
                            if(stylistrate){
                                user.profile.jobcategories.stylist.rate = stylistrate;
                            }
                            if(apperenticeset){
                                user.profile.jobcategories.apperentice.isset = apperenticeset;
                            }
                            if(apperenticerate){
                                user.profile.jobcategories.apperentice.rate = apperenticerate;
                            }
                            if(address){
                                user.profile.address = address;
                            }
                            if(city){
                                user.profile.city = city;
                            }
                            if(haircutting){
                                user.profile.skills.haircutting= haircutting;
                            }
                            if(coloring){
                                user.profile.skills.coloring = coloring;
                            }
                            if(rebonding){
                                user.profile.skills.rebonding = rebonding;
                            }
                            if(hairrelaxing){
                                user.profile.skills.hairrelaxing = hairrelaxing;
                            }
                            if(straightening){
                                user.profile.skills.straightening = straightening;
                            }
                            if(hairstyling){
                                user.profile.skills.hairstyling = hairstyling;
                            }
                            if(cleansing){
                                user.profile.skills.cleansing = cleansing;
                            }
                            if(scalpmassage){
                                user.profile.skills.scalpmassage = scalpmassage;
                            }
                            if(oiltreatments){
                                user.profile.skills.oiltreatments = oiltreatments;
                            }
                            if(haircareadvising){
                                user.profile.skills.haircareadvising = haircareadvising;
                            }
                            if(haircurling){
                                user.profile.skills.haircurling = haircurling;
                            }
                            if(perming){
                                user.profile.skills.perming = perming;
                            }

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
                    res.json({success:true, message: 'Profile Updated'});
                }
            });
            // res.send(req.decoded.email);
        });

        // user login route
        //http://localhost:8080/authenticate
        router.post('/authenticate', this.loginUser );
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

        router.post('/me', function (req,res) {
            res.send(req.decoded);
        });
        return router;
    }
} ;


// module.exports = function (router) {
//     router.post('/users',function (req,res) {
//         var passwordHash = require('password-hash');
//         var user = new User();
//         user.firstname = req.body.firstname;
//         user.lastname = req.body.lastname;
//         user.email = req.body.email;
//         user.password = passwordHash.generate(req.body.password);
//         user.save(function (err) {
//             if (err) {
//                 console.log(err);
//                 res.send('Error');
//                 res.json({success:false, message:'Invalid data!!!'});
//             } else {
//                 res.json({success:true, message:'User Created!!!'});
//             }
//         });
//     });
//     // update-stylist
//     router.use('/update-stylist',function (req,res,next) {
//         var token = req.body.token || req.body.query || req.headers['x-access-token'];
//         if(token){
//             // verify token
//             jwt.verify(token, secret, function (err, decoded) {
//                 if(err) {
//                     res.json({success:false, message:'Token Invalid'});
//                 }else{
//                     req.decoded  =decoded;
//                     next();
//                 }
//             });
//         }
//         else{
//             res.json({success:false, message: 'No token provided'})
//         }
//     });
//
//     router.put('/update-stylist', function (req, res) {
//         console.log(req.body);
//         var useremail = req.decoded.email;
//         if (req.body.firstname){
//             var newFirstname = req.body.firstname;
//         }
//         if (req.body.lastname){
//             var newLastname = req.body.lastname;
//         }
//         if (req.body.description){
//             var newDescription = req.body.description;
//         }
//         if (req.body.educatorset){
//             var educatorset = req.body.educatorset;
//         }
//         if (req.body.stylistset){
//             var stylistset = req.body.stylistset;
//         }
//         if (req.body.apperenticeset){
//             var apperenticeset = req.body.apperenticeset;
//         }
//         if (req.body.educatorrate){
//             var educatorrate = req.body.educatorrate;
//         }
//         if (req.body.stylistrate){
//             var stylistrate = req.body.stylistrate;
//         }
//         if (req.body.apperenticerate){
//             var apperenticerate = req.body.apperenticerate;
//         }
//         if (req.body.address){
//             var address = req.body.address;
//         }
//         if (req.body.city){
//             var city = req.body.city;
//         }
//         if (req.body.haircutting){
//             var haircutting = req.body.haircutting;
//         }
//         if (req.body.coloring){
//             var coloring = req.body.coloring;
//         }
//         if (req.body.rebonding){
//             var rebonding = req.body.rebonding;
//         }
//         if (req.body.hairrelaxing){
//             var hairrelaxing = req.body.hairrelaxing;
//         }
//         if (req.body.straightening){
//             var straightening = req.body.straightening;
//         }
//         if (req.body.hairstyling){
//             var hairstyling = req.body.hairstyling;
//         }
//         if (req.body.cleansing){
//             var cleansing = req.body.cleansing;
//         }
//         if (req.body.scalpmassage){
//             var scalpmassage = req.body.scalpmassage;
//         }
//         if (req.body.oiltreatments){
//             var oiltreatments = req.body.oiltreatments;
//         }
//         if (req.body.haircareadvising){
//             var haircareadvising = req.body.haircareadvising;
//         }
//         if (req.body.haircurling){
//             var haircurling = req.body.haircurling;
//         }
//         if (req.body.perming){
//             var perming = req.body.perming;
//         }
//
//         User.findOne({email: useremail},function (err, mainUser) {
//             if(err){
//                 throw err;
//             }
//             if(!mainUser){
//                 res.json({success:false, message: 'No user found'});
//             }
//             else{
//                 // if(newLastname){
//                 //     User.findOne({ email: useremail }, function (err, user) {
//                 //         if(!user){
//                 //             console.log('A');
//                 //         }else{
//                 //             user.lastname = newLastname;
//                 //             user.save(function (err) {
//                 //                 if(err){
//                 //                     console.log('error at b');
//                 //                 }
//                 //                 else{
//                 //                     console.log('no error at b');
//                 //                 }
//                 //             });
//                 //         }
//                 //     });
//                 // }
//                 // if(newFirstname){
//                 //     User.findOne({ email: useremail }, function (err, user) {
//                 //         if(!user){
//                 //             console.log('A');
//                 //         }else{
//                 //             user.firstname = newFirstname;
//                 //             user.save(function (err) {
//                 //                 if(err){
//                 //                     console.log('error at b');
//                 //                 }
//                 //                 else{
//                 //                     console.log('no error at b');
//                 //                 }
//                 //             });
//                 //         }
//                 //     });
//                 // }
//                 // if(newDescription){
//                 //     User.findOne({ email: useremail }, function (err, user) {
//                 //
//                 //         // console.log(user.firstname);
//                 //         if(!user){
//                 //             console.log('A');
//                 //         }else{
//                 //             user.profile.description = newDescription;
//                 //             user.save(function (err) {
//                 //                 if(err){
//                 //                     console.log('error at b');
//                 //                 }
//                 //                 else{
//                 //                     console.log('no error at b');
//                 //                 }
//                 //             });
//                 //         }
//                 //     });
//                 // }
//                 //================================
//                 User.findOne({ email: useremail }, function (err, user) {
//                     if(!user){
//                         console.log('No user found once again');
//                     }else{
//                         if(newFirstname){
//                             user.firstname = newFirstname;
//                         }
//                         if(newLastname){
//                             user.lastname = newLastname;
//                         }
//                         if(newDescription){
//                             user.profile.description = newDescription;
//                         }
//                         if(educatorset){
//                             user.profile.jobcategories.educator.isset = educatorset;
//                         }
//                         if(educatorrate){
//                             user.profile.jobcategories.educator.rate = educatorrate;
//                         }
//                         if(stylistset){
//                             user.profile.jobcategories.stylist.isset = stylistset;
//                         }
//                         if(stylistrate){
//                             user.profile.jobcategories.stylist.rate = stylistrate;
//                         }
//                         if(apperenticeset){
//                             user.profile.jobcategories.apperentice.isset = apperenticeset;
//                         }
//                         if(apperenticerate){
//                             user.profile.jobcategories.apperentice.rate = apperenticerate;
//                         }
//                         if(address){
//                             user.profile.address = address;
//                         }
//                         if(city){
//                             user.profile.city = city;
//                         }
//                         if(haircutting){
//                             user.profile.skills.haircutting= haircutting;
//                         }
//                         if(coloring){
//                             user.profile.skills.coloring = coloring;
//                         }
//                         if(rebonding){
//                             user.profile.skills.rebonding = rebonding;
//                         }
//                         if(hairrelaxing){
//                             user.profile.skills.hairrelaxing = hairrelaxing;
//                         }
//                         if(straightening){
//                             user.profile.skills.straightening = straightening;
//                         }
//                         if(hairstyling){
//                             user.profile.skills.hairstyling = hairstyling;
//                         }
//                         if(cleansing){
//                             user.profile.skills.cleansing = cleansing;
//                         }
//                         if(scalpmassage){
//                             user.profile.skills.scalpmassage = scalpmassage;
//                         }
//                         if(oiltreatments){
//                             user.profile.skills.oiltreatments = oiltreatments;
//                         }
//                         if(haircareadvising){
//                             user.profile.skills.haircareadvising = haircareadvising;
//                         }
//                         if(haircurling){
//                             user.profile.skills.haircurling = haircurling;
//                         }
//                         if(perming){
//                             user.profile.skills.perming = perming;
//                         }
//
//                         user.save(function (err) {
//                             if(err){
//                                 console.log('error at b');
//                             }
//                             else{
//                                 console.log('no error at b');
//                             }
//                         });
//                     }
//                 });
//                 res.json({success:true, message: 'Profile Updated'});
//             }
//         });
//         // res.send(req.decoded.email);
//     });
//
//     // user login route
//     //http://localhost:8080/authenticate
//     router.post('/authenticate', function (req, res) {
//         User.findOne({email:req.body.email}).select('firstname lastname email password').exec(function (err, user) {
//             if(err) throw err;
//             if(!user){
//                 res.json({success:false, message:'Could not authenticate user'});
//             }else if(user){
//                 if(req.body.password){
//                     var validPassword = user.comparePassword(req.body.password);
//                 }else{
//                     res.json({success:false, message:'No password provided'});
//                 }
//                 if(!validPassword){
//                     res.json({success:false, methods:'Invalid Password'});
//                 }else {
//                     var token = jwt.sign({
//                             firstname: user.firstname,
//                             lastname: user.lastname,
//                             email : user.email
//                         },
//                         secret,
//                         {
//                             expiresIn: '24h'
//                         });
//                     res.json({success:true, message:'User Authenticated', token:token});
//                 }
//             }
//
//         });
//     });
//     // middleware
//     router.use('/me',function (req,res,next) {
//         var token = req.body.token || req.body.query || req.headers['x-access-token'];
//         if(token){
//             // verify token
//             jwt.verify(token, secret, function (err, decoded) {
//                 if(err) {
//                     res.json({success:false, message:'Token Invalid'});
//                 }else{
//                     req.decoded  =decoded;
//                     next();
//                 }
//             });
//         }
//         else{
//             res.json({success:false, message: 'No token provided'})
//         }
//     });
//
//     router.post('/me', function (req,res) {
//         res.send(req.decoded);
//     });
//     return router;
// };
