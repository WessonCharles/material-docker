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


//require合并
// gulp.task('rjs', function () {
//     gulp.src('./src/js/**/*.js')
//         .pipe(amdOptimize("main", { //require config
//             paths: {
//                 "jquery": "../../libs/jquery/dist/jquery.min",
//                 "jquery.serializeJSON": "../../libs/jquery.serializeJSON/jquery.serializejson.min",
//                 "sug": "src/js/suggestion/suggestion",
//                 "validate": "../util/src/js/util/validate",
//                 "urlParam": "../util/src/js/util/url.param"
//             },
//             shim: {
//                 "jquery.serializeJSON": ['jquery']
//             }
//         }))
//         .pipe(concat("index.js"))           //合并
//         .pipe(gulp.dest("dist/js"))          //输出保存
//         .pipe(rename("index.min.js"))          //重命名
//         .pipe(uglify())                        //压缩
//         .pipe(gulp.dest("dist/js"));         //输出保存
// });
gulp.task('build',['clean'] ,function(cb){//中间的字符串数组，是指当前任务的依赖任务，即 build任务需要再clean任务执行完再执行，以此来实现异步
  rjs.optimize({
      baseUrl: "app/scripts",                     //js根目录

      name: 'main',                           //执行的第一个requirejs包

      optimize: 'uglify',

      mainConfigFile: "app/scripts/main.js",                 //requirejs的配置文件 例外：路径相对于项目根目录

      removeCombined: true,
      
      paths:{
        angular:'../libs/angular/angular.min',
        jquery:'empty:',
        angularRoute:'../libs/angular-route/angular-route.min',
        angularAnimate:'../libs/angular-animate/angular-animate.min',
        angularAria:'../libs/angular-aria/angular-aria.min',
        angularMaterial:'empty:',
        angularResource:'../libs/angular-resource/angular-resource.min'
      },
      shim:{
        'angular' : {'exports' : 'angular'},
        'jquery': {'exports': 'jquery'},
        'angularResource':['angular'],
        'angularRoute': ['angular'],
        'angularAnimate':['angular'],
        'angularAria':['angular'],
        'angularMaterial':['angular','angularAria'],
      },

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
// gulp.task('css',['clean','build'],function(){
//     return gulp.src('app/libs/**/*.css')
//         // .pipe(csso())  //这里是针对css进行压缩  需要引用gulp-csso
//         .pipe(rename(function(path){
//             console.log(path)
//             // path.basename += ".min";
//             path.etname=".css";
//         }))
//         .pipe(rev())
//         .pipe(gulp.dest('app/gulp-build/styles'))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('app/gulp-build/rev/css')) //生成minifest.json（静态资源表）文件
// });

gulp.task('js&css',['clean','build'],function(){
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
    return gulp.src(['app/libs/**/*.css'])
        // .pipe(rename())
        .pipe(rev())
        .pipe(gulp.dest('dest/libs'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dest/rev/css')) 
})

/**
 * 根据生成的mainfest进行替换
 */
gulp.task('rev',['js','css'],function(){
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
          'require':'min/coanseed.min.js'
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




gulp.task('default', ['clean','build','js&css','js','css','rev','replace','revrequire']);

// gulp.task('default', function () {
//     //监听js变化
//     gulp.watch('./src/js/**/*.js', function () {       //当js文件变化后，自动检验 压缩
//         //gulp.run('lint', 'scripts');
//         gulp.run('lint', 'rjs');
//     });


// });
