'use strict';

/**
 * Main module of the application.
 */
define([
  "angular",
  "modal",
  "config",
  "service",
  "directive",
  "filters",
  "localization",
  "../module/app_application/controller",
  "../module/app_columns/controller",
  "../module/app_service/controller",
  "../module/app_image/controller",
  "../module/app_publicip/controller",
  "../module/app_system/controller",
  "../module/app_users/controller"
  ],function(angular){
  window.ThCofAngSeedModule = angular.module('ThCofAngSeed', [
      'ngRoute',
      'ngResource',
      'ngMaterial',
      'ngImgCrop',
      'ThCofAngSeed.configs',
      'ThCofAngSeed.services',
      'ThCofAngSeed.directives',
      'ThCofAngSeed.filters',
      'ThCofAngSeed.localization',
      'ThCofAngSeed.pod_ctrl',
      'ThCofAngSeed.columns_ctrl',
      'ThCofAngSeed.service_ctrl',
      'ThCofAngSeed.images_ctrl',
      'ThCofAngSeed.publicip_ctrl',
      'ThCofAngSeed.system_ctrl',
      'ThCofAngSeed.users_ctrl'
  ]).controller("baseCtrl",["$scope", "$http","$rootScope", "$location","$timeout", "$filter","$window",'$route','AuthService','$mdBottomSheet','instance',
      
      function($scope,$http,$rootScope,$location,$timeout,$filter,$window,$route,AuthService,$mdBottomSheet,instance){
        $scope.go = 1;

        $scope.baseurl = "http://42.51.161.236:8337/";
        $scope.storageurl = "http://42.51.131.4/";
        /**
         * [判断是否登陆，然后选择跳转不同的view]
         * @param  {[type]} window.getCookie("lightdocker") [description]
         * @return {[type]}                                 [description]
         */
        // if(AuthService.isAuthenticated()&&window.getCookie("lightdocker")){
        //   $rootScope.userinfo = JSON.parse(AuthService.getInfo());
        //   $http.defaults.headers.common['X-Auth-Token'] = $rootScope.userinfo['access']['token']['id'];
        //   $http.defaults.headers.common['Content-type'] = 'application/json';
        //  } 
        console.log(window.getCookie("lightdocker")+"--"+AuthService.isAuthenticated())
        if(window.getCookie("lightdocker")&&AuthService.isAuthenticated()){
          $rootScope.islogin = true;
          $http.defaults.headers.common['X-Auth-Token'] = JSON.parse(AuthService.getInfo()).access['token']['id'];
          $http.defaults.headers.common['Content-Type'] = 'application/json';

          /**
           * 当前用户
           */
          console.log(AuthService.getInfo())
          $rootScope.user = AuthService.getInfo()?JSON.parse(AuthService.getInfo()).access.user:{};
          /**
           * [所有项目，当前项目，以及选择项目方法
           * @type {[type]}
           */
          console.log(JSON.parse(AuthService.getInfo()))
          $rootScope.tenants = AuthService.getInfo()?JSON.parse(AuthService.getInfo()).access.tenants:[];
          if(!$rootScope.current_tenant) $rootScope.current_tenant = $rootScope.tenants[0];

          $scope.selectcurtenant = function(t){
            $rootScope.current_tenant = t;
          }
          $http.get($scope.baseurl+"menus").success(function(data){
            $scope.menus = data.metadata;
          })
        }else{
          $rootScope.islogin = false;
          $location.path("/login");
          delete $http.defaults.headers.common['X-Auth-Token'];
        }
        $scope.toggleside = function(){
          $("body .main").toggleClass("minside");
        }
        /**
         * [面包屑导航]
         * @type {[type]}
         */
        $scope.breads = window.location.pathname.split("/");
        console.log($scope.breads)
        /**
         * 获取面包屑导航中id对应的名称
         */
        $scope.getidname = function(b,breads){
          if(b.length>20){
            if(breads.join(".").indexOf("applications")>-1){
              var name = "";
              if(instance.applications){
                for(var i =0;i<instance.applications.length;i++){
                  if(b==instance.applications[i].uuid){
                    name = instance.applications[i].name;
                    break;
                  }
                }
              }else{
                name = b;
              }
              return name;
              
            }else if(breads.join(".").indexOf("log")>-1){
              var name = "";
              if(instance.logs){
                for(var i=0;i<instance.logs.length;i++){
                  if(b==instance.logs[i].uuid){
                    name = instance.logs[i].name;
                    break;
                  }
                }
              }else{
                name = b;
              }
              return name;
            }
          }else{
            return b;
          }
        }

        /**
         * [当前app选中状态]
         * @param  {[type]} t [description]
         * @return {[type]}   [description]
         */
        $scope.current_app = function(t){
          $scope.breads = window.location.pathname.split("/");
          if(('/'+t)==('/'+window.location.pathname.split("/")[1])){
            return 'active';
          }
          return '';
        }
        $rootScope.$on('$locationChangeStart',function(){//每次切换导航时，执行以下选中操作
            $scope.breads = window.location.pathname.split("/");
        })
        $rootScope.$on('locationChangeSuccess', function(){//刷新当前url地址,重新加载本页内容需要重载路由
            $scope.breads = window.location.pathname.split("/");
            console.log(window.location.pathname)
            $route.reload();
        });

        $rootScope.$on('$routeChangeSuccess',function(){
            $mdBottomSheet.hide();
        });
        /**
         * [路由变化时，即页面变化时增加方法]
         * @function 1 [页面转换动画
         *           1）由一级页面向二级页面转换时的动画
         *           和 一级页面向表单创建页面的转换
         *           增加viewload 最外层可看到边框的div增加bl-main类
         *           
         * ]
         * @param  {[type]} ){                     } [description]
         * @return {[type]}     [description]
         */
        $rootScope.$on('$routeChangeSuccess',function(){
            // 2）同样是一级页面之间的转换
            // if(window.location.pathname.split("/").length<3){
              $("#content .inner_content").removeClass("fadeInUpBig").addClass("hide");
              setTimeout(function(){$("#content .inner_content").addClass("fadeInUpBig");},10)
            // }
        });
        /**
         * [页面加载完成，初始化弹出框]
         * @param  {[type]} ){                       Modal.init();        } [description]
         * @return {[type]}     [description]
         */
        $scope.$on('$viewContentLoaded',function(){
          Modal.init();
        })

        /**
         * [deletoken 删除过期头]
         * @return {[type]} [description]
         */
        $rootScope.deletoken = function(){
          delete $http.defaults.headers.common['X-Auth-Token'];
        }

        /**
         * [退出登陆，清除cookie以及登陆状态，并跳转到登陆页面]
         * @return {[type]} [description]
         */
        $scope.logout = function(){
          AuthService.logout();
        }
        
  }])
  .controller("loginctrl",["$scope", "$http","$rootScope", "$location","$timeout", "$filter","$window",'$route','AuthService',
      
      function($scope,$http,$rootScope,$location,$timeout,$filter,$window,$route,AuthService){
        
        $scope.login = function(){
            console.log("sdfadsf")
            var uname = $(".loginform input[name='username']").val();
            var pass = $(".loginform input[name='password']").val();
            // var tempcode = $("form input[name='code']").val();
            console.log(uname,pass);
            if (uname&&pass){
                var user_data = {"auth": {"passwordCredentials": {"username": uname, "password": pass}}};
                AuthService.login(user_data);
            }
        }
        $scope.ifupperkey = false;
        // $(document).keydown(function(event){
        //   if(event.target.type=="password"){
        //     var e = event||window.event;
        //     var o = e.target||e.srcElement;
        //     var oTip = o.nextSibling;
        //     var keyCode  =  e.keyCode||e.which; // 按键的keyCode 
        //     var isShift  =  e.shiftKey ||(keyCode  ==   20 ) || false ; // shift键是否按住
        //     if( ((keyCode >=65 && keyCode<=   90)  &&   !isShift)|| ((keyCode >=   97   &&  keyCode  <=   122 )  &&  isShift)){
        //       console.log("22243")
        //       $scope.ifupperkey = true;
        //     }else{
        //       console.log("false")
        //       $scope.ifupperkey = false;
        //     }
        //   }
        // })
      }
  ])
  .controller("indexctrl",["$scope", "$http","$rootScope", "$location","$timeout", "$filter","$window",'$route','AuthService',
    function($scope,$http,$rootScope,$location,$timeout,$filter,$window,$route,AuthService){
      $scope.percentlist = {cpu: 0,
                          memory: 0,
                          pods:0 ,
                          replicationcontrollers: 0,
                          resourcequotas: 0,
                          services: 0};
      $http.get($scope.baseurl+$rootScope.current_tenant.id+"/resource").success(function(data){
          $scope.used = data.metadata[0].used;
          for(var i in data.metadata[0].hard){
            if(i=='memory'){
                var hard = data.metadata[0].hard[i],h;
                console.log(hard,typeof hard)
                var used = data.metadata[0].used[i],u;
                if(hard.indexOf("G")>-1)h = parseInt(hard)*1024;
                if(hard.indexOf("M")>-1)h = parseInt(hard);
                if(used.indexOf("G")>-1)u = parseInt(used)*1024;
                if(used.indexOf("M")>-1)u = parseInt(used);

                var per = u/h>1?1:(u/h);
               $scope.percentlist[i] = per.toFixed(2);
            }else{
                var per = parseInt(data.metadata[0].used[i])/parseInt(data.metadata[0].hard[i])>1?1:(parseInt(data.metadata[0].used[i])/parseInt(data.metadata[0].hard[i]));
               $scope.percentlist[i] = per.toFixed(2);
            }
          }
          console.log($scope.percentlist)
      })
    }
  ])
  .controller('ToastCtrl',["$scope",'$mdToast',function($scope,$mdToast){
    $scope.closeToast = function() {
      $mdToast.hide();
    };
  }])
  return window.ThCofAngSeedModule;
    // .config(function ($routeProvider) {
    //   $routeProvider
    //     .when('/', {
    //       templateUrl: 'views/main.html',
    //       controller: 'MainCtrl',
    //       controllerAs: 'main'
    //     })
    //     .otherwise({
    //       redirectTo: '/'
    //     });
    // });
});  
