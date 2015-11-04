'use strict';

define(['angular','modal','markdown'],function(angular,modal,markdown){
	return angular.module("ThCofAngSeed.images_ctrl",['ThCofAngSeed.services.formDataObject'])
	.controller('imagesctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','restful','Notify','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,restful,Notify,instance){
			
			var image = restful.action({type:"@id"},$scope.baseurl+":id/images");
	        var im = image.get({id:$rootScope.current_tenant.id},function(e){
	        	// $scope.images = im.metadata;
	        	console.log(im.metadata)
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

		    	$timeout(function(){
		    		$mdBottomSheet.show({
				      templateUrl: 'module/app_image/image-detail.html',
				      controller: 'imagedetailctrl',
				      targetEvent: $event,
				      parent:"#images"
				    }).then(function(clickedItem) {
				    	// console.log(clickedItem)
				      // $scope.alert = clickedItem.name + ' clicked!';
				    });
		    	});
			    
			};   
		}
	])
	.controller('imagedetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','instance',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,instance){
			$scope.current_image = instance.current_image;
			if($scope.current_image.readme&&!$scope.current_image.convert_rm){
	    		$scope.current_image.readme = markdown.toHTML($scope.current_image.readme);
	    		$scope.current_image.convert_rm = true;
	    	}
	    	if($scope.current_image.dockerfile&&!$scope.current_image.convert_df){
	    		$scope.current_image.dockerfile = markdown.toHTML($scope.current_image.dockerfile);	
	    		$scope.current_image.convert_df = true;
	    	}
	    	console.log($scope.current_image);
			$timeout(function(){
				$("#images").css("height",200+$("#images md-bottom-sheet:first")[0].offsetHeight);
			},100)
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
			var Images = restful.action({id:"@id",name:"@name"},$scope.baseurl+":id/images/:name"); 
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
	        	var ims = Images.save({id:$rootScope.current_tenant.id},data,function(){
					console.log(ims)
					Notify.showSimpleToast("镜像创建成功",1);
					$location.path("/image")
					// ap.name = $scope.app_name;
					// ap.containers = reqdata;
					// ap.$save();
				});
	        }

	        

		}
	])
})