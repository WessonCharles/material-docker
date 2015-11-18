'use strict';

define(['angular','app'], function(angular,app) {
    return app.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        route.when('/columns', {
            templateUrl: 'module/app_columns/column-list.html',
            controller: 'columnctrl'
        })
        route.when('/columns/create-column',{
            templateUrl:'module/app_columns/create-column.html',
            controller:'createcolumnsctrl'
        })
        route.when('/columns/:name',{
            templateUrl:'module/app_columns/column-detail.html',
            controller:'columnsdetailctrl'
        })
        
    }]);
});