'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.system_ctrl",['ThCofAngSeed.services'])
	.controller('systemctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','Notify',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,Notify){
			$scope.field = {'0':false,'1':true,'2':true,'3':true,'4':true};

			var url = $scope.baseurl+'admin/system';
			$http.get(url).success(function(data){
				var d = data.metadata[0];
				for(var k in d){
					$scope[k] = d[k];
				}
				Notify.showSimpleToast("配置信息请求成功",1);
			})

			$scope.saveparam = function(p){
				var dat = {};
				dat[p] = $scope[p];
				$http.put(url,dat).success(function(data){
					Notify.showSimpleToast("配置修改成功",1);
				})
			}
		}
	])
})
