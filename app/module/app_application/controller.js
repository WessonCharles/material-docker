'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.pod_ctrl",['ThCofAngSeed.services.formDataObject','ngMaterial'])
	.controller('podctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify','$mdBottomSheet','$mdDialog','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify,$mdBottomSheet,$mdDialog,instance){
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
	        var plat = restful.action({type:"@id",name:"@name"},$scope.baseurl+":id/apps/:name");
	        console.log($rootScope.current_tenant)
	        var pl = plat.get({id:$rootScope.current_tenant.id},function(e){
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
		        	// var time = $filter('date')(s.creationTimestamp,"MM-dd-yyyy h:mma");
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
		        $scope.custom = {name: 'bold', create_user:'grey',created_at:'grey'};
		        $scope.sortable = ['name','create_user','created_at'];
		        $scope.count = 100;
		        $scope.links = '/applications';
		        $scope.selected = [];

		        instance["applications"] = $scope.content;
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
	        	var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
	        	$("#prolist").html(code);
		        // }
	        });
			$scope.deleteapp = function(ev){
				var confirm = $mdDialog.confirm()
			    .title('删除确认')
			    .content('你确定要删除所选应用吗？')
			    .ariaLabel('Lucky day')
			    .targetEvent(ev)
			    .ok('确定')
			    .cancel('取消');
			    $mdDialog.show(confirm).then(function() {
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
			    }, function() {
			      $scope.selected = [];
			    });
	       		
	       	}
	        $scope.$on("$viewContentLoaded",function(){
	        	// $(".inner_content").css("height",$window.innerHeight-120).css("position","relative");

	        	// $(window).resize(function(){
	        	// 	$(".inner_content").css("height",$window.innerHeight-120).css("position","relative");
	        	// })
	        })



	        /**
	         * tables
	         */
	        
	        /**
	         * open one table content
	         */
	        // $("md-table").delegate("table tbody tr", 'click', function() {
	          
	        // })
	        // 
	        

	        /*
	        弹出框形式的创建应用
	         */
	        /**
			 * [创建应用的restful]
			 * @type {Array}
			 */
			var App = restful.action({type:"@id"},$scope.baseurl+":id/apps");
			$scope.checkname = function(){
				var reg =/^[A-Za-z\d-.]+$/;
				if(new RegExp(reg).test($scope.app_name)){
					$scope.nameifmatchreg = "";
				}else{
					$scope.nameifmatchreg = "md-input-invalid";
				}
				console.log($scope.nameifmatchreg)
			}

			$scope.createapps = function(t){
				var data = {name:$scope.app_name};
				if($scope.app_desc){
					data["describe"] = $scope.app_desc;
				}
				var ap = App.save({id:$rootScope.current_tenant.id},data,function(){
					console.log(ap)
					$location.path("/applications");
					$(t).parents(".modal").find(".modal__close").trigger("click");
				});
			};
		}
	])
	.controller('prodetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful','$compile','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,restful,$compile,instance){
			console.log("223423")
			console.log($routeParams)

			var apps = restful.action({type:"@id",uuid:"@uuid"},$scope.baseurl+":id/apps/:uuid");
			var app = apps.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
				$scope.appone = app.metadata[0];
				if(!instance.applications||instance.applications.length==0){
					instance.applications = [$scope.appone];
				}
			})
			// $scope.appone = {};
			// for(var i=0;i<instance.applications.length;i++){
			// 	if($routeParams.id==instance.applications[i].uuid){
			// 		$scope.appone = instance.applications[i];
			// 		break;
			// 	}
			// }

			$scope.toggleSearch = false; 

			var clu = restful.action({id:"@id",uuid:"@uuid"},$scope.baseurl+":id/cluster?app_uuid=:uuid");
			var cl = clu.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
				console.log(cl);
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
		        var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" thumbs="thumbs" isselect="true" selected="selected" modal="modal" count="count"></md-table>')($scope);
	        	$("#cluter-table").html(code);

			})

			var lbs = restful.action({id:"@id",uuid:"@uuid"},$scope.baseurl+":id/lb?app_uuid=:uuid");
			var lb = lbs.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
				console.log(lb);
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
		        var code = $compile('<md-table headers="theaders" content="tcontent" sortable="tsortable" filters="search" thumbs="tthumbs" isselect="true" selected="tselected" modal="tmodal" count="tcount"></md-table>')($scope);
	        	$("#lb-table").html(code);
			})
	        

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
	.controller('appdetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,instance){
			$scope.container = instance.current_container;
			$scope.getstatus = function(c){
				var it = [];
				for(var i in c){
					it.push(i);
				}
				return it[0]?it[0]:'';
			}
			$scope.gettime = function(c){
				if(JSON.stringify(c)!="{}"){
					return $filter('date')(c[$scope.getstatus(c)].startedAt,"MM-dd-yyyy h:mma");
				}else{
					return '';
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
				var it= name;
				var url = "";
				if(name.indexOf("index.docker.io")>-1){
					url = "docker-hub/tags/"+name.split("index.docker.io/")[1];
				}else{
					url = $rootScope.current_tenant.id+"/tags/"+name.split("/")[name.split("/").length-1];
				}
				$http.get($scope.baseurl+url).success(function(data){
					console.log(data)
					$scope.hash_tags[it] = data["metadata"];
				})
			}

			$scope.image_tag='usually';

			/**
			 * [创建应用的restful]
			 * @type {Array}
			 */
			var App = restful.action({type:"@id"},$scope.baseurl+":id/apps");
			$scope.checkname = function(){
				var reg =/^[A-Za-z\d-.]+$/;
				if(new RegExp(reg).test($scope.app_name)){
					$scope.nameifmatchreg = "";
				}else{
					$scope.nameifmatchreg = "md-input-invalid";
				}
				console.log($scope.nameifmatchreg)
			}

			$scope.createapps = function(){
				var data = {name:$scope.app_name};
				if($scope.app_desc){
					data["describe"] = $scope.app_desc;
				}
				var ap = App.save({id:$rootScope.current_tenant.id},data,function(){
					console.log(ap)
					$location.path("/applications")
				});
			};

			$scope.selected = [];
		    $scope.toggle = function (item, list) {
		        var idx = list.indexOf(item);
		        if (idx > -1) list.splice(idx, 1);
		        else list.push(item);
		    };
		    $scope.exists = function (item, list) {
		        return list.indexOf(item) > -1;
		    };
		    $http.get($scope.baseurl+"flavors/").success(function(data){
				$scope.flavors = data["metadata"];
			})
		    // gethashtag(imcfg.image)
		    $scope.getdata = function(img){
		    	img.image = !img.is_official?(img.url+"/"+img.tenant_name+"/"+img.name):(img.url+"/"+img.name);
		    	$scope.gethashtag(img.image);

		    }
		    $scope.images_config = [];
		    $scope.savetobox = function(img){
		    	if(!img.tag)Notify.showSimpleToast("请选择版本",-1);
		    	if(!img.flavor)Notify.showSimpleToast("请选择配置",-1);
		    	img.issave = !img.issave;
		    	$scope.images_config.push({
		    		name:img.name,
		    		id:img.uuid,
		    		image:img.image,
		    		tag:img.tag,
		    		flavor:img.flavor,
		    		more_cfg:false,//控制高级选项是否显示
					env:[],//环境配置
					ports:[],//端口配置
					tempobj:{},
					portobj:{},
		    	})
		    }

			$scope.gostep = function(n){
				$scope.tabs[n] = !$scope.tabs[n];
				$scope.createstep = n;
				if(n==1){
					// for(var i = 0;i<$scope.selected.length;i++){
					// 	var im = $scope.selected[i];
					// 	var obj = {
					// 		// image:!im.is_official?(im.url+"/"+im.tenant_name+"/"+im.name):(im.url+"/"+im.name),
					// 		// tag:(im.name.indexOf(":")>-1?im.name.split(":")[1]:''),
					// 		more_cfg:false,//控制高级选项是否显示
					// 		// flavor:"",
					// 		env:[],//环境配置
					// 		ports:[],//端口配置
					// 		tempobj:{},
					// 		portobj:{},
					// 	}
					// 	var reg = /\s+/g;
					// 	obj.image = obj.image.replace(reg, "");
					// 	$scope.images_config.push(obj);
					// }
				}else if(n==2){

					var reqdata = [];
					for(var i=0;i<$scope.images_config.length;i++){
						var im = $scope.images_config[i];
						var obj = {
							name:im.name,
							image:im.image+":"+im.tag,
							flavor_id:im.flavor
						};
						console.log(obj.image)
						obj.image = obj.image.replace(/\s+/g, "");
						console.log(obj.image)
						if(im.env.length>0)obj.env = im.env;
						if(im.ports.length>0)obj.ports  = im.ports;
						// delete obj.ports;
						reqdata.push(obj);
					}
					console.log(reqdata);
					// return false;
					var ap = App.save({id:$rootScope.current_tenant.id},{name:$scope.app_name,containers:reqdata},function(){
						console.log(ap)
						$location.path("/applications")
					});
					
					// App.save({name:$scope.app_name,containers:reqdata},function())

				}
			}
			$scope.removeOneImcfgpro = function(one,list){
				list.splice(list.indexOf(one),1);
			}

			var image = restful.action({type:"@id"},$scope.baseurl+":id/images");
	        var im = image.get({id:$rootScope.current_tenant.id},function(e){
	        	$scope.images = im.metadata||[];
	        	$scope.temp_image = JSON.parse(JSON.stringify($scope.images));
	        });

	        $scope.$watch('image_tag',function(){
	        	console.log($scope.image_tag)
	        	if($scope.image_tag=="thrd"){
	        		$scope.images = [];
	        	}else{
	        		$scope.images = $scope.temp_image;
	        		console.log($scope.images)
	        	}
	        })

	        $scope.searchimage = function(name){
	        	$scope.images = null;
	        	var searchapi = restful.action({name:"@name"},$scope.baseurl+"docker-hub/search?name=:name");
	        	var sa = searchapi.get({name:name},function(){
	        		$scope.images = sa["metadata"];
	        	})
	        }

		}
	])			
})