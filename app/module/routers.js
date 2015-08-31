'use strict';

define(['angular'], function(angular) {
    return angular.config(['$routeProvider', '$locationProvider', function(route, $locationProvider) {
    	$locationProvider.html5Mode(true);
        // route.when('/projects', {
        //     templateUrl: 'module/app_project/projects-list.html',
        //     controller: 'projectctrl'
        // })
        // route.when('/projects/:id',{
        //     templateUrl:'module/app_project/projects-detail.html',
        //     controller:'prodetailctrl'
        // })
        
    }]);
});