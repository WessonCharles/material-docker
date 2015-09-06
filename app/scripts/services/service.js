// (function(){
	'use strict';
	define(["angular","services/more/formDataObject"],function(angular){
		/*Some bits and pieces Service*//*ËùÓÐÁãËéµÄservice*/
		var depend = [
			'ThCofAngSeed.services.formDataObject',
			// 'services.formDataObject',
			/*.....*/
		];
		return angular.module('ThCofAngSeed.services',depend);
	});	
// }());
