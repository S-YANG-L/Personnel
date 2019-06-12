summerready = function() {
	inspection_all();
}

//查询所有的巡检计划
function inspection_all(){
	$("#pollingDIV").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/InspectionController/listInspection',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"staffName" : summer.getAppStorage("userName"),
			"staffId" : summer.getAppStorage("userId"),
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
					+'<input type="hidden" id="finishNumber'+i+'"  value="'+Inspection.finishNumber+'"/>'
					+'<div class="center-icon">'
					+'<img src="../img/inspect-icon.png">'
					+'</div>'
					+'<div class="um-media-body">'
					+'<p class="notice-bt">'
					+'<span class="um-mobilebt32" id="inspection'+i+'">'+Inspection.inspection+'</span>'
					+'<span class="um-gray f12 fr">'+Inspection.inspectionEndTime+'</span>'
					+'</p>'
					//+'<p class="um-gray f14 um-text-overflow2">'+Inspection.remark+'</p>'
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
	  "id" : "check_notice_info"+t,
	  "url" : "html/check_notice_info.html?inspectionID="+inspectionID+"&num="+num+"&inspectionStartTime="+inspectionStartTime+"&inspectionEndTime="+inspectionEndTime+"&finishNumber="+finishNumber
	});
}
//跳转到首页
function goMessage() {
	var t = (new Date()).valueOf();
	summer.openWin({
		id : "message"+t,
		url : "html/message.html",

	});
}

