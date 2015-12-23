'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/applications', {
            templateUrl: 'module/app_application/application-list.html',
            controller: 'podctrl'
        })
        route.when('/applications/create-app',{
            templateUrl:'module/app_application/create-app.html',
            controller:'createappctrl'
        })
        route.when('/applications/:id',{
            templateUrl:'module/app_application/application-detail.html',
            controller:'prodetailctrl'
        })
        route.when('/applications/:id/create-cluter',{
            templateUrl:'module/app_application/create-cluter.html',
            controller:'createcluterctrl'
        })
        route.when('/applications/:id/:name',{
            templateUrl:'module/app_application/application-service-detail.html',
            controller:'servicedetailctrl'
        })
        
    }]);
});