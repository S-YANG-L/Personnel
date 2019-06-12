//获取路径中的值
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

summerready = function() {
	getMeterReadingDetail();
}

function getMeterReadingDetail(){
	var id = getQueryString("id");
	$("#chaobiaoDiv").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/CopyForm/getMeterReadingDetail',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PMRList = response.data.PMRList;
		if(code=="200"){
			for (var i = 0; i < PMRList.length; i++) {
				var PMR = PMRList[i];
				var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;">'
						+'<div class="notice-head">'
							+'<div class="center-icon">'
								+'<img alt="" src="../img/work-repair-icon.png">'
							+'</div>'
							+'<div style="float:left;">'
								+'<h4 class="um-media-heading um-mobilebt32">'+PMR.instrumentName+'</h4>'
								+'<p class="um-mobilebthui"> 仪表编号:'+PMR.instrumentNumber+'</p>'
							+'</div>'
						+'</div>'
						+'<ul>'
							+'<li><span>房屋:</span> <span>'+PMR.housingResources+'</span> </li>'
							+'<li><span>刻度:</span> <span>'+PMR.scale+'</span> </li>'
							+'<li><span>旧刻度:</span> <span>'+PMR.oldScale+'</span> </li>'
							+'<li><span>刻度差:</span> <span>'+PMR.scaleDifference+'</span> </li>'
							+'<li><span>总价(元):</span> <span>'+PMR.totalPrice+'</span> </li>'
						+'</ul>'
					+'</div>'
				);
				$div.appendTo($("#chaobiaoDiv"));
			}
		}
		});
}

function fanhui(){
	summer.closeWin({});
}