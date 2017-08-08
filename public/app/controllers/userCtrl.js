/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('userControllers', ['userServices'])
    //create user account
.controller('regCtrl',function ($http, $location,$timeout, User) {
    var app = this;
    this.regUser = function (regData) {
        User.create(app.regData).then(function (data) {
            if(data.data.success){
                app.notifyMsg = data.data.message;
                $timeout(function () {
                    $location.path('/signin');
                },500);
                // $location.path('/')

            }else{
                app.notifyMsg = data.data.message;
            }
        });
   };
})
    //search stylist
    .controller('searchCtrl', function ($http, $location,$timeout, User, $routeParams) {
        var app = this;
        this.searchStylist = function (searchData) {
            User.search(app.searchData).then(function (data) {
                if(data.data.success){
                    // app.notifyMsg = data.data.message;
                    app.result = data.data.result;
                    app.resultlength = data.data.result.length;
                    $timeout(function () {
                        $location.path('/search');
                    },500);
                    // $location.path('/')
                }else{
                    app.notifyMsg = data.data.message;
                }
            });
        };
    })

// bookingCtrl
    .controller('bookingCtrl', function ($http, $location,$timeout, User, $routeParams) {
        //get stylist profile
        var app = this;
        User.bookStylist($routeParams.id).then(function (data) {
            if(data.data.success){
                app.firstname = data.data.firstname;
                app.lastname = data.data.lastname;
                console.log(app.firstname);
            }else{
            }
        })

    })
// stylistProfileCtrl
    .controller('stylistProfileCtrl', function ($http, $location,$timeout, User, $routeParams) {
        //get stylist profile
        var app = this;
        User.getStylistProfile($routeParams.id).then(function (data) {
            if(data.data.success){
                app.result = data.data.result;
                if (data.data.result.profile.skills.haircutting) app.haircutting = ""; else app.haircutting = "hidden";
                if (data.data.result.profile.skills.coloring) app.coloring = ""; else  app.coloring = "hidden";
                if (data.data.result.profile.skills.rebonding) app.rebonding = "";  else app.rebonding = "hidden";
                if (data.data.result.profile.skills.hairrelaxing) app.hairrelaxing = "";  else app.hairrelaxing = "hidden";
                if (data.data.result.profile.skills.straightening) app.straightening = "";  else app.straightening = "hidden";
                if (data.data.result.profile.skills.hairstyling) app.hairstyling = "";  else app.hairstyling = "hidden";
                if (data.data.result.profile.skills.cleansing) app.cleansing = "";  else app.cleansing = "hidden";
                if (data.data.result.profile.skills.scalpmassage) app.scalpmassage = "";  else app.scalpmassage = "hidden";
                if (data.data.result.profile.skills.oiltreatments) app.oiltreatments = "";  else app.oiltreatments = "hidden";
                if (data.data.result.profile.skills.haircareadvising) app.haircareadvising = "";  else app.haircareadvising = "hidden";
                if (data.data.result.profile.skills.haircurling) app.haircurling = "";  else app.haircurling = "hidden";
                if (data.data.result.profile.skills.perming) app.perming = "";  else app.perming = "hidden";

            }else{
            }
        })

    })

    //update user account
    .controller('updateUserCtrl',function ($http, $location,$timeout, User) {
        var app = this;
        this.updateUserAccount = function (updateData) {
            User.updateAccount(app.updateData).then(function (data) {
                if(data.data.success){
                    // app.notifyMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/');
                    },500);
                }else{
                    // app.notifyMsg = data.data.message;
                }
            })
        }
    })
    //create salon profile
    .controller('createSalonCtrl',function ($http, $location,$timeout, User) {
        var app = this;
        this.newSalonProfile = function (createData) {
            User.createSalonProfile(app.createData).then(function (data) {
                if(data.data.success){
                    // app.notifyMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/salon-profile');
                    },500);
                }else{
                    // app.notifyMsg = data.data.message;
                }
            })
        }
    })
    //update salon profile
    .controller('updateSalonCtrl',function ($http, $location,$timeout, User) {
        var app = this;
        this.updateSalonProfile = function (updateData) {
            User.updateSalon(app.updateData).then(function (data) {
                if(data.data.success){
                    // app.notifyMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/salon-profile');
                    },500);
                }else{
                    // app.notifyMsg = data.data.message;
                }
            })
        }
    })
    //create stylist profile
    .controller('createStylistCtrl',function ($http, $location,$timeout, User) {
        var app = this;
        this.newStylistProfile = function (createData) {
            User.createStylistProfile(app.createData).then(function (data) {
                if(data.data.success){
                    // app.notifyMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/stylist-profile');
                    },500);
                }else{
                    // app.notifyMsg = data.data.message;
                }
            })
        }
    })
    //update stylist profile
    .controller('updateCtrl',function ($http, $location,$timeout, User) {
        var app = this;
        this.updateProfile = function (updateData) {
            User.updateOne(app.updateData).then(function (data) {
                if(data.data.success){
                    // app.notifyMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/stylist-profile');
                    },500);
                }else{
                    // app.notifyMsg = data.data.message;
                }
            })
        }
    })


;