'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/event', {
            templateUrl: 'module/app_events/events-list.html?v='+parseInt(new Date().format("yyyyMMdd")),
            controller: 'eventctrl'
        })
    }]);
});
