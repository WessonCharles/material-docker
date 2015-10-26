// (function(){
	'user strict';
	/*formDataObject*/
	define(["angular"],function(angular){
		window.ThCofAngSeedConfig = angular.module('ThCofAngSeed.configs', ['ngMaterial']);
		window.ThCofAngSeedConfig.config(['$mdThemingProvider',function($mdThemingProvider){
			$mdThemingProvider.theme('default')
		    .primaryPalette('blue')
		    .accentPalette('red');
		    // .backgroundPalette('grey');
		 	// $mdThemingProvider.definePalette('amazingPaletteName', {
			 //    '50': 'ffebee',
			 //    '100': 'ffcdd2',
			 //    '200': 'ef9a9a',
			 //    '300': 'e57373',
			 //    '400': 'ef5350',
			 //    '500': 'f44336',
			 //    '600': 'e53935',
			 //    '700': 'd32f2f',
			 //    '800': 'c62828',
			 //    '900': 'b71c1c',
			 //    'A100': 'ff8a80',
			 //    'A200': 'ff5252',
			 //    'A400': 'ff1744',
			 //    'A700': 'd50000',
			 //    'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
			 //                                        // on this palette should be dark or light
			 //    'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
			 //     '200', '300', '400', 'A100'],
			 //    'contrastLightColors': undefined    // could also specify this if default was 'dark'
			 //  });
			 //  $mdThemingProvider.theme('default')
			 //    .primaryPalette('amazingPaletteName')
		}])
		.config(['$sceDelegateProvider',function($sceDelegateProvider){
			$sceDelegateProvider.resourceUrlWhitelist([/*¿çÓò°×Ãûµ¥*/
			   /*ÔÊÐíÏàÍ¬ÓòÃûµÄÔ¶³Ì×ÊÔ´¼ÓÔØ*/
			   'self',
			   'http://console.lightcloud.cn:5000/**',
			   'http://libs.baidu.com/**',
			   'http://libs.useso.com/**',
			   ]);
			}
		])
		.config(['$httpProvider', function($httpProvider){
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
            $httpProvider.defaults.useXDomain = true;
            // delete $httpProvider.defaults.headers.common['X-Requested-With'];
          //   $httpProvider.interceptors.push('formsubmit');
          //   $httpProvider.responseInterceptors.push('securityInterceptor');

          //   //处理所有弹框响应请求时的操作
          //   var $http,
          //   interceptor = ['$q', '$injector', function ($q, $injector) {
          //       var error;

          //       function success(response) {
          //         // console.log(response)
          //           // get $http via $injector because of circular dependency problem
          //           $http = $http || $injector.get('$http');
          //           if($http.pendingRequests.length < 1) {
          //           }
          //           /*防止重复提交*/
          //           if(response.config.method=="POST"||response.config.method=="PUT"||response.config.method=="DELETE"){
          //             if($("#page-wrapper").find(".modal:visible").attr("id")!="changeall"
          //               &&$("#page-wrapper").find(".modal:visible").attr("id")!="createhost"){
          //                 $("#page-wrapper").find(".modal:visible").find(".load-respond").remove();
          //               if($("#page-wrapper").find(".modal:visible").find(".progress .progress-bar").length>0){
          //                   $("#page-wrapper").find(".modal:visible").find(".progress .progress-bar").css("width","0")
          //               }
          //             }
          //             setTimeout(function(){
          //               if($("#page-wrapper").find(".modal:visible").attr("id")!="changeall"&&
          //                 $("#page-wrapper").find(".modal:visible").attr("id")!="createhost"){
          //                 $("#page-wrapper").find(".modal:visible").modal("hide");    
          //               }
          //             },200)
                      
          //           }
          //           return response;
          //       }

          //       function error(response) {
          //           // get $http via $injector because of circular dependency problem
          //           $http = $http || $injector.get('$http');
          //           if($http.pendingRequests.length < 1) {
          //           }
          //           if(response.config&&(response.config.method=="POST"||response.config.method=="PUT"||response.config.method=="DELETE")){
          //             if($("#page-wrapper").find(".modal:visible").attr("id")!="changeall"){
          //                 $("#page-wrapper").find(".modal:visible").find(".load-respond").remove();
          //                 if($("#page-wrapper").find(".modal:visible").find(".progress .progress-bar").length>0){
          //                     $("#page-wrapper").find(".modal:visible").find(".progress .progress-bar").css("width","0")
          //                 }
          //             }
          //             setTimeout(function(){
          //               if($("#page-wrapper").find(".modal:visible").attr("id")!="changeall"){
          //                 $("#page-wrapper").find(".modal:visible").modal("hide");    
          //               }
          //             },200)
                      
          //           }
          //           return $q.reject(response);
          //       }

          //       return function (promise) {
          //           return promise.then(success, error);
          //       }
          //   }];

          // $httpProvider.responseInterceptors.push(interceptor);
        }])
        .provider('securityInterceptor', function() {
            this.$get = function($location, $q) {
              return function(promise) {
                return promise.then(null, function(response) {
                  console.log("请求执行了")
                  console.log(response)
                  if(response&&response.data&&response.data.error&&response.data.error.message=="Invalid user / password"){
                      Opstack.showStatus("登录名或密码错误",3);
                  }else if(response.status === 403 || response.status === 401) {//token过期或无效的token
                    Opstack.setCookie("lc-history-path",null);
                    Opstack.setCookie("lc-history-path",$location.url());
                    $("#wrapper #alertwarning").modal("show");
                    // setTimeout(function(){
                    //   window.location.href = "/login";//暂时先跳转到首页
                    // },2000)
                    
                    // $location.path('/');
                  }else if(response.status===500 || response.status===503){
                      $("#page-wrapper").find(".modal:visible").modal("hide");
                      var who = "";
                      if(response.config.url.indexOf("compute")>-1||response.config.url.indexOf("cmdb")>-1){
                        who = "继伟";
                      }
                      if(response.config.url.indexOf("game")>-1){
                        who = "曹正";
                      }
                      Opstack.showStatus("很遗憾，后端挂了！请找："+who,6);
                  }
                  return $q.reject(response);
                });
              };
            };
        })
		return window.ThCofAngSeedConfig;
	})
// }());