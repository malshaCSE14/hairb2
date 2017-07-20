/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('userServices' , [])
.factory('User', function ($http) {
    var userFactory = {};

    userFactory.create = function (regData) {
        return $http.post('/users', regData);
    };
    userFactory.updateOne = function (updateData) {
        return $http.put('/update-stylist', updateData);
    };
    // User.confirmPassword();
    userFactory.confirmPassword = function (password) {

    };
    return userFactory;
});