'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.users_ctrl",['ThCofAngSeed.services'])
	.controller('usersctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','Notify','restful','$compile',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,Notify,restful,$compile){
			console.log($routeParams)
			if($routeParams.tab){
				$scope.tab = $routeParams.tab;
				$timeout(function(){
					if($scope.tab == "user"){
						$("md-tabs md-tabs-canvas md-pagination-wrapper md-tab-item:first").trigger("click");	
					}else{
						$("md-tabs md-tabs-canvas md-pagination-wrapper md-tab-item:eq(1)").trigger("click");
					}
					
				},300)
			}else{
				$scope.tab = 'user';
			}
			var users = restful.action(null,$scope.baseurl+"admin/users");
			var tenants = restful.action(null,$scope.baseurl+"admin/tenants");
			$scope.refresh = function(){
				var user = users.get(null,function(){
					console.log(user);
					$scope.headers = [
			          {
			            name: '名称', 
			            field: 'name'
			          },{
			            name:'用户名', 
			            field: 'username'
			          },{
			            name: '邮箱', 
			            field: 'email'
			          },{
			            name:'是否启用',
			            field:'enabled'
			          }
			        ];
			        
			        $scope.content = [];
			        for(var i=0;i<user.metadata.length;i++){
			        	// $scope.content.push({
			        	// 	name:user.metadata[i].name,
			        	// 	replicas:user.metadata[i].replicas,
			        	// 	health_status:user.metadata[i].status.current+"/"+user.metadata[i].status.desired,
			        	// 	created_at:$filter("date")(user.metadata[i].created_at,'MM/dd/yyyy h:mm:ss'),
			        	// 	collections:[],
			        	// 	bindtenantl:user.metadata[i].bind.gamepublic&&user.metadata[i].bind.gamepublic.length>0?user.metadata[i].bind.gamepublic.join(","):""
			        	// })
			        	$scope.content.push(user.metadata[i])
			        }
			        $scope.selected = [];
			        $scope.custom = {name: 'bold', username:'grey',email: 'grey',enabled:'grey'};
			        $scope.sortable = ['name', 'username', 'email','enabled'];
			        // $scope.thumbs = 'thumb';
			        $scope.count = 5;
			        var code = $compile('<md-table headers="headers" innerlinks="applications/'+$routeParams.id+'" refresh="refresh" content="content" sortable="sortable" filters="search" thumbs="thumbs" isselect="true" selected="selected" modal="modal" collheaders="tcollheaders" getapidata="getcoldata" subhover="subhover" count="count"></md-table>')($scope);
		        	$("#user-table").html(code);

				})
			}
			$scope.refresh();
			$scope.trefresh = function(){
				var tenant = tenants.get(null,function(){
					console.log(tenant);
					$scope.theaders = [
			          {
			            name: '名称', 
			            field: 'name'
			          },{
			            name:'是否启用', 
			            field: 'enabled'
			          },{
			            name: '描述', 
			            field: 'description'
			          }
			        ];
			        $scope.tcontent = [];
			        for(var i=0;i<tenant.metadata.length;i++){
			        	// $scope.tcontent.push({
			        	// 	name:tenant.metadata[i].name,
			        	// 	sessionAffinity:$filter('i18n')(tenant.metadata[i].sessionAffinity),
			        	// 	created_at:$filter("date")(tenant.metadata[i].created_at,'yyyy-MM-dd h:mm:ss'),
			        	// 	collections:tenant.metadata[i].tenant
			        	// })
			        	$scope.tcontent.push(tenant.metadata[i]);
			        }


			        $scope.tselected = [];
			        $scope.tcustom = {name: 'bold', enabled:'grey',description: 'grey'};
			        $scope.tsortable = ['name', 'enabled', 'description'];
			        // $scope.tmodal = "#container_detail";
			        // $scope.thumbs = 'thumb';
			        $scope.tcount = 5;
			        var code = $compile('<md-table headers="theaders" refresh="trefresh" content="tcontent" sortable="tsortable" subhover="subhover" filters="search" thumbs="tthumbs" isselect="true" selected="tselected" modal="tmodal" collheaders="collheaders" count="tcount"></md-table>')($scope);
		        	$("#tenant-table").html(code);
				})
			}
			$scope.trefresh();
		}
	])
	.controller('createuserctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','Notify','restful','$compile',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,Notify,restful,$compile){
			$scope.user = {};
			var users = restful.action(null,$scope.baseurl+"admin/users");
			var tenants = restful.action(null,$scope.baseurl+"admin/tenants");
			var tenant = tenants.get(null,function(){
				$scope.tenants = [];
				for(var i =0;i<tenant.metadata.length;i++){
					if(tenant.metadata[i].name =="admin"){
						$scope.tenants.push("admin");
					}else{
						$scope.tenants.push(tenant.metadata[i].name)
					}
				}
				console.log($scope.tenants)
			})

			$scope.createuser = function(){
				var user = users.save(null,$scope.user,function(){
					if(user.code==0){
                       Notify.showSimpleToast("创建",1);
                       $location.path("/users?tab=user");
                    }else if(user.code>0){
                        Notify.showSimpleToast(user.message,-1);
                    }else if(user.code<0){
                        Notify.showSimpleToast(user.message,0)
                    }
				})
			}
		}
	])
	.controller('createtenantctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','Notify','restful','$compile',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,Notify,restful,$compile){
			$scope.tenant = {};
			var tenants = restful.action(null,$scope.baseurl+"admin/tenants");
			$scope.createtenant = function(){
				var tenant = tenants.save(null,$scope.tenant,function(){
					if(tenant.code==0){
                       Notify.showSimpleToast("创建",1);
                       $location.path("/users?tab=tenant");
                    }else if(tenant.code>0){
                        Notify.showSimpleToast(tenant.message,-1);
                    }else if(tenant.code<0){
                        Notify.showSimpleToast(tenant.message,0)
                    }
				})
			}
		}
	])	
})
