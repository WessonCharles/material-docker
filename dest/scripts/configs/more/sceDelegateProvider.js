// (function(){
	'use strict';
	define(["angular"],function(angular){
		return window.ThCofAngSeedConfig.config(['$sceDelegateProvider', ['$sceDelegateProvider',function($sceDelegateProvider){
			$sceDelegateProvider.resourceUrlWhitelist([/*���������*/
			   /*������ͬ������Զ����Դ����*/
			   'self',
			   /*���������Դ����*/
			   'http://libs.baidu.com/**',
			   'http://libs.useso.com/**']);
			}
	})
	
// }());	