/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('userControllers', ['userServices'])
.controller('regCtrl',function ($http, $location,$timeout, User) {
    var app = this;
    this.regUser = function (regData) {
        User.create(app.regData).then(function (data) {
            if(data.data.success){
                app.notifyMsg = data.data.message;
                $timeout(function () {
                    $location.path('/');
                },500);
                // $location.path('/')

            }else{
                app.notifyMsg = data.data.message;
            }
        });
   };




})
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