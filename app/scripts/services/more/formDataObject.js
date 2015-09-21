// (function(){
	'user strict';
  define(["angular"],function(angular){
	/*formDataObject*/
  	angular.module('ThCofAngSeed.services.formDataObject',['ngResource'])
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
        var u = url||'http://42.51.161.236:8337/';
        return $resource(u,obj);
      }
      return restful;
    }])
    .factory('AuthService',['$rootScope','$http','$window','$location', function ($rootScope, $http, $window, $location) {
      var authService = {};
      $rootScope.keystone_url = 'http://keystonedev.lightcloud.cn:5000/v2.0';
      $rootScope.keystone_roleid = "16131b070578418b9c9b4c3b8f0518e9";
      $rootScope.keystone_adminid = "e47c841a35c144169c45f3f38564445c";
      $rootScope.keystone_url = 'http://console.lightcloud.cn:5000/v2.0';
      $rootScope.keystone_roleid = "c8bd1ec564194a198a84795a522e9eb2";
      $rootScope.keystone_adminid = "52562a38b5d347bab9d81be0aec6ea48";
      var keystone_url = $rootScope.keystone_url;
      authService.login = function (credentials,coo) {
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
                    if(coo){
                      var name = credentials.auth.passwordCredentials.username;
                      var pass = credentials.auth.passwordCredentials.password;
                      Opstack.setCookie("opstacklight",encodeURIComponent(name)+"&"+encodeURIComponent(pass));
                    }
                    var servis = data.access.serviceCatalog;
                    var defalutapp,defaultdatas = [];
                    var display_services = ['audit', 'image', 'base','object-store','identity'].join();
                    for(var i=0,len=servis;i<len.length;i++){
                        if(display_services.indexOf(len[i].type)==-1){
                            defaultdatas.push(len[i].type);
                        }
                    };
                    defalutapp = defaultdatas[0];
                      data['access']['tenants'] = tenantInfo['tenants'];
                      $window.sessionStorage.setItem("userInfo", JSON.stringify(data));
                      window.sessionStorage.setItem("islogin",JSON.stringify(data));
                      $window.sessionStorage.setItem("currentApp", defalutapp);
                      if(Opstack.getCookie("lc-history-path")&&Opstack.getCookie("lc-history-path")!="/login"){
                        $window.location.href = Opstack.getCookie("lc-history-path");
                      }else{
                        $window.location.href = '/'+defalutapp;  
                      }
                      
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
        Opstack.delCookie("lc-history-path");
        $("#big_shade").remove();
        return $window.location.href = '/login';
      }

      return authService;
    }])
  });  
// }());