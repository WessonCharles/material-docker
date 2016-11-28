'use strict';

define(['angular','modal','highcharts','json2yaml','yaml2json','highlight'],function(angular,modal,highcharts,json2yaml,yaml2json,highlight){
	return angular.module("ThCofAngSeed.stack_ctrl",['ThCofAngSeed.services','ngMaterial'])
	.controller('stackctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify','$mdBottomSheet','$mdDialog','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify,$mdBottomSheet,$mdDialog,instance){
			
			$rootScope.intro = {
				title:"Stack",
				content:"包含多个镜像的服务，设计上与 Docker Compose 相似。Stack 支持用 yaml 文件描述多个容器镜像之间的关系，可自由定制每个镜像的属性，并支持一键部署并运行Stack"
			}

			var stack = restful.action({type:"@id"},$scope.baseurl+":id/stack");
	        console.log($rootScope.current_tenant)
	        $scope.refresh = function(){
	        	// var pl = stack.get({id:$rootScope.current_tenant.id},function(e){
		        	console.timeEnd("restful game");
		        	var pl = {};
		        	console.time("rendered table")
			        Notify.showSimpleToast("Stack列表请求成功",1);
			        console.log(pl.metadata)
			        // $scope.stacks = pl.metadata;
			        // for(var i =0;i<$scope.stacks.length;i++){
			        // 	var images = $scope.stacks[i].images.split(",");
			        // 	var temp = "";
			        // 	for(var n=0;n<images.length;n++){
			        // 		images[n] = images[n].split("/").length>2?(images[n].split("/")[images[n].split("/").length-2]+"/"+images[n].split("/")[images[n].split("/").length-1]):images[n].split("/")[images[n].split("/").length-1];
			        // 		var it = n==images.length-1?"":",";
			        // 		temp+=images[n]+it;
			        // 	}
			        // 	$scope.stacks[i].images = temp;
			        // }
			        console.log($scope.stacks)
		        // });
	        }
	        $scope.refresh();
		}
	])
	.controller('createstackctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify','$mdBottomSheet','$mdDialog','instance','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify,$mdBottomSheet,$mdDialog,instance,$routeParams){
			var stacks = restful.action({type:"@id"},$scope.baseurl+":id/stack");
			$scope.createstack = function(){
				var stackfile = YAML.parse($scope.editor.getValue());
				var sta = stacks.save({id:$rootScope.current_tenant.id},{name:$scope.stack.name,stack:stackfile},function(e){
					console.log(sta)
					if(e.code==0){
                       Notify.showSimpleToast("创建Stack成功",1);
						$location.path("/stack");
                    }else if(e.code>0){
                        Notify.showSimpleToast(e.message,-1);
                    }else if(e.code<0){
                    	Notify.showSimpleToast(e.message,0)
                    }
				})
			}
		}
	])	
	.controller('stackdetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify','$mdBottomSheet','$mdDialog','instance','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify,$mdBottomSheet,$mdDialog,instance,$routeParams){
			
			// $rootScope.intro = {
			// 	title:"Stack",
			// 	content:"包含多个镜像的服务，设计上与 Docker Compose 相似。Stack 支持用 yaml 文件描述多个容器镜像之间的关系，可自由定制每个镜像的属性，并支持一键部署并运行Stack"
			// }
			// 

			var stack = restful.action({type:"@id",name:"@uuid"},$scope.baseurl+":id/stack/:uuid");
	        console.log($rootScope.current_tenant)
	        $scope.refresh = function(){
	        	var pl = stack.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(e){
			        Notify.showSimpleToast("请求成功",1);
			        console.log(pl.metadata)
			        $scope.stackone = pl.metadata;
			        console.log(JSON.stringify($scope.stackone.stack))
			        console.log(JYAML.stringijson($scope.stackone.stack))
			        $scope.stackone.stack = JYAML.stringijson($scope.stackone.stack);
			        $scope.editor.setValue($scope.stackone.stack);
			        $timeout(function(){
	        			$('pre code,pre').each(function(i, block) {
						    hljs.highlightBlock(block);
						  });
	        		},0)
		        });
	        }
	        $scope.refresh();
		}
	])
});