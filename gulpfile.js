//引入gulp
var fs = require('fs');
var gulp = require('gulp');


//引入组件
var concat = require('gulp-concat');           //合并
var jshint = require('gulp-jshint');           //js规范验证
var uglify = require('gulp-uglify');           //压缩
var rename = require('gulp-rename');          //文件名命名
// var amdOptimize = require("amd-optimize");           //require优化
// var watch = require('gulp-watch');
var clean = require('gulp-clean');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var rjs = require('requirejs');
var minifyHTML   = require('gulp-minify-html'); //压缩html
var minifycss = require('gulp-minify-css');
var htmlreplace = require('gulp-html-replace');


//脚本检查
gulp.task('lint', function () {
    gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * 清空产出目录的冗余资源，始终保留最新的生成的资源
 */
gulp.task('clean',function(){
    return gulp.src('dest',{read:false})
        .pipe(clean());
})


gulp.task('build',['clean'] ,function(cb){//中间的字符串数组，是指当前任务的依赖任务，即 build任务需要再clean任务执行完再执行，以此来实现异步
  rjs.optimize({
      baseUrl: "app/scripts",                     //js根目录

      name: 'main',                           //执行的第一个requirejs包

      optimize: 'uglify',

      mainConfigFile: "app/scripts/main.js",                 //requirejs的配置文件 例外：路径相对于项目根目录

      removeCombined: true,
      
      paths:{
        angular:'../libs/angular/angular.min',
        jquery:'../libs/jquery/dist/jquery.min',
        angularRoute:'../libs/angular-route/angular-route.min',
        angularAnimate:'../libs/angular-animate/angular-animate.min',
        angularAria:'../libs/angular-aria/angular-aria.min',
        angularMaterial:'../libs/angular-material/angular-material.min',
        angularResource:'../libs/angular-resource/angular-resource.min',
        modal:'../libs/custom/modal',
        colresize:'../libs/colresize/colresize',
        modernizr:'../libs/custom/modernizr.custom',
        socket:'../libs/socket/socket.io',
        markdown:'../libs/markdown/markdown',
        highlight:'empty:',
        imgcrop:'../libs/ngImgCrop/ng-img-crop',
        datetime:'../libs/datePicker/js/bootstrap-datetimepicker.min',
        highcharts:'../libs/highcharts/highcharts',
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
        'markdown':{'exports':'markdown'},
        'imgcrop':['angular'],
        'highlight':{'exports':'highlight'},
        'highcharts':['jquery'],
        'datetime':['jquery']
      },
      priority: [
        'angular',
        'jquery'
      ],

      out: "app/min/coanseed.min.js",                 //输出的压缩文件

      findNestedDependencies: true,                               //必须指定让requirejs能找到嵌套的文件

      include: ['../libs/require.js']
  }, function(buildResponse){
    // console.log('build response', buildResponse);
    cb();
  }, cb);
});


/**
 * 对静态资源增加版本控制MD5戳
 */
gulp.task('conmincss',['build'],function(){
  var cssc = {
        uikit:'app/libs/angular-material/angular-material.min.css',
        codemirror:'app/styles/main.css',
        htmleditor:'app/libs/ngImgCrop/ng-img-crop.css',
        pretty:'app/libs/datePicker/bootstrap-datetimepicker.min.css'
    },csscfile=[];
    for(var c in cssc){
        csscfile.push(cssc[c]);
    }
    return gulp.src(csscfile)
      .pipe(concat('coanseed.min.css'))
      .pipe(minifycss())
      .pipe(gulp.dest('app/min'))
})

gulp.task('js&css',['conmincss'],function(){
  return gulp.src(['app/**/*.*'])
        // .pipe(rename())
        // .pipe(rev())
        .pipe(gulp.dest('dest'))
        // .pipe(rev.manifest())
        // .pipe(gulp.dest('app/gulp-build/rev'))
})

gulp.task('js',['clean','js&css'],function(){
    return gulp.src(['app/min/coanseed.min.js'])
        // .pipe(rename())
        .pipe(rev())
        .pipe(gulp.dest('dest/min'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dest/rev/js')) 
})

gulp.task('css',['clean','js&css'],function(){
    return gulp.src(['app/style/*.css'])
        // .pipe(rename())
        .pipe(rev())
        .pipe(gulp.dest('dest/style'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dest/rev/css')) 
})

gulp.task('min_css',['clean','js&css'],function(){
    return gulp.src(['app/min/*.css'])
        // .pipe(rename())
        .pipe(rev())
        .pipe(gulp.dest('dest/min'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dest/rev/min_css')) 
})
/**
 * 根据生成的mainfest进行替换
 */
gulp.task('rev',['js','css','min_css'],function(){
    return gulp.src(['dest/rev/**/*.json','app/index.html'])//数组前一个是生成的静态资源文件，后一个是需要修改的html模板
        .pipe(revCollector({
            replaceReved:true,
            // dirReplacements:{
            //     'libs':'../gulp-build/ress',
            //     'gulp-build/jsmin':'../gulp-build/ress',
            // }
        }))
        .pipe(gulp.dest('dest/'))//将替换过的文件输出即可，这里输出到原来的路径
})

gulp.task('replace',['rev'],function(){
  return gulp.src('dest/index.html')
        .pipe(htmlreplace({
          'require':'min/coanseed.min.js',
          'css':'min/coanseed.min.css'
        }))
        .pipe(gulp.dest('dest/'))
})

gulp.task('revrequire',['replace'],function(){
  return gulp.src(['dest/rev/**/*.json','dest/index.html'])
        .pipe(revCollector({
            replaceReved:true,
        }))
        .pipe(minifyHTML({//HTML压缩
            empty:true,
            spare:true
        }))
        .pipe(gulp.dest('dest/'))
})




gulp.task('default', ['clean','conmincss','build','js&css','js','css','min_css','rev','replace','revrequire']);

// gulp.task('default', function () {
//     //监听js变化
//     gulp.watch('./src/js/**/*.js', function () {       //当js文件变化后，自动检验 压缩
//         //gulp.run('lint', 'scripts');
//         gulp.run('lint', 'rjs');
//     });


// });
