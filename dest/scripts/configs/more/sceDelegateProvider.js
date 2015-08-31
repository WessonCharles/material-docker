// (function(){
	'use strict';
	define(["angular"],function(angular){
		return window.ThCofAngSeedConfig.config(['$sceDelegateProvider', ['$sceDelegateProvider',function($sceDelegateProvider){
			$sceDelegateProvider.resourceUrlWhitelist([/*跨域白名单*/
			   /*允许相同域名的远程资源加载*/
			   'self',
			   /*允许跨域资源加载*/
			   'http://libs.baidu.com/**',
			   'http://libs.useso.com/**']);
			}
	})
	
// }());	