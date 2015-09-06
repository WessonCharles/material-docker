'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/image', {
            templateUrl: 'module/app_image/images.html',
            controller: 'imagesctrl'
        })
        // route.when('/projects/:id',{
        //     templateUrl:'module/app_project/projects-detail.html',
        //     controller:'prodetailctrl'
        // })
        
    }]);
});