// (function(){
	'user strict';
  define(["angular"],function(angular){
	/*formDataObject*/
  	angular.module('services.formDataObject',[])
    .factory("formDataObject",function(){
      return function(data) {
        var fd = new FormData();
        angular.forEach(data, function(value, key) {
          fd.append(key, value);
        });
        return fd;
      };
    })
  });  
// }());