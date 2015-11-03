'use strict';

define(['angular','modal','markdown'],function(angular,modal,markdown){
	return angular.module("ThCofAngSeed.images_ctrl",['ThCofAngSeed.services.formDataObject'])
	.controller('imagesctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','restful','Notify','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,restful,Notify,instance){
			
			var image = restful.action({type:"@id"},$scope.baseurl+":id/images");
	        var im = image.get({id:$rootScope.current_tenant.id},function(e){
	        	// $scope.images = im.metadata;
	        	console.log(im.metadata)
	        	$scope.imageshash = {};
	        	$scope.items = [];
	        	for(var i =0;i<im.metadata.length;i++){
	        		$scope.items.push({
	        			name:im.metadata[i].name,
	        			icon:im.metadata[i].icon||'image',
	        			id:im.metadata[i].uuid
	        		})
	        		$scope.imageshash[im.metadata[i].uuid] = im.metadata[i];
	        	}
	        });
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


			$scope.listItemClick = function($event,id) {
				instance.current_image = $scope.imageshash[id];

		    	$timeout(function(){
		    		$mdBottomSheet.show({
				      templateUrl: 'module/app_image/image-detail.html',
				      controller: 'imagedetailctrl',
				      targetEvent: $event,
				      parent:"#images"
				    }).then(function(clickedItem) {
				    	// console.log(clickedItem)
				      // $scope.alert = clickedItem.name + ' clicked!';
				    });
		    	});
			    
			};   
		}
	])
	.controller('imagedetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,instance){
			$scope.current_image = instance.current_image;
			if($scope.current_image.readme&&!$scope.current_image.convert_rm){
		    		$scope.current_image.readme = markdown.toHTML($scope.current_image.readme);
		    		$scope.current_image.convert_rm = true;
		    	}
		    	if($scope.current_image.dockerfile&&!$scope.current_image.convert_df){
		    		$scope.current_image.dockerfile = markdown.toHTML($scope.current_image.dockerfile);	
		    		$scope.current_image.convert_df = true;
		    	}
		    	console.log($scope.current_image);
			$timeout(function(){
				$("#images").css("height",500+$("#images md-bottom-sheet:first")[0].offsetHeight);
			},0)
		}
	])
	.controller('createimagectrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,instance){
			$scope.myImage = '';
			$scope.myCroppedImage='';
			var handleFileSelect=function(evt) {
	          var file=evt.currentTarget.files[0];
	          var reader = new FileReader();
	          reader.onload = function (evt) {
	            $scope.$apply(function($scope){
	              $scope.myImage=evt.target.result;
	            });
	          };
	          reader.readAsDataURL(file);
	        };
	        $("#fileInput").on('change',handleFileSelect);
		}
	])
})