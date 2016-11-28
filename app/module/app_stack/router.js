'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/stack', {
            templateUrl: 'module/app_stack/stack-list.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller: 'stackctrl'
        })
        route.when('/stack/create-stack',{
            templateUrl:'module/app_stack/create-stack.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'createstackctrl'
        })
        route.when('/stack/:id',{
            templateUrl:'module/app_stack/stack-detail.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller:'stackdetailctrl'
        })
    }]);
});
