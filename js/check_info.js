//获取传参
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}


summerready = function() {
	judgeGenre();
}

var name ='';
var inspectionStartTime ='';
var inspectionEndTime = '';
var frequency = '';
var id ='';
function judgeGenre(){
	 id = getQueryString("inspectionID");
	var inspection = getQueryString("num");
	 inspectionStartTime = getQueryString("inspectionStartTime");//开始时间
	 inspectionEndTime = getQueryString("inspectionEndTime");//结束时间
	 frequency = getQueryString("frequency");//频次
	name= summer.getAppStorage("userName");
	if(inspection=="0"){//设备0
		device_management(id,inspectionStartTime,inspectionEndTime,frequency);
	}
	if(inspection=="1"){//装修1
		decoration_reg(id,inspectionStartTime,inspectionEndTime,frequency);
	}
	if(inspection=="2"){//空关巡检2
		house(id,inspectionStartTime,inspectionEndTime,frequency);
	}
	if(inspection=="3"){//园区楼宇巡检3
		inspection_mana(id,inspectionStartTime,inspectionEndTime,frequency)
	}
}

//设备
function device_management(id,inspectionStartTime,inspectionEndTime,frequency){
	$("#ListDiv").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/pollingDetails/devicemanagement',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			Authorization : "OAuth2:token",
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PrgDeviceManagementMiddleList = response.data.PrgDeviceManagementMiddleList;
		if(code=="200"){
			for (var i = 0; i < PrgDeviceManagementMiddleList.length; i++) {
				var PMM = PrgDeviceManagementMiddleList[i];
				var objectId =PMM.id;
				var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;" >'
						+'<div class="notice-head">'
							+'<div class="center-icon">'
								+'<img alt="" src="../img/work-repair-icon.png" onclick="goReportDetail(0,'+i+')">'
							+'</div>'
							+'<div style="float:left;position: relative;width:10rem;">'								
								+'<p class="um-media-heading um-mobilebt32">'+PMM.deviceName+'</p>'
								+'<button onclick="report(0,'+i+')" class="btn btn-info" style="width:4rem;height:1.4rem;padding: 0.2rem !important;position: absolute;right:0;top: 0;font-size:0.62rem;">情况上报</button>'							
								+'<p class="um-mobilebthui"><font id="PMMcolour'+i+'"><b>'+PMM.status+'</b></font></p>'
							+'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="facility'+i+'" value="'+PMM.id+'"/>'
							+'<li><span>总次数</span> <span>'+frequency+'</span> </li>'
							+'<li><span >完成次</span> <span id="endNum'+i+'">'+PMM.finish_number+'</span> </li>'
							+'<li><span>巡检内容</span> <span>'+PMM.remarks+'</span> </li>'
							+'<li><span >巡检人</span> <span>'+name+'</span> </li>'
							+'<li><span>开始时间</span> <span>'+inspectionStartTime+'</span> </li>'
							+'<li><span>结束时间</span> <span>'+inspectionEndTime+'</span> </li>'
							+'<li style="display:none;"><span>状态</span> <span id="status'+i+'">'+PMM.status+'</span> </li>'
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
function house(id,inspectionStartTime,inspectionEndTime,frequency){
	$("#ListDiv").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/pollingDetails/houseOff',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			Authorization : "OAuth2:token"
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PrgHouseMiddleList = response.data.PrgHouseMiddleList;
		if(code=="200"){
			for (var i = 0; i < PrgHouseMiddleList.length; i++) {
				var PHM = PrgHouseMiddleList[i];
				var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;" >'
						+'<div class="notice-head">'
							+'<div class="center-icon" >'
								+'<img alt="" src="../img/work-repair-icon.png" onclick="goReportDetail(1,'+i+')">'
							+'</div>'
							+'<div style="float:left;position: relative;width:10rem;">'
								+'<p class="um-media-heading um-mobilebt32">空关巡检</p>'
								+'<button onclick="houseReport(1,'+i+')" class="btn btn-info" style="width:4rem;height:1.4rem;padding: 0.2rem !important;position: absolute;right:0;top: 0;font-size:0.62rem;">情况上报</button>'
								+'<p class="um-mobilebthui"> <font id="colour'+i+'"><b>'+PHM.status+'</b></font></p>'
							+'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="houseReport'+i+'" value="'+PHM.id+'"/>'
							+'<li><span>总次数</span> <span>'+frequency+'</span> </li>'
							+'<li><span>完成次数</span> <span id="houseEndNum'+i+'">'+PHM.finish_number+'</span> </li>'
							+'<li><span>巡检地址</span> <span>'+PHM.housingResourcesName+'</span> </li>'
							+'<li><span>巡检人</span> <span>'+name+'</span> </li>'
							+'<li><span>开始时间</span> <span>'+inspectionStartTime+'</span> </li>'
							+'<li><span>结束时间</span> <span>'+inspectionEndTime+'</span> </li>'
							+'<li style="display:none;"><span>状态</span> <span id="houseStatus'+i+'">'+PHM.status+'</span> </li>'
						+'</ul>'
					+'</div>'
					 );
				$div.appendTo($("#ListDiv"));
				if("未完成"==PHM.status){
					document.getElementById('colour'+i).style.color = "#FF0000";
				}else{
					document.getElementById('colour'+i).style.color = "#5bb75b";
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
function decoration_reg(id,inspectionStartTime,inspectionEndTime,frequency){
	$("#ListDiv").empty();
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
					'<div class="um-noticediv" style="margin-bottom:0.64rem;" >'
						+'<div class="notice-head">'
							+'<div class="center-icon" >'
								+'<img alt="" src="../img/work-repair-icon.png" onclick="goReportDetail(2,'+i+')">'
							+'</div>'
							+'<div style="float:left;position: relative;width:10rem;">'
								+'<p class="um-media-heading um-mobilebt32">装修巡检</p>'
								+'<button onclick="decorationReg(2,'+i+')" class="btn btn-info" style="width:4rem;height:1.4rem;padding: 0.2rem !important;position: absolute;right:0;top: 0;font-size:0.62rem;">情况上报</button>'
								+'<p class="um-mobilebthui"> <font id="PDRMcolour'+i+'"><b>'+PDRM.status+'</font></b></p>'
							+'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="decorationReg'+i+'" value="'+PDRM.id+'"/>'
							+'<li><span>租户</span> <span>'+PDRM.tenant+'</span> </li>'
							+'<li><span>巡检人</span> <span>'+name+'</span> </li>'
							+'<li><span>总次数</span> <span>'+frequency+'</span> </li>'
							+'<li><span>完成次数</span> <span id="decorationEndNum'+i+'">'+PDRM.finish_number+'</span> </li>'
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
							+'<li style="display:none;"><span>状态</span> <span id="decorationStatus'+i+'">'+PDRM.status+'</span> </li>'
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
function inspection_mana(id,inspectionStartTime,inspectionEndTime,frequency){
	$("#ListDiv").empty();
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
					'<div class="um-noticediv" style="margin-bottom:0.64rem;" >'
						+'<div class="notice-head">'
							+'<div class="center-icon" >'
								+'<img alt="" src="../img/work-repair-icon.png" onclick="goReportDetail(3,'+i+')">'
							+'</div>'
							+'<div style="float:left;position: relative;width:10rem;">'
								+'<p class="um-media-heading um-mobilebt32">园区楼宇巡检</p>'
								+'<button onclick="inspectionManaReport(3,'+i+')" class="btn btn-info" style="width:4rem;height:1.4rem;padding: 0.2rem !important;position: absolute;right:0;top: 0;font-size:0.62rem;">情况上报</button>'
								+'<p class="um-mobilebthui"><font id="PIMMcolour'+i+'"><b>'+PIMM.status+'</font></b></p>'
							+'</div>'
						+'</div>'
						+'<ul>'
							+'<input type="hidden"  id="inspectionManaID'+i+'" value="'+PIMM.id+'"/>'
							+'<li><span>巡检地点</span> <span>'+PIMM.inspectionName+'</span> </li>'
							+'<li><span>巡检人</span> <span>'+name+'</span> </li>'
							+'<li><span>总次数</span> <span>'+frequency+'</span> </li>'
							+'<li><span>完成次数</span> <span id="inspectionManaEndNum'+i+'">'+PIMM.finish_number+'</span> </li>'
							+'<li><span>开始时间</span> <span>'+inspectionStartTime+'</span> </li>'
							+'<li><span>结束时间</span> <span>'+inspectionEndTime+'</span> </li>'
							+'<li><span>巡检内容</span> <span>'+PIMM.remarks+'</span> </li>'
							+'<li style="display:none;"><span>状态</span> <span id="inspectionManaStatus'+i+'">'+PIMM.status+'</span> </li>'
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

//设备情况上报
function report(state,i){
	if("0"== state){//设备
		var facilityId = $("#facility"+i).val();//设备id
		var endNum = $("#endNum"+i).text();//设备完成次数
		var status = $("#status"+i).text();
		if("已完成"==status){
			UM.toast({
				    text: "当前对象已经巡检完毕"
				});
		}else{
			var t = (new Date()).valueOf();
		summer.openWin({
		        "id" : "situation_report"+t,
		        "url" : "html/situation_report.html?id="+id+"&state="+state+"&facilityId="+facilityId+"&frequency="+frequency+"&endNum="+endNum
	   			});
	   		}
	}
	
}

//空关情况上报
function houseReport(state,i){
		var houseReportId = $("#houseReport"+i).val();//空关id
		var houseEndNum = $("#houseEndNum"+i).text();//设备完成次数
		var houseStatus = $("#houseStatus"+i).text();
		if("已完成"==houseStatus){
			UM.toast({
				    text: "当前对象已经巡检完毕"
				});
		}else{
			var t = (new Date()).valueOf();
		summer.openWin({
		        "id" : "situation_report"+t,
		        "url" : "html/situation_report.html?id="+id+"&state="+state+"&houseReportId="+houseReportId+"&frequency="+frequency+"&houseEndNum="+houseEndNum
	   			});
	   		}
}
//装修情况上报
function decorationReg(state,i){
		var decorationRegId = $("#decorationReg"+i).val();//子表id
		var decorationEndNum = $("#decorationEndNum"+i).text();//完成次数
		var decorationStatus = $("#decorationStatus"+i).text();
		if("已完成"==decorationStatus){
			UM.toast({
				    text: "当前对象已经巡检完毕"
				});
		}else{
			var t = (new Date()).valueOf();
		summer.openWin({
		        "id" : "ssituation_report"+t,
		        "url" : "html/situation_report.html?id="+id+"&state="+state+"&decorationRegId="+decorationRegId+"&frequency="+frequency+"&decorationEndNum="+decorationEndNum
	   			});
	   		}
}

//园区情况上报
function inspectionManaReport(state,i){
		var inspectionManaID = $("#inspectionManaID"+i).val();//子表id
		var inspectionManaEndNum = $("#inspectionManaEndNum"+i).text();//完成次数
		var inspectionManaStatus = $("#inspectionManaStatus"+i).text();
		if("已完成"==inspectionManaStatus){
			UM.toast({
				    text: "当前对象已经巡检完毕"
				});
		}else{
			var t = (new Date()).valueOf();
		summer.openWin({
		        "id" : "situation_report"+t,
		        "url" : "html/situation_report.html?id="+id+"&state="+state+"&inspectionManaID="+inspectionManaID+"&frequency="+frequency+"&inspectionManaEndNum="+inspectionManaEndNum
	   			});
	   		}
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