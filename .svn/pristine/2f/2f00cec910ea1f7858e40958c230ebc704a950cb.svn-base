//获取位置
function attendance() {
    getJingwei();
}

//跳向签到
function goAttendance() {
    UM.hideLoadingBar();
    //关闭提示
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "attendance_check" + t,
        "url" : "html/attendance_check.html"
    });
}

//企业通讯录
function mail_list() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "mail_list" + t,
        "url" : "html/mail_list.html"
    });
}

//工单管理
function work_order() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "work_order" + t,
        "url" : "html/work_order.html"
    });
}

//工程管理
function engineering_management() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "engineering_management" + t,
        "url" : "html/engineering_management.html"
    });
}

//内部通知
function notification() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "notification" + t,
        "url" : "html/notification.html"
    });
}

//公共报事
function public_report() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "public_report" + t,
        "url" : "html/public_report.html"
    });

}

//查表
function copy_from() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "meterredHistory" + t,
        "url" : "html/meterredHistory.html"
    });

}

//图片轮播
summerready = function() {
    myFunction();
}
function myFunction() {
    summer.ajax({
        "header" : {
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage("imgurl") + "/uploadfile/getfileinfo",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            batchno : summer.getAppStorage("batchnumm")
        },
    }, function(response) {//成功回调
        response.data = JSON.parse(response.data);
        var jsonArray1 = $summer.strToJson(response.data.message);
        var list = jsonArray1;
        var islider = new iSlider({
            type : 'pic',
            data : list,
            dom : document.getElementById("iSlider-wrapper"),
            isLooping : true,
            animateType : 'default',
            isAutoplay : true,
            animateTime : 800
        });
        islider.addDot();
    }, function(response) {//失败回调
        alert("请联系管理员！");
    });
}

function getJingwei() {
    UM.showLoadingBar({
        text : "位置更新中......",
        icons : 'ti-loading',
    });
    /*summer.getPermission(["android.permission.ACCESS_FINE_LOCATION", "android.permission.ACCESS_COARSE_LOCATION"], //所需权限参数，多个权限用逗号分隔
     function(response) {//成功回调
     //alert("获取权限")
     summer.getLocation(onSuccess, onError);
     function onSuccess(position) {
     alert("经度>>>"+position.coords.longitude+"维度>>>"+position.coords.latitude);
     summer.setStorage('longitude', position.coords.longitude)
     //经度
     summer.setStorage('latitude', position.coords.latitude);
     //维度
     };
     function onError(error) {
     alert("获取定位失败")
     }

     }, function(response) {//失败回调
     alert("获取权限失败")
     });*/

    var onSuccess = function(position) {
        //alert(222);
        //alert("经度>>>" + position.coords.longitude + "维度>>>" + position.coords.latitude);
        summer.setStorage('longitude', position.coords.longitude);
        //经度
        summer.setStorage('latitude', position.coords.latitude);
        //维度
        goAttendance();
    };
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        UM.toast({
            text : '获取位置信息失败'
        });
        goAttendance();
    }


    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}
