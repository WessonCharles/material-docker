// (function(){
	'use strict';
	define(["angular"],function(angular){
		/*Some bits and pieces Directives*//*���������directive*/
		var depend = [
			'directives.abnTree',
			'directives.onRendered',
			'directives.pageNation',
			'directives.loadRespond',
			/*.....*/
		];
		return angular.module('ThCofAngSeed.directives',depend);
	})
	
// }());
