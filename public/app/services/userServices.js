/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('userServices' , [])
.factory('User', function ($http) {
    userFactory = {};

    userFactory.create = function (regData) {
      return $http.post('/users', regData);
    };
    return userFactory;
});