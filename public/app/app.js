/**
 * Created by malsha_h on 7/18/2017.
 */
angular.module('userApp', ['appRoutes' , 'userControllers', 'userServices','mainController', 'authServices'])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
//searchStylistController