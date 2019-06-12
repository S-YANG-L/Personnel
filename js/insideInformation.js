summerready = function() {
	serveNumber();
	messageNumber();
}
//跳向服务类消息
function GoserveDetails(){
	var t = (new Date()).valueOf();
	summer.openWin({
	id:"notification"+t,
	url : 'html/notification.html?state='+1
});
	
	}
//跳向服务类消息
function GomessageDetails(){
	var t = (new Date()).valueOf();
	summer.openWin({
	id:"notification"+t,
	url : 'html/notification.html?state='+2
});
	
	}

//获取消息信息的未读条数
function messageNumber(){
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/insideInformation/getmessageNumber',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"rmUserId" : summer.getAppStorage("userId"),
			"tenantId" : summer.getAppStorage("tenantId"),
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var total = response.data.total;
		if(code == "200"){
			if(total>0){
				document.getElementById("messageNumber").style.display = "";
				document.getElementById("messageNumber").innerHTML = total;
			}
		}else{
			document.getElementById("messageNumber").style.display = "none";
		}
		});
}

//获取服务信息的未读条数
function serveNumber(){
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/insideInformation/getserveNumber',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"rmUserId" : summer.getAppStorage("userId"),
			"tenantId" : summer.getAppStorage("tenantId"),
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var total = response.data.total;
		if(code == "200"){
			if(total>0){
				document.getElementById("serveNumber").style.display = "";
				document.getElementById("serveNumber").innerHTML = total;
			}
		}else{
			document.getElementById("serveNumber").style.display = "none";
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