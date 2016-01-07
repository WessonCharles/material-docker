'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.pod_ctrl",['ThCofAngSeed.services','ngMaterial'])
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
		       			(function(c,i){
		       				plat.delete({id:$rootScope.current_tenant.id,name:app.uuid}, function() {
						        for(var n = 0;n<$scope.content.length;n++){
						        	if(c.uuid==$scope.content[n].uuid){
						        		$scope.content.splice(n,1);
						        		break;
						        	}
						        }
						        if(i==selects.length-1){
						        	Notify.showSimpleToast("应用删除成功",1);
						        }
						        
						    });
		       			})(selects[i],i);	
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
				console.log(t)
				var data = {name:$scope.app_name};
				if($scope.app_desc){
					data["describe"] = $scope.app_desc;
				}
				var ap = App.save({id:$rootScope.current_tenant.id},data,function(){
					console.log(ap)
					$(t.target).parents(".modal").find(".modal__content").removeClass("modal__content--active");
					$(t.target).parents(".modal").removeClass("modal--active");
					$("button.modal__trigger").removeClass('modal__trigger--active').attr("style","");
					$("button.modal__trigger").find("#modal__temp").remove();

					$scope.content.push(ap.metadata[0]);
					$location.path("/applications");
				});
			};
		}
	])
	.controller('prodetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful','$compile','instance','Notify',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,restful,$compile,instance,Notify){
			console.log("223423")
			console.log($routeParams)

			var originatorEv;
	        $scope.ctrl = {};
	        $scope.ctrl.openMenu = function($mdOpenMenu, ev) {
	          originatorEv = ev;
	          $mdOpenMenu(ev);
	        };

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

			$scope.tab = 'cluster';
			var clu = restful.action({id:"@id",uuid:"@uuid"},$scope.baseurl+":id/cluster?app_uuid=:uuid");
			var lbscol = restful.action({id:"@id",name:"@name"},$scope.baseurl+":id/cluster/:name");
			var cl = clu.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
				console.log(cl);
				$scope.headers = [
		          {
		            name: '名称', 
		            field: 'name'
		          },{
		            name:'副本数', 
		            field: 'replicas'
		          },{
		            name: '集群健康状态', 
		            field: 'health_status'
		          },{
		            name:'创建时间',
		            field:'created_at'
		          },{
		          	name:'绑定负载均衡',
		          	field:'bindlbl'
		          }
		        ];
		        
		        $scope.tcollheaders = [];
		        $scope.content = [];
		        for(var i=0;i<cl.metadata.length;i++){
		        	$scope.content.push({
		        		name:cl.metadata[i].name,
		        		replicas:cl.metadata[i].replicas,
		        		health_status:cl.metadata[i].status.current+"/"+cl.metadata[i].status.desired,
		        		created_at:$filter("date")(cl.metadata[i].created_at,'MM/dd/yyyy h:mm:ss'),
		        		collections:[],
		        		bindlbl:cl.metadata[i].bind.gamepublic&&cl.metadata[i].bind.gamepublic.length>0?cl.metadata[i].bind.gamepublic.join(","):""
		        	})
		        }
		        $scope.selected = [];
		        $scope.custom = {name: 'bold', replicas:'grey',health_status: 'grey',created_at:'grey',bindlbl:'grey'};
		        $scope.sortable = ['name', 'replicas', 'health_status','created_at','bindlbl'];
		        // $scope.thumbs = 'thumb';
		        $scope.count = 5;
		        var code = $compile('<md-table headers="headers" innerlinks="applications/'+$routeParams.id+'" content="content" sortable="sortable" filters="search" thumbs="thumbs" isselect="true" selected="selected" modal="modal" collheaders="tcollheaders" getapidata="getcoldata" subhover="subhover" count="count"></md-table>')($scope);
	        	$("#cluter-table").html(code);

			})


			var lbs = restful.action({id:"@id",uuid:"@uuid"},$scope.baseurl+":id/lb?app_uuid=:uuid");

			var lb = lbs.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
				console.log(lb);
				$scope.theaders = [
		          {
		            name: '名称', 
		            field: 'name'
		          },{
		            name:'分发策略', 
		            field: 'sessionAffinity'
		          },{
		            name: '创建时间', 
		            field: 'created_at'
		          // },{
		          //   name:'More Action',
		          //   field:'more_action'
		          }
		        ];
		        $scope.collheaders = [];
		        if(lb.metadata[0]&&lb.metadata[0].lb[0]){
		        	for(var f in lb.metadata[0].lb[0]){
		        		if(f!='name'){
			        		$scope.collheaders.push(f);
			        	}
		        	}
		        }
		        console.log($scope.collheaders)
		        $scope.tcontent = [];
		        for(var i=0;i<lb.metadata.length;i++){
		        	$scope.tcontent.push({
		        		name:lb.metadata[i].name,
		        		sessionAffinity:$filter('i18n')(lb.metadata[i].sessionAffinity),
		        		created_at:$filter("date")(lb.metadata[i].created_at,'yyyy-MM-dd h:mm:ss'),
		        		collections:lb.metadata[i].lb
		        	})
		        }

		        $scope.subhover = function(e,clu,c){
		          if(c){
		            var w,h,t,l;
		            w = 'auto';//$(e.target).parents("tr").outerWidth()-20;
		            t = $(e.target).parents("tr")[0].offsetTop+$(e.target).parents("tr")[0].offsetHeight+20;
		            l = $(e.target)[0].offsetLeft+25;
		            var top = Math.abs(document.body.scrollTop);
		            var html = "";
		            for(var i=0;i<clu.images.length;i++){
		            	var label = clu.images[i].split("/")[clu.images[i].split("/").length-1];
		            	var name = label.split(":")[0];
		            	html += "<p><a href='image?name="+name+"'>"+clu.images[i]+"</a></p>";
		            }
		            $("#tiptool").html(html).css({
		              "width":w+"px",
		              "top":t+"px",
		              "left":l+"px",
		              "height":"auto",
		            }).addClass("show");
		          // }else{
		          //   $("#tiptool").removeClass('show')
		          }
				}


		        $scope.tselected = [];
		        $scope.tcustom = {name: 'bold', sessionAffinity:'grey',created_at: 'grey'};
		        $scope.tsortable = ['name', 'sessionAffinity', 'created_at'];
		        // $scope.tmodal = "#container_detail";
		        // $scope.thumbs = 'thumb';
		        $scope.tcount = 5;
		        var code = $compile('<md-table headers="theaders" content="tcontent" sortable="tsortable" subhover="subhover" filters="search" thumbs="tthumbs" isselect="true" selected="tselected" modal="tmodal" collheaders="collheaders" count="tcount"></md-table>')($scope);
	        	$("#lb-table").html(code);
			})


			$scope.getcoldata=function(c){
				console.log(c)
				if(!c.replicas)return;
				c.collections = [];
				var lsc = lbscol.get({id:$rootScope.current_tenant.id,name:c.name},function(){
					for(var i =0;i<lsc.metadata.length;i++){
						c.collections.push({
							name:lsc.metadata[i].name,
							private_ip:lsc.metadata[i].private_ip,
							started_at:$filter("date")(lsc.metadata[i].started_at,"yyyy-MM-dd h:mm:ss"),
							status:lsc.metadata[i].status.component,
							images:lsc.metadata[i].images
						})
					}
					$scope.tcollheaders = ["name","private_ip","status","started_at"];
				})
			}
	        

	        $scope.switchmain = function(index,t){
	        	if($(t).hasClass("shadow"))$(t).removeClass("shadow");
	        	else $(t).addClass('shadow');

	        	if(index==1){
	        		$(t).parents(".switchdiv").removeClass("right");
	        	}else{
	        		$(t).parents(".switchdiv").addClass("right");
	        	}
	        }

	        $scope.remove = function(){
	        	if($scope.tab=='cluster'){
		        	console.log($scope.selected)
		        	for(var i =0;i<$scope.selected.length;i++){
		        		(function(c,i){
		        			
	        				$http.delete($scope.baseurl+$rootScope.current_tenant.id+"/cluster/"+c).success(function(){
	        					for(var n=0;n<$scope.content.length;n++){
	        						if($scope.content[n].name==c){
	        							$scope.content.splice(n,1);
	        							break;
	        						}
	        					}
	        				})
		        			if(i==$scope.selected.length-1){
					        	Notify.showSimpleToast("应用删除成功",1);
					        }
		        		})($scope.selected[i].name,i)
		        	}
		        }else{
					console.log($scope.tselected)
		        	for(var i =0;i<$scope.tselected.length;i++){
		        		(function(c,i){
	        				$http.delete($scope.baseurl+$rootScope.current_tenant.id+"/lb/"+c).success(function(){
	        					for(var n=0;n<$scope.tcontent.length;n++){
	        						if($scope.tcontent[n].name==c){
	        							$scope.tcontent.splice(n,1);
	        							break;
	        						}
	        					}
	        				})
		        			if(i==$scope.tselected.length-1){
					        	Notify.showSimpleToast("应用删除成功",1);
					        }
		        		})($scope.tselected[i].name,i)
		        	}
		        }
	        }
		}
	])
	.controller('servicedetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful','$compile','instance',
		function($rootScope,$scope,$http,$timeout,$location,$window,$filter,$routeParams,restful,$compile,instance){
			console.log($routeParams)
			console.log("dfjasjflkajsdoijflksjaoifjsdlkajfo")
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

		}
	])
	.controller('createcluterctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful','Notify','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,restful,Notify,instance){
			
			$(document).scroll(function(){
				if($("#maincontent").length>0){
					if($(this).scrollTop()>=$("#maincontent")[0].offsetTop){
						$("#rightside").css({
							position:"fixed",
							top:$(this).scrollTop()-100,
							right:"10px"
						})
					}else{
						$("#rightside").attr("style","");
					}
				}
			})
			$scope.app_uuid = $routeParams.id;
			/**
			 * 获取当前处于哪个应用下
			 * @type {[type]}
			 */
			var apps = restful.action({type:"@id",uuid:"@uuid"},$scope.baseurl+":id/apps/:uuid");
			var app = apps.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
				console.log(instance.applictions)
				if(!instance.applications||instance.applications.length==0){
					instance.applications = [app.metadata[0]];
				}
				console.log(instance.applications)
			})
			/**
			 * 获取卷列表
			 * @type {[type]}
			 */
			var vol = restful.action({type:"@id",name:"@name"},$scope.baseurl+":id/volumes/:name");
	        console.log($rootScope.current_tenant)
	        var vo = vol.get({id:$rootScope.current_tenant.id},function(e){
		        $scope.volumns = vo.metadata;
		        console.log("卷列表：")
		        console.log($scope.volumns)
	        });
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
			var Cluter = restful.action({type:"@id"},$scope.baseurl+":id/cluster");
			$scope.checkname = function(){
				var reg =/^[A-Za-z\d-.]+$/;
				if(new RegExp(reg).test($scope.app_name)){
					$scope.nameifmatchreg = "";
				}else{
					$scope.nameifmatchreg = "md-input-invalid";
				}
				console.log($scope.nameifmatchreg)
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
		    $http.get($scope.baseurl+"flavors/").success(function(data){
				$scope.flavors = data["metadata"];
			})

			$scope.addtovolumns = function(obj,img){
				var it;
				for(var i=0;i<$scope.images.length;i++){
					if($scope.images[i].uuid == img.uuid){
						it = $scope.images[i];
						break;
					}
				}
				console.log(obj)
				for(var o in obj){
					it.volumns.push({
						uuid:o,
						mountpath:obj[o]
					})
				}
			}
			$scope.removeonevol = function(one,list,img){
				var it;
				for(var i=0;i<$scope.images.length;i++){
					if($scope.images[i].uuid == img.uuid){
						it = $scope.images[i];
						break;
					}
				}
				list.splice(list.indexOf(one),1);
				it.tempvol.splice(it.tempvol.indexOf(one.uuid),1);
				delete it.tempvlm[one.uuid];
			}
		    // gethashtag(imcfg.image)
		    $scope.getdata = function(img){
		    	for(var i=0;i<$scope.images.length;i++){
		    		$scope.images[i].isopen = false;
		    	}
		    	img.isopen = !img.isopen;
		    	img.image = !img.is_official?(img.url+"/"+img.tenant_name+"/"+img.name):(img.url+"/"+img.name);
		    	$scope.gethashtag(img.image);

		    }
		    $scope.images_config = [];
		    $scope.savetobox = function(img){
		    	if(!img.tag){Notify.showSimpleToast("请选择版本",-1); return;}
		    	if(!img.flavor){Notify.showSimpleToast("请选择配置",-1); return;}
		    	img.issave = !img.issave;
		    	$scope.images_config.push({
		    		name:img.name,
		    		id:img.uuid,
		    		image:img.image,
		    		tag:img.tag,
		    		flavor:img.flavor,
		    		more_cfg:img.more_cfg,//控制高级选项是否显示
					env:img.env,//环境配置
					ports:img.ports,//端口配置
					tempobj:img.tempobj,
					portobj:img.portobj,
					command:img.strcom.split(" "),
					args:img.strargs.split(" "),
					volumes:img.volumns
		    	})
		    }

		    $scope.removefrombox = function(img){
		    	for(var i =0;i<$scope.images.length;i++){
		    		if($scope.images[i].uuid == img.id){
		    			$scope.images[i].issave = !$scope.images[i].issave;
		    			break;
		    		}
		    	}
		    	// img.issave = !img.issave;
		    	for(var i =0;i<$scope.images_config.length;i++){
		    		if($scope.images_config[i].id == img.id){
		    			$scope.images_config.splice(i,1);
		    			break;
		    		}
		    	}
		    }
		    $scope.hasimg = function(img){
		    	var flag = false;
		    	for(var i=0;i<$scope.images_config.length;i++){
		    		if($scope.images_config[i].id == img.uuid){
		    			flag = true;
		    			break;
		    		}
		    	}
		    	return flag;
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
					console.log("2222)")

					var reqdata = [];
					for(var i=0;i<$scope.images_config.length;i++){
						var im = $scope.images_config[i];
						var obj = {
							// name:im.name,
							image:im.image+":"+im.tag,
							flavor_uuid:im.flavor,
							command:im.command,
							args:im.args,
							volumes:im.volumes
						};
						console.log(obj.image)
						obj.image = obj.image.replace(/\s+/g, "");
						console.log(obj.image)
						if(im.env.length>0)obj.env = im.env;
						// if(im.ports.length>0)obj.ports  = im.ports;
						// delete obj.ports;
						reqdata.push(obj);
					}
					console.log(reqdata);
					// return false;
					var clu = Cluter.save({id:$rootScope.current_tenant.id},{app_uuid:$scope.app_uuid,name:$scope.cluter_name,replicas:reqdata.length,containers:reqdata},function(){
						console.log(clu)
						$location.path("/applications/"+$scope.app_uuid);
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
	.controller('createlblctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful','Notify','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,restful,Notify,instance){
			
			$scope.app_uuid = $routeParams.id;
			/**
			 * 获取当前处于哪个应用下
			 * @type {[type]}
			 */
			var apps = restful.action({type:"@id",uuid:"@uuid"},$scope.baseurl+":id/apps/:uuid");
			var app = apps.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
				console.log(instance.applictions)
				if(!instance.applications||instance.applications.length==0){
					instance.applications = [app.metadata[0]];
				}
				console.log(instance.applications)
			})
			/**
			 * 获取集群列表
			 * @type {[type]}
			 */
			var clu = restful.action({id:"@id",uuid:"@uuid"},$scope.baseurl+":id/cluster?app_uuid=:uuid");
			var cl = clu.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
				$scope.clusters = cl.metadata;
			})

			var lb = restful.action({id:"@id"},$scope.baseurl+":id/lb");

			$scope.checkname = function(){
				var reg =/^[A-Za-z\d-.]+$/;
				if(new RegExp(reg).test($scope.app_name)){
					$scope.nameifmatchreg = "";
				}else{
					$scope.nameifmatchreg = "md-input-invalid";
				}
				console.log($scope.nameifmatchreg)
			}
			$scope.removeOnelblport = function(one,list){
				list.splice(list.indexOf(one),1);
			}
			/**
			 * [addlbl 增加负载均衡的方法]
			 * @param  {[type]} lbl [description]
			 * @return {[type]}     [description]
			 */
			$scope.addlbl = function(lbl){
				lbl["app_uuid"] = $scope.app_uuid;
				delete lbl['temppot'];
				lb.save({id:$rootScope.current_tenant.id},lbl,function(){
					Notify.showSimpleToast("添加负载均衡成功",1);
					$location.path("/applications/"+$scope.app_uuid);
				})
			}
		}
	])		
})