var RaNum = '';
summerready = function() {
    getType();
    RaNum = getRandomNumber();
    //获取随机数
}
//获取报事类型
function getType() {
    $("#typeSelect").empty();
    $("#name").val(summer.getAppStorage("userName"));
    $("#time").val(getTime());
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/reportGenre/type',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "tenantId" : summer.getAppStorage("tenantId")
        },
        header : {
            //Authorization : "OAuth2: token",
            //"Content-Type" : "application/json"
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var code = response.data.code;
        var rGList = response.data.rGList;
        //alert(code);
        if (code == "200") {
            for (var i = 0; i < rGList.length; i++) {
                var report = rGList[i];
                var $option = $('<option value="' + report.id + '">' + report.reportGenre + '</option>');
                $option.appendTo($("#typeSelect"));
            }
        }
    });
}

//保存
function save() {
    summer.ajax({
        type : 'post',
        url : summer.getAppStorage('url') + '/reportGenre/save',
        param : {
            "token" : summer.getAppStorage("tokenEntity").token,
            "typeSelect" : $("#typeSelect").val(),
            "name" : $("#name").val(),
            "time" : $("#time").val(),
            "site" : $("#site").val(),
            "details" : $("#details").val(),
            "picture" : RaNum,
            "tenantId" : summer.getAppStorage("tenantId")
        },
        header : {
            //Authorization : "OAuth2: token",
            //"Content-Type" : "application/json"
            Authorization : "OAuth2: token"
        }
    }, function(response) {
        response.data = JSON.parse(response.data);
        var code = response.data.code;
        if (code == "200") {
            UM.toast({
                text : "保存成功"
            });
            summer.openWin({
                //"url" : "index.html"
            });
        } else {
            UM.toast({
                text : response.data.message
            });
        }
    });
    //imagePaths为数组
    for ( i = 0; i < imgPathes.length; i++) {
        var imgPathWS = imgPathes[i].imgPath;
        //多文件上传，5秒超时
        summer.multiUpload({
            fileArray : [{//文件列表，数组
                fileURL : imgPathWS, //需要上传的文件路径
                type : "image/jpeg", //上传文件的类型 > 例：图片为"image/jpeg"
                name : "imgs" //后台取图片的Key
            }],
            params : {
                token : summer.getAppStorage("tokenEntity").token,
                batchno : RaNum //随机数
            }, //上传参数
            //headers : {},
            SERVER : summer.getAppStorage("imgurl") + "/uploadfile/uploadfilestoapp", //服务器地址
            timeout : 5
        }, "multiUploadCallback(args)", "multiUploadErrCallback(args)");
    }
}

//获取当前时间
function getTime() {
    var date = new Date();
    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var nowTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return nowTime;
}

//选择图片权限授予
function openPhotoAlbum() {
    var params = ["android.permission.READ_EXTERNAL_STORAGE"];
    commonFunc(params, openPhotoAlbum_common);
}

//选择图片权限授予
function commonFunc(params, common) {
    if ($summer.os == "android") {
        summer.getPermission(params, function(response) {//成功回调
            common();
        }, function(response) {//失败回调
            //alert(response);
        });
    } else {
        common();
    }
}

var imgPathes;
//打开系统相册，选择多张图片
var openPhotoAlbum_common = function() {
    summer.openPhotoAlbum({
        type : "multiple", //支持选多张图片
        maxCount : 9,
        callback : function(args) {
            imgPathes = args.imgPaths;
            var tmpl = '<li id="' + RaNum + '" class="weui-uploader__file" style="background-image:url(#url#)"></li>',
                $gallery = $("#gallery"),
                $galleryImg = $("#galleryImg"),
                $uploaderInput = $("#uploaderInput"),
                $uploaderFiles = $("#uploaderFiles");
            for ( i = 0; i < args.imgPaths.length; i++) {
                var imgPathWS = args.imgPaths[i].imgPath;
                $uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
            }
            var index;
            //点击图片
            $uploaderFiles.on("click", "li", function() {
                index = $(this).index();
                $galleryImg.attr("style", this.getAttribute("style"));
                $gallery.fadeIn(100);
            });
            $gallery.on("click", function() {
                $gallery.fadeOut(100);
            });
            //删除图片
            $(".weui-gallery__del").click(function() {
                //delet(RaNum)
                $uploaderFiles.find("li").eq(index).remove();
            });
        }
    });
}
function multiUploadCallback(args) {
    //$summer.alert(args);
    //$summer.alert("multiUpload,成功回调:" + JSON.stringify(args));
}

function multiUploadErrCallback(args) {
    //$summer.alert(args);
    //$summer.alert("multiUpload,失败回调:" + args.error);
}

function delet(RaNum) {
    summer.ajax({
        "header" : {
            "Content-Type" : "application/json"
        },
        "type" : "POST",
        "url" : summer.getAppStorage("imgurl") + "/uploadfile/deleteuploadimage",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            key : '201905146000000258'
        },
    }, function(response) {//成功回调
        summer.toast({
            "msg" : "删除成功!"
        })
    }, function(response) {//失败回调
        //alert("请联系管理员！");
    });
}

//生成随机数DOC+15位 7 8
function getRandomNumber() {
    var currentdate = 'DOC';
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    date = year + month + strDate;
    //八位随机数
    var finalNum = '';
    for (var i = 0; i < 8; i++) {
        finalNum += Math.floor(Math.random() * 10);
    }

    return currentdate += date + finalNum;

}

function fanhui() {
    var t = (new Date()).valueOf();
    summer.openWin({
        "id" : "index" + t,
        "url" : "index.html"
    });
}