
function outwork(t){
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/checkingin/itinerancy', //172.20.10.3
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"officeHours" : $("#startTime").val(), //开始时间
			"closingTime" : $("#end").val(), //结束时间
			"name" : summer.getAppStorage("userName"), //发起人
			"location" : $("#location").val(), //地点
			"outworkCause" : $("#outworkCause").val(), //申请原因
			"userId" : summer.getAppStorage("userId"), //员工id
			"tenantId" : summer.getAppStorage("tenantId")//租户id
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var state = response.data.state
		//alert(222);
		//alert(state);
	},function(response) {
		//alert(333);
	});
}

function fanhui(){
	summer.closeWin({});
}