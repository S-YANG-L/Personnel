var dimState ="";
summerready = function(){
    goMyInspection();
    
}



//我的巡检
function goMyInspection(){
	dimState ="0";//未完成
	$("#pollingDIV").empty();
	$("#commission").val("");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/InspectionController/listInspection',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"staffName" : summer.getAppStorage("userName"),
			"staffId" : summer.getAppStorage("userId"),
			"state" :0,
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
		var listInspection = response.data.listInspection;
		if(code == "200"){
		//拼接列表
			for (var i = 0; i < listInspection.length; i++) {
				var Inspection = listInspection[i];
				//alert(Inspection.finishNumber)
				var $li = $(
					'<li class="um-listview-row" onclick="check_notice_info(this,'+i+')">'
					+'<a href="#" class="um-list-centernotice">'
					+'<input type="hidden" id="inspectionID'+i+'"  value="'+Inspection.id+'"/>'
					+'<input type="hidden" id="inspectionStartTime'+i+'"  value="'+Inspection.inspectionStartTime+'"/>'
					+'<input type="hidden" id="inspectionEndTime'+i+'"  value="'+Inspection.inspectionEndTime+'"/>'
					+'<input type="hidden" id="finishNumber'+i+'"  value="'+Inspection.frequency+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32">'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<span class="um-gray f14 um-text-overflow2" id="inspection'+i+'">'+Inspection.inspection+'</span>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingDIV"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
}

//已完成
function inspectionEnd(){
	dimState ="1";//未完成
	$("#pollingDIV").empty();
	$("#commission").val("");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/InspectionController/listInspection',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"staffName" : summer.getAppStorage("userName"),
			"staffId" : summer.getAppStorage("userId"),
			"state" :1,
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
		var listInspection = response.data.listInspection;
		if(code == "200"){
		//拼接列表
			for (var i = 0; i < listInspection.length; i++) {
				var Inspection = listInspection[i];
				//alert(Inspection.finishNumber)
				var $li = $(
					'<li class="um-listview-row" onclick="check_notice_info(this,'+i+')">'
					+'<a href="#" class="um-list-centernotice">'
					+'<input type="hidden" id="inspectionID'+i+'"  value="'+Inspection.id+'"/>'
					+'<input type="hidden" id="inspectionStartTime'+i+'"  value="'+Inspection.inspectionStartTime+'"/>'
					+'<input type="hidden" id="inspectionEndTime'+i+'"  value="'+Inspection.inspectionEndTime+'"/>'
					+'<input type="hidden" id="finishNumber'+i+'"  value="'+Inspection.frequency+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32">'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<span class="um-gray f14 um-text-overflow2" id="inspection'+i+'">'+Inspection.inspection+'</span>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingDIV"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
}

function check_notice_info(t,i){
	var inspection= $("#inspection"+i).text();
	var inspectionID= $("#inspectionID"+i).val();
	var inspectionStartTime= $("#inspectionStartTime"+i).val();
	var inspectionEndTime= $("#inspectionEndTime"+i).val();
	var finishNumber= $("#finishNumber"+i).val();
	var num = null;
	if(inspection=="设备巡检"){
		num = "0";
	}
	if(inspection=="装修巡检"){
		num = "1";
	}
	if(inspection=="空关巡检"){
		num = "2";
	}
	if(inspection=="园区楼宇巡检"){
		num = "3";
	}
	var t = (new Date()).valueOf();
	summer.openWin({
		id :"check_notice_info"+t,
	  "url" : "html/check_notice_info.html?inspectionID="+inspectionID+"&num="+num+"&inspectionStartTime="+inspectionStartTime+"&inspectionEndTime="+inspectionEndTime+"&finishNumber="+finishNumber
	});
}
//跳转到首页
function goMessage() {
var t = (new Date()).valueOf();
	summer.openWin({
		id :"message"+t,
		url : "html/message.html",

	});
}

function fanhui(){
	summer.closeWin({});
}

//模糊未完成查询
function obscure(){
if("1"==dimState){
	obscure1();
}
if("3"==dimState){
	obscure2();
}
 if("0"==dimState){
	$("#pollingDIV").empty();
	var title= $("#commission").val();
	//$("#commission").val("");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/InspectionController/listInspection',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"staffName" : summer.getAppStorage("userName"),
			"staffId" : summer.getAppStorage("userId"),
			"state" :dimState,
			"dimState" :dimState,
			"title" :title,
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
		var listInspection = response.data.listInspection;
		if(code == "200"){
		if(listInspection.length==0){
				UM.toast({
				    text: "当前暂无计划"
				});
			}
		//拼接列表
			for (var i = 0; i < listInspection.length; i++) {
				var Inspection = listInspection[i];
				var $li = $(
					'<li class="um-listview-row" onclick="check_notice_info(this,'+i+')">'
					+'<a href="#" class="um-list-centernotice">'
					+'<input type="hidden" id="inspectionID'+i+'"  value="'+Inspection.id+'"/>'
					+'<input type="hidden" id="inspectionStartTime'+i+'"  value="'+Inspection.inspectionStartTime+'"/>'
					+'<input type="hidden" id="inspectionEndTime'+i+'"  value="'+Inspection.inspectionEndTime+'"/>'
					+'<input type="hidden" id="finishNumber'+i+'"  value="'+Inspection.frequency+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32">'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<span class="um-gray f14 um-text-overflow2" id="inspection'+i+'">'+Inspection.inspection+'</span>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingDIV"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
	}
}

//模糊已完成查询
function obscure1(){
	$("#pollingDIV").empty();
	var title= $("#commission").val();
	//$("#commission").val("");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/InspectionController/listInspection',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"staffName" : summer.getAppStorage("userName"),
			"staffId" : summer.getAppStorage("userId"),
			"state" :dimState,
			"dimState" :dimState,
			"title" :title,
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
		var listInspection = response.data.listInspection;
		if(code == "200"){
			if(listInspection.length==0){
				UM.toast({
				    text: "当前暂无计划"
				});
			}
		//拼接列表
			for (var i = 0; i < listInspection.length; i++) {
				var Inspection = listInspection[i];
				var $li = $(
					'<li class="um-listview-row" onclick="check_notice_info(this,'+i+')">'
					+'<a href="#" class="um-list-centernotice">'
					+'<input type="hidden" id="inspectionID'+i+'"  value="'+Inspection.id+'"/>'
					+'<input type="hidden" id="inspectionStartTime'+i+'"  value="'+Inspection.inspectionStartTime+'"/>'
					+'<input type="hidden" id="inspectionEndTime'+i+'"  value="'+Inspection.inspectionEndTime+'"/>'
					+'<input type="hidden" id="finishNumber'+i+'"  value="'+Inspection.frequency+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32">'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<span class="um-gray f14 um-text-overflow2" id="inspection'+i+'">'+Inspection.inspection+'</span>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingDIV"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
}

//未完成已过期
function inspectionStaleDated(){
	dimState ="3";//未完成已过期
	$("#pollingDIV").empty();
	$("#commission").val("");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/InspectionController/listInspection',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"staffName" : summer.getAppStorage("userName"),
			"staffId" : summer.getAppStorage("userId"),
			"state" :3,
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
		var listInspection = response.data.listInspection;
		if(code == "200"){
		//拼接列表
			for (var i = 0; i < listInspection.length; i++) {
				var Inspection = listInspection[i];
				//alert(Inspection.finishNumber)
				var $li = $(
					'<li class="um-listview-row" onclick="check_notice_info(this,'+i+')">'
					+'<a href="#" class="um-list-centernotice">'
					+'<input type="hidden" id="inspectionID'+i+'"  value="'+Inspection.id+'"/>'
					+'<input type="hidden" id="inspectionStartTime'+i+'"  value="'+Inspection.inspectionStartTime+'"/>'
					+'<input type="hidden" id="inspectionEndTime'+i+'"  value="'+Inspection.inspectionEndTime+'"/>'
					+'<input type="hidden" id="finishNumber'+i+'"  value="'+Inspection.frequency+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32">'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<span class="um-gray f14 um-text-overflow2" id="inspection'+i+'">'+Inspection.inspection+'</span>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingDIV"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
}

//模糊已过期
function obscure2(){
	$("#pollingDIV").empty();
	var title= $("#commission").val();
	//$("#commission").val("");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/InspectionController/listInspection',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"staffName" : summer.getAppStorage("userName"),
			"staffId" : summer.getAppStorage("userId"),
			"state" :dimState,
			"dimState" :dimState,
			"title" :title,
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
		var listInspection = response.data.listInspection;
		if(code == "200"){
			if(listInspection.length==0){
				UM.toast({
				    text: "当前暂无计划"
				});
			}
		//拼接列表
			for (var i = 0; i < listInspection.length; i++) {
				var Inspection = listInspection[i];
				var $li = $(
					'<li class="um-listview-row" onclick="check_notice_info(this,'+i+')">'
					+'<a href="#" class="um-list-centernotice">'
					+'<input type="hidden" id="inspectionID'+i+'"  value="'+Inspection.id+'"/>'
					+'<input type="hidden" id="inspectionStartTime'+i+'"  value="'+Inspection.inspectionStartTime+'"/>'
					+'<input type="hidden" id="inspectionEndTime'+i+'"  value="'+Inspection.inspectionEndTime+'"/>'
					+'<input type="hidden" id="finishNumber'+i+'"  value="'+Inspection.frequency+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32">'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<span class="um-gray f14 um-text-overflow2" id="inspection'+i+'">'+Inspection.inspection+'</span>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingDIV"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
}