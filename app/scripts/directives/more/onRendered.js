'use strict';
define(['angular','colresize','socket'],function(angular,colresize,io){
  return angular.module("ThCofAngSeed.directives.table",[])
  .directive('mdColresize', ['$timeout',function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$evalAsync(function () {
          $timeout(function(){ $(element).colResizable({
            liveDrag: true,
            fixed: true
            
          });},100);
        });
      }
    }
  }])
  .directive('onRendered',['$timeout',function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished');
                    });
                }
            }
        };
  }])
  .directive('mdTable',["$filter",function ($filter) {
    return {
      restrict: 'E',
      scope: { 
        headers: '=', 
        content: '=', 
        sortable: '=', 
        filters: '=',
        customClass: '=customClass',
        thumbs:'=', 
        count: '=',
        links:'=',
        func:'=',
        isselect:'@',
        selected:'=' ,
        modal:'='
      },
      link: function ($scope,$element,$attr) {
        // console.log($scope.headers)
        var orderBy = $filter('orderBy');
        $scope.tablePage = 0;
        $scope.nbOfPages = function () {
          return Math.ceil($scope.content.length / $scope.count);
        },
        $scope.handleSort = function (field) {
            if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
        };
        $scope.order = function(predicate, reverse) {
            $scope.content = orderBy($scope.content, predicate, reverse);
            $scope.predicate = predicate;
        };
        $scope.order($scope.sortable[0],false);
        $scope.getNumber = function (num) {
                  return new Array(num);
        };
        $scope.goToPage = function (page) {
          $scope.tablePage = page;
        };

        // $scope.selected = [];
        $scope.toggleall = function(datas,list,count){
          console.log(JSON.stringify(list))
          console.log(JSON.stringify(datas))
          if(JSON.stringify(list)==JSON.stringify(datas)){
            console.log("yes")
            list = [];
            console.log(list)
          }else{
            console.log("no")
            list = JSON.parse(JSON.stringify(datas));
            console.log(list)
          }
          $scope.selected = list;
          console.log(JSON.stringify(list)==JSON.stringify(datas))
        }

        $scope.allexists = function(datas,list,count){
          $scope.checkall = JSON.stringify(list)==JSON.stringify(datas);
          return JSON.stringify(list)==JSON.stringify(datas);  
        }

        $scope.toggle = function (item, list) {
          var idx = list.indexOf(item);
          if (idx > -1) list.splice(idx, 1);
          else list.push(item);
        };
        $scope.exists = function (item, list) {
          if($scope.checkall){
             return $scope.checkall;
          }
          return list.indexOf(item) > -1;
        };
        $scope.$on('ngRepeatFinished',function(){
          console.timeEnd("rendered table")
        });
      },
      templateUrl:'module/component_template/table-template.html'// angular.element(document.querySelector('#md-table-template')).html()
    }
  }])
  .directive('viewload',['$location','$route','$timeout',function($location,$route,$timeout){
    return {
      restrict :'A',
      link:function(s,e,a){
        $(e).on("click",function(ev){
          ev.preventDefault();
          var links = $(this).attr("href");
          var t = $(this).parents("tr"),
          l = t[0].getBoundingClientRect().left,
          to = t[0].getBoundingClientRect().top,
          w = t[0].offsetWidth,
          h = t[0].offsetHeight;
          t.addClass("bl-expand-tr");
          var se = $('<section style="left:'+l+'px;top:'+to+'px;width:'+w+'px;height:'+h+'px">'
              +'<md-progress-circular md-mode="indeterminate" aria-valuemin="0" aria-valuemax="100" role="progressbar" class="md-default-theme" style="transform: scale(1);"><div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div></md-progress-circular>'
            +'</section>');
          t.append(se);
          // setTimeout(function(){
              var bl = $(".inner_content")[0].getBoundingClientRect().left,
                  bt = $(".inner_content")[0].getBoundingClientRect().top,
                  bw = $(".inner_content")[0].offsetWidth,
                  bh = $(".inner_content")[0].offsetHeight;
              if( !se.data( 'open' ) ) {
                // $(".bl-main").addClass( 'bl-expand-item' );//section's parent 
                se.css({
                  left:bl+'px',
                  top:bt+'px',
                  width:bw+'px',
                  height:bh+'px'
                })
                se.data( 'open', true ).addClass( 'bl-expand bl-expand-top' );
                setTimeout(function(){
                  console.log(links)
                  $location.path(links);
                  s.$apply()
                },500);
              }
            // },100)
             //  function whichTransitionEvent(){
             //     var t;
             //     var el = document.createElement('fakeelement');
             //     var transitions = {
             //       'transition':'transitionend',
             //       'OTransition':'oTransitionEnd',
             //       'MozTransition':'transitionend',
             //       'WebkitTransition':'webkitTransitionEnd'
             //     }
             //     for(t in transitions){
             //         if( el.style[t] !== undefined ){
             //          console.log(transitions[t])
             //             return transitions[t];
             //         }
             //     }
             // }
             // var transitionEvent = whichTransitionEvent();
             // transitionEvent && se[0].addEventListener(transitionEvent, function(e) {
             //    console.log(links)
             //    // console.log(e);
             //    // console.log("查看执行了几次");
             //   return $location.path(links);
             // });
            })
      }
    }
  }])
  .directive('initmodal',['$timeout',function($timeout){
    return {
      restrict:'A',
      link:function(s,e,a){
        $timeout(function(){
          Modal.init();
        })
      }
    }
  }])
  .directive('viewclose',['$location','$route','$timeout','$window',function($location,$route,$timeout,$window){
    return {
      restrict :'A',
      scope:{
        link:"@",
      },
      link:function(s,e,a){
        $(e).click(function(ev){
            var b = $(".inner_content [return]");
            var bl = b[0].getBoundingClientRect().left,
                  bt = b[0].getBoundingClientRect().top,
                  bw = b[0].offsetWidth,
                  bh = b[0].offsetHeight;
              var a = $('<div class="overlay-1"></div>'),
                  c = $('<div class="overlay-2"></div>'),
                  d = $('<section class="overlays">'
                    +'<md-progress-circular md-mode="indeterminate" aria-valuemin="0" aria-valuemax="100" role="progressbar" class="md-default-theme" style="transform: scale(1);"><div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div></md-progress-circular>'
                    +'</section>');
              b.append(a),b.append(c);
              b.append(d);
              a.animate({
                'top':'-3%'
              },500)
              c.animate({
                'bottom':'-3%'
              },500)
              d.addClass('bl-expand bl-expand-top')
              // return;
              console.log($window.history)
              setTimeout(function(){
                $window.history.back();
                s.$apply()
              },500);
        })
      }
    }
  }])
  .directive('terminal', function() {
      return {
          restrict: 'E',
          scope: {
              name: '@'
          },
          // template: '<span>Hello {{name}}<div class="term"></div></span>',
          template:'<div class="term"></div>',
          link: function(scope, elem, attrs) {
              console.log("sdfsf")
              var socket = io.connect("http://localhost:8080");
              socket.on('connect', function() {
                console.log("sdfasf")
                var term = new Terminal({
                    cols: 80,
                    rows: 24,
                    screenKeys: true
                });
              
                term.on('data', function(data) {
                  socket.emit('data', data);
                });
             
                term.on('title', function(title) {
                  document.title = title;
                });
             
                term.open(elem.find("div")[0]);
                // term.open(document.body);
             
                term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');
             
                socket.on('data', function(data) {
                  term.write(data);
                });
             
                socket.on('disconnect', function() {
                  term.destroy();
                });
              });
              // var term = new Terminal({
              //     cols: 80,
              //     rows: 24,
              //     screenKeys: true
              // });
              // // window.w = elem;
              // term.open(elem.find("div")[0]);
              // term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');
          }
      }
  })

})
