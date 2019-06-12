summerready = function() {
	getMeterredhistory();
}

//新增抄表记录
function goMeterredhistory() {
		//var roomId = getQueryString("roomId");
		var t = (new Date()).valueOf();
		summer.openWin({
			"id":"meter_reading"+t,
			"url" : "html/meter_reading.html"
		});
	}

//抄表记录
function getMeterredhistory(){
$("#recordID").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/CopyForm/getMeterredhistory',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"copy_name_id":summer.getAppStorage("userId")
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PCFList = response.data.PCFList;
			if(code=="200"){
				if(PCFList.length==0){
				UM.toast({
				    text: "当前暂无抄表记录"
				});
			}
				for (var i = 0; i < PCFList.length; i++) {
					var PCF = PCFList[i];
					var $li = $(
						'<li class="um-listview-row" onclick="getParticulars(this,'+i+')">'
							+'<a href="#" class="um-list-centernotice">'
								+'<input type="hidden" id="copyId'+i+'" value="'+PCF.id+'"/>'
								+'<div class="center-icon">'
									+'<img src="../img/inspect-icon.png">'
								+'</div>'
								+'<div class="um-media-body">'
									+'<p class="notice-bt">'
										+'<span class="um-mobilebt32">'+PCF.instrumentType+'</span>'
									+'</p>'
									+'<p class="um-gray f14 um-text-overflow2">编号 : '+PCF.readingNum+'</p>'
									+'<p class="um-gray f14 um-text-overflow2">抄表日期 : '+PCF.readingDate+'</p>'
								+'</div>'
							+'</a>'
						+'</li>'
					);
					$li.appendTo($("#recordID"));
				}
			}
		});
}

//跳转详情
function getParticulars(t,i){
	var id = $("#copyId"+i).val();
	var t = (new Date()).valueOf();
	summer.openWin({
	  "id" : "meter_reading_details"+t,
	  "url" : "html/meter_reading_details.html?id="+id
	});
}

//获取路径中的值
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

function Getchaxun(){
$("#chaxun").empty();
var $div = $(
	'<div style="width:48%;float:left;">'	
	+'<input type="date" id="stare" value="" class="form-control"/>'
	+'</div>'
	+'<div style="width:48%;float:right;">'
	+'<input type="date" id="end" value="" class="form-control"/>'
	+'</div>'
	+'</br>'
	+'<button class="attaone" onclick="gobake()"  style="float:right">取消</button>'
	+'<button class="attaone" onclick="goSousuo()" style="float:right">搜索</button>'
	
	);
	$div.appendTo($("#chaxun"));

}
function gobake(){
	$("#chaxun").empty();
}

function goSousuo(){
	var stare=$("#stare").val();
	var end=$("#end").val();
	$("#recordID").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/CopyForm/getMeterredhistoryLike',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"copy_name_id":summer.getAppStorage("userId"),
			"stare":stare,
			"end":end
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PCFList = response.data.PCFList;
			if(code=="200"){
				if(PCFList.length==0){
				UM.toast({
				    text: "当前暂无抄表记录"
				});
			}
				for (var i = 0; i < PCFList.length; i++) {
					var PCF = PCFList[i];
					var $li = $(
						'<li class="um-listview-row" onclick="getParticulars(this,'+i+')">'
							+'<a href="#" class="um-list-centernotice">'
								+'<input type="hidden" id="copyId'+i+'" value="'+PCF.id+'"/>'
								+'<div class="center-icon">'
									+'<img src="../img/inspect-icon.png">'
								+'</div>'
								+'<div class="um-media-body">'
									+'<p class="notice-bt">'
										+'<span class="um-mobilebt32">'+PCF.instrumentType+'</span>'
									+'</p>'
									+'<p class="um-gray f14 um-text-overflow2">编号 : '+PCF.readingNum+'</p>'
									//+'<p class="um-gray f14 um-text-overflow2">房屋信息 : '+PCF.readingNum+'</p>'
									+'<p class="um-gray f14 um-text-overflow2">抄表日期 : '+PCF.readingDate+'</p>'
								+'</div>'
							+'</a>'
						+'</li>'
					);
					$li.appendTo($("#recordID"));
				}
			}
		});
}

function fanhui(){
	var t = (new Date()).valueOf();
	summer.openWin({
					"id" : "index"+t,
					"url" : "index.html"
				});
}