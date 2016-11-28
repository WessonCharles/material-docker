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


window.showStatus = function(wrap,text,code,n){
	var enstr,chstr;
	switch(code){
	    case 3:
	        enstr = "warning";
	        chstr = "错误";
	        break;
	    case 4:
	        enstr = "danger";
	        chstr = "警告";
	        break;
	    case 5:
	        enstr = "green";
	        chstr = "成功";
	        break;
	    case 6:
	        enstr = "blue";
	        chstr = "提示";
	        break;
	    case 10:
	        enstr = "blue";
	        break;
	    default:
	        enstr = "basic";
	        chstr = "信息";
	}
	var id = Math.random();
    var style = n&&top>0?"style='top:"+top+"px;'":"";
    var str = '<div id="'+id+'" class="alert alert-'+enstr+' alert-dismissible fade in" role="alert">'+
      '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>'+
      '<strong>'+text+'</strong></div>';
    wrap.html(str).fadeIn(900);
    if(!n){
       setTimeout(function(){
           $("#"+id).removeClass("fadeInUp").addClass("fadeOutUp");
           setTimeout(function(){
                $("#"+id).remove();
           },500)
       },15000); 
    }
    $(document.body).delegate(".alert.alert-dismissible button.close","click",function(){
        var p =$(this).parents(".alert.alert-dismissible");
        p.animate({opacity:"0"});
        setTimeout(function(){
            p.remove();    
        },500)
    });
	};

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
		codemirror:'../libs/codemirror/codemirror',
		modal:'../libs/custom/modal',
		// colresize:'../libs/colresize/colresize',//拖动改变列宽 暂时也去除
		// modernizr:'../libs/custom/modernizr.custom',//帮助检测feature是否被浏览器支持，暂时不需要
		// socket:'../libs/socket/socket.io',
		// term:'../libs/term.js-master/src/term',
		markdown:'../libs/markdown/markdown',
		highlight:'//cdn.jsdelivr.net/highlight.js/9.0.0/highlight.min',
		imgcrop:'../libs/ngImgCrop/ng-img-crop',
		datetime:'../libs/datePicker/js/bootstrap-datetimepicker.min',
		highcharts:'../libs/highcharts/highcharts',

		json2yaml:'../libs/yaml-json/json2yaml',
		yaml2json:'../libs/yaml-json/yaml2json'
	},
	shim:{
		'angular' : {'exports' : 'angular'},
        'jquery': {'exports': 'jquery'},
        'angularResource':['angular'],
        'angularRoute': ['angular'],
        'angularAnimate':['angular'],
        'angularAria':['angular'],
        'angularMaterial':['angular','angularAnimate','angularAria'],
        'codemirror':{'exports':'codemirror'},
        'modal':['jquery'],
        // 'modernizr':{'exports':'modernizr'},
        // 'colresize':['jquery'],
        // 'socket':{'exports':'socket'},
        // 'term':{'exports':'term'},
        'markdown':{'exports':'markdown'},
        'imgcrop':['angular'],
        'highlight':{'exports':'highlight'},
        'highcharts':['jquery'],
        'datetime':['jquery'],

        'json2yaml':{'exports':'json2yaml'},
        'yaml2json':{'exports':'yaml2json'}
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
	'codemirror',
	'modal',
	// 'modernizr',
	// 'colresize',
	// 'socket',
	// 'term',
	'markdown',
	'imgcrop',
	'highlight',
	'highcharts',
	'datetime',

	'json2yaml',
	'yaml2json',
	// 'exporting',

	'../module/routers',
	'../module/app_application/router',
	'../module/app_columns/router',
	'../module/app_service/router',
	'../module/app_image/router',
	'../module/app_publicip/router',
	'../module/app_system/router',
	'../module/app_users/router',
	'../module/app_events/router',
	'../module/app_stack/router',
        'app',
	],function(angular){
		angular.element().ready(function() {
            angular.bootstrap(document, ['ThCofAngSeed']);
        });
	})
