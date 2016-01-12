'use strict';

define(["angular"],function(angular){
	angular.module("ThCofAngSeed.filters",[])
	.filter('startFrom',function (){
	  return function (input,start) {
	    start = +start;
	    return input?input.slice(start):'';
	  }
	})
	.filter('i18n', ['localizedTexts', '$rootScope', function (localizedTexts, $rootScope) {
        return function (text) {
            var currentLanguage = $rootScope.language || 'zh_CN';
            if (!text){return}
            if (typeof text=="number"){return text}
            if (typeof text=='object'){return text}
            var _text = text.toLowerCase()
            if (localizedTexts[currentLanguage].hasOwnProperty(_text)) {
                return localizedTexts[currentLanguage][_text];
            }
            _text.substring(0, _text.length-1)
            if (localizedTexts[currentLanguage].hasOwnProperty(_text)) {
                return localizedTexts[currentLanguage][_text];
            }
            return text;
        };
    }])
    .filter('toHtml',['$sce', function($sce){  
        return function(text){ 
            var htmlreg = new RegExp('^<([^>\s]+)[^>]*>(.*?<\/\\1>)?$');;
            var flag = htmlreg.test(text); 
            return $sce.trustAsHtml(text);  
        }  
    }])  
})