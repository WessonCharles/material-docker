# Opsdocker

本项目由angularJs + angularMaterialUI + gulp构建

具体结构如下（简）（后将会随具体业务决定是否调整）

		Project
		│  .bowerrc
		│  bower.json
		│  Gruntfile.js
		│  package.json
		│  README.md
		│  
		├─app
		│  │  404.html       ————│
		│  │  favicon.ico	 ————│——入口文件以及图标文件
		│  │  index.html	 ————│
		│  │  
		│  ├─images
		│  │      yeoman.png  ————│——所有图片
		│  │ 
		│  ├─libs   ————│——所有前端公共库，即bower_components
		│  │  │  require.js
		│  │  │  
		│  │  ├─angular		
		│  │  │      angular.min.js
		│  │  │      
		│  │  ├─angular-route
		│  │  │      angular-route.min.js
		│  │  │      
		│  │  └─... 
		│  │  
		│  ├─module
		│  │  │  main.html 	   ———│——公共html 如header.html等等
		│  │  │  
		│  │  ├─app_one			——│——每个模块的路由，controller逻辑控制和html
		│  │  │      controller.js
		│  │  │      router.js
		│  │  │      
		│  │  ├─app_three
		│  │  │      controller.js
		│  │  │      router.js
		│  │  │      
		│  │  └─...
		│  │          
		│  ├─scripts
		│  │  │  app.js 	————│——入口app文件
		│  │  │  
		│  │  ├─configs		————│——config配置
		│  │  │  │  config.js  ————│——集合所有config的config模块
		│  │  │  │  
		│  │  │  └─more			————│——零碎的功能化config配置
		│  │  │          httpProvider.js
		│  │  │          sceDelegateProvider.js
		│  │  │          ...
		│  │  │          
		│  │  ├─directives
		│  │  │  │  directive.js ————│——集合所有directive的模块
		│  │  │  │  
		│  │  │  └─more
		│  │  │          abnTree.js  ————│——零碎的功能化directive
		│  │  │          onRendered.js
		│  │  │          pageNation.js
		│  │  │          
		│  │  │          ...
		│  │  └─services
		│  │      │  service.js  ————│——集合所有service的模块
		│  │      │  
		│  │      └─more   ————│——所有的service
		│  │              formDataObject.js
		│  │              ...
		│  │              
		│  └─styles    ————│——所有样式文件
		│          main.css
		│          
		├─node_modules  ————│——所有node模块
		│  ├─.bin
		│  │      cake
		│  │ 	    ...
		│              
		└─test  ————│——测试模块
		    │  .jshintrc
		    │  
		    └─spec
		        └─controllers
		                main.js

*:通过修改项目根目录下的.bowerrc文件，修改bower命令默认的资源路径bower_components为app/libs
*:使用gulp中集成的requirejs工具作为cmd加载方式
*:使用gulp作为打包工具

