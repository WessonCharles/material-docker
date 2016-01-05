'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/volumes', {
            templateUrl: 'module/app_columns/column-list.html',
            controller: 'columnctrl'
        })
        route.when('/volumes/create-column',{
            templateUrl:'module/app_columns/create-column.html',
            controller:'createcolumnsctrl'
        })
        route.when('/volumes/:name',{
            templateUrl:'module/app_columns/column-detail.html',
            controller:'columnsdetailctrl'
        })
        
    }]);
});