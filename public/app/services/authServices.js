/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('authServices' , [])
    .factory('Auth', function ($http) {
        var authFactory = {};

        authFactory.login = function (loginData) {
            return $http.post('/authenticate', loginData);
        };
        return authFactory;
    });