/**
 * Created by malsha_h on 7/18/2017.
 */
var app = angular.module('appRoutes', ['ngRoute'])
.config( function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/',{
            templateUrl : 'app/views/pages/home.html'
        })
        .when('/about',{
            templateUrl : 'app/views/pages/about.html'
        })
        .when('/signin',{
            templateUrl : 'app/views/pages/users/signin.html',
            authenticated : false

        })
        .when('/signup',{
            templateUrl : 'app/views/pages/users/signup.html',
            controller: 'regCtrl',
            controllerAs: 'register',
            authenticated : false
        })
        .when('/stylist-profile-edit',{
            templateUrl : 'app/views/pages/users/stylist_profile_edit.html',
            controller: 'updateCtrl',
            controllerAs: 'update',
            authenticated : true
        })
        .when('/stylist-profile',{
            templateUrl : 'app/views/pages/users/stylist_profile.html',
            authenticated : true
        })
        .otherwise({
            redirectTo:'/'
        });


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });


});
app.run(['$rootScope', 'Auth', '$location',  function ($rootScope, Auth, $location) {
    $rootScope.$on('$routeChangeStart', function (event, next ,current) {
        if(next.$$route.authenticated === true){
            if(!Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/');
            }
        }else if(next.$$route.authenticated === false){
            if(Auth.isLoggedIn()){
                event.preventDefault();
                $location.path('/stylist-profile');
            }
            console.log('should not be authenticated');
        }
    })
}]);
