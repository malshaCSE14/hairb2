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
                    $location.path('/welcome');
                },500);
                // $location.path('/')

            }else{
                app.notifyMsg = data.data.message;
            }
        });
   };
})
    //search stylist
    .controller('searchCtrl', function ($http, $location,$timeout, User) {
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
    //update user account
    .controller('updateUserCtrl',function ($http, $location,$timeout, User) {
        var app = this;
        this.updateUserAccount = function (updateData) {
            User.updateAccount(app.updateData).then(function (data) {
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
// getStylistProfile
    .controller('stylistProfile', function ($http, $location,$timeout, User) {
        var app = this;
        this.getStylistProfile(app.id).then(function (data) {
            if(data.data.success){
                $timeout(function () {
                    $location.path('/stylist-profile');
                },500);
            }else{
            }
        })
    })

;