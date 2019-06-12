//获取传参
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}


summerready = function() {
var objectId = getQueryString("objectId");//字表id
var inspectionID = getQueryString("inspectionID");//字表id
	goReportDetail(objectId ,inspectionID);
}
function goReportDetail(objectId,inspectionID){
	$("#detailDiv").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/pollingDetails/getReportDetail',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"objectId" : objectId,
			"inspectionID" : inspectionID,
			"userId" : summer.getAppStorage("userId")
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2:token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PIRList = response.data.PIRList;
		if(code=="200"){
			if(PIRList.length==0){
				UM.toast({
				    text: "当前暂无上报记录"
				});
			}
			for (var i = 0; i < PIRList.length; i++) {
				var PIR = PIRList[i];
				var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;">'
						+'<div class="notice-head">'
							+'<div class="center-icon">'
								+'<img alt="" src="../img/work-repair-icon.png">'
							+'</div>'
							+'<div style="float:left;position: relative;width:10rem;">'
								+'<p class="um-media-heading um-mobilebt32">'+PIR.inspectionAllTheme+'</p>'
								+'<p class="um-mobilebthui"><font id="colourFinish'+i+'"><b>'+PIR.isFinish+'</b></font></p>'
								+'<p class="um-mobilebthui"><font id="colourNormal'+i+'"><b>'+PIR.isNormal+'</b></font></p>'
							+'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="picture'+i+'" value="'+PIR.picture+'"/>'
							+'<li><span>上报时间</span> <span>'+PIR.reportDate+'</span> </li>'
							+'<li><span>总次数</span> <span>'+PIR.inspectionNum+'</span> </li>'
							+'<li><span>完成次数</span> <span>'+PIR.surplusNum+'</span> </li>'
							+'<li><span>巡检人</span> <span>'+PIR.personName+'</span> </li>'
							+'<li><span>备注</span> <span>'+PIR.remark+'</span> </li>'
						+'</ul>'
						+'<ul style="border-top:none;">'
                            +'<li id="chuliIm">'
                                +'<div>'
                                    +'<span style="display:block; margin: 10px 0;">照片</span>'
                                    +'<div class="page__bd">'
                                        +'<div class="weui-gallery" id="gallery'+i+'">'
                                            +'<span class="weui-gallery__img" id="galleryImg'+i+'"></span>'
                                        +'</div>'
                                        +'<div class="weui-cell__bd">'
                                            +'<div class="weui-uploader">'
                                                +'<div class="weui-uploader__bd">'
                                                    +'<ul class="weui-uploader__files" id="uploaderFiles'+i+'"></ul>'
                                                +'</div>'
                                            +'</div>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</li>'
                        +'</ul>'
					+'</div>'
				);
				//颜色
				$div.appendTo($("#detailDiv"));
				if("未完成"==PIR.isFinish){
					document.getElementById('colourFinish'+i).style.color = "#FF0000";
				}else{
					document.getElementById('colourFinish'+i).style.color = "#5bb75b";
				}
				if("不正常"==PIR.isNormal){
					document.getElementById('colourNormal'+i).style.color = "#FF0000";
				}else{
					document.getElementById('colourNormal'+i).style.color = "#5bb75b";
				}
				//图片
				var batchno = PIR.picture;
				getImage(batchno,i);
			}
		}
		
	});
}

//获取图片
function getImage(batchno,i){
	summer.ajax({
        "header" : {
            //"Content-Type" : "application/json"
            Authorization : "OAuth2: token"
        },
        "type" : "POST",
        "url" : summer.getAppStorage("imgurl")+"/uploadfile/getfileinfo",
        "async" : "false",
        "param" : {
            token : summer.getAppStorage("tokenEntity").token,
            batchno : batchno
        },
    }, function(response) {//成功回调
    //alert(response.data);
        response.data = JSON.parse(response.data);
        var jsonArray1 = $summer.strToJson(response.data.message);
        var tmpl = '<li  class="weui-uploader__file" style="background-image:url(#url#)"></li>',
            $gallery = $("#gallery"+i),
            $galleryImg = $("#galleryImg"+i),
            $uploaderInput = $("#uploaderInput"+i),
            $uploaderFiles = $("#uploaderFiles"+i);
        for ( j = 0; j < jsonArray1.length; j++) {
            var imgPathWS = jsonArray1[j].filePath;
            amgId = jsonArray1[j].fileId;
            $uploaderFiles.append($(tmpl.replace('#url#', imgPathWS)));
        }
        //大小图
        $uploaderFiles.on("click", "li", function() {
                $galleryImg.attr("style", this.getAttribute("style"));
                $gallery.fadeIn(100);
            });
            $gallery.on("click", function() {
                $gallery.fadeOut(100);
            });
        
    }, function(response) {//失败回调
        //alert("请联系管理员！");
    });
}

function fanhui(){
	summer.closeWin({});
}