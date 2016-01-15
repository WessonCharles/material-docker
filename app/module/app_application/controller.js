'use strict';

define(['angular','modal','highcharts'],function(angular,modal,highcharts){
	return angular.module("ThCofAngSeed.pod_ctrl",['ThCofAngSeed.services','ngMaterial'])
	.controller('podctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful','Notify','$mdBottomSheet','$mdDialog','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful,Notify,$mdBottomSheet,$mdDialog,instance){
			/**
	         * buttondown example
	         */
	        $rootScope.intro = {
	        	title:"应用中心",
	        	content:"我们为您提供服务的分类,这种分类体现就是 应用,您可以将一个论坛,官网分别创建在不同的应用下,以便您能快速的查找到."
	        }

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
	        $scope.refresh = function(){
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
		        	var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" refresh="refresh" custom-class="custom" thumbs="thumbs" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
		        	$("#prolist").html(code);
			        // }
		        });
	        }
	        $scope.refresh();
	        
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
					if(ap.code==0){
						Notify.showSimpleToast("操作成功",1);
					}else if(ap.code>0){
						Notify.showSimpleToast(ap.message,-1);
					}else if(ap.code<0){
						Notify.showSimpleToast(ap.message,0)
					}

					$scope.content.push(ap.metadata[0]);
					$location.path("/applications");
				});
			};

			$rootScope.$watch("current_tenant",function(e,v){
				if(e.id==v.id||!e||!v)return false;
				$scope.refresh();
				if($scope.refresh1)$scope.refresh1();
				if($scope.trefresh)$scope.trefresh();
			})
		}
	])
	.controller('prodetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful','$compile','instance','Notify','$mdDialog',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,restful,$compile,instance,Notify,$mdDialog){
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
			// 
			
	                $rootScope.intro = {
	                	title:"集群",
	                	content:"我们将所有的基础服务以集群的方式来运行,有了集群,在日后,您可以轻松的对集群进行横向扩展(扩容/缩容)."
	                }
			
	        $scope.changetitle = function(p){
	        	$rootScope.intro = p=='cluster'?{
	                	title:"集群",
	                	content:"我们将所有的基础服务以集群的方式来运行,有了集群,在日后,您可以轻松的对集群进行横向扩展(扩容/缩容)."
	                }:{
	                	title:"负载均衡",
	                	content:"对多个后端应用提供一个统一的接口,它自动将到达的流量按照分发策略转发到后端关联的集群应用中."
	                }	
	        }

			$scope.toggleSearch = false; 

			$scope.tab = 'cluster';
			var clu = restful.action({id:"@id",uuid:"@uuid"},$scope.baseurl+":id/cluster?app_uuid=:uuid");
			var lbscol = restful.action({id:"@id",name:"@name"},$scope.baseurl+":id/cluster/:name");
			$scope.refresh = function(){
				var cl = clu.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
					console.log(cl);
					Notify.showSimpleToast("集群列表请求成功",1);
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
			            name:'绑定的负载均衡',
			            field:'lb_lists'
			          },{
                                      name:'负载均衡公网IP',
                                      field:'lb_public'
                                  },{
                                      name:'负载均衡集群IP',
                                      field:'lb_private'
                                  }
			        ];
			        
			        $scope.tcollheaders = [];
			        $scope.content = [];
			        for(var i=0;i<cl.metadata.length;i++){
                                        var lb_lists = [], lb_public = [], lb_private = [];
                                        var bind = cl.metadata[i].bind;
                                        for(var m=0;m<bind.length;m++){
                                            lb_lists.push(bind[m].name);
                                            if(bind[m].public_ip&&bind[m].public_ip.length>0){
                                                lb_public.push(bind[m].public_ip.join(","));
                                            }
                                            lb_private.push(bind[m].private_ip);
                                        }
			        	/*var bind = JSON.stringify(cl.metadata[i].bind);
			        	if(bind=='{}'){
			        		bind = "";
			        	}
			        	bind = bind.replace(/\{/g,'').replace(/\]}/g,'').replace(/\[/g,'');
			        	bind = bind.replace(/"/g,'');
			        	bind = bind.replace(/],/g,';')*/
			        	$scope.content.push({
			        		name:cl.metadata[i].name,
			        		replicas:cl.metadata[i].replicas,
			        		health_status:cl.metadata[i].status.current+"/"+cl.metadata[i].status.desired,
			        		created_at:$filter("date")(cl.metadata[i].created_at,'yyyy-MM-dd HH:mm:ss'),
			        		collections:[],
			        		lb_lists:lb_lists.join(","),
                                                lb_public:lb_public.join(","),
                                                lb_private:lb_private.join(",")
			        	})
			        }
			        $scope.selected = [];
			        $scope.custom = {name: 'bold', replicas:'grey',health_status: 'grey',created_at:'grey',lb_lists:'grey',lb_public:'grey',lb_private:'grey'};
			        $scope.sortable = ['name', 'replicas', 'health_status','created_at','lb_lists','lb_public','lb_private'];
			        // $scope.thumbs = 'thumb';
			        $scope.count = 5;
			        var code = $compile('<md-table headers="headers" innerlinks="applications/'+$routeParams.id+'" refresh="refresh" content="content" sortable="sortable" filters="search" thumbs="thumbs" isselect="true" selected="selected" modal="modal" collheaders="tcollheaders" getapidata="getcoldata" subhover="subhover" count="count"></md-table>')($scope);
		        	$("#cluter-table").html(code);

				})
			}
			$scope.refresh();


			var lbs = restful.action({id:"@id",uuid:"@uuid"},$scope.baseurl+":id/lb?app_uuid=:uuid");
			$scope.refresh1 = function(){
				var lb = lbs.get({id:$rootScope.current_tenant.id,uuid:$routeParams.id},function(){
					console.log(lb);
					Notify.showSimpleToast("负载均衡列表请求成功",1);
					$scope.theaders = [
			          {
			            name: '名称', 
			            field: 'name'
			          },{
			            name:'分发策略', 
			            field: 'sessionAffinity'
			          },{
                                    name: '公网IP',
                                    field: 'publicip'
                                  },{
                                    name: '集群IP',
                                    field: 'private_ip'
                                  },{
			            name:'内部域名',
			            field:'domain'
                                  },{
                                    name:'绑定的集群',
                                    field:'clusters'
			          },{
			            name: '创建时间', 
			            field: 'created_at'
			          // },{
			          //   name:'More Action',
			          //   field:'more_action'
			          }
			        ];
			        $scope.collheaders = ["instance","protocol","xxx","endpoint","xxx","xxx","created_at"];
			        /*if(lb.metadata[0]&&lb.metadata[0].lb[0]){
			        	for(var f in lb.metadata[0].lb[0]){
			        		if(f!='name'){
				        		$scope.collheaders.push(f);
				        	}
			        	}
			        }*/
			        console.log($scope.collheaders)
			        $scope.tcontent = [];
			        for(var i=0;i<lb.metadata.length;i++){
                                        var publicIP = lb.metadata[i].public_ip.join(",");
                                        var sub_endpoint = lb.metadata[i].endpoints;
                                        sub_endpoint["xxx"] = "";
                                        sub_endpoint.created_at = $filter("date")(lb.metadata[i].created_at,'yyyy-MM-dd HH:mm:ss');
			        	$scope.tcontent.push({
			        		name:lb.metadata[i].name,
			        		sessionAffinity:$filter('i18n')(lb.metadata[i].sessionAffinity),
			        		domain:lb.metadata[i].domain,
			        		created_at:$filter("date")(lb.metadata[i].created_at,'yyyy-MM-dd HH:mm:ss'),
			        		collections:sub_endpoint,
                                                publicip:publicIP,
                                                private_ip:lb.metadata[i].private_ip,
                                                clusters:lb.metadata[i].binds.join(",")
			        	})
			        }

			        $scope.subhover = function(e,clu,c){
			          if(c){
			            var w,h,t,l;
			            w = 'auto';//$(e.target).parents("tr").outerWidth()-20;
			            t = $(e.target).parents("tr")[0].offsetTop+$(e.target).parents("tr")[0].offsetHeight+50;
			            l = $(e.target)[0].offsetLeft+25;
			            var top = Math.abs(document.body.scrollTop);
			            var html = "";
			            for(var i=0;i<clu.images.length;i++){
			            	var tname = clu.images[i].split("/")[1];
			            	var label = clu.images[i].split("/")[clu.images[i].split("/").length-1];
			            	var name = label.split(":")[0];
			            	html += "<p><a href='image/"+tname+"/"+name+"'>"+clu.images[i]+"</a></p>";
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
			        $scope.tcustom = {name: 'bold', sessionAffinity:'grey',domain:'grey',created_at:'grey',publicip:'grey',private_ip:'grey',clusters:'grey'};
			        $scope.tsortable = ['name', 'sessionAffinity','domain','created_at','publicip','private_ip','clusters'];
			        // $scope.tmodal = "#container_detail";
			        // $scope.thumbs = 'thumb';
			        $scope.tcount = 5;
			        var code = $compile('<md-table headers="theaders" content="tcontent" refresh="refresh1" sortable="tsortable" subhover="subhover" filters="search" thumbs="tthumbs" isselect="true" selected="tselected" modal="tmodal" collheaders="collheaders" count="tcount"></md-table>')($scope);
		        	$("#lb-table").html(code);
				})
			}
			$scope.refresh1();

			$scope.getcoldata=function(c){
				console.log(c)
				if(!c.replicas)return;
				c.collections = [];
				var lsc = lbscol.get({id:$rootScope.current_tenant.id,name:c.name},function(){
					for(var i =0;i<lsc.metadata.length;i++){
						c.collections.push({
							name:lsc.metadata[i].name,
							private_ip:lsc.metadata[i].private_ip,
							started_at:$filter("date")(lsc.metadata[i].started_at,"yyyy-MM-dd HH:mm:ss"),
							status:lsc.metadata[i].status.component,
							images:lsc.metadata[i].images,
							component:lsc.metadata[i].component,
							host:lsc.metadata[i].host,
                                                        protocol:lsc.metadata[i].protocol,
							created_at:$filter("date")(lsc.metadata[i].created_at,"yyyy-MM-dd HH:mm:ss"),
                                                        xx:"",
						})
					}
					$scope.tcollheaders = ["name","private_ip","status","started_at","xx","xx","xx"];
					setTimeout(function(){
						Modal.init();
					},300)
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

	        $scope.remove = function(ev){
	        	var confirm = $mdDialog.confirm()
			    .title('删除确认')
			    .content('你确定要删除所选'+($scope.tab=='cluster'?"集群":"负载均衡")+'吗？')
			    .ariaLabel('Lucky day')
			    .targetEvent(ev)
			    .ok('确定')
			    .cancel('取消');
			    $mdDialog.show(confirm).then(function() {
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
			    }, function() {
			      $scope.selected = [];
			    });
	        }

	        $scope.ifcheckone = function(e){
	        	if($scope.selected.length==0){
	        		Notify.showSimpleToast("请至少选择一条",-1);
	        		e.stopPropagation();
	        		e.preventDefault(); 
	        		return false;
	        	}else if($scope.selected.length>1){
	        		Notify.showSimpleToast("只能选择一条进行操作",-1);
	        		e.stopPropagation();
	        		e.preventDefault(); 
	        		return false;
	        	}else{
	        		$scope.current_size = $scope.selected[0].replicas;
	        	}
	        }

	        $scope.resizem = function(t){
	        	$http.post($scope.baseurl+$rootScope.current_tenant.id+"/cluster/"+$scope.selected[0].name+"/do/scale",{size:$scope.resizenum}).success(function(data){
	        		$(t.target).parents(".modal").find(".modal__content").removeClass("modal__content--active");
					$(t.target).parents(".modal").removeClass("modal--active");
					$("button.modal__trigger").removeClass('modal__trigger--active').attr("style","");
					$("button.modal__trigger").find("#modal__temp").remove();
					for(var i =0;i<$scope.content.length;i++){
						if($scope.selected[0].name==$scope.content[i].name){
							$scope.content[i].replicas = data.metadata[0].replicas;
							break;
						}
					}
					$scope.selected = [];
	        	})
	        }

	        $rootScope.$watch("current_tenant",function(e,v){
				if(e.id==v.id||!e||!v)return false;
				$scope.refresh();
				if($scope.refresh1)$scope.refresh1();
				if($scope.trefresh)$scope.trefresh();
			})

		}
	])
	.controller('instancectrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful','$compile','instance','Notify',
		function($rootScope,$scope,$http,$timeout,$location,$window,$filter,$routeParams,restful,$compile,instance,Notify){
			console.log($routeParams)
			console.log("dsafsdfa")
			$scope.app_id = $routeParams.id;
			$scope.ins_name = $routeParams.name;
			var watch = restful.action({id:"@id",name:"@name",target:"@target"},$scope.baseurl+":id/metrics/:name/:target");

			var indexs = ["cpu_load","memory_usage","input_flow","output_flow"];
			function getmonitor(params){
				var req = {id:$rootScope.current_tenant.id,name:$scope.ins_name};
				if(params&&params.start)req["start"] = params.start,req["end"] = params.end;
				for(var i=0;i<indexs.length;i++){
					(function(i,name){
						req["target"] = name;
						var w = watch.get(req,function(){
							Notify.showSimpleToast("请求成功",1);
							var data = w.metadata[0];
							var startday = "",endday="",pstart = 0,serdata = [],maxvalue = 0,mintime = '';
							if(name=="cpu_load"){
								maxvalue = 1;
								for(var x = 0;x<w.metadata.length;x++){
									var time = [],dataval = [];
									var data = w.metadata[x];
									for(var n=0;n<data.values.length;n++){
										if(n==0||n==data.values.length-1){
											if(n==0){
												mintime = params&&params.start?$filter("date")(new Date(params.start*1000),"HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"HH:mm");
												startday = params&&params.start?$filter("date")(new Date(params.start*1000),"yyyy-MM-dd HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"yyyy-MM-dd HH:mm");
											}else{
												endday = params&&params.end?$filter("date")(new Date(params.end*1000),"yyyy-MM-dd HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"yyyy-MM-dd HH:mm");
											}
										}
										time.push($filter("date")(new Date((data.values[n][0])*1000),"HH:mm"));
										dataval.push(parseInt(data.values[n][1]));
									}
									serdata.push({
							            name: data.cpu,
							            data: dataval
							        })
								}
								console.log(serdata)
								
							}else if(name=="memory_usage"){
								var time = [],dataval = [];
								maxvalue = 10000;
								for(var n=0;n<data.values.length;n++){
									if(n==0||n==data.values.length-1){
										if(n==0){
												mintime = params&&params.start?$filter("date")(new Date(params.start*1000),"HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"HH:mm");
											startday = params&&params.start?$filter("date")(new Date(params.start*1000),"yyyy-MM-dd HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"yyyy-MM-dd HH:mm");
										}else{
											endday = params&&params.end?$filter("date")(new Date(params.end*1000),"yyyy-MM-dd HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"yyyy-MM-dd HH:mm");
										}
									}
									time.push($filter("date")(new Date((data.values[n][0])*1000),"HH:mm"));
									dataval.push(parseInt(data.values[n][1]));
								}
								serdata.push({
						            name: name,
						            data: dataval
						        })
								console.log(time)
								console.log(dataval)
							}else if(name=="input_flow"){
								maxvalue = 1000000;
								for(var x = 0;x<w.metadata.length;x++){
									var time = [],dataval = [];
									var data = w.metadata[x];
									for(var n=0;n<data.values.length;n++){
										if(n==0||n==data.values.length-1){
											if(n==0){
												mintime = params&&params.start?$filter("date")(new Date(params.start*1000),"HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"HH:mm");
												startday = params&&params.start?$filter("date")(new Date(params.start*1000),"yyyy-MM-dd HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"yyyy-MM-dd HH:mm");
											}else{
												endday = params&&params.end?$filter("date")(new Date(params.end*1000),"yyyy-MM-dd HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"yyyy-MM-dd HH:mm");
											}
										}
										time.push($filter("date")(new Date((data.values[n][0])*1000),"HH:mm"));
										dataval.push(parseInt(data.values[n][1]));
									}
									serdata.push({
							            name: data.interface,
							            data: dataval
							        })
								}
								console.log(serdata)
							}else if(name=="output_flow"){
								maxvalue = 1000000;
								for(var x = 0;x<w.metadata.length;x++){
									var time = [],dataval = [];
									var data = w.metadata[x];
									for(var n=0;n<data.values.length;n++){
										if(n==0||n==data.values.length-1){
											if(n==0){
												mintime = params&&params.start?$filter("date")(new Date(params.start*1000),"HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"HH:mm");
												startday = params&&params.start?$filter("date")(new Date(params.start*1000),"yyyy-MM-dd HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"yyyy-MM-dd HH:mm");
											}else{
												endday = params&&params.end?$filter("date")(new Date(params.end*1000),"yyyy-MM-dd HH:mm"):$filter("date")(new Date((data.values[n][0])*1000),"yyyy-MM-dd HH:mm");
											}
										}
										time.push($filter("date")(new Date((data.values[n][0])*1000),"HH:mm"));
										dataval.push(parseInt(data.values[n][1]));
									}
									serdata.push({
							            name: data.interface,
							            data: dataval
							        })
								}
								console.log(serdata)
							}
							if(name=="cpu_load"){
								$('#'+name).highcharts({
							        title: {
							            text: $filter('i18n')(name),
							            x: -20 //center
							        },
							        credits: {
									    enabled:false//去掉highcharts.com水印，很重要
									},
							        subtitle: {
							            text: '从'+startday+"到"+endday,
							            x: -20
							        },
							        xAxis: {
							            categories: time
							        },
							        yAxis: {
							            title: {
							                text: '使用量'//单位
							            },
							            plotLines: [{
							                value: 0,
							                width: maxvalue,
							                color: '#ffffff'
							            }]
							        },
							        tooltip: {
							            valueSuffix: ''//单位
							        },
							        legend: {
							            layout: 'vertical',
							            align: 'center',
							            verticalAlign: 'bottom',
							            borderWidth: 0
							        },
							        series: serdata
							    });
							}else{
								console.log("232434")
								var it = $('#'+name).highcharts({
									chart:{
										type:'areaspline'
									},
							        title: {
							            text: $filter('i18n')(name),
							            x: -20 //center
							        },
							        credits: {
									    enabled:false//去掉highcharts.com水印，很重要
									},
							        subtitle: {
							            text: '从'+startday+"到"+endday,
							            x: -20
							        },
							        xAxis: {
							            categories: time
							        },
							        yAxis: {
							            title: {
							                text: '使用量'//单位
							            },
							            labels: {
							                formatter: function() {
							                    return this.value;
							                }
							            }
							            // plotLines: [{
							            //     value: 0,
							            //     width: maxvalue,
							            //     color: '#ffffff'
							            // }]
							        },
							        tooltip: {
							            valueSuffix: ''
							        },
							        legend: {
							            layout: 'vertical',
							            align: 'left',
							            verticalAlign: 'top',
							            x: 150,
							            y: 100,
							            floating: true,
							            borderWidth: 1,
							            backgroundColor: '#FFFFFF'
							        },
							        plotOptions: {
							            areaspline: {
							                fillOpacity: 0.5
							            }
							        },
							        // legend: {
							        //     layout: 'vertical',
							        //     align: 'center',
							        //     verticalAlign: 'bottom',
							        //     borderWidth: 0
							        // },
							        series: serdata
							    });
								console.log(it)
							}
							
						})
					})(i,indexs[i])
				}
			}
			getmonitor();
			
			$scope.refreshmonitor = function(){
				console.log($scope.start)
				var temps = $scope.start.replace(/-/g,'/');
				temps+=":00";
				temps = new Date(temps).getTime()/1000;

				var tempe = $scope.end.replace(/-/g,'/');
				tempe+=":00";
				tempe = new Date(tempe).getTime()/1000;
				console.log(tempe)
				getmonitor({start:parseInt(temps),end:parseInt(tempe)})
			}

			$scope.timezone = function(e,type){
				$(e.target).parent().find(".active").removeClass("active");
				$(e.target).addClass("active");
				var now = new Date().getTime();
				var start;
				if(type=="hour"){
					start = now-3600*1000;
				}else if(type=="day"){
					start = now-3600*24*1000;
				}else if(type=="week"){
					start = now-3600*24*7*1000;
				}else if(type=="halfmonth"){
					start = now-3600*24*15*1000;
				}else{
					start = now-3600*24*30*1000;
				}
				getmonitor({start:parseInt(start/1000),end:parseInt(now/1000)});
			}

			$rootScope.$watch("current_tenant",function(e,v){
				if(e.id==v.id||!e||!v)return false;
				getmonitor();
			})
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
					return $filter('date')(c[$scope.getstatus(c)].startedAt,"MM-dd-yyyy HH:mm");
				}else{
					return '';
				}
			}
		}
	])
	.controller('createappctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','restful',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,restful){
			console.log(1)
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
			console.log("2")
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
			$scope.gethashtag = function(tname,name){
				var it= name;
				var url = "";
				if(name.indexOf("index.docker.io")>-1){
					url = "docker-hub/tags/"+tname+"/"+name.split("index.docker.io/")[1];
				}else{
					url = $rootScope.current_tenant.id+"/tags/"+tname+"/"+name.split("/")[name.split("/").length-1];
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
		    	$scope.gethashtag(img.tenant_name,img.image);

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
					var clu = Cluter.save({id:$rootScope.current_tenant.id},{app_uuid:$scope.app_uuid,name:$scope.cluter_name,replicas:reqdata.length,containers:reqdata},function(e){
						console.log(clu)
						if(e.code==0){
	                       Notify.showSimpleToast("创建集群成功",1);
							$location.path("/applications/"+$scope.app_uuid);
	                    }else if(e.code>0){
	                        Notify.showSimpleToast(e.message,-1);
	                    }else if(e.code<0){
	                        Notify.showSimpleToast(e.message,0)
	                    }
						
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
			console.log("3")
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
				var l = lb.save({id:$rootScope.current_tenant.id},lbl,function(e){
					console.log(e)
					if(e.code==0){
                       Notify.showSimpleToast("添加负载均衡成功",1);
						$location.path("/applications/"+$scope.app_uuid);
                    }else if(e.code>0){
                        Notify.showSimpleToast(e.message,-1);
                    }else if(e.code<0){
                        Notify.showSimpleToast(e.message,0)
                    }
				})
			}
		}
	])		
})
