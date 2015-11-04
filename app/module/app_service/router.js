'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/service', {
            templateUrl: 'module/app_service/service-list.html',
            controller: 'servicectrl'
        })
        route.when('/service/:id',{
            templateUrl:'module/app_service/service-detail.html',
            controller:'servicedetailctrl'
        })
        
    }]);
});