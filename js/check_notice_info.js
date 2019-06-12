function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
}
summerready = function() {
	judgeGenre();
}
var id ='';
function judgeGenre(){
	id = getQueryString("inspectionID");
	var inspection = getQueryString("num");
	var inspectionStartTime = getQueryString("inspectionStartTime");//开始时间
	var inspectionEndTime = getQueryString("inspectionEndTime");//结束时间
	var finishNumber = getQueryString("finishNumber");//频次
	if(inspection=="0"){//设备0
		device_management(id,inspectionStartTime,inspectionEndTime,finishNumber);
	}
	if(inspection=="1"){//装修1
		decoration_reg(id,inspectionStartTime,inspectionEndTime,finishNumber);
	}
	if(inspection=="2"){//空关巡检2
		house(id,inspectionStartTime,inspectionEndTime,finishNumber);
	}
	if(inspection=="3"){//园区楼宇巡检3
		inspection_mana(id,inspectionStartTime,inspectionEndTime,finishNumber)
	}
}

//设备
function device_management(id,inspectionStartTime,inspectionEndTime,finishNumber){
	$("#ListDiv").empty();
	var name= summer.getAppStorage("userName")
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/pollingDetails/devicemanagement',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2:token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PrgDeviceManagementMiddleList = response.data.PrgDeviceManagementMiddleList;
		if(code=="200"){
			for (var i = 0; i < PrgDeviceManagementMiddleList.length; i++) {
				var PMM = PrgDeviceManagementMiddleList[i];
				var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;" >'
						+'<div class="notice-head">'
							+'<div class="center-icon">'
								+'<img alt="" src="../img/work-repair-icon.png">'
							+'</div>'
							+'<div style="float:left;">'
								+'<h4 class="um-media-heading um-mobilebt32">'+PMM.deviceName+'</h4>'
								+'<p class="um-mobilebthui"><font id="PMMcolour'+i+'"><b>'+PMM.status+'</b></font></p>'
							+'</div>'
							+'<div style="float:right" class="lease-searchbtn">'                          
                                +'<button onclick="goReportDetail(0,'+i+')">上报详情</button>'
                            +'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="facility'+i+'" value="'+PMM.id+'"/>'
							+'<li><span>巡检频次</span> <span>'+finishNumber+'</span> </li>'
							+'<li><span>已完成次数</span> <span>'+PMM.finish_number+'</span> </li>'
							+'<li><span>巡检内容</span> <span>'+PMM.remarks+'</span> </li>'
							+'<li><span>巡检人</span> <span>'+name+'</span> </li>'
							+'<li><span>开始时间</span> <span>'+inspectionStartTime+'</span> </li>'
							+'<li><span>结束时间</span> <span>'+inspectionEndTime+'</span> </li>'
							+'<li style="display:none;"><span>是否完成</span> <span>'+PMM.status+'</span> </li>'
						+'</ul>'
					+'</div>'
					 );
				$div.appendTo($("#ListDiv"));
				if("未完成"==PMM.status){
					document.getElementById('PMMcolour'+i).style.color = "#FF0000";
				}else{
					document.getElementById('PMMcolour'+i).style.color = "#5bb75b";
				}
			}
		}else{
			UM.toast({
				    text: response.data.state
				});
		}
		});
}

//空关
function house(id,inspectionStartTime,inspectionEndTime,finishNumber){
	$("#ListDiv").empty();
	var name= summer.getAppStorage("userName")
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/pollingDetails/houseOff',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2:token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PrgHouseMiddleList = response.data.PrgHouseMiddleList;
		if(code=="200"){
			for (var i = 0; i < PrgHouseMiddleList.length; i++) {
				var PHM = PrgHouseMiddleList[i];
				var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;" onclick="goReportDetail(1,'+i+')">'
						+'<div class="notice-head">'
							+'<div class="center-icon">'
								+'<img alt="" src="../img/work-repair-icon.png">'
							+'</div>'
							+'<div style="float:left;">'
								+'<h4 class="um-media-heading um-mobilebt32">空关巡检</h4>'
								+'<p class="um-mobilebthui"><font id="PHMcolour'+i+'"><b>'+PHM.status+'</b></font></p>'
							+'</div>'
							+'<div style="float:right" class="lease-searchbtn">'                          
                                +'<button onclick="goReportDetail(0,'+i+')">上报详情</button>'
                            +'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="houseReport'+i+'" value="'+PHM.id+'"/>'
							+'<li><span>巡检频次</span> <span>'+finishNumber+'</span> </li>'
							+'<li><span>已完成次数</span> <span>'+PHM.finish_number+'</span> </li>'
							+'<li><span>巡检地址</span> <span>'+PHM.housingResourcesName+'</span> </li>'
							+'<li><span>巡检人</span> <span>'+name+'</span> </li>'
							+'<li><span>开始时间</span> <span>'+inspectionStartTime+'</span> </li>'
							+'<li><span>结束时间</span> <span>'+inspectionEndTime+'</span> </li>'
							+'<li style="display:none;"><span>是否完成</span> <span>'+PHM.status+'</span> </li>'
						+'</ul>'
					+'</div>'
					 );
				$div.appendTo($("#ListDiv"));
				if("未完成"==PHM.status){
					document.getElementById('PHMcolour'+i).style.color = "#FF0000";
				}else{
					document.getElementById('PHMcolour'+i).style.color = "#5bb75b";
				}
			}
		}else{
			UM.toast({
				    text: response.data.state
				});
		}
		});
}
//装修
function decoration_reg(id,inspectionStartTime,inspectionEndTime,finishNumber){
	$("#ListDiv").empty();
	var name= summer.getAppStorage("userName")
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/pollingDetails/decorationReg',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2:token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PrgDecorationRegMiddleList = response.data.PrgDecorationRegMiddleList;
		if(code=="200"){
			for (var i = 0; i < PrgDecorationRegMiddleList.length; i++) {
				var PDRM = PrgDecorationRegMiddleList[i];
				var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;" onclick="goReportDetail(2,'+i+')">'
						+'<div class="notice-head">'
							+'<div class="center-icon">'
								+'<img alt="" src="../img/work-repair-icon.png">'
							+'</div>'
							+'<div style="float:left;">'
								+'<h4 class="um-media-heading um-mobilebt32">装修巡检</h4>'
								+'<p class="um-mobilebthui"><font id="PDRMcolour'+i+'"><b>'+PDRM.status+'</b></font></p>'
							+'</div>'
							+'<div style="float:right" class="lease-searchbtn">'                          
                                +'<button onclick="goReportDetail(0,'+i+')">上报详情</button>'
                            +'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="decorationReg'+i+'" value="'+PDRM.id+'"/>'
							+'<li><span>租户</span> <span>'+PDRM.tenant+'</span> </li>'
							+'<li><span>巡检人</span> <span>'+name+'</span> </li>'
							+'<li><span>巡检频次</span> <span>'+finishNumber+'</span> </li>'
							+'<li><span>已完成次数</span> <span>'+PDRM.finish_number+'</span> </li>'
							+'<li><span>租期开始时间</span> <span>'+PDRM.tenantTimeStrat+'</span> </li>'
							+'<li><span>租期结束时间</span> <span>'+PDRM.tenantTimeEnd+'</span> </li>'
							+'<li><span>装修开始时间</span> <span>'+PDRM.decoTimeStrat+'</span> </li>'
							+'<li><span>装修结束时间</span> <span>'+PDRM.decoTimeEnd+'</span> </li>'
							+'<li><span>施工人员</span> <span>'+PDRM.deocIngPeson+'</span> </li>'
							+'<li><span>装修单位名称</span> <span>'+PDRM.deocCompanyName+'</span> </li>'
							+'<li><span>巡检内容</span> <span>'+PDRM.remarks+'</span> </li>'
							+'<li><span>开始时间</span> <span>'+inspectionStartTime+'</span> </li>'
							+'<li><span>结束时间</span> <span>'+inspectionEndTime+'</span> </li>'
							+'<li><span>地址</span> <span>'+PDRM.formTenant+'</span> </li>'
							+'<li style="display:none;"><span>是否完成</span> <span>'+PDRM.status+'</span> </li>'
						+'</ul>'
					+'</div>'
					 );
				$div.appendTo($("#ListDiv"));
				if("未完成"==PDRM.status){
					document.getElementById('PDRMcolour'+i).style.color = "#FF0000";
				}else{
					document.getElementById('PDRMcolour'+i).style.color = "#5bb75b";
				}
			}
		}else{
			UM.toast({
				    text: response.data.state
				});
		}
		});
}

//园区   
function inspection_mana(id,inspectionStartTime,inspectionEndTime,finishNumber){
	$("#ListDiv").empty();
	var name= summer.getAppStorage("userName")
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/pollingDetails/inspectionMana',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2:token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PrgInspectionManaMiddleList = response.data.PrgInspectionManaMiddleList;
		if(code=="200"){
			for (var i = 0; i < PrgInspectionManaMiddleList.length; i++) {
				var PIMM = PrgInspectionManaMiddleList[i];
				var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;" onclick="goReportDetail(3,'+i+')">'
						+'<div class="notice-head">'
							+'<div class="center-icon">'
								+'<img alt="" src="../img/work-repair-icon.png">'
							+'</div>'
							+'<div style="float:left;">'
								+'<h4 class="um-media-heading um-mobilebt32">园区楼宇巡检</h4>'
								+'<p class="um-mobilebthui"><font id="PIMMcolour'+i+'"><b>'+PIMM.status+'</b></font></p>'
							+'</div>'
							+'<div style="float:right" class="lease-searchbtn">'                          
                                +'<button onclick="goReportDetail(0,'+i+')">上报详情</button>'
                            +'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="inspectionManaID'+i+'" value="'+PIMM.id+'"/>'
							+'<li><span>巡检地点</span> <span>'+PIMM.inspectionName+'</span> </li>'
							+'<li><span>巡检人</span> <span>'+name+'</span> </li>'
							+'<li><span>巡检频次</span> <span>'+finishNumber+'</span> </li>'
							+'<li><span>已完成次数</span> <span>'+PIMM.finish_number+'</span> </li>'
							+'<li><span>开始时间</span> <span>'+inspectionStartTime+'</span> </li>'
							+'<li><span>结束时间</span> <span>'+inspectionEndTime+'</span> </li>'
							+'<li><span>巡检内容</span> <span>'+PIMM.remarks+'</span> </li>'
							+'<li style="display:none;"><span>是否完成</span> <span>'+PIMM.status+'</span> </li>'
						+'</ul>'
					+'</div>'
					 );
				$div.appendTo($("#ListDiv"));
				if("未完成"==PIMM.status){
					document.getElementById('PIMMcolour'+i).style.color = "#FF0000";
				}else{
					document.getElementById('PIMMcolour'+i).style.color = "#5bb75b";
				}
			}
		}else{
			UM.toast({
				    text: response.data.state
				});
		}
		});
}

function fanhui(){
	summer.closeWin({});
}

//跳向巡检详情页面
function goReportDetail(state,i){
var objectId ='';
if("0"==state){//shebei
	objectId =$("#facility"+i).val();//设备id
}
if("1"==state){//空关
	objectId =$("#houseReport"+i).val();//空关id
}
if("2"==state){//装修
	objectId =$("#decorationReg"+i).val();//子表id
}
if("3"==state){//园区
	objectId =$("#inspectionManaID"+i).val();//子表id
}
	var t = (new Date()).valueOf();
	summer.openWin({
		"id" : "check_report_details"+t,
		 "url" : "html/check_report_details.html?objectId="+objectId+"&inspectionID="+id
	   	});
}
