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

Date.prototype.format = function (format) {
   var args = {
       "M+": this.getMonth() + 1,
       "d+": this.getDate(),
       "h+": this.getHours(),
       "m+": this.getMinutes(),
       "s+": this.getSeconds(),
       "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
       "S": this.getMilliseconds()
   };
   if (/(y+)/.test(format))
       format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   for (var i in args) {
       var n = args[i];
       if (new RegExp("(" + i + ")").test(format))
           format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
   }
   return format;
}; 


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
		socket:'../libs/socket/socket.io',
		term:'../libs/term.js-master/src/term',
		markdown:'../libs/markdown/markdown',
		highlight:'//cdn.jsdelivr.net/highlight.js/9.0.0/highlight.min',
		imgcrop:'../libs/ngImgCrop/ng-img-crop',
		datetime:'../libs/datePicker/js/bootstrap-datetimepicker.min',
		highcharts:'http://cdn.hcharts.cn/highcharts/highcharts',
		// exporting:'http://cdn.hcharts.cn/highcharts/exporting'
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
        'highlight':{'exports':'highlight'},
        'highcharts':['jquery'],
        'datetime':['jquery']
        // 'exporting':['highcharts']
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
	'highcharts',
	'datetime',
	// 'exporting',

	'../module/routers',
	'../module/app_application/router',
	'../module/app_columns/router',
	'../module/app_service/router',
	'../module/app_image/router',
	'../module/app_publicip/router',
	'../module/app_system/router',
	'../module/app_users/router',
        'app',
	],function(angular){
		angular.element().ready(function() {
            angular.bootstrap(document, ['ThCofAngSeed']);
        });
	})
