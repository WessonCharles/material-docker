'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/applications', {
            templateUrl: 'module/app_application/application-list.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller: 'podctrl'
        })
        route.when('/applications/create-app',{
            templateUrl:'module/app_application/create-app.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'createappctrl'
        })
        route.when('/applications/:id',{
            templateUrl:'module/app_application/application-detail.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'prodetailctrl'
        })
        route.when('/applications/:id/create-cluster',{
            templateUrl:'module/app_application/create-cluter.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'createcluterctrl'
        })
        route.when('/applications/:id/create-loadbalancer',{
            templateUrl:'module/app_application/create-loadbalancer.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'createlblctrl'
        })
        route.when('/applications/:id/instance',{
            templateUrl:'module/app_application/application-service-detail.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'instancectrl'
        })
        
    }]);
});