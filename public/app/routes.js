/**
 * Created by malsha_h on 7/18/2017.
 */
var app = angular.module('appRoutes', ['ngRoute'])
.config( function ($routeProvider,$locationProvider) {
    $routeProvider
        .when('/',{
            templateUrl : 'app/views/pages/home.html'
        })
        .when('/book-stylist/:id', {
            templateUrl : 'app/views/pages/users/salon/book_stylist.html',
            controller : 'bookingCtrl',
            controllerAs : 'booking'
        })
        .when('/about',{
            templateUrl : 'app/views/pages/about.html'
        })
        .when('/search',{
            templateUrl : 'app/views/pages/users/salon/search.html',
            controller: 'searchCtrl',
            controllerAs: 'search'
        })
        .when('/welcome', {
            templateUrl : 'app/views/pages/users/welcome_signin.html',
            controller: 'emailCtrl',
            controllerAs: 'email'
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
        .when('/edit-user-account',{
            templateUrl : 'app/views/pages/users/edit_account.html',
            controller: 'updateUserCtrl',
            controllerAs: 'updateUser',
            // authenticated : true
        })
        .when('/create-salon-profile', {
            templateUrl : 'app/views/pages/users/salon/create_profile.html',
            controller: 'createSalonCtrl',
            controllerAs: 'createSalon',
            // authenticated : true

        })
        .when('/edit-salon-profile', {
            templateUrl : 'app/views/pages/users/salon/edit_profile.html',
            controller: 'updateSalonCtrl',
            controllerAs: 'updateSalon',
            // authenticated : true
        })
        .when('/create-stylist-profile', {
            templateUrl : 'app/views/pages/users/stylist/create_profile.html',
            controller: 'createStylistCtrl',
            controllerAs: 'createStylist',
            authenticated : true
        })
        .when('/stylist-profile-edit',{
            templateUrl : 'app/views/pages/users/stylist/edit_profile.html',
            controller: 'updateCtrl',
            controllerAs: 'update',
            authenticated : true
        })
        .when('/stylist-profile',{
            templateUrl : 'app/views/pages/users/stylist/profile.html',

            authenticated : true
        })
        .when('/stylist-public-profile/:id', {
            templateUrl : 'app/views/pages/users/stylist/public_profile.html',
            controller: 'stylistProfileCtrl',
            controllerAs: 'stylistProfile'
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
