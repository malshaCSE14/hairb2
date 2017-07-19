/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('userControllers', ['userServices'])
.controller('regCtrl',function ($http, $location,$timeout, User) {
    var app = this;
    this.regUser = function (regData) {
       // console.log('form submitted');
       // console.log(this.regData);

       // $http.post('/users', this.regData).then(function (data) {
       //     // console.log(data.data.success);
       //     // console.log(data.data.message);
       //
       //     if(data.data.success){
       //         app.notifyMsg = data.data.message;
       //         $timeout(function () {
       //            $location.path('/');
       //         },2000);
       //         $location.path('/')
       //
       //     }else{
       //         app.notifyMsg = data.data.message;
       //     }
       //
       // });
        User.create(app.regData).then(function (data) {
            if(data.data.success){
                app.notifyMsg = data.data.message;
                $timeout(function () {
                    $location.path('/');
                },2000);
                // $location.path('/')

            }else{
                app.notifyMsg = data.data.message;
            }
        });
   };
});
