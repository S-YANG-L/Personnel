//巡检通知
function check_notice() {
	var t = (new Date()).valueOf();
	summer.openWin({
	id:"check_notice"+t,
	url : 'html/check_notice.html'
});

}
//工单通知
function standby_notice() {
	var t = (new Date()).valueOf();
	summer.openWin({
	id:"standby_notice"+t,
	url : 'html/standby_notice.html'
});
}
//内部通知
function notification() {
	var t = (new Date()).valueOf();
	summer.openWin({
	id:"insideInformation"+t,
	url : 'html/insideInformation.html'
});
}

summerready = function() {
	getInnumber();
	getOredrNumder();
}

//查询所有的巡检计划
function getInnumber(){
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
			//document.getElementById("Innumber").style.display = "";
			if(listInspection.length>0){
				document.getElementById("Innumber").style.display = "";
				document.getElementById("Innumber").innerHTML = listInspection.length;
			}
		}else{
			document.getElementById("Innumber").style.display = "none";
		}
		});
}

//查询所有的工单
function getOredrNumder(){
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/order/getbacklog',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"singleId" : summer.getAppStorage("userId"),
			"tenantId" : summer.getAppStorage("tenantId")
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var state = response.data.state;
		var orderList = response.data.order;
		if(state=="200"){
			//document.getElementById("OrderNumber").style.display = "";		
			if(orderList.length>0){
				document.getElementById("OrderNumber").style.display = "";
				document.getElementById("OrderNumber").innerHTML = orderList.length;
			}		
		}else{
			document.getElementById("OrderNumber").style.display = "none";
		}
		});
}