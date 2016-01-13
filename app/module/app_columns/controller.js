'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.columns_ctrl",['ThCofAngSeed.services','ngMaterial'])
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
	        $rootScope.intro = {
	        	title:"共享存储",
	        	content:"为实例提供一种持久化存储的能力,它独立于实例的生命周期而存在,它可以同时挂载到多个实例上.注意避免同一文件的同时写操作."
	        }

	        $scope.toggleSearch = false;
	        	console.time("restful game");
	        // $http.get($scope.baseurl+$rootScope.current_tenant.id+"/volumes/pool/").success(function(data){
	        // 	$scope.pool = data.metadata[0];
	        // })
	        var vol = restful.action({type:"@id",name:"@name"},$scope.baseurl+":id/volumes/:name");
	        console.log($rootScope.current_tenant)
		    $scope.refresh = function(){
		        var pl = vol.get({id:$rootScope.current_tenant.id},function(e){
		        	console.timeEnd("restful game");

			        Notify.showSimpleToast("存储卷列表请求成功",1);
			        console.log(pl.metadata)
			        $scope.headers = [{
			        	name:'名称',
			        	field:'name'
			        },{
			        	name:'大小',
			        	field:'quota'
			        },{
			        	name:'创建人',
			        	field:'create_user'
			        // },{
			        // 	name:'镜像',
			        // 	field:'images'
			        // },{
			        // 	name:'服务地址',
			        // 	field:'selfLink'
			        },{
			        	name:'创建时间',
			        	field:'created_at'
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
			        	// var time = $filter('date')(s.creationTimestamp,"MM-dd-yyyy HH:mm");
			        	// var obj = {
			        	// 	"name":s.name,
			        	// 	"resourceVersion":s.resourceVersion,
			        	// 	"status":"",
			        	// 	"images":s.images||"",
			        	// 	"selfLink":"",
			        	// 	"createtime":time,
			        	// 	"collections":s.containers,
			        	// 	"subshow":false
			        	// };
			        	$scope.content.push(s);
			        }
			        console.log($scope.content)
			        $scope.custom = {name: 'bold',quota:'grey', create_user:'grey',created_at:'grey'};
			        $scope.sortable = ['name','quota','create_user','created_at'];
			        $scope.count = 100;
			        // $scope.links = '/volumes';
			        $scope.selected = [];
			        $scope.action = {
			        	name:"调整卷大小",
			        	icon:'',
			        	modal:{target:"#resize",title:"调整卷大小",
			        		params:{quota:''}
			        	},
			        	args:{},
			        	labels:{quota:'卷大小'},
			        	trigger:function(t){
			        		console.log($scope.action.modal.params)
			        		$http.put($scope.baseurl+$rootScope.current_tenant.id+"/volumes/"+$scope.action.args.uuid,$scope.action.modal.params).success(function(data){
								$($scope.action.modal.target).find(".modal__content").removeClass("modal__content--active");
								$($scope.action.modal.target).removeClass("modal--active");
								$("button.modal__trigger").removeClass('modal__trigger--active').attr("style","");
								$("button.modal__trigger").find("#modal__temp").remove();

								for(var i =0;i<$scope.content.length;i++){
									if($scope.content[i].uuid == $scope.action.args.uuid){
										$scope.content[i].quota = $scope.action.modal.params.quota;
										break;
									}
								}
								Notify.showSimpleToast("更新成功",1);
							})
			        	}
			        }
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

			        // $scope.loadtable = function(t){
			        	// console.log(t);
		        	var code = $compile('<md-table headers="headers" content="content" refresh="refresh" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" action="action" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
		        	$("#columns").html(code);
		        });
			}
			$scope.refresh();
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
			// $scope.selected = [];
			// $scope.toggle = function (item, list) {
	  //         var idx = list.indexOf(item);
	  //         if (idx > -1) list.splice(idx, 1);
	  //         else list.push(item);

	  //         $scope.selected = list;
	  //         console.log($scope.selected)
	  //       };
	  //       $scope.exists = function (item, list) {
	  //         if($scope.checkall){
	  //            return $scope.checkall;
	  //         }
	  //         return list.indexOf(item) > -1;
	  //       }; 

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
		       			(function(c,i){
		       				vol.delete({id:$rootScope.current_tenant.id,name:c.uuid}, function() {
						        for(var n =0;n<$scope.content.length;n++){
						        	if(c.uuid==$scope.content[n].uuid){
						        		$scope.content.splice(n, 1);
						        		break;
						        	}
						        }
						        
						      });
		       				if(i==selects.length-1){
		       					 Notify.showSimpleToast("应用删除成功",1);
		       				}
		       			})(selects[i],i);	
		       		}
			    }, function() {
			      $scope.selected = [];
			    });
	        }

	  //       $scope.resize = function(t){
				
			// }

	        $scope.$on("$viewContentLoaded",function(){
	        	// $(".inner_content").css("height",$window.innerHeight-120).css("position","relative");

	        	// $(window).resize(function(){
	        	// 	$(".inner_content").css("height",$window.innerHeight-120).css("position","relative");
	        	// })
	        })

	        $rootScope.$watch("current_tenant",function(e,v){
	        	if(e.id==v.id||!e||!v)return false;
				$scope.refresh();
				if($scope.refresh1)$scope.refresh1();
				if($scope.trefresh)$scope.trefresh();
			})

		}
	])
	.controller('columnsdetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','instance','restful','$compile','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,instance,restful,$compile,$routeParams){
			console.log(instance.current_column)
			console.log($window.location)
			var current_column = instance.current_column?instance.current_column:$window.location.pathname.split('/').pop();
			$scope.column = current_column.name||current_column;
			console.log(current_column)
			console.log($scope.column)
			var col = restful.action({id:"@id",name:"@name"},$scope.baseurl+":id/volumes/:name");
			var co = col.get({id:$rootScope.current_tenant.id,name:$routeParams.name},function(e){
				$scope.base = co.metadata[0];
			})

			// var snap = restful.action({id:"@id",name:"@name"},$scope.baseurl+":id/volumes/snap/:name");
			// var sn = snap.get({id:$rootScope.current_tenant.id,name:$routeParams.name},function(e){
			// 	console.log(sn.metadata);
			// 	$scope.headers = [{
		 //        	name:'名称',
		 //        	field:'name'
		 //        // },{
		 //        // 	name:'源版本',
		 //        // 	field:'resourceVersion'
		 //        },{
		 //        	name:'ID',
		 //        	field:'id'
		 //        },{
		 //        	name:'大小',
		 //        	field:'size'
		 //        }];
		 //        var sort = [];
		        
		 //        $scope.content = sn.metadata;
		 //        /**
		 //         * [请确保 custom，sortable,和headers中的field一一对应，并且拼写相同]
		 //         * @type {Object}
		 //         */
		 //        $scope.custom = {name: 'bold', id:'grey',size: 'grey'};
		 //        $scope.sortable = ['name','id','size'];
		 //        $scope.count = 10;
		 //        // $scope.links = '/applications';
		 //        $scope.selected = [];
		 //       	//如果不是links 就是func方法
		 //      //  	$scope.func = function($event,c){
		 //      //  		instance.current_container = c;
		 //      //  		$mdBottomSheet.show({
			// 	    //   templateUrl: 'module/app_application/app-bottom-detail.html',
			// 	    //   controller: 'appdetailctrl',
			// 	    //   targetEvent: $event,
			// 	    //   parent:"#content"
			// 	    // }).then(function(clickedItem) {
			// 	    // });
		 //      //  	}

	  //       	var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
	  //       	$("#snaplist").html(code);
			// })
		}
	])
	.controller('createcolumnsctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','instance','restful','$compile','Notify',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,instance,restful,$compile,Notify){
			$scope.col  = {};
			var col = restful.action({type:'@id'},$scope.baseurl+":id/volumes");
			$scope.createimage = function(){
				var co = col.save({id:$rootScope.current_tenant.id},{name:$scope.col.name,quota:parseInt($scope.col.size),desc:$scope.col.desc},function(){
					if(co.code==0){
						Notify.showSimpleToast("操作成功",1);
					}else if(co.code>0){
						Notify.showSimpleToast(co.message,-1);
					}else if(co.code<0){
						Notify.showSimpleToast(co.message,0)
					}
					$location.path("/volumes")
				})
			}
		}
	])
});
