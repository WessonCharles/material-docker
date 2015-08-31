'use strict';


module.exports = function (grunt) {


  grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),      //指定包的信息


      /**
       * 为项目增加grunt-contrib-requirejs打包
       */

      requirejs: {
        /*********以下配置可成功打包成一个文件*********/

            
        compile: {

          options: {

              baseUrl: "app",                     //js根目录

              name: 'scripts/main-build',                           //执行的第一个requirejs包

              optimize: 'uglify',

              mainConfigFile: "app/scripts/main-build.js",                 //requirejs的配置文件 例外：路径相对于项目根目录

              removeCombined: true,
              
              paths:{
                angular:'libs/angular/angular.min',
                jquery:'empty:',
                angularRoute:'libs/angular-route/angular-route.min',
                angularAnimate:'libs/angular-animate/angular-animate.min',
                angularAria:'libs/angular-aria/angular-aria.min',
                angularMaterial:'empty:',
                angularResource:'libs/angular-resource/angular-resource.min'
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

              out: "app/build/scripts/coanseed.min.js",                 //输出的压缩文件

              findNestedDependencies: true,                               //必须指定让requirejs能找到嵌套的文件

              include: ['libs/require.js'],                          //指定requirejs所在的位置。

          }

        }


        

        /************以下尝试只打包业务代码，或者按 公共库，js插件，业务逻辑的分类打包************/

        // build: {
        //   options: {
        //       // appDir: './dev',
        //       baseUrl: 'app',
        //       dir: './build',
        //       // optimize: 'uglify',
        //       // generateSourceMaps: true,
        //       // preserveLicenseComments: false,
        //       // useSourceUrl: true,
        //       // optimizeCss: 'standard.keepComments.keepLines',
        //       paths:{
        //         angular:'libs/angular/angular.min',
        //         jquery:'libs/jquery/dist/jquery.min',
        //         angularRoute:'libs/angular-route/angular-route.min',
        //         angularAnimate:'libs/angular-animate/angular-animate.min',
        //         angularAria:'libs/angular-aria/angular-aria.min',
        //         angularMaterial:'libs/angular-material/angular-material.min',
        //         angularResource:'libs/angular-resource/angular-resource.min',
        //         app:'scripts/app',
        //         name: 'scripts/main'
        //       },
        //       shim:{
        //         'angular' : {'exports' : 'angular'},
        //         'jquery': {'exports': 'jquery'},
        //         'angularResource':['angular'],
        //         'angularRoute': ['angular'],
        //         'angularAnimate':['angular'],
        //         'angularAria':['angular'],
        //         'angularMaterial':['angular','angularAnimate','angularAria'],
        //       },
        //       modules: [{
        //           name: 'scripts/main'
        //       }]
        //   }
        // }

      },

      /**
       * 为打包后的文件 增加MD5戳（后续将为css等文件做处理）
       * @type {Object}
       */
      rev: {
        options: {
          encoding: 'utf8',
          algorithm: 'md5',
          length: 8
        },
        assets: {
          files: [{
            src: [
              'app/build/scripts/*.js',
              'app/libs/**/*.css'
              // 'img/**/*.{jpg,jpeg,gif,png}',
              // 'fonts/**/*.{eot,svg,ttf,woff}'
            ]
          }]
        }
      },
      /**
       * 使用usemin替换html中引用的静态资源，应该包括 js css image等等
       * @type {Object}
       */
      usemin:{
        // css:{
        //   files:{
        //     src: ['app/libs/**/*.css']
        //   }       
        // },
        js: 'app/build/scripts/*.js',
        html: 'app/index.html',
        options:{
          // assetsDirs: ['static', 'static/a/b/css/']
          patterns:{
            // js: [[/(\/images\/[\/\w-]+\.png)/, 'replace image in js']]
            html: [
              [
                /<script.+src=['"]([^"']+)["']/gm,
                'Update the HTML to reference our concat/min/revved script files'
              ],
              [
                /<link[^\>]+href=['"]([^"']+)["']/gm,
                'Update the HTML with the new css filenames'
              ],
              [
                /<img[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
                'Update the HTML with the new img filenames'
              ],
              [
                /<video[^\>]+src=['"]([^"']+)["']/gm,
                'Update the HTML with the new video filenames'
              ],
              [
                /<video[^\>]+poster=['"]([^"']+)["']/gm,
                'Update the HTML with the new poster filenames'
              ],
              [
                /<source[^\>]+src=['"]([^"']+)["']/gm,
                'Update the HTML with the new source filenames'
              ],
              [
                /data-main\s*=['"]([^"']+)['"]/gm,
                'Update the HTML with data-main tags',
                function (m) {
                  return m.match(/\.js$/) ? m : m + '.js';
                },
                function (m) {
                  return m.replace('.js', '');
                }
              ],
              [
                /data-(?!main).[^=]+=['"]([^'"]+)['"]/gm,
                'Update the HTML with data-* tags'
              ],
              [
                /url\(\s*['"]?([^"'\)]+)["']?\s*\)/gm,
                'Update the HTML with background imgs, case there is some inline style'
              ],
              [
                /<a[^\>]+href=['"]([^"']+)["']/gm,
                'Update the HTML with anchors images'
              ],
              [
                /<input[^\>]+src=['"]([^"']+)["']/gm,
                'Update the HTML with reference in input'
              ],
              [
                /<meta[^\>]+content=['"]([^"']+)["']/gm,
                'Update the HTML with the new img filenames in meta tags'
              ],
              [
                /<object[^\>]+data=['"]([^"']+)["']/gm,
                'Update the HTML with the new object filenames'
              ],
              [
                /<image[^\>]*[^\>\S]+xlink:href=['"]([^"'#]+)(#.+)?["']/gm,
                'Update the HTML with the new image filenames for svg xlink:href links'
              ],
              [
                /<image[^\>]*[^\>\S]+src=['"]([^'"\)#]+)(#.+)?["']/gm,
                'Update the HTML with the new image filenames for src links'
              ],
              [
                /<(?:img|source)[^\>]*[^\>\S]+srcset=['"]([^"'\s]+)\s*?(?:\s\d*?[w])?(?:\s\d*?[x])?\s*?["']/gm,
                'Update the HTML with the new image filenames for srcset links'
              ],
              [
                /<(?:use|image)[^\>]*[^\>\S]+xlink:href=['"]([^'"\)#]+)(#.+)?["']/gm,
                'Update the HTML within the <use> tag when referencing an external url with svg sprites as in svg4everybody'
              ]
            ]
          }
        }
      }
  });

  //加载所需要的库

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');
  
  // grunt.loadNpmTasks("grunt-contrib-cssmin");

  // grunt.loadNpmTasks('grunt-contrib-htmlmin');

  //注册相应的类库

  grunt.registerTask('default', ['requirejs', 'rev','usemin'/*'cssmin', 'htmlmin'*/]);

};
