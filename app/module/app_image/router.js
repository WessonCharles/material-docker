'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/image', {
            templateUrl: 'module/app_image/images.html',
            controller: 'imagesctrl'
        })
        route.when('/image/create-image',{
            templateUrl:'module/app_image/create-image.html',
            controller:'createimagectrl'
        })
        route.when('/log',{
            templateUrl:'module/app_image/logs.html',
            controller:'logsctrl'
        })
        route.when('/log/:id',{
            templateUrl:'module/app_image/logs-detail.html',
            controller:'logsdetailctrl'
        })
        // route.when('/projects/:id',{
        //     templateUrl:'module/app_project/projects-detail.html',
        //     controller:'prodetailctrl'
        // })
        
    }]);
});