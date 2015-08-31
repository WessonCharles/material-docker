'use strict';

/**
 * Main module of the application.
 */
define(["angular",
  "configs/config"],function(angular){
  window.ThCofAngSeedModule = angular.module('ThCofAngSeed', [
      'ngRoute',
      'ThCofAngSeed.configs'
  ]).controller("baseCtrl",["$scope", "$http","$rootScope", "$location","$timeout", "$filter","$window",
      function($scope,$http,$rootScope,$location,$timeout,$filter,$window){
        $scope.go = 1;
        var time = setInterval(function(){
          console.log(222)
          $scope.go+=1;
          $scope.$apply();
          if($scope.go==10){
            clearInterval(time);
          }
        },2000)

        console.log($("a.md-button").offset())
  }])
  return window.ThCofAngSeedModule;
    // .config(function ($routeProvider) {
    //   $routeProvider
    //     .when('/', {
    //       templateUrl: 'views/main.html',
    //       controller: 'MainCtrl',
    //       controllerAs: 'main'
    //     })
    //     .otherwise({
    //       redirectTo: '/'
    //     });
    // });
});  
