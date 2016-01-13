'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/image', {
            templateUrl: 'module/app_image/images.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller: 'imagesctrl'
        })
        route.when('/image/create-image',{
            templateUrl:'module/app_image/create-image.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'createimagectrl'
        })
        route.when('/image/:id',{
            templateUrl:'module/app_image/image-detail.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'imagedetailctrl'
        })
        route.when('/log',{
            templateUrl:'module/app_image/logs.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'logsctrl'
        })
        route.when('/log/:id',{
            templateUrl:'module/app_image/logs-detail.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'logsdetailctrl'
        })
        // route.when('/projects/:id',{
        //     templateUrl:'module/app_project/projects-detail.html',
        //     controller:'prodetailctrl'
        // })
        
    }]);
});