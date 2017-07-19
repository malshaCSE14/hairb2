/**
 * Created by malsha_h on 7/18/2017.
 */
angular.module('appRoutes', ['ngRoute'])
.config( function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/',{
            templateUrl : 'app/views/pages/home.html'
        })
        .when('/about',{
            templateUrl : 'app/views/pages/about.html'
        })
        .when('/signin',{
            templateUrl : 'app/views/pages/users/signin.html'

        })
        .when('/signup',{
            templateUrl : 'app/views/pages/users/signup.html',
            controller: 'regCtrl',
            controllerAs: 'register'
        })
        .when('/stylist-profile-edit',{
            templateUrl : 'app/views/pages/users/stylist_profile_edit.html'
        })
        .otherwise({
            redirectTo:'/'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

});
// console.log('routes');