/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('authServices' , [])
    .factory('Auth', function ($http, AuthToken) {
        var authFactory = {};
        //Auth.create(regData)
        authFactory.login = function (loginData) {
            return $http.post('/authenticate', loginData).then(function (data) {
                AuthToken.setToken(data.data.token);
                return data;
            });
        };
        // Auth.isLoggedIn();
        authFactory.isLoggedIn = function () {
            if(AuthToken.getToken()){
                return true;
            }else{
                return false;
            }
        };
        // Auth.getUser();
        authFactory.getUser = function () {
            if(AuthToken.getToken()){
                return $http.post('/me');
            }else{
                $q.reject({message: 'User has no token'});
            }
        };
        authFactory.logout = function () {
            AuthToken.setToken();
        };
        
        return authFactory;
    })
    .factory('AuthToken', function ($window) {
        var authTokenFatoy = {};
        // AuthToken.setToken(token);
        authTokenFatoy.setToken = function (token) {
            if(token){
                $window.localStorage.setItem('token', token);
            }else{
                $window.localStorage.removeItem('token');
            }

        };
        //AuthToken.getToken();
         authTokenFatoy.getToken = function () {
          return $window.localStorage.getItem('token');
        };
        return authTokenFatoy;
    })
    .factory('AuthInterceptors', function (AuthToken) {
        var authInterceptorsFactory = {};
        authInterceptorsFactory.request = function (config) {
            var token = AuthToken.getToken();
            if (token){
                config.headers['x-access-token'] = token;
            }
            return config;
        };
        return authInterceptorsFactory;
    });
