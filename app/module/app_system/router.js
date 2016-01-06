'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/system', {
            templateUrl: 'module/app_system/system-detail.html',
            controller: 'systemctrl'
        })
        route.when('/system/:id',{
            templateUrl:'module/app_system/system-detail.html',
            controller:'systemdetailctrl'
        })
        
    }]);
});
