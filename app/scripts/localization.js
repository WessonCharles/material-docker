'use strict';

define(['angular'], function(angular){
    return angular.module('ThCofAngSeed.localization', [])
        .value('localizedTexts', {
            'zh_CN' : {
                'home':'主页',
                'applications':'应用',
                'columns':'存储',
                'create-column':'创建存储卷',
                'image':'镜像',
                'create-image':'创建镜像',
                'service':'服务',
                'groups':'集群',
                'users':'用户',
            },
            'en_US' : {
           }
        });
})
