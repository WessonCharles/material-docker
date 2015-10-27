'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.pod_ctrl",['ThCofAngSeed.services.formDataObject'])
	.controller('podctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify){
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
	        var plat = restful.action({type:"@id"},"http://42.51.161.236:8337/:id/rc");
	        console.log($rootScope.current_tenant)
	        var pl = plat.get({id:$rootScope.current_tenant.id},function(e){
	        	console.timeEnd("restful game");

	        	console.time("rendered table")
		        Notify.showSimpleToast("应用列表请求成功");
		        console.log(pl.metadata)
		        $scope.headers = [{
		        	name:'名称',
		        	field:'name'
		        },{
		        	name:'源版本',
		        	field:'resourceVersion'
		        },{
		        	name:'状态',
		        	field:'status'
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
		        		"createtime":time,
		        		"collections":s.spec.template.spec.containers
		        	};
		        	$scope.content.push(obj);
		        }
		        console.log($scope.content)
		        // $scope.content = [
		        //   {
		        //     // thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
		        //     name: 'Bruno Mars', 
		        //     description: 'Human',
		        //     last_modified: 'Jun 5, 2014'
		        //   },{
		        //     // thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
		        //     name: 'AT-AT', 
		        //     description: 'Robot',
		        //     last_modified: 'Jun 5, 2014'
		        //   },{
		        //     // thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
		        //     name: 'Mark Ronson', 
		        //     description: 'Human',
		        //     last_modified: 'Jun 5, 2014'
		        //   },{
		        //     // thumb:'http://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
		        //     name: 'Daft Punk', 
		        //     description: 'Human-Robot',
		        //     last_modified: 'Jun 5, 2014'
		        //   },{
		        //     // thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
		        //     name: 'Lady Gaga', 
		        //     description: 'Undefined',
		        //     last_modified: 'Jun 5, 2014'
		        //   }
		        // ];
		        
		        /**
		         * [请确保 custom，sortable,和headers中的field一一对应，并且拼写相同]
		         * @type {Object}
		         */
		        $scope.custom = {name: 'bold', resourceVersion:'grey',status: 'grey',createtime:'grey'};
		        $scope.sortable = ['name','resourceVersion','status','createtime'];
		        $scope.count = 100;
		        $scope.links = '/applications';
		        $scope.selected = [];

		        // $scope.loadtable = function(t){
		        	// console.log(t);
	        	var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" count="count" isselect="true" selected="selected" links="links"></md-table>')($scope);
	        	$("#prolist").html(code);
		        // }
		       	$scope.showselected = function(){
		       		console.log($scope.selected)
		       	}
	        });
	        $scope.$on("$viewContentLoaded",function(){
		        	// Modal.init("aaa");
	        })


	        /**
	         * tables
	         */
	        
	        /**
	         * open one table content
	         */
	        // $("md-table").delegate("table tbody tr", 'click', function() {
	          
	        // })
		}
	])
	.controller('prodetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams){
			console.log("223423")
			console.log($routeParams)
			$scope.toggleSearch = false;   
	        $scope.headers = [
	          {
	            name: 'Name', 
	            field: 'name'
	          },{
	            name:'Description', 
	            field: 'description'
	          },{
	            name: 'Last Modified', 
	            field: 'last_modified'
	          // },{
	          //   name:'More Action',
	          //   field:'more_action'
	          }
	        ];
	        
	        $scope.content = [
	          {
	            // thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
	            name: 'Bruno Mars', 
	            description: 'Human',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
	            name: 'AT-AT', 
	            description: 'Robot',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
	            name: 'Mark Ronson', 
	            description: 'Human',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
	            name: 'Daft Punk', 
	            description: 'Human-Robot',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
	            name: 'Lady Gaga', 
	            description: 'Undefined',
	            last_modified: 'Jun 5, 2014'
	          }
	        ];
	        $scope.selected = [];
	        $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
	        $scope.sortable = ['name', 'description', 'last_modified'];
	        // $scope.thumbs = 'thumb';
	        $scope.count = 5;

	        $scope.theaders = [
	          {
	            name: 'Name', 
	            field: 'name'
	          },{
	            name:'Description', 
	            field: 'description'
	          },{
	            name: 'Last Modified', 
	            field: 'last_modified'
	          // },{
	          //   name:'More Action',
	          //   field:'more_action'
	          }
	        ];
	        
	        $scope.tcontent = [
	          {
	            // thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
	            name: 'Bruno Mars', 
	            description: 'Human',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
	            name: 'AT-AT', 
	            description: 'Robot',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
	            name: 'Mark Ronson', 
	            description: 'Human',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
	            name: 'Daft Punk', 
	            description: 'Human-Robot',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
	            name: 'Lady Gaga', 
	            description: 'Undefined',
	            last_modified: 'Jun 5, 2014'
	          }
	        ];
	        $scope.tselected = [];
	        $scope.tcustom = {name: 'bold modal__trigger', description:'grey',last_modified: 'grey'};
	        $scope.tsortable = ['name', 'description', 'last_modified'];
	        $scope.tmodal = "#container_detail";
	        // $scope.thumbs = 'thumb';
	        $scope.tcount = 5;

	        $scope.switchmain = function(index,t){
	        	if($(t).hasClass("shadow"))$(t).removeClass("shadow");
	        	else $(t).addClass('shadow');

	        	if(index==1){
	        		$(t).parents(".switchdiv").removeClass("right");
	        	}else{
	        		$(t).parents(".switchdiv").addClass("right");
	        	}
	        }
		}
	])
	.controller('createappctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,restful){
			/**
			 * 选项卡方法
			 */
			$scope.createstep = 0;//默认第一个选项卡可用，后两个禁用
			$scope.tabs={
				0:false,1:true,2:true
			}

			$scope.hash_tags = {};//镜像对应的tags
			$scope.gethashtag = function(name){
				$http.get("http://42.51.161.236:8337/"+$rootScope.current_tenant.id+"/tags/"+name).success(function(data){
					console.log(data)
					$scope.hash_tags[name] = data["metadata"];
				})
			}
			

			$scope.selected = [];
		    $scope.toggle = function (item, list) {
		        var idx = list.indexOf(item);
		        if (idx > -1) list.splice(idx, 1);
		        else list.push(item);
		    };
		    $scope.exists = function (item, list) {
		        return list.indexOf(item) > -1;
		    };

			$scope.gostep = function(n){
				$scope.tabs[n] = !$scope.tabs[n];
				$scope.createstep = n;
				if(n==1){
					// $scope.selected_images = ;//已选中的镜像，多个
					$scope.images_config = [];
					for(var i = 0;i<$scope.selected.length;i++){
						var im = $scope.selected[i];
						var obj = {
							image:im.name,
							tag:(im.name.indexOf(":")>-1?im.name.split(":")[1]:''),
							name:"",//应用名称
							more_cfg:false,//控制高级选项是否显示
							env:[],//环境配置
							tempobj:{},
						}
						$scope.images_config.push(obj);
					}
				}
			}
			$scope.removeOneImcfgenv = function(one,list){
				for(var i = 0;i<list.length;i++){
					if(one.name==list[i].name&&one.value==list[i].value){
						list.splice(i,1);
						break;
					}
				}
			}


			var image = restful.action({type:"@id"},"http://42.51.161.236:8337/:id/images");
	        var im = image.get({id:$rootScope.current_tenant.id},function(e){
	        	console.log(JSON.parse(im.metadata))
	        	$scope.images = JSON.parse(im.metadata);
	        });

		}
	])			
})