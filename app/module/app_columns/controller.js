'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.columns_ctrl",['ThCofAngSeed.services.formDataObject'])
	.controller('columnctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify','$mdBottomSheet','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify,$mdBottomSheet,instance){
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

	        $scope.toggleSearch = false;
	        	console.time("restful game");
	        var vol = restful.action({type:"@id"},$scope.baseurl+":id/volumes/image/");
	        console.log($rootScope.current_tenant)
	        var pl = vol.get({id:$rootScope.current_tenant.id},function(e){
	        	console.timeEnd("restful game");

	        	console.time("rendered table")
		        Notify.showSimpleToast("应用列表请求成功",1);
		        console.log(pl.metadata)
		        $scope.headers = [{
		        	name:'名称',
		        	field:'name'
		        // },{
		        // 	name:'源版本',
		        // 	field:'resourceVersion'
		        },{
		        	name:'状态',
		        	field:'status'
		        },{
		        	name:'镜像',
		        	field:'images'
		        },{
		        	name:'服务地址',
		        	field:'selfLink'
		        },{
		        	name:'创建时间',
		        	field:'createtime'
		        }];
		        var sort = [];
		        // for(var i in pl.metadata[0]){
		        // 	sort.push(i);
		        // 	// $scope.headers.push({
		        // 	// 	name:i,
		        // 	// 	field:i
		        // 	// })
		        // };
		        
		        var sourcedata = pl.metadata;
		        $scope.content = [];
		        for(var i =0;i<sourcedata.length;i++){
		        	var s = sourcedata[i];
		        	var time = $filter('date')(s.creationTimestamp,"MM-dd-yyyy h:mma");
		        	var obj = {
		        		"name":s.name,
		        		"resourceVersion":s.resourceVersion,
		        		"status":s.status.observedGeneration,
		        		"images":s.images||"",
		        		"selfLink":"",
		        		"createtime":time,
		        		"collections":s.containers,
		        		"subshow":false
		        	};
		        	$scope.content.push(obj);
		        }
		        console.log($scope.content)
		        /**
		         * [请确保 custom，sortable,和headers中的field一一对应，并且拼写相同]
		         * @type {Object}
		         */
		        $scope.custom = {name: 'bold', status:'grey',images: 'grey',selfLink:'grey',createtime:'grey'};
		        $scope.sortable = ['name','status','images','selfLink','createtime'];
		        $scope.count = 100;
		        // $scope.links = '/applications';
		        $scope.selected = [];
		       	//如果不是links 就是func方法
		       	$scope.func = function($event,c){
		       		instance.current_container = c;
		       		$mdBottomSheet.show({
				      templateUrl: 'module/app_application/app-bottom-detail.html',
				      controller: 'appdetailctrl',
				      targetEvent: $event,
				      parent:"#content"
				    }).then(function(clickedItem) {
				    });
		       	}

		        // $scope.loadtable = function(t){
		        	// console.log(t);
	        	var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
	        	$("#prolist").html(code);
		        // }
	        });
			$scope.deleteapp = function(){
	       		var selects= $scope.selected;
	       		console.log(selects)
	       		for(var i=0;i<selects.length;i++){
	       			(function(c){
	       				$scope.content.forEach(function(app, index) {
						    if (c.name === app.name) {
						    	console.log("22")
						      plat.delete({id:$rootScope.current_tenant.id,name:app.name}, function() {
						        $scope.content.splice(index, 1);
						        Notify.showSimpleToast("应用删除成功",1);
						      });
						    }
						  });
	       			})(selects[i]);	
	       		}
	       		
	       		
	       		
	       	}
	        $scope.$on("$viewContentLoaded",function(){
	        	$(".inner_content").css("height",$window.innerHeight-120).css("position","relative");

	        	$(window).resize(function(){
	        		$(".inner_content").css("height",$window.innerHeight-120).css("position","relative");
	        	})
	        })


		}
	])
});