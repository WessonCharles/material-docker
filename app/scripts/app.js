'use strict';

/**
 * Main module of the application.
 */
define([
  "angular",
  "modal",
  "configs/config",
  "services/more/formDataObject",
  "services/service",
  "directives/more/onRendered",
  "directives/directive",
  "filters",
  "../module/app_application/controller",
  "../module/app_service/controller",
  "../module/app_image/controller",
  ],function(angular){
  window.ThCofAngSeedModule = angular.module('ThCofAngSeed', [
      'ngRoute',
      'ngResource',
      'ngMaterial',
      'ngImgCrop',
      'ThCofAngSeed.configs',
      'ThCofAngSeed.services.formDataObject',
      'ThCofAngSeed.services',
      'ThCofAngSeed.directives.table',
      'ThCofAngSeed.directives',
      'ThCofAngSeed.filters',
      'ThCofAngSeed.pod_ctrl',
      'ThCofAngSeed.service_ctrl',
      'ThCofAngSeed.images_ctrl'
  ]).controller("baseCtrl",["$scope", "$http","$rootScope", "$location","$timeout", "$filter","$window",'$route','AuthService',
      
      function($scope,$http,$rootScope,$location,$timeout,$filter,$window,$route,AuthService){
        $scope.go = 1;

        $scope.baseurl = "http://42.51.161.236:8337/";
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

        
        /**
         * [页面加载完成，初始化弹出框]
         * @param  {[type]} ){                       Modal.init();        } [description]
         * @return {[type]}     [description]
         */
        $scope.$on('$viewContentLoaded',function(){
          Modal.init();
        })


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
