'use strict';
define(['angular'],function(angular){
  return angular.module("ThCofAngSeed.directives.table",[])
  .directive('mdTable', function () {
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
        links:'=' 
      },
      controller: function ($scope,$filter,$window) {
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
      },
      templateUrl:'module/table-template.html'// angular.element(document.querySelector('#md-table-template')).html()
    }
  })
  .directive('mdColresize', function ($timeout) {
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
  })
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
  .directive('viewclose',['$location','$route','$timeout','$window',function($location,$route,$timeout,$window){
    return {
      restrict :'A',
      scope:{
        link:"@",
      },
      link:function(s,e,a){
        $(e).click(function(ev){
            var b = $(".inner_content [ng-controller]");
            var bl = b[0].getBoundingClientRect().left,
                  bt = b[0].getBoundingClientRect().top,
                  bw = b[0].offsetWidth,
                  bh = b[0].offsetHeight;
            //   var se = $('<section style="left:'+l+'px;top:'+to+'px;width:'+w+'px;height:'+h+'px">'
            //   +'<md-progress-circular md-mode="indeterminate" aria-valuemin="0" aria-valuemax="100" role="progressbar" class="md-default-theme" style="transform: scale(1);"><div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div></md-progress-circular>'
            // +'</section>');
              // $(".bl-main").addClass( 'bl-expand-item' );//section's parent 
              b.css({
                '-webkit-transition': 'all 0.5s ease-in-out',
                '-moz-transition': 'all 0.5s ease-in-out',
                'transition': 'all 0.5s ease-in-out',
                '-webkit-transform': 'scale(1,0.1)',
                '-moz-transform': 'scale(1,0.1)',
                '-ms-transform': 'scale(1,0.1)',
                'transform': 'scale(1,0.1)'
              })
              console.log($window.history)
              setTimeout(function(){
                $window.history.back();
                s.$apply()
              },500);
        })
      }
    }
  }])

})
