'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/users', {
            templateUrl: 'module/app_users/users.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller: 'usersctrl'
        })
        route.when('/users/create-user',{
            templateUrl:'module/app_users/create-user.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'createuserctrl'
        })
        route.when('/users/create-tenant',{
            templateUrl:'module/app_users/create-tenant.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'createtenantctrl'
        })
        
    }]);
});
