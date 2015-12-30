'use strict';

window.setCookie =function(name,value,d){
var Days = d||30;
var exp = new Date();
exp.setTime(exp.getTime() + Days*24*60*60*1000);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/;";
}
//读取cookies
window.getCookie=function(name){
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg)) return unescape(arr[2]);
else return null;
}
//删除cookies
window.delCookie=function(name){
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=window.getCookie(name);
if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/;";
}  


require.config({
	paths:{
		angular:'../libs/angular/angular.min',
		jquery:'../libs/jquery/dist/jquery.min',
		// jquery:'//cdn.bootcss.com/jquery/2.1.4/jquery.min',
		angularRoute:'../libs/angular-route/angular-route.min',
		angularAnimate:'../libs/angular-animate/angular-animate.min',
		angularAria:'../libs/angular-aria/angular-aria.min',
		// angularMaterial:'//cdn.bootcss.com/angular-material/0.10.1/angular-material.min',
		angularMaterial:'../libs/angular-material/angular-material.min',
		angularResource:'../libs/angular-resource/angular-resource.min',
		modal:'../libs/custom/modal',
		colresize:'../libs/colresize/colresize',
		modernizr:'../libs/custom/modernizr.custom',
		socket:'../libs/term.js-master/src/socket.io',
		term:'../libs/term.js-master/src/term',
		markdown:'../libs/markdown/markdown',
		highlight:'//cdn.jsdelivr.net/highlight.js/9.0.0/highlight.min',
		imgcrop:'../libs/ngImgCrop/ng-img-crop'
	},
	shim:{
		'angular' : {'exports' : 'angular'},
        'jquery': {'exports': 'jquery'},
        'angularResource':['angular'],
        'angularRoute': ['angular'],
        'angularAnimate':['angular'],
        'angularAria':['angular'],
        'angularMaterial':['angular','angularAnimate','angularAria'],
        'modal':['jquery'],
        'modernizr':{'exports':'modernizr'},
        'colresize':['jquery'],
        'socket':{'exports':'socket'},
        'term':{'exports':'term'},
        'markdown':{'exports':'markdown'},
        'imgcrop':['angular'],
        'highlight':{'exports':'highlight'}
	},
	priority: [
        'angular',
        'jquery'
    ],
    urlArgs:(new Date()).getTime()
})
window.name = "NG_DEFER_BOOTSTRAP!";//必须 、延迟引导、避免发生Failed to instantiate module ThCofAngSeed
require([
	'angular',
	'jquery',
	'angularResource',
	'angularRoute',
	'angularAnimate',
	'angularAria',
	'angularMaterial',
	'modal',
	'modernizr',
	'colresize',
	'socket',
	'term',
	'markdown',
	'imgcrop',
	'highlight',
	'../module/routers',
	'../module/app_application/router',
	'../module/app_columns/router',
	'../module/app_service/router',
	'../module/app_image/router',
	'app',
	],function(angular){
		angular.element().ready(function() {
            angular.bootstrap(document, ['ThCofAngSeed']);
        });
	})