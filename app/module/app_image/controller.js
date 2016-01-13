'use strict';

define(['angular','modal','markdown','highlight','socket'],function(angular,modal,markdown,highlight,io){
	return angular.module("ThCofAngSeed.images_ctrl",['ThCofAngSeed.services'])
	.controller('imagesctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','restful','Notify','instance','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,restful,Notify,instance,$routeParams){
			
			console.log($routeParams)
			
			function geticon(text){
				var icon = ""
				if(text.name.indexOf("mysql")>-1){

				}
			}

			/**
			 * 获取我的列表
			 */
			 $scope.tab = 'recent';//'mine','market'

			var image = restful.action({type:"@id"},$scope.baseurl+":id/images");
	        $scope.refresh = function(){
		        var im = image.get({id:$rootScope.current_tenant.id},function(e){
		        	// $scope.images = im.metadata;
		        	console.log(im.metadata)
		        	Notify.showSimpleToast("我的列表请求成功",1);
		        	if(typeof im.metadata=="string")im.metadata = JSON.parse(im.metadata);
		        	$scope.imageshash = {};
		        	$scope.items = [];
		        	for(var i =0;i<im.metadata.length;i++){
		        		$scope.items.push({
		        			name:im.metadata[i].name,
		        			icon:im.metadata[i].icon||'image',
		        			id:im.metadata[i].uuid
		        		})
		        		$scope.imageshash[im.metadata[i].uuid] = im.metadata[i];
		        	}
		        });
		    }
		    $scope.refresh();

	        /**
	         * 获取最近使用
	         */
	        var hot = restful.action(null,$scope.baseurl+"hotimages");
	        $scope.refresh1 = function(){
		        var h = hot.get(function(){
		        	console.log(h.metadata)
		        	Notify.showSimpleToast("最近使用列表请求成功",1);
		        	if(typeof h.metadata=="string")h.metadata = JSON.parse(h.metadata);
		        	$scope.hotimageshash = {};
		        	$scope.hotitems = [];
		        	for(var i =0;i<h.metadata.length;i++){
		        		$scope.hotitems.push({
		        			name:h.metadata[i].name,
		        			icon:h.metadata[i].icon||'image',
		        			id:h.metadata[i].uuid
		        		})
		        		$scope.hotimageshash[h.metadata[i].uuid] = h.metadata[i];
		        	}
		        })
		    }
		    $scope.refresh1();

	        /**
	         * 获取镜像时常
	         */
	        var qname = restful.action({name:"@name"},$scope.baseurl+"topimages?q=:name");
	        var topk = restful.action({top:"@top"},$scope.baseurl+"topimages?topk=:top");
	        var q_topk = restful.action({name:"@name",top:"@top"},$scope.baseurl+"topimages?q=:name&topk=:top");
	        $scope.trefresh = function(){
		        var to = topk.get({top:20},function(){
		        	console.log(to.metadata)
		        	Notify.showSimpleToast("镜像市场请求成功",1);
		        	if(typeof to.metadata=="string")to.metadata = JSON.parse(to.metadata);
		        	$scope.markimageshash = {};
		        	$scope.markitems = [];
		        	for(var i =0;i<to.metadata.length;i++){
		        		$scope.markitems.push({
		        			name:to.metadata[i].name,
		        			icon:to.metadata[i].icon||'image',
		        			id:to.metadata[i].uuid
		        		})
		        		$scope.markimageshash[to.metadata[i].uuid] = to.metadata[i];
		        	}
		        	$scope.defaultmark = $scope.markitems;
		        })
	    	}
	    	$scope.trefresh();

	        $scope.searchimage = function(code){
	        	if($scope.tab == "market"&&code ==13){
	        		var seq = q_topk.get({name:$scope.imagectrl.search,top:20},function(){
	        			for(var i =0;i<seq.metadata.length;i++){
			        		$scope.markitems.push({
			        			name:seq.metadata[i].name,
			        			icon:seq.metadata[i].icon||'image',
			        			id:seq.metadata[i].uuid
			        		})
			        	}
			        	Notify.showSimpleToast("查询成功",1);
	        		})
	        	}
	        }
	        $scope.returndefault = function(){
	        	if($scope.imagectrl.search==""){
	        		$scope.markitems = $scope.defaultmark;
	        	}else{
	        		return;
	        	}
	        }
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

			$scope.listItemClick = function($event,id) {
				instance.current_image = $scope.imageshash[id];

		    	// $timeout(function(){
		    	// 	$mdBottomSheet.show({
				   //    templateUrl: 'module/app_image/image-detail.html',
				   //    controller: 'imagedetailctrl',
				   //    targetEvent: $event,
				   //    parent:"#images"
				   //  }).then(function(clickedItem) {
				   //  	// console.log(clickedItem)
				   //    // $scope.alert = clickedItem.name + ' clicked!';
				   //  });
		    	// });
			    
			}; 

			$rootScope.$watch("current_tenant",function(e,v){
				if(e.id==v.id||!e||!v)return false;
				$scope.refresh();
				if($scope.refresh1)$scope.refresh1();
				if($scope.trefresh)$scope.trefresh();
			})
			// $timeout(function(){
			// 	if($routeParams.name){
		 //        	$("#tab-content-2 #images .images_list md-list md-list-item").find("button[data-name='"+$routeParams.name+"']").trigger("click");
	  //       	}
			// },800)
		}
	])
	.controller('imagedetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','instance','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,instance,$routeParams){
			var id = $routeParams.id;
			$http.get($scope.baseurl+$rootScope.current_tenant.id+"/images/"+id).success(function(data){
				console.log(data)
				$scope.current_image = data.metadata[0];
				if($scope.current_image.readme&&!$scope.current_image.convert_rm){
		    		// $scope.current_image.readme = markdown.toHTML($scope.current_image.readme);
		    		$scope.current_image.convert_rm = true;
		    	}
		    	if($scope.current_image.dockerfile&&!$scope.current_image.convert_df){
		    		// $scope.current_image.dockerfile = markdown.toHTML($scope.current_image.dockerfile);	
		    		$scope.current_image.convert_df = true;
		    	}
		    	console.log($scope.current_image);
			})
			// $timeout(function(){
			// 	$("#images").css("height",200+$("#images md-bottom-sheet:first")[0].offsetHeight);
			// },100)
		}
	])
	.controller('createimagectrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','restful','Notify','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,restful,Notify,instance){
			var _t = this;
			/**
			 * [上传图片并裁切的方法]
			 * @myImage {String} 原图
			 * @myCroppedImage {String} dataurl格式的图片
			 */
			_t.isurl = function(str_url){        
			    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"         
			                    + "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@        
			                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184        
			                    + "|" // 允许IP和DOMAIN（域名）        
			                    + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.        
			                    + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名        
			                    + "[a-zA-Z]{2,6})" // first level domain- .com or .museum        
			                    + "(:[0-9]{1,4})?" // 端口- :80        
			                    + "((/?)|"         
			                    + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";        
			    var re=new RegExp(strRegex);        
			    return re.test(str_url);        
			}
			var Images = restful.action({id:"@id"},$scope.baseurl+":id/build"); 
			$scope.image = {
				dockerfile_dir:"/",
				dockerfile_name:"Dockerfile"
			}; 
			$scope.myImage = '';
			$scope.myCroppedImage='';
			var handleFileSelect=function(evt) {
	          var file=evt.currentTarget.files[0];
	          var reader = new FileReader();
	          reader.onload = function (evt) {
	            $scope.$apply(function($scope){
	              $scope.myImage=evt.target.result;
	            });
	          };
	          reader.readAsDataURL(file);
	        };
	        $("#fileInput").on('change',handleFileSelect);
	        /**
	         * 点击带样式的静态上传按钮，触发真实上传按钮
	         * @return {[type]} [description]
	         */
	        $scope.triggerfile = function(){
	        	$("#fileInput").trigger("click");
	        }
	        /**
	         * 检测url是否输入正确
	         */
	        $scope.checkurl = function(){
				if(_t.isurl($scope.image.url)){
					$scope.urlifmatchreg = "";
				}else{
					$scope.urlifmatchreg = "md-input-invalid";
				}
			}
	        /**
	         * 创建image方法
	         */
	        $scope.createimage = function(){
	        	var data = {};
	        	for(var i in $scope.image){
	        		if(i=="url"){
	        			data["repo"] = $scope.image[i];
	        		}else{
	        			data[i] = $scope.image[i];
	        		}

	        	}
	        	console.log(data)
	        	var ims = Images.save({id:$rootScope.current_tenant.id},data,function(){
					console.log(ims)
					if(ims.code==0){
						Notify.showSimpleToast("操作成功",1);
					}else if(ims.code>0){
						Notify.showSimpleToast(ims.message,-1);
					}else if(ims.code<0){
						Notify.showSimpleToast(ims.message,0)
					}
					$location.path("/log/"+ims.metadata[0].uuid)
					// ap.name = $scope.app_name;
					// ap.containers = reqdata;
					// ap.$save();
				});
	        }

	        

		}
	])
	.controller('logsctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','restful','Notify','instance','$compile','AuthService','$mdDialog',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,restful,Notify,instance,$compile,AuthService,$mdDialog){
			var plat = restful.action({type:"@id",jobid:"@jobid",number:"@number"},$scope.baseurl+":id/build/:jobid/:number");
	        console.log($rootScope.current_tenant)
		    $scope.refresh = function(){ 
		        var pl = plat.get({id:$rootScope.current_tenant.id},function(e){
		        	console.timeEnd("restful game");

		        	console.time("rendered table")
			        Notify.showSimpleToast("构建记录列表请求成功",1);
			        console.log(pl.metadata)
			        $scope.headers = [{
			        	name:'镜像名',
			        	field:'name'
			        },{
			        	name:'构建人',
			        	field:'build_user'
		        	},{
			        	name:'地址',
			        	field:'repo_url'
			        },{
			        	name:'状态',
			        	field:'build_state'
			        // },{
			        // 	name:'服务地址',
			        // 	field:'selfLink'
			        },{
			        	name:'上次构建时间',
			        	field:'updated_at'
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
			        	var time = $filter('date')(s.updated_at,"MM-dd-yyyy h:mma");
			        	var obj = {
			        		"uuid":s.uuid,
			        		"name":s.name,
			        		"build_user":s.build_user,
			        		"build_state":s.build_state,
			        		"repo_url":s.repo_url,
			        		"updated_at":time,
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
			        $scope.custom = {name: 'bold', build_user:'grey',build_state:'grey',repo_url:'grey',updated_at:'grey'};
			        $scope.sortable = ['name','build_user','build_state','repo_url','updated_at'];
			        $scope.count = 100;
			        $scope.links = '/log';
			        $scope.selected = [];
			        $scope.action = {
			        	name:"重构",
			        	args:{},
			        	trigger:function(t){
			        		$http.put($scope.baseurl+$rootScope.current_tenant.id+"/build/"+$scope.action.args.uuid+"?action=redo").success(function(data){
								Notify.showSimpleToast("正在重构",0);
								$(t.target).attr("disabled",true);
								$(t.target).find("span").before('<i class="fa fa-refresh fa-spin"></i>')
							})
			        	}
			        }

			        instance["logs"] = $scope.content;
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
		        	var code = $compile('<md-table headers="headers" content="content" refresh="refresh" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" count="count" isselect="true" action="action" selected="selected" links="links" func="func"></md-table>')($scope);
		        	$("#prolist").html(code);
			        // }
		        });
			}
			$scope.refresh();
			$scope.rebuild = function(){
				if($scope.selected.length==0){
					Notify.showSimpleToast("请至少选择一项",-1);
				}
				for(var i=0;i<$scope.selected.length;i++){
					var id = $scope.selected[i].uuid;
					(function(id){
						$http.put($scope.baseurl+$rootScope.current_tenant.id+"/build/"+id+"/?action=redo").success(function(data){
							if(data.code==0){
								Notify.showSimpleToast("操作成功",1);
							}else if(data.code>0){
								Notify.showSimpleToast(data.message,-1);
							}else if(data.code<0){
								Notify.showSimpleToast(data.message,0)
							}
						})
					})(id)
				}
				$scope.selected = [];
				console.log($scope.selected)
			}

			$scope.removebuild = function(ev){
				if($scope.selected.length==0){
					Notify.showSimpleToast("请至少选择一项",-1);
				}
				var confirm = $mdDialog.confirm()
			    .title('删除确认')
			    .content('你确定要删除所选应用吗？')
			    .ariaLabel('Lucky day')
			    .targetEvent(ev)
			    .ok('确定')
			    .cancel('取消');
			    $mdDialog.show(confirm).then(function() {
		       		for(var i=0;i<$scope.selected.length;i++){
						var id = $scope.selected[i].uuid;
						(function(id){
							$http.delete($scope.baseurl+$rootScope.current_tenant.id+"/build/"+id).success(function(data){
								for(var x =0;x<$scope.content.length;x++){
									if($scope.content[x].uuid==id){
										$scope.content.splice(x,1);
										break;
									}
								}
								Notify.showSimpleToast("删除成功",-1);
							})
						})(id)
					}
			    }, function() {
			      $scope.selected = [];
			    });
				
			}

			/**
			 * socket
			 */
			var url = $scope.baseurl.replace("http","ws");
			var token = JSON.parse(AuthService.getInfo()).access.token.id;
			url += "socket/bus/"+$rootScope.current_tenant.id+"?token="+token;
			var ws = new WebSocket(url);
			console.log(ws)
			// ws.debug = true;
			ws.onopen = function(){
				console.log("已连接")
				ws.onmessage = function(event){
					var data = JSON.parse(event.data);
					console.log(data);
				}
			}

			$rootScope.$watch("current_tenant",function(e,v){
				if(e.id==v.id||!e||!v)return false;
				$scope.refresh();
				if($scope.refresh1)$scope.refresh1();
				if($scope.trefresh)$scope.trefresh();
			})

		}
	])
	.controller('logsdetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','restful','Notify','instance','$compile','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,restful,Notify,instance,$compile,$routeParams){
			console.log($routeParams)
			var logs = restful.action({type:"@id",jobid:"@jobid",number:"@number"},$scope.baseurl+":id/build/:jobid/:number");
	        console.log($rootScope.current_tenant)
	        $scope.refresh = function(){
		        var log = logs.get({id:$rootScope.current_tenant.id,jobid:$routeParams.id},function(e){	
		        	$scope.loglist = log.metadata;
		        	$scope.logone = {name:log.metadata[0].job_name,uuid:$routeParams.id};
					if(!instance.logs||instance.logs.length==0){
						instance.logs = [$scope.logone];
					}
		        })
		    }
		    $scope.refresh();

	        $scope.getdata = function(l){
	        	//先把其他的都关了
	        	for(var i =0;i<$scope.loglist.length;i++){
	        		if($scope.loglist[i]!=l){
	        			$scope.loglist[i]["isopen"] = false;
	        		}
	        		
	        	}
	        	l.isopen = !l.isopen;
	        	var t_log = logs.get({id:$rootScope.current_tenant.id,jobid:$routeParams.id,number:l.number},function(){
	        		console.log(t_log)
	        		l.console = t_log.metadata[0];
	        		$timeout(function(){
	        			$('pre code').each(function(i, block) {
						    hljs.highlightBlock(block);
						  });
	        		},0)
	        	})
	        }

	        $scope.stopimage = function(log){
				$http.put($scope.baseurl+$rootScope.current_tenant.id+"/build/"+log.uuid+"/"+log.number+"?action=stop").success(function(datadata){
					if(data.code==0){
						Notify.showSimpleToast("操作成功",1);
					}else if(data.code>0){
						Notify.showSimpleToast(data.message,-1);
					}else if(data.code<0){
						Notify.showSimpleToast(data.message,0)
					}
				})
				console.log($scope.selected)
			}

			$rootScope.$watch("current_tenant",function(e,v){
				if(e.id==v.id||!e||!v)return false;
				$scope.refresh();
				if($scope.refresh1)$scope.refresh1();
				if($scope.trefresh)$scope.trefresh();
			})

		}
	])
})