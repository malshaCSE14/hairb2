/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('mainController',['authServices'])
    .controller('mainCtrl',function (Auth, $timeout, $location) {

        var app = this;
        this.doLogin = function (loginData) {

            Auth.login(app.loginData).then(function (data) {
                if(data.data.success){
                    app.notifyMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/stylist-profile-edit');
                    },2000);
                    // $location.path('/')

                }else{
                    app.notifyMsg = data.data.message;
                }
            });
        };
    });




