// (function(){
	'use strict';
	define(["angular"],function(angular){
		/*Some bits and pieces Service*//*���������service*/
		var depend = [
			'services.formDataObject',
			'services.onRendered',
			'services.pageNation',
			'services.loadRespond',
			/*.....*/
		];
		return angular.module('ThCofAngSeed.services',depend);
	});	
// }());
