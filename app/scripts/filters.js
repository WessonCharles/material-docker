'use strict';

define(["angular"],function(angular){
	angular.module("ThCofAngSeed.filters",[])
	.filter('startFrom',function (){
	  return function (input,start) {
	    start = +start;
	    return input?input.slice(start):'';
	  }
	})
})