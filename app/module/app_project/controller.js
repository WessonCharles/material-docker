'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.project_ctrl",['ThCofAngSeed.services.formDataObject'])
	.controller('projectctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$compile','restful',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$compile,restful){
			/**
	         * buttondown example
	         */
	        var originatorEv;
	        $scope.ctrl = {};
	        $scope.ctrl.openMenu = function($mdOpenMenu, ev) {
	          originatorEv = ev;
	          $mdOpenMenu(ev);
	        };
	        $scope.ctrl.notificationsEnabled = true;
	        $scope.ctrl.toggleNotifications = function() {
	          $scope.ctrl.notificationsEnabled = !$scope.ctrl.notificationsEnabled;
	        };
	        $scope.ctrl.redial = function() {
	          $mdDialog.show(
	            $mdDialog.alert()
	              .targetEvent(originatorEv)
	              .clickOutsideToClose(true)
	              .parent('body')
	              .title('Suddenly, a redial')
	              .content('You just called a friend; who told you the most amazing story. Have a cookie!')
	              .ok('That was easy')
	          );
	          originatorEv = null;
	        };
	        $scope.ctrl.checkVoicemail = function() {
	          // This never happens.
	        };

	        $scope.toggleSearch = false;  
	        var plat = restful.action("http://game.opstack.cc:8334/game/:type",{type:"@type"});
	        var pl = plat.get({type:"openplat"},function(e){
	        	// console.log(pl.plats);
		        $scope.headers = [
		          {
		            name: 'Name', 
		            field: 'name'
		          },{
		            name:'Description', 
		            field: 'description'
		          },{
		            name: 'Last Modified', 
		            field: 'last_modified'
		          }
		        ];
		        // var sort = [];
		        // for(var i in pl.plats[0]){
		        // 	sort.push(i);
		        // 	$scope.headers.push({
		        // 		name:i,
		        // 		field:i
		        // 	})
		        // };
		        
		        // $scope.content = pl.plats;
		        $scope.content = [
		          {
		            // thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
		            name: 'Bruno Mars', 
		            description: 'Human',
		            last_modified: 'Jun 5, 2014'
		          },{
		            // thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
		            name: 'AT-AT', 
		            description: 'Robot',
		            last_modified: 'Jun 5, 2014'
		          },{
		            // thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
		            name: 'Mark Ronson', 
		            description: 'Human',
		            last_modified: 'Jun 5, 2014'
		          },{
		            // thumb:'http://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
		            name: 'Daft Punk', 
		            description: 'Human-Robot',
		            last_modified: 'Jun 5, 2014'
		          },{
		            // thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
		            name: 'Lady Gaga', 
		            description: 'Undefined',
		            last_modified: 'Jun 5, 2014'
		          }
		        ];
		        

		        $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
		        $scope.sortable = ['name','description','last_modified'];
		        // $scope.sortable = sort;
		        $scope.count = 100;
		        $scope.links = '/projects';
		        $scope.selected = [];

		        // $scope.loadtable = function(t){
		        	// console.log(t);
		        	var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" count="count" isselect="true" selected="selected" links="links"></md-table>')($scope);
		        	$("#prolist").html(code);
		        // }
		       	$scope.showselected = function(){
		       		console.log($scope.selected)
		       	}
	        });
	        $scope.$on("$viewContentLoaded",function(){
		        	// Modal.init("aaa");
	        })


	        /**
	         * tables
	         */
	        
	        /**
	         * open one table content
	         */
	        // $("md-table").delegate("table tbody tr", 'click', function() {
	          
	        // })
		}
	])
	.controller('prodetailctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams){
			console.log("223423")
			console.log($routeParams)
			 $scope.toggleSearch = false;   
	        $scope.headers = [
	          {
	            name: 'Name', 
	            field: 'name'
	          },{
	            name:'Description', 
	            field: 'description'
	          },{
	            name: 'Last Modified', 
	            field: 'last_modified'
	          // },{
	          //   name:'More Action',
	          //   field:'more_action'
	          }
	        ];
	        
	        $scope.content = [
	          {
	            // thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
	            name: 'Bruno Mars', 
	            description: 'Human',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
	            name: 'AT-AT', 
	            description: 'Robot',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
	            name: 'Mark Ronson', 
	            description: 'Human',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
	            name: 'Daft Punk', 
	            description: 'Human-Robot',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
	            name: 'Lady Gaga', 
	            description: 'Undefined',
	            last_modified: 'Jun 5, 2014'
	          }
	        ];
	        $scope.selected = [];
	        $scope.custom = {name: 'bold', description:'grey',last_modified: 'grey'};
	        $scope.sortable = ['name', 'description', 'last_modified'];
	        // $scope.thumbs = 'thumb';
	        $scope.count = 5;

	        $scope.theaders = [
	          {
	            name: 'Name', 
	            field: 'name'
	          },{
	            name:'Description', 
	            field: 'description'
	          },{
	            name: 'Last Modified', 
	            field: 'last_modified'
	          // },{
	          //   name:'More Action',
	          //   field:'more_action'
	          }
	        ];
	        
	        $scope.tcontent = [
	          {
	            // thumb:'https://lh3.googleusercontent.com/-5NfcdlvGQhs/AAAAAAAAAAI/AAAAAAAAABY/ibGrApGYTuQ/photo.jpg', 
	            name: 'Bruno Mars', 
	            description: 'Human',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://www.otakia.com/wp-content/uploads/V_1/article_3573/7405.jpg', 
	            name: 'AT-AT', 
	            description: 'Robot',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'https://speakerdata.s3.amazonaws.com/photo/image/774492/Mark-Ronson-r24.jpg', 
	            name: 'Mark Ronson', 
	            description: 'Human',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://25.media.tumblr.com/61ebf04c3cc7a84944aa0246e902f2a7/tumblr_mm35b87dGz1qmwrnuo1_1280.jpg', 
	            name: 'Daft Punk', 
	            description: 'Human-Robot',
	            last_modified: 'Jun 5, 2014'
	          },{
	            // thumb:'http://thatgrapejuice.net/wp-content/uploads/2014/03/lady-gaga-that-grape-juice-televisionjpg.jpg', 
	            name: 'Lady Gaga', 
	            description: 'Undefined',
	            last_modified: 'Jun 5, 2014'
	          }
	        ];
	        $scope.tselected = [];
	        $scope.tcustom = {name: 'bold', description:'grey',last_modified: 'grey'};
	        $scope.tsortable = ['name', 'description', 'last_modified'];
	        // $scope.thumbs = 'thumb';
	        $scope.tcount = 5;

	        $scope.switchmain = function(index,t){
	        	if($(t).hasClass("shadow"))$(t).removeClass("shadow");
	        	else $(t).addClass('shadow');

	        	if(index==1){
	        		$(t).parents(".switchdiv").removeClass("right");
	        	}else{
	        		$(t).parents(".switchdiv").addClass("right");
	        	}
	        }
		}
	])		
})