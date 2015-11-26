'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.columns_ctrl",['ThCofAngSeed.services.formDataObject','ngMaterial'])
	.controller('columnctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify','$mdBottomSheet','$mdDialog','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify,$mdBottomSheet,$mdDialog,instance){
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
	        // $http.get($scope.baseurl+$rootScope.current_tenant.id+"/volumes/pool/").success(function(data){
	        // 	$scope.pool = data.metadata[0];
	        // })
	        var vol = restful.action({type:"@id",name:"@name"},$scope.baseurl+":id/volume/:name");
	        console.log($rootScope.current_tenant)
	        var pl = vol.get({id:$rootScope.current_tenant.id},function(e){
	        	console.timeEnd("restful game");

		        Notify.showSimpleToast("存储卷列表请求成功",1);
		        $scope.columns = pl.metadata;
	        });

	        $scope.listItemClick = function($event,it) {
	        	console.log(it)
				instance.current_column = it;
				instance.baseurl = $scope.baseurl;
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
			$scope.selected = [];
			$scope.toggle = function (item, list) {
	          var idx = list.indexOf(item);
	          if (idx > -1) list.splice(idx, 1);
	          else list.push(item);

	          $scope.selected = list;
	          console.log($scope.selected)
	        };
	        $scope.exists = function (item, list) {
	          if($scope.checkall){
	             return $scope.checkall;
	          }
	          return list.indexOf(item) > -1;
	        }; 

	        $scope.deletecolumns = function(ev){
			    // Appending dialog to document.body to cover sidenav in docs app
			    var confirm = $mdDialog.confirm()
			    .title('删除确认')
			    .content('你确定要删除所选存储卷吗？')
			    .ariaLabel('Lucky day')
			    .targetEvent(ev)
			    .ok('确定')
			    .cancel('取消');
			    $mdDialog.show(confirm).then(function() {
			      var selects= $scope.selected;
		       		console.log(selects)
		       		for(var i=0;i<selects.length;i++){
		       			(function(c){
		       				$scope.columns.forEach(function(app, index) {
							    if (c.name === app.name) {
							    	console.log("22")
							      vol.delete({id:$rootScope.current_tenant.id,name:app.name}, function() {
							        $scope.columns.splice(index, 1);
							        Notify.showSimpleToast("应用删除成功",1);
							      });
							    }
							  });
		       			})(selects[i]);	
		       		}
			    }, function() {
			      $scope.selected = [];
			    });
	        }

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
			console.log($window.location)
			var current_column = instance.current_column?instance.current_column:$window.location.pathname.split('/').pop();
			$scope.column = current_column.name||current_column;
			console.log(current_column)
			console.log($scope.column)
			var col = restful.action({id:"@id",name:"@name"},$scope.baseurl+":id/volume/:name");
			var co = col.get({id:$rootScope.current_tenant.id,name:$scope.column},function(e){
				$scope.base = co.metadata[0];
			})
			var snap = restful.action({id:"@id",name:"@name"},$scope.baseurl+":id/volume/snap/:name");
			var sn = snap.get({id:$rootScope.current_tenant.id,name:$scope.column},function(e){
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
			$scope.col  = {};
			var col = restful.action({type:'@id'},$scope.baseurl+":id/volume");
			$scope.createimage = function(){
				var co = col.save({id:$rootScope.current_tenant.id},{name:$scope.col.name,size:parseInt($scope.col.size)},function(){
					$location.path("/columns")
				})
			}
		}
	])
});