 var dimState ="";
//巡检列表
function inspection(){
	dimState ="0";//未完成
	$("#commission").val("");
	$("#pollingAll").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/InspectionController/listInspection',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"staffName" : summer.getAppStorage("userName"),
			"staffId" : summer.getAppStorage("userId"),
			"state":0,
			"tenantId" : summer.getAppStorage("tenantId")
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2:token"
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
					'<li class="um-listview-row" onclick="check_info(this,'+i+')">'
					+'<a href="#" class="um-list-centernotice">'
					+'<input type="hidden" id="inspectionID'+i+'"  value="'+Inspection.id+'"/>'
					+'<input type="hidden" id="inspectionStartTime'+i+'"  value="'+Inspection.inspectionStartTime+'"/>'
					+'<input type="hidden" id="inspectionEndTime'+i+'"  value="'+Inspection.inspectionEndTime+'"/>'
					+'<input type="hidden" id="frequency'+i+'"  value="'+Inspection.frequency+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32">'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">巡检次数 :'+Inspection.frequency+'</span>'
					+'</p>'
					+'<p class="um-gray f14 um-text-overflow2" id="inspection'+i+'">'+Inspection.inspection+'</p>'
					//+'<p class="um-gray f14 um-text-overflow2" >已完成次数 : '+Inspection.finishNumber+'</p>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingAll"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});

}



//跳向详情
function check_info(t , i){
	/*//var id = $("#abnormalState" + i).text();
	var id = $("#inspectionID" + i).val();
	summer.openWin({
	        "url" : "html/check_info.html?id="+id
	    });*/
	   
	var inspection= $("#inspection"+i).text();//巡检类型
	var inspectionID= $("#inspectionID"+i).val();//id
	var inspectionStartTime= $("#inspectionStartTime"+i).val();//开始时间
	var inspectionEndTime= $("#inspectionEndTime"+i).val();//结束时间
	var frequency= $("#frequency"+i).val();//总次数
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
		"id" : "check_info"+t,
	  "url" : "html/check_info.html?inspectionID="+inspectionID+"&num="+num+"&inspectionStartTime="+inspectionStartTime+"&inspectionEndTime="+inspectionEndTime+"&frequency="+frequency
	});
}

//已完成
function pollingEnd(){
	dimState ="1";//以完成
	$("#commission").val("");
	$("#pollingAll").empty();
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
					+'<input type="hidden" id="inspection'+i+'"  value="'+Inspection.inspection+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32" >'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<p class="um-gray f14 um-text-overflow2">'+Inspection.inspection+'</p>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingAll"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
}

function check_notice_info(t,i){
	var inspection= $("#inspection"+i).val();
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
		"id" : "check_notice_info"+t,
	  "url" : "html/check_notice_info.html?inspectionID="+inspectionID+"&num="+num+"&inspectionStartTime="+inspectionStartTime+"&inspectionEndTime="+inspectionEndTime+"&finishNumber="+finishNumber
	});
}
//模糊已完成查询
function obscure1(){
	$("#pollingAll").empty();
	var title= $("#commission").val();
	
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
					+'<input type="hidden" id="inspection'+i+'"  value="'+Inspection.inspection+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32">'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<p class="um-gray f14 um-text-overflow2">'+Inspection.inspection+'</p>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingAll"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
}
//模糊未完成查询
function obscure(){
if("1"==dimState){
	obscure1();
}else{
	$("#pollingAll").empty();
	var title= $("#commission").val();
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
			//Authorization : "OAuth2: token",  3834211170789
			//Content-Type : "application/json"
			Authorization : "OAuth2: token",
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
					'<li class="um-listview-row" onclick="check_info(this,'+i+')">'
					+'<a href="#" class="um-list-centernotice">'
					+'<input type="hidden" id="inspectionID'+i+'"  value="'+Inspection.id+'"/>'
					+'<input type="hidden" id="inspectionStartTime'+i+'"  value="'+Inspection.inspectionStartTime+'"/>'
					+'<input type="hidden" id="inspectionEndTime'+i+'"  value="'+Inspection.inspectionEndTime+'"/>'
					//+'<input type="hidden" id="finishNumber'+i+'"  value="'+Inspection.finishNumber+'"/>'
					+'<input type="hidden" id="frequency'+i+'"  value="'+Inspection.frequency+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32" >'+Inspection.title+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					+'<p class="um-gray f14 um-text-overflow2" id="inspection'+i+'">'+Inspection.inspection+'</p>'
					+'<p class="um-gray f14 um-text-overflow2">巡检时间: '+Inspection.inspectionStartTime+'至'+Inspection.inspectionEndTime+'</p>'
					+'</div>'
					+'</a>'
					+'</li>'
					 );
				$li.appendTo($("#pollingAll"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
	}
}


summerready = function() {
	inspection();
}

function fanhui(){
	var t = (new Date()).valueOf();
	summer.openWin({
					"id" : "index"+t,
					"url" : "index.html"
				});
}