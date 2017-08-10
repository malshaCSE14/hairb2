

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
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

mongoose.Promise = global.Promise;

module.exports = {
    loginUser : async function (req, res) {
        let newUser = User();
        var user = await User.findOne({email:req.body.email}).exec();
        // .select('firstname lastname email password')
        if(!user){
            res.json({success:false, message:'Could not authenticate user'});
        }else if(user){

            if(req.body.password){
                var validPassword = passwordHash.verify(req.body.password, user.password);
            }else{
                res.json({success:false, message:'No password provided'});
            }
            if(!validPassword){
                res.json({success:false, message:'Invalid Password'});
            }else {
                var token = jwt.sign({
                        _id : user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email : user.email
                    },
                    secret,
                    {
                        expiresIn: '24h'
                    });
                var profiletype='Null';
                if(user.profile.jobcategories.stylist.isset || user.profile.jobcategories.educator.isset || user.profile.jobcategories.apperentice.isset ){
                    profiletype = 'Stylist';
                    // console.log("Has stylist profile. Then load it");
                }
                else if(user.salonProfiles.length!==0) {
                    profiletype = 'Salon';
                    // console.log("Has salon profile. Then load 0th"); //working
                }
                else{
                    profiletype = 'Null';
                    // console.log("No profile. load welcome");
                }
                res.status(200).json({success:true, message:'User Authenticated', profiletype:profiletype, user:user, token:token, firstname: user.firstname, lastname:user.lastname});
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
                res.json({success:false, message:'Invalid user registration!!!'});
            } else {
                res.json({success:true, message:'User Registered!!!'});

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
        // router.use('/api-stylist-profile/:id',function (req,res,next) {
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
        router.get('/api-stylist-profile/:id', function (req, res) {

            User.findOne({_id:req.params.id}, function (err, user) {
                if(err){
                    throw err;
                }
                else if(user){
                    res.json({success:true, message:'User found', result:user});
                    // console.log(user.profile.jobcategories.educator.isset);
                }
                else{
                    res.json({success:false, message:'No user found'});
                }
            })
        });
// '/api-booking-page/'+id
        router.get('/api-booking-page/:id', function (req, res) {
            User.findOne({_id:req.params.id}, function (err, user) {
                if(err){
                    throw err;
                }
                else if(user){
                    res.json({success:true, message:'User found', firstname:user.firstname, lastname:user.lastname});
                    // console.log(user);
                }
                else{
                    res.json({success:false, message:'No user found'});
                }
            })
        });
        //search stylist
        router.get('/api-search-stylist', function (req,res) {
            var obj = {
                'profile': { $ne: null }
            };
            for (var item in req.query) {
                if (item === "educatorset" && req.query.educatorset===true)
                    obj['profile.jobcategories.educator.isset'] = req.query.educatorset;
                if (item === "stylistset" && req.query.stylistset===true)
                    obj['profile.jobcategories.stylist.isset'] = req.query.stylistset;
                if (item === "apprenticeset" && req.query.apprenticeset===true)
                    obj['profile.jobcategories.apperentice.isset'] = req.query.apprenticeset;
                if (item === "city")
                    obj['profile.city'] = req.query.city;
                if (item === "haircutting")
                    obj['profile.skills.haircutting']=req.body.haircutting;
                if (item === "coloring")
                    obj['profile.skills.coloring']=req.body.coloring;
                if (item === "rebonding")
                    obj['profile.skills.rebonding']=req.body.rebonding;
                if (item === "hairrelaxing")
                    obj['profile.skills.hairrelaxing']=req.body.hairrelaxing;
                if (item === "straightening")
                    obj['profile.skills.straightening']=req.body.straightening;
                if (item === "hairstyling")
                    obj['profile.skills.hairstyling']=req.body.hairstyling;
                if (item === "cleansing")
                    obj['profile.skills.cleansing']=req.body.cleansing;
                if (item === "scalpmassage")
                    obj['profile.skills.scalpmassage']=req.body.scalpmassage;
                if (item === "oiltreatments")
                    obj['profile.skills.oiltreatments']=req.body.oiltreatments;
                if (item === "haircareadvising")
                    obj['profile.skills.haircareadvising']=req.body.haircareadvising;
                if (item === "haircurling")
                    obj['profile.skills.haircurling']=req.body.haircurling;
                if (item === "perming")
                    obj['profile.skills.perming']=req.body.perming;
            }

           // console.log(obj);
            User.find(obj, function (err, user) {
                if(err){
                    throw err;
                }
                else if(user){
                    // console.log(user);
                    res.json({success:true, message: "Stylists found", result: user});
                }
                else{
                    res.json({success: false, message: "No stylist found"})
                }

            })
        });
        // '/api-booking-page/'+id

        router.post('/api-search', function (req,res) {
            // console.log(req.body);
            var obj = {
                'profile': { $ne: null }
            };
            for (var item in req.body) {
                if (item === "educatorset" && req.body.educatorset===true)
                    obj['profile.jobcategories.educator.isset'] = req.body.educatorset;
                if (item === "stylistset" && req.body.stylistset===true)
                    obj['profile.jobcategories.stylist.isset'] = req.body.stylistset;
                if (item === "apprenticeset" && req.body.apprenticeset===true)
                    obj['profile.jobcategories.apperentice.isset'] = req.body.apprenticeset;
                if (item === "city" && req.body.city!=='')
                    obj['profile.city'] = req.body.city;
                if (item === "haircutting" && req.body.haircutting===true)
                    obj['profile.skills.haircutting']=req.body.haircutting;
                if (item === "coloring" && req.body.coloring===true)
                    obj['profile.skills.coloring']=req.body.coloring;
                if (item === "rebonding" && req.body.rebodning===true)
                    obj['profile.skills.rebonding']=req.body.rebodning;
                if (item === "hairrelaxing" && req.body.hairrelaxing===true)
                    obj['profile.skills.hairrelaxing']=req.body.hairrelaxing;
                if (item === "straightening" && req.body.straightening===true)
                    obj['profile.skills.straightening']=req.body.straightening;
                if (item === "hairstyling" && req.body.hairstyling===true)
                    obj['profile.skills.hairstyling']=req.body.hairstyling;
                if (item === "cleansing" && req.body.cleansing===true)
                    obj['profile.skills.cleansing']=req.body.cleansing;
                if (item === "scalpmassage" && req.body.scalpmassage===true)
                    obj['profile.skills.scalpmassage']=req.body.scalpmassage;
                if (item === "oiltreatments" && req.body.oiltreatments===true)
                    obj['profile.skills.oiltreatments']=req.body.oiltreatments;
                if (item === "haircareadvising" && req.body.haircareadvising===true)
                    obj['profile.skills.haircareadvising']=req.body.haircareadvising;
                if (item === "haircurling" && req.body.haircurling===true)
                    obj['profile.skills.haircurling']=req.body.haircurling;
                if (item === "perming" && req.body.perming===true)
                    obj['profile.skills.perming']=req.body.perming;
            }

                User.find(obj, function (err, user) {
                if(err){
                    throw err;
                }
                else if(user){
                    // console.log(user.length);
                    res.json({success:true, message: "Stylists found", result: user});
                }
                else{
                    res.json({success: false, message: "No stylist found"})
                }

                })
        });
        //==create user account
        router.post('/users', this.postUser);

        //create stylist profile
        router.use('/api-create-stylist-profile',function (req,res,next) {
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
        router.post('/api-create-stylist-profile', function (req, res) {
            // console.log(req.body);
            var useremail = req.decoded.email;
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
                            user.profile = {};
                            if(newDescription) user.profile.description = newDescription;
                            if(educatorset) user.profile.jobcategories.educator.isset = educatorset;
                            if(educatorrate) user.profile.jobcategories.educator.rate = educatorrate;
                            if(stylistset) user.profile.jobcategories.stylist.isset = stylistset;
                            if(stylistrate) user.profile.jobcategories.stylist.rate = stylistrate;
                            if(apperenticeset) user.profile.jobcategories.apperentice.isset = apperenticeset;
                            if(apperenticerate) user.profile.jobcategories.apperentice.rate = apperenticerate;
                            if(address) user.profile.address = address;
                            if(city) user.profile.city = city;
                            if(haircutting) user.profile.skills.haircutting= haircutting;
                            if(coloring) user.profile.skills.coloring = coloring;
                            if(rebonding) user.profile.skills.rebonding = rebonding;
                            if(hairrelaxing) user.profile.skills.hairrelaxing = hairrelaxing;
                            if(straightening) user.profile.skills.straightening = straightening;
                            if(hairstyling) user.profile.skills.hairstyling = hairstyling;
                            if(cleansing) user.profile.skills.cleansing = cleansing;
                            if(scalpmassage) user.profile.skills.scalpmassage = scalpmassage;
                            if(oiltreatments) user.profile.skills.oiltreatments = oiltreatments;
                            if(haircareadvising) user.profile.skills.haircareadvising = haircareadvising;
                            if(haircurling) user.profile.skills.haircurling = haircurling;
                            if(perming) user.profile.skills.perming = perming;

                            user.save(function (err) {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log(user._id);

                                    res.json({success:true, message: 'Profile Created' , profile_id:user._id});
                                }
                            });
                        }
                    });
                    // res.json({success:true, message: 'Profile Created'});
                }
            });
            // res.send(req.decoded.email);
        });

        //create salon profile
        router.use('/api-create-salon-profile',function (req,res,next) {
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
        router.post('/api-create-salon-profile', function (req, res) {
            console.log('arrived in api');
            console.log(req.body);
            var useremail = req.decoded.email;
            if (req.body.name){
                var name = req.body.name;
            }
            if (req.body.description){
                var newDescription = req.body.description;
            }
            if (req.body.address){
                var address = req.body.address;
            }
            if (req.body.city){
                var city = req.body.city;
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
                            var salonProfile = {name : "", description: "", address:"", city:""};
                            if(name){
                                salonProfile.name = name;
                            }
                            if(newDescription){
                                salonProfile.description = newDescription;
                            }
                            if(address){
                                salonProfile.address = address;
                            }
                            if(city){
                                salonProfile.city = city;
                            }
                            user.salonProfiles.push(salonProfile);

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
                    res.json({success:true, message: 'Profile Created'});
                }
            });
        });

        //==edit stylist profile
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
                            if(newFirstname) user.firstname = newFirstname;
                            if(newLastname) user.lastname = newLastname;
                            if(newDescription) user.profile.description = newDescription;
                            if(educatorset) user.profile.jobcategories.educator.isset = educatorset;
                            if(educatorrate) user.profile.jobcategories.educator.rate = educatorrate;
                            if(stylistset) user.profile.jobcategories.stylist.isset = stylistset;
                            if(stylistrate) user.profile.jobcategories.stylist.rate = stylistrate;
                            if(apperenticeset) user.profile.jobcategories.apperentice.isset = apperenticeset;
                            if(apperenticerate) user.profile.jobcategories.apperentice.rate = apperenticerate;
                            if(address) user.profile.address = address;
                            if(city)  user.profile.city = city;
                            if(haircutting) user.profile.skills.haircutting= haircutting;
                            if(coloring) user.profile.skills.coloring = coloring;
                            if(rebonding) user.profile.skills.rebonding = rebonding;
                            if(hairrelaxing) user.profile.skills.hairrelaxing = hairrelaxing;
                            if(straightening) user.profile.skills.straightening = straightening;
                            if(hairstyling)  user.profile.skills.hairstyling = hairstyling;
                            if(cleansing)  user.profile.skills.cleansing = cleansing;
                            if(scalpmassage) user.profile.skills.scalpmassage = scalpmassage;
                            if(oiltreatments) user.profile.skills.oiltreatments = oiltreatments;
                            if(haircareadvising)  user.profile.skills.haircareadvising = haircareadvising;
                            if(haircurling) user.profile.skills.haircurling = haircurling;
                            if(perming) user.profile.skills.perming = perming;
                            user.save(function (err) {
                                if(err){
                                    console.log('error at b');
                                }
                                else{
                                    console.log('no error at b');
                                    res.json({success:true, message: 'Profile Updated', profile_id:user._id});
                                }
                            });
                        }
                    });
                    // res.json({success:true, message: 'Profile Updated'});
                }
            });
        });

        //edit salon profile
        router.put('/update-salon');

        //edit user account
        router.put('/update-user');


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
            var s = req.decoded;
            // console.log(s._id);
            res.send(req.decoded);
        });
        return router;
    }
} ;
