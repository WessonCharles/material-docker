// (function(){
	'user strict';
  define(["angular"],function(angular){
	/*formDataObject*/
  	angular.module('ThCofAngSeed.services.formDataObject',['ngResource','ngMaterial'])
    .factory("formDataObject",function(){
      return function(data) {
        var fd = new FormData();
        angular.forEach(data, function(value, key) {
          fd.append(key, value);
        });
        return fd;
      };
    })
    .factory("restful",['$resource',function($resource){
      var restful = {};
      restful.action = function(obj,url){
        var u = url||'http://42.51.161.236:8337';
        return $resource(u,obj);
      }
      return restful;
    }])
    .factory('AuthService',['$rootScope','$http','$window','$location', function ($rootScope, $http, $window, $location) {
      var authService = {};
      // $rootScope.keystone_url = 'http://console.lightcloud.cn:5000/v2.0';
      // $rootScope.keystone_roleid = "c8bd1ec564194a198a84795a522e9eb2";
      // $rootScope.keystone_adminid = "52562a38b5d347bab9d81be0aec6ea48";
      $rootScope.keystone_url = 'http://42.51.161.109:5000/v2.0';
      var keystone_url = $rootScope.keystone_url;
      authService.login = function (credentials,coo) {
          console.log("credentials")
          return $http.post(keystone_url+'/tokens', credentials)
          .success(function(data){
            if(!data){
              Opstack.showStatus("登陆名或者密码错误",3);
              return;
            }
              $http.defaults.headers.common['X-Auth-Token'] = data['access']['token']['id'];
              $http.get(keystone_url+'/tenants').success(function(data){
                  credentials['auth']['tenantName'] = data['tenants'][0]['name']
                  var tenantInfo = data;
                  $http.post(keystone_url+'/tokens', credentials)
                  .success(function(data){
                    // if(coo){
                      var name = credentials.auth.passwordCredentials.username;
                      var pass = credentials.auth.passwordCredentials.password;
                      window.setCookie("lightdocker",encodeURIComponent(name)+"&"+encodeURIComponent(pass));
                    // }
                    // var servis = data.access.serviceCatalog;
                    // var defalutapp,defaultdatas = [];
                    // var display_services = ['audit', 'image', 'base','object-store','identity'].join();
                    // for(var i=0,len=servis;i<len.length;i++){
                    //     if(display_services.indexOf(len[i].type)==-1){
                    //         defaultdatas.push(len[i].type);
                    //     }
                    // };
                    // defalutapp = defaultdatas[0];
                      data['access']['tenants'] = tenantInfo['tenants'];
                      console.log(data)
                      $window.sessionStorage.setItem("userInfo", JSON.stringify(data));
                      // $window.sessionStorage.setItem("islogin",JSON.stringify(data));
                      // $window.sessionStorage.setItem("currentApp", defalutapp);
                      $rootScope.islogin = true;
                      // if(Opstack.getCookie("lc-history-path")&&Opstack.getCookie("lc-history-path")!="/login"){
                      //   $window.location.href = Opstack.getCookie("lc-history-path");
                      // }else{
                      $window.location.href = "/";
                      // $location.path("/");  
                      // }
                      
                  });
              });
          });
      };

      authService.isAuthenticated = function () {
        return !!$window.sessionStorage.getItem("userInfo");
      };

      authService.getInfo = function(){
        return $window.sessionStorage.getItem("userInfo");
      }

      authService.setCurrentApp = function(app){
        return $window.sessionStorage.setItem("currentApp", app);
      }

      authService.getCurrentApp = function(app){
        return $window.sessionStorage.getItem("currentApp");
      }

      authService.logout = function(){
        $window.sessionStorage.removeItem("userInfo");
        window.sessionStorage.removeItem("islogin");
        $rootScope.islogin = false;
        window.delCookie("lightdocker");
        $location.path("/login")
        // return $window.location.href = '/login';
      }

      return authService;
    }])
    .factory('Notify',['$rootScope','$mdToast','$document',function($rootScope,$mdToast,$document){
      var Notify = {}
          _t = this;
      var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };
      _t.toastPosition = angular.extend({},last);
      _t.getToastPosition = function() {
        sanitizePosition();
        return Object.keys(_t.toastPosition)
          .filter(function(pos) { return _t.toastPosition[pos]; })
          .join(' ');
      };
      function sanitizePosition() {
        var current = _t.toastPosition;
        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;
        last = angular.extend({},current);
      }
      Notify.showCustomToast = function() {
        $mdToast.show({
          controller: 'ToastCtrl',
          templateUrl: 'module/component_template/toast-template.html',
          parent : $document[0].querySelector('#toastBounds'),
          hideDelay: 6000,
          position: _t.getToastPosition()
        });
      };
      Notify.showSimpleToast = function(content) {
        $mdToast.show(
          $mdToast.simple()
            .content(content)
            .position(_t.getToastPosition())
            .hideDelay(3000)
        );
      };
      /**
       * [参数1，为通知内容，参数2：动作名称，参数3为一个json对象，键：动作，值：回调]
       * @param  {[type]} content  [description]
       * @param  {[type]} jsonback [description]
       * @return {[type]}          [description]
       */
      Notify.showActionToast = function(content,actionname,jsonback) {
        var toast = $mdToast.simple()
              .content(content)
              .action(actionname)
              .highlightAction(false)
              .position(_t.getToastPosition());
        $mdToast.show(toast).then(function(response) {
          for(var j in jsonback){
            if(response==j){
              jsonback[j]();
            }
          }
        });
      };

      return Notify;
    }])
    .factory('allres',['$q','$rootScope','$location','$window',function ($q,$rootScope,$location,$window) {
      /**
       * 监控所有请求并针对部分返回做特殊操作
       * @param  {[type]} $q        [description]
       * @param  {[type]} $window)  {                             return {                request: function (config)           {                if(config.method [description]
       * @param  {[type]} response: function      (response) {                      return response ||       $q.when(response);            }                      };              } [description]
       * @return {[type]}           [description]
       */
      return {
          request: function (config) {
              if(config.method=="POST"||config.method=="PUT"||config.method=="DELETE"){
                
              }
              return config;
          },

          response: function (response) {
              if(response.data.code==10010){
                $window.sessionStorage.removeItem("userInfo");
                $window.sessionStorage.removeItem("islogin");
                $rootScope.islogin = false;
                window.delCookie("lightdocker");
                $location.path("/login")
              }
              return response || $q.when(response);
          }
      };
    }])
  });  
// }());