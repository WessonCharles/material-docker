'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.images_ctrl",[])
	.controller('imagesctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet){
			/**
	         * buttondown example
	         */
	        var originatorEv;
	        $scope.ctrl = {};
	        $scope.ctrl.openMenu = function($mdOpenMenu, ev) {
	          originatorEv = ev;
	          $mdOpenMenu(ev);
	        };
	        $scope.ctrl.notificationsEnabled = true;
	        $scope.ctrl.toggleNotifications = function() {
	          $scope.ctrl.notificationsEnabled = !$scope.ctrl.notificationsEnabled;
	        };
	        $scope.ctrl.redial = function() {
	          $mdDialog.show(
	            $mdDialog.alert()
	              .targetEvent(originatorEv)
	              .clickOutsideToClose(true)
	              .parent('body')
	              .title('Suddenly, a redial')
	              .content('You just called a friend; who told you the most amazing story. Have a cookie!')
	              .ok('That was easy')
	          );
	          originatorEv = null;
	        };
	        $scope.ctrl.checkVoicemail = function() {
	          // This never happens.
	        };


	        $scope.items = [
			    { name: 'Mysql', icon: 'database' },
			    { name: 'CentOS6', icon: 'linux' },
			    { name: 'Wordpress', icon: 'wordpress' },
			    { name: 'Facebook', icon: 'facebook' },
			    { name: 'Twitter', icon: 'twitter' },
			  ];
			$scope.listItemClick = function($event) {
			    $scope.alert = '';
			    $mdBottomSheet.show({
			      templateUrl: 'module/app_image/image-detail.html',
			      controller: 'imagedetailctrl',
			      targetEvent: $event,
			      parent:"#images"
			    }).then(function(clickedItem) {
			      // $scope.alert = clickedItem.name + ' clicked!';
			    });
			};   
		}
	])
	.controller('imagedetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet){
		}
	])
})