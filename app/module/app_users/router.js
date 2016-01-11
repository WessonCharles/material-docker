'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/users', {
            templateUrl: 'module/app_users/users.html',
            controller: 'usersctrl'
        })
        route.when('/users/create-user',{
            templateUrl:'module/app_users/create-user.html',
            controller:'createuserctrl'
        })
        route.when('/users/create-tenant',{
            templateUrl:'module/app_users/create-tenant.html',
            controller:'createtenantctrl'
        })
        
    }]);
});
