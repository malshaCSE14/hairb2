/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('mainController',['authServices'])
    .controller('mainCtrl',function (Auth, $timeout, $location, $rootScope) {
         var app = this;

         app.loadme  =false;
         $rootScope.$on('$routeChangeStart', function () {
             if(Auth.isLoggedIn()){
                 console.log('User logged in');
                 app.isLoggedIn = true;
                 Auth.getUser().then(function (data) {
                     app.firstname = data.data.firstname;
                     app.lastname = data.data.lastname;
                     app.address = data.data.address;
                     app.loadme = true;
                     // console.log(data.data.firstname);
                 });
                 // Auth.getUserToUpdate().then(function (data) {
                 //     app.email = data.data.email;
                 //     app.loadme = true;
                 // });
             }else{
                 console.log('not logged in');
                 app.isLoggedIn = false;
                 app.firstname = '';
                 app.loadme = true;
             }

         });



        this.doLogin = function (loginData) {

            Auth.login(app.loginData).then(function (data) {
                if(data.data.success){
                    app.notifyMsg = data.data.message;
                    $timeout(function () {
                        $location.path('/stylist-profile');
                        app.loginData ={};
                    },500);
                    // $location.path('/')

                }else{
                    app.notifyMsg = data.data.message;
                }
            });
        };
        this.logout =function () {
            Auth.logout();
            $timeout(function () {
                $location.path('/');
            },500);

        }
    });




