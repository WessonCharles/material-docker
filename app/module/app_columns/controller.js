'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.columns_ctrl",['ThCofAngSeed.services.formDataObject'])
	.controller('columnctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify','$mdBottomSheet','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify,$mdBottomSheet,instance){
			/**
	         * buttondown example
	         */
	        // var originatorEv;
	        // $scope.ctrl = {};
	        // $scope.ctrl.openMenu = function($mdOpenMenu, ev) {
	        //   originatorEv = ev;
	        //   $mdOpenMenu(ev);
	        // };
	        // $scope.ctrl.notificationsEnabled = true;
	        // $scope.ctrl.toggleNotifications = function() {
	        //   $scope.ctrl.notificationsEnabled = !$scope.ctrl.notificationsEnabled;
	        // };
	        // $scope.ctrl.redial = function() {
	        //   $mdDialog.show(
	        //     $mdDialog.alert()
	        //       .targetEvent(originatorEv)
	        //       .clickOutsideToClose(true)
	        //       .parent('body')
	        //       .title('Suddenly, a redial')
	        //       .content('You just called a friend; who told you the most amazing story. Have a cookie!')
	        //       .ok('That was easy')
	        //   );
	        //   originatorEv = null;
	        // };
	        // $scope.ctrl.checkVoicemail = function() {
	        //   // This never happens.
	        // };

	        $scope.toggleSearch = false;
	        	console.time("restful game");
	        $http.get($scope.storageurl+$rootScope.current_tenant.id+"/volumes/pool/").success(function(data){
	        	$scope.pool = data.metadata[0];
	        })
	        var vol = restful.action({type:"@id",name:"@name"},$scope.storageurl+":id/volumes/image/:name");
	        console.log($rootScope.current_tenant)
	        var pl = vol.get({id:$rootScope.current_tenant.id},function(e){
	        	console.timeEnd("restful game");

		        Notify.showSimpleToast("存储卷列表请求成功",1);
		        $scope.columns = pl.metadata[0];
	        });

	        $scope.listItemClick = function($event,it) {
	        	console.log(it)
				instance.current_column = it;
				instance.storageurl = $scope.storageurl;
		    	// $timeout(function(){
		    	// 	$mdBottomSheet.show({
				   //    templateUrl: 'module/app_columns/column-detail.html',
				   //    controller: 'columndetailctrl',
				   //    targetEvent: $event,
				   //    parent:"#columns"
				   //  }).then(function(clickedItem) {
				   //  	// console.log(clickedItem)
				   //    // $scope.alert = clickedItem.name + ' clicked!';
				   //  });
		    	// });
			    
			};   

	        $scope.$on("$viewContentLoaded",function(){
	        	$(".inner_content").css("height",$window.innerHeight-120).css("position","relative");

	        	$(window).resize(function(){
	        		$(".inner_content").css("height",$window.innerHeight-120).css("position","relative");
	        	})
	        })


		}
	])
	.controller('columnsdetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','instance','restful','$compile',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,instance,restful,$compile){
			console.log(instance.current_column)
			$scope.column = instance.current_column;
			var col = restful.action({id:"@id",name:"@name"},instance.storageurl+":id/volumes/image/:name");
			var co = col.get({id:$rootScope.current_tenant.id,name:instance.current_column},function(e){
				$scope.base = co.metadata[0];
			})
			var snap = restful.action({id:"@id",name:"@name"},instance.storageurl+":id/volumes/snap/:name");
			var sn = snap.get({id:$rootScope.current_tenant.id,name:instance.current_column},function(e){
				console.log(sn.metadata);
				$scope.headers = [{
		        	name:'名称',
		        	field:'name'
		        // },{
		        // 	name:'源版本',
		        // 	field:'resourceVersion'
		        },{
		        	name:'ID',
		        	field:'id'
		        },{
		        	name:'大小',
		        	field:'size'
		        }];
		        var sort = [];
		        
		        $scope.content = sn.metadata;
		        /**
		         * [请确保 custom，sortable,和headers中的field一一对应，并且拼写相同]
		         * @type {Object}
		         */
		        $scope.custom = {name: 'bold', id:'grey',size: 'grey'};
		        $scope.sortable = ['name','id','size'];
		        $scope.count = 10;
		        // $scope.links = '/applications';
		        $scope.selected = [];
		       	//如果不是links 就是func方法
		      //  	$scope.func = function($event,c){
		      //  		instance.current_container = c;
		      //  		$mdBottomSheet.show({
				    //   templateUrl: 'module/app_application/app-bottom-detail.html',
				    //   controller: 'appdetailctrl',
				    //   targetEvent: $event,
				    //   parent:"#content"
				    // }).then(function(clickedItem) {
				    // });
		      //  	}

	        	var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
	        	$("#snaplist").html(code);
			})
			$timeout(function(){
				$("#columns").css("height",200+$("#columns md-list:first")[0].offsetHeight);
			},100)
		}
	])
	.controller('createcolumnsctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','instance','restful','$compile',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,instance,restful,$compile){
			
		}
	])
});