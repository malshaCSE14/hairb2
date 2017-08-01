/**
 * Created by malsha_h on 7/19/2017.
 */
angular.module('userServices' , [])
.factory('User', function ($http) {
    var userFactory = {};
    //search stylist
    userFactory.search = function (searchData) {
        return $http.post('/api-search', searchData).then(function (data) {
            return data;
        });
    };
    //==cretae user account
    userFactory.create = function (regData) {
        return $http.post('/users', regData);
    };

    //update-user account
    userFactory.updateAccount = function (updateData) {
        return $http.put('/update-user',updateData);
    };
    //get stylist profile
    userFactory.getStylistProfile = function (id) {
        return $http.get('/api-stylist-profile'+ id);
    };

    //create-stylist-profile
    userFactory.createStylistProfile = function (createData) {
        return $http.post('/api-create-stylist-profile', createData);
    };

    //==update stylist profile
    userFactory.updateOne = function (updateData) {
        return $http.put('/update-stylist', updateData);
    };

    //create salon profile
    userFactory.createSalonProfile = function (createData) {
        return $http.post('/api-create-salon-profile', createData);
    };

    //update salon profile
    userFactory.updateSalon = function (updateData) {
        return $http.put('/update-salon', updateData);
    };

    // User.confirmPassword();
    userFactory.confirmPassword = function (password) {

    };
    return userFactory;
});