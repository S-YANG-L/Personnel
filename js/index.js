﻿function openTab(type, titles) {
    var header = $summer.byId('header');
    var headerPos = $summer.offset(header);
    var footer = $summer.byId('footer');
    var footerPos = $summer.offset(footer);

    var width = $summer.winWidth();
    //==320
    var height = $summer.winHeight() - footerPos.h - headerPos.h;
    //gct:计算frame的高
    $('#h-title').html(titles);
    summer.openFrame({
        name : type,
        url : 'html/' + type + '.html',
        rect : {
            x : 0,
            y : headerPos.h,
            w : width,
            h : height
        },
    });
}

summerready = function() {
    openTab('main', '智慧物业');
    summer.setAppStorage("url", "http://172.20.10.3:9080/cmcc")
    summer.setAppStorage("imgurl", "http://172.20.10.3:9080/document")
    //summer.setAppStorage("url", "http://172.20.10.3:9080/cmcc")
    //summer.setAppStorage("url", "http://106.74.146.162:9080/cmcc");//远端http://192.168.43.224:8085
    //summer.setAppStorage("url", "http://192.168.0.104:8080/cmcc");//home
    //summer.setAppStorage("url", "http://192.168.43.217:8080/cmcc");//iphone
    //summer.setAppStorage("url", "http://192.168.191.2:8080/cmcc");//MakYongyou
    var tokenEntitys = summer.getAppStorage("tokenEntity");
    //		alert(tokenEntitys);
    if (tokenEntitys == null) {
        var t = (new Date()).valueOf();
        summer.openWin({
            "id" : "signin" + t,
            "url" : "/html/signin.html"
        });
    } else {
        var token = tokenEntitys.token;
        var tokenExpiryTime = tokenEntitys.tokenExpiryTime;
        var timestamp = (new Date()).getTime();
        //			alert(token+"-------"+tokenExpiryTime+"====="+timestamp);
        if (timestamp > tokenExpiryTime) {
            UM.toast({
                text : 'Token已过期，请重新登录'
            });
            var t = (new Date()).valueOf();
            summer.openWin({
                "id" : "signin" + t,
                "url" : "/html/signin.html"
            });
        }// else {
        //openTab('index', '智慧社区');
        //}

    }
    //getNativeLocation();
    getbatchno();
}
function getbatchno() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage('url') + "/banner/bannerInfo",
        "param" : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "tenantId" : summer.getAppStorage("tenantId"),
            "appType" : 1
        },
    }, function(response) {//成功回调
        var data = JSON.parse(response.data);
        if (data.code == "200") {
            var jsonArray = data.bannerInfo;
            for (var i = 0; i < jsonArray.length; i++) {
                var entity = jsonArray[i];
                summer.setAppStorage("batchnumm", entity.shufflingFigure);
            }
        }
    }, function(response) {//失败回调
        alert("请联系管理员解决！");
    });
}

