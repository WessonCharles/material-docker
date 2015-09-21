'use strict';

require.config({
	paths:{
		angular:'../libs/angular/angular.min',
		jquery:'../libs/jquery/dist/jquery.min',
		// jquery:'//cdn.bootcss.com/jquery/2.1.4/jquery.min',
		angularRoute:'../libs/angular-route/angular-route.min',
		angularAnimate:'../libs/angular-animate/angular-animate.min',
		angularAria:'../libs/angular-aria/angular-aria.min',
		angularMaterial:'//cdn.bootcss.com/angular-material/0.10.1/angular-material.min',
		angularResource:'../libs/angular-resource/angular-resource.min',
		modal:'../libs/custom/modal',
		colresize:'../libs/colresize/colresize',
		modernizr:'../libs/custom/modernizr.custom',
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
        'colresize':['jquery']
	},
	priority: [
        'angular',
        'jquery'
    ]
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
	'../module/app_project/router',
	'../module/app_image/router',
	'app',
	],function(angular){
		angular.element().ready(function() {
            angular.bootstrap(document, ['ThCofAngSeed']);
        });
	})