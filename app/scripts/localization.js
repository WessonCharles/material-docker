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
                'logs':'日志',
                'create-image':'创建镜像',
                'service':'服务',
                'groups':'集群',
                'users':'用户',
                'failure':'失败',
                'success':'成功',
                'building':'构建中',
                'aborted':'拒绝',
                'system':'系统设置',
                'roundrobin':'轮询',
                'clientip':'客户端IP',
                'publicip':'公网管理',
                'cluster':'集群',
                'event':'操作事件',
            },
            'en_US' : {
           }
        });
})
