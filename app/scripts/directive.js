'use strict';
define(['angular','colresize','socket','imgcrop','modal'],function(angular,colresize,io,imgcrop,modal){
  return angular.module("ThCofAngSeed.directives",[])
  .directive('mdColresize', ['$timeout',function ($timeout) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        // scope.$evalAsync(function () {
        //   $timeout(function(){ $(element).colResizable({
        //     liveDrag: true,
        //     fixed: true
            
        //   });},100);
        // });
        return;
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
  .directive('datetimePicker',function($timeout){
    return {
      restrict:'A',
      link:function(scope,element,attr){
        var type = attr.dateFormat&&attr.dateFormat.indexOf("hh")>-1?0:2;
        var sv = attr.dateFormat&&attr.dateFormat.indexOf("hh")>-1&&attr.dateFormat.indexOf("dd")==-1?1:2;
        $timeout(function(){
          $(element).datetimepicker({
              weekStart: 1,
              todayBtn: 1,
              autoclose: 1,
              todayHighlight: 1,
              startView: sv,
              minView: type,
              maxView: 1,
              forceParse: 0 
          });
        })
      }
    }
  })
  .directive('mdTable',["$filter","$timeout","$rootScope",function ($filter,$timeout,$rootScope) {
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
        collheaders:'=',
        getapidata:'=',
        hover:'=',
        modal:'=',
        action:'=',
        innerlinks:"@",
        subhover:"=",
        subclick:"=",
        refresh:"=",
      },
      link: function ($scope,$element,$attr) {
        console.log($scope.action)
        var orderBy = $filter('orderBy');
        $scope.tablePage = 0;
        $scope.nbOfPages = function () {
          return Math.ceil($scope.content.length / $scope.count);
        },
        $scope.handleSort = function (field) {
            if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
        };
        $scope.setconsole = function(l){
          $scope.consoles = l;
        }
        $scope.current_tenant={
          id:$rootScope.current_tenant.id
        }
        $scope.token = $rootScope.token;

        $scope.linkconsole = function(){
          var link = "http://"+$scope.consoles.host+"/"+$scope.current_tenant.id+"/console/"+$scope.consoles.name+"/"+$scope.console+"?token="+$scope.token;
          var it = $('<a class="md-primary" layout layout-align="center end" href="'+link+'" id="console" target="_blank">确认连接</a>');
          if($("body").find("a#console").length>0){
            $("body").find("a#console").remove();
          }
          it.appendTo(document.body).css({"z-index":1600,
          position:"absolute",
          opacity:0,
          display:"inline-block",
          top:$("#consolel")[0].getBoundingClientRect().top+$("body")[0].scrollTop,
          left:$("#consolel")[0].getBoundingClientRect().left,
          width:$("#consolel")[0].offsetWidth,
          height:$("#consolel")[0].offsetHeight
          });
          console.log(it)
        }
        $(document).scroll(function(){
          if($("#console").length>0){
            $("#console").css("top",($("#consolel")[0].getBoundingClientRect().top+$("body")[0].scrollTop)+"px");
          }
        })

        $("#tiptool").mouseleave(function(){
          console.log("2324")
          $(this).removeClass("show").html("");
        })
        $scope.order = function(predicate, reverse) {
            if(!$scope.handleSort(predicate)){
              return false;
            }
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

          $scope.selected = list;
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

        $timeout(function(){
          Modal.init();
        },0)
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
          var istr = $(this).parents("tr").length>0;
          var t = istr?$(this).parents("tr"):$(this).parent(),
          l = istr?t[0].getBoundingClientRect().left-180:t[0].offsetLeft,//,
          to = istr?t[0].getBoundingClientRect().top-50:t[0].offsetTop,//,
          w = t[0].offsetWidth,
          h = t[0].offsetHeight;
          t.addClass("bl-expand-tr");
          var se = $('<section style="left:'+l+'px;top:'+to+'px;width:'+w+'px;height:'+h+'px;position:absolute;">'
              +'<md-progress-circular md-mode="indeterminate" aria-valuemin="0" aria-valuemax="100" role="progressbar" class="md-default-theme" style="transform: scale(1);"><div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div></md-progress-circular>'
            +'</section>');
          t.append(se);
          // setTimeout(function(){
              var bl = $(".inner_content")[0].offsetLeft,//$(".inner_content")[0].getBoundingClientRect().left,
                  bt = $(".inner_content")[0].offsetTop-50,//$(".inner_content")[0].getBoundingClientRect().top,
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
                // return;
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
              /**
               * [估计需要调整，使用history.back()实现的功能跟浏览器的back差不多，实际上应该返回上一级
               * ]
               */
              setTimeout(function(){
                // var its = window.location.pathname.split("/");
                // var newlink = "";
                // for(var i =0;i<its.length-1;i++){
                //   var s = i==0?"":"/";
                //   newlink+=s+its[i];
                // }
                // console.log(newlink)
                // $location.path(newlink)
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
              // console.log("sdfsf")
              // var socket = io.connect("http://localhost:8080");
              // socket.on('connect', function() {
              //   console.log("sdfasf")
              //   var term = new Terminal({
              //       cols: 80,
              //       rows: 24,
              //       screenKeys: true
              //   });
              
              //   term.on('data', function(data) {
              //     socket.emit('data', data);
              //   });
             
              //   term.on('title', function(title) {
              //     document.title = title;
              //   });
             
              //   term.open(elem.find("div")[0]);
              //   // term.open(document.body);
             
              //   term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n');
             
              //   socket.on('data', function(data) {
              //     term.write(data);
              //   });
             
              //   socket.on('disconnect', function() {
              //     term.destroy();
              //   });
              // });
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
  .directive('onview',['$timeout',function($timeout){
      return {
        restrict:'A',
        link:function(s,e,a){
          console.log(a)
          /*对video进行处理*/
          var HtmlUtil = {
              /*1.用浏览器内部转换器实现html转码*/
              htmlEncode:function (html){
                  //1.首先动态创建一个容器标签元素，如DIV
                  var temp = document.createElement ("div");
                  //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
                  (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
                  //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
                  var output = temp.innerHTML;
                  temp = null;
                  return output;
              },
              /*2.用浏览器内部转换器实现html解码*/
              htmlDecode:function (text){
                  //1.首先动态创建一个容器标签元素，如DIV
                  var temp = document.createElement("div");
                  //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
                  temp.innerHTML = text;
                  //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
                  var output = temp.innerText || temp.textContent;
                  temp = null;
                  return output;
              }
          };
          var videoreg = /(&lt;video.+\/video&gt;)|(&lt;embed.+\/embed&gt;)/g;//有待测试，匹配多个的时候
                                            //支持video 和 embed 等等视频
          var result = a.content.match(videoreg);
          var nresult = HtmlUtil.htmlDecode(result);
            // console.log(result)
            // console.log(nresult)
            var ncon = a.content.replace(videoreg,nresult)
            /*对video进行处理结束*/
            // console.log(ncon)
          $timeout(function(){
            if(a.content)$(e).html('<pre>'+ncon+'</pre>');
          })
        }
      }
  }])
  .directive('mdButton',['$timeout','$location',function($timeout,$location){
      return {
          restrict: 'A',
          link: function(scope, element, attr) {
            console.log(element)
            $(element).click(function(){
              var t = $(this);
              if(t.parents(".modal__content").length>0){
                $location.path(t.attr("href"));
              }
            })
          }
      };
  }])
  // .directive('uploadImage',['$timeout','$compile','$scope',function($timeout,$compile,$scope){
  //   return {
  //     restrict: 'E',
  //     scope: { 
  //       myImage:'=',
  //       myCroppedImage:'='
  //     },
  //     template:['<div layout="row" layout-margin layout-padding>',
  //               '<div flex class="md-raised md-pink md-button md-default-theme">',
  //                   '<div>请选择图像: <input type="file" id="fileInput" /></div>',
  //                   '<div class="cropArea">',
  //                     $compile('<img-crop image="myImage" result-image="myCroppedImage"></img-crop>')($scope),
  //                   '</div>',
  //               '</div>',    
  //               '<div flex class="md-raised md-grey md-button md-default-theme">',
  //                   '<div>',
  //                     '<img ng-src="{{myCroppedImage}}">',
  //                   '</div>',
  //               '</div>',
  //             '</div>'].join(),
  //     link: function(scope,element,attr) {
        
  //     }
  //   }
  // }])

})
