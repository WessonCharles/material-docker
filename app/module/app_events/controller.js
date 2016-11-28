'use strict';

define(['angular','modal'],function(angular,modal){
	return angular.module("ThCofAngSeed.events_ctrl",['ThCofAngSeed.services'])
	.controller('eventctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$routeParams','Notify','restful','$compile',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$routeParams,Notify,restful,$compile){
                        $rootScope.intro = {
                            title:"操作事件",
                            content:"为您记录关于资源变化的事件,以便进行事件的追踪.注意,这里仅会为您保存一周的操作事件.",
                        }
			var url = restful.action({id:"@id"},$scope.baseurl+':id/events');
            $scope.refresh = function(){
                    var data = {};
                // var data = url.get({id:$rootScope.current_tenant.id},function(){
                    Notify.showSimpleToast("操作事件请求成功",1);
                    $scope.headers = [{
                        name:'资源名称',
                        field:'name',
                    },{
                        name:'资源类型',
                        field:'kind',
                    },{
                        name:'结果',
                        field:'reason',
                    },{
                        name:'详情',
                        field:'message',
                    },{
                        name:'发生时间',
                        field:'created_at',
                    }];

                    // data.metadata.reverse();
                    $scope.content = [];//data.metadata;
                    // for(var i =0;i<data.metadata.length;i++){
                    //     data.metadata[i].created_at = $filter("date")(data.metadata[i].created_at,"yyyy-MM-dd HH:mm")
                    //     cons.push(data.metadata[i]);
                    // }
                    // $scope.content = cons;
                    // $scope.content.reverse();
                    $scope.count = 100;
                    $scope.custom = {name: 'bold', kind:'grey',reason:'grey',message:'message',created_at:'grey'};
                    $scope.sortable = ['name','kind','reason','message','created_at'];
                    $scope.selected = [];

                    var code = $compile('<md-table headers="headers" content="content" sortable="sortable" filters="search" refresh="refresh" custom-class="custom" thumbs="thumbs" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
                    $("#events").html(code);
                // })
            }
            $scope.refresh();
            // $rootScope.$watch("current_tenant",function(e,v){
            //     if(e.id==v.id||!e||!v)return false;
            //     $scope.refresh();
            //     if($scope.refresh1)$scope.refresh1();
            //     if($scope.trefresh)$scope.trefresh();
            // })
		}
	])
})
