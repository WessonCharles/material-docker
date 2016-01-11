'use strict';

define(['angular','modal','markdown','highlight','socket'],function(angular,modal,markdown,highlight,io){
	return angular.module("ThCofAngSeed.publicip_ctrl",['ThCofAngSeed.services'])
	.controller('publicipctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','$compile','restful','Notify','instance','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,$compile,restful,Notify,instance,$routeParams){
	            var pools = restful.action(null,$scope.baseurl+"ippool");
	            var h = pools.get(function(){
                        if(typeof h.metadata=="string")h.metadata = JSON.parse(h.metadata);
                        Notify.showSimpleToast("公网IP池列表请求成功",1);

                        $scope.headers = [{
                            name:'名称',
                            field:'name',
                        },{
                            name:'总数',
                            field:'number',
                        },{
                            name:'可用个数',
                            field:'available',
                        },{
                            name:'cidr',
                            field:'掩码',
                        }
                        ];

                        var sourcedata = h.metadata;
                        $scope.content = [];
                        for(var i =0;i<sourcedata.length;i++){
                            var s = sourcedata[i];
                            $scope.content.push(s);
                        }
                        console.log($scope.content);
                        $scope.custom = {name: 'bold',number:'grey',available:'grey',cidr:'grey'};
                        $scope.sortable = ['name','number','available','cidr'];
                        var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" action="action" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
                        $("#pools").html(code);
                    });
                }
            ])
})
