'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/login', {
            templateUrl: 'module/login.html',
            controller: 'loginctrl'
        })
        route.when('/',{
            templateUrl:'module/index.html',
            controller:'indexctrl'
        })
        // route.when('/projects/:id',{
        //     templateUrl:'module/app_project/projects-detail.html',
        //     controller:'prodetailctrl'
        // })
        
    }]);
});