'use strict';

define(['angular','modal','markdown','highlight'],function(angular,modal,markdown,highlight){
	return angular.module("ThCofAngSeed.publicip_ctrl",['ThCofAngSeed.services'])
	.controller('publicipctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','$compile','restful','Notify','instance','$routeParams',
		function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,$compile,restful,Notify,instance,$routeParams){
            var pools = restful.action(null,$scope.baseurl+"ippool");
            $scope.refresh = function(){
                // var h = pools.get(function(){
                    var h = {};
                    // if(typeof h.metadata=="string")h.metadata = JSON.parse(h.metadata);
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
                        name:'掩码',
                        field:'cidr',
                    }];

                    var sourcedata = h.metadata;
                    $scope.content = [];
                    // for(var i =0;i<sourcedata.length;i++){
                    //     var s = sourcedata[i];
                    //     $scope.content.push(s);
                    // }
                    console.log($scope.content);
                    $scope.custom = {name: 'bold',number:'grey',available:'grey',cidr:'grey'};
                    $scope.sortable = ['name','number','available','cidr'];
                    $scope.count = 100;
                    $scope.selected = [];
                    var code = $compile('<md-table headers="headers" content="content" refresh="refresh" sortable="sortable" filters="search" custom-class="custom" thumbs="thumbs" action="action" count="count" isselect="true" selected="selected" links="links" func="func"></md-table>')($scope);
                    $("#pools").html(code);
                // });
            }
            $scope.refresh();

            var usedip = restful.action({used:"@used"},$scope.baseurl+"ippool?used=:used");
            $scope.trefresh = function(){
                // var u = pools.get({used:1},function(){
                    var u = {};
                    // if(typeof u.metadata=="string")u.metadata = JSON.parse(u.metadata);
                    Notify.showSimpleToast("已使用IP池列表请求成功",1);

                    $scope.theaders = [{
                        name:'公网池名',
                        field:'pool_name',
                    },{
                        name:'公网地址',
                        field:'public_ip',
                    },{
                        name:'使用者',
                        field:'user',
                    },{
                        name:'使用的项目',
                        field:'tenant_name',
                    },{
                        name:'绑定的集群名',
                        field:'cluster_name'
                    },{
                        name:'分配的时间',
                        field:'created_at'
                    }];

                    var sourcedata = u.metadata;
                    $scope.tcontent = [];
                    // for(var i =0;i<sourcedata.length;i++){
                    //     var s = sourcedata[i];
                    //     $scope.tcontent.push(s);
                    // }
                    console.log($scope.tcontent);
                    $scope.tcustom = {pool_name: 'bold',public_ip:'grey',user:'grey',tenant_name:'grey',cluster_name:'grey',created_at:'grey'};
                    $scope.tsortable = ['pool_name','public_ip','user','tenant_name','cluster_name','created_at'];
                    $scope.tcount = 100;
                    $scope.tselected = [];
                    var code = $compile('<md-table headers="theaders" refresh="trefresh" content="tcontent" sortable="tsortable" filters="search" custom-class="tcustom" thumbs="thumbs" action="action" count="tcount" isselect="true" selected="tselected" links="links" func="func"></md-table>')($scope);
                    $("#pool_used").html(code);
                // });
            }
            $scope.trefresh();

            // $rootScope.$watch("current_tenant",function(e,v){
            //     if(e.id==v.id||!e||!v)return false;
            //     $scope.refresh();
            //     if($scope.refresh1)$scope.refresh1();
            //     if($scope.trefresh)$scope.trefresh();
            // })
        }
    ])
    .controller('createipsctrl',['$rootScope','$scope','$http','$timeout','$location','$window','$filter','$mdBottomSheet','$compile','restful','Notify','instance','$routeParams',
        function($rootScope, $scope, $http,$timeout, $location, $window, $filter,$mdBottomSheet,$compile,restful,Notify,instance,$routeParams){
            $scope.ips = {};
            var pools = restful.action(null,$scope.baseurl+"ippool");
            $scope.createips = function(){
                var pool = pools.save(null,$scope.ips,function(){
                    if(pool.code==0){
                        Notify.showSimpleToast("操作成功",1);
                        $location.path("/volumes")
                    }else if(pool.code>0){
                        Notify.showSimpleToast(pool.message,-1);
                    }else if(pool.code<0){
                        Notify.showSimpleToast(pool.message,0)
                    }
                })
            }
        }
    ])
})
