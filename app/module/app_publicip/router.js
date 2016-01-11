'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/publicip', {
            templateUrl: 'module/app_publicip/publicips.html',
            controller: 'publicipctrl'
        })
        route.when('/publicip/create-publicips',{
        	templateUrl:'module/app_publicip/create-publicips.html',
        	controller:'createipsctrl'
        })
    }]);
});
