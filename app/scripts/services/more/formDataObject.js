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
      restful.action = function(url,obj){
        return $resource(url,obj);
      }
      return restful;
    }])
  });  
// }());