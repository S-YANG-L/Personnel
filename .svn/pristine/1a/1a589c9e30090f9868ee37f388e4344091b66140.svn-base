function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
}


summerready = function() {
	serveDetails();
	//messageNumber();
}

function serveDetails() {
	var state = getQueryString("state");
	$("#Servicemessage").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url') +'/insideInformation/serveDetails',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"rmUserId" : summer.getAppStorage("userId"),
			"tenantId" : summer.getAppStorage("tenantId"),
			"state" : state,
			"headline":""
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PrgInternalNotificationList = response.data.PrgInternalNotificationList;
		if (code == "200") {
			for (var i = 0; i < PrgInternalNotificationList.length; i++) {
				var PIN = PrgInternalNotificationList[i];
				var $li = $(
					'<li class="um-listview-row" onclick="details(this,'+i+')">'
						+'<a href="#" class="um-swipe-action um-no-icon um-list-centernotice " >'
							+'<div class="center-icon">'
								+'<img src="../img/inside-icon.png">'
								+'<input type="hidden" value="'+PIN.id+'" id="details'+i+'" />'
							+'</div>'
							+'<div class="um-media-body">'
								+'<p class="notice-bt">'
									+'<span class="um-mobilebt32">'+PIN.title+'</span>'
									+'<span class="um-gray f12 fr">'+PIN.lastUpdateDate+'</span>'
								+'</p>'
								+'<p class="um-gray f14 um-text-overflow2"> 部门 :'+PIN.organizationName+'</p>'
								+'<p class="um-gray f14 um-text-overflow2"><font id="STATE'+i+'"></font></p>'
							+'</div>'
						+'</a>'
					+'</li>'
				);
				$li.appendTo($("#Servicemessage"));
				if(PIN.state == "0"){
					document.getElementById('STATE'+i).innerHTML="未读";
					document.getElementById('STATE'+i).style.color = "#FF0000";
				}else{
					document.getElementById('STATE'+i).innerHTML="已读";
					document.getElementById('STATE'+i).style.color = "#5bb75b";
				}
			}
		} else {
			UM.toast({
			  	  text: response.data.message
				});
		}
	});
}

function details(t,i){
 var id = $("#details"+i).val();
 var t = (new Date()).valueOf();
 summer.openWin({
 	id:"notification_details"+t,
	url : 'html/notification_details.html?id='+id
});
 
}

//模糊查询
function headlineLike(){
	var headline =$("#headline").val();
	var state = getQueryString("state");
	$("#Servicemessage").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url') +'/insideInformation/serveDetails',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"rmUserId" : summer.getAppStorage("userId"),
			"tenantId" : summer.getAppStorage("tenantId"),
			"state" : state,
			"headline":headline
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PrgInternalNotificationList = response.data.PrgInternalNotificationList;
		if (code == "200") {
			for (var i = 0; i < PrgInternalNotificationList.length; i++) {
				var PIN = PrgInternalNotificationList[i];
				var $li = $(
					'<li class="um-listview-row" onclick="details(this,'+i+')">'
						+'<a href="#" class="um-swipe-action um-no-icon um-list-centernotice " >'
							+'<div class="center-icon">'
								+'<img src="../img/inside-icon.png">'
								+'<input type="hidden" value="'+PIN.id+'" id="details'+i+'" />'
							+'</div>'
							+'<div class="um-media-body">'
								+'<p class="notice-bt">'
									+'<span class="um-mobilebt32">'+PIN.title+'</span>'
									+'<span class="um-gray f12 fr">'+PIN.lastUpdateDate+'</span>'
								+'</p>'
								+'<p class="um-gray f14 um-text-overflow2"> 部门:'+PIN.organizationName+'</p>'
								+'<p class="um-gray f14 um-text-overflow2"><font id="MOHUSTATE'+i+'"></font></p>'
							+'</div>'
						+'</a>'
					+'</li>'
				);
				$li.appendTo($("#Servicemessage"));
				if(PIN.state == "0"){
					document.getElementById('MOHUSTATE'+i).innerHTML="未读";
					document.getElementById('MOHUSTATE'+i).style.color = "#FF0000";
				}else{
					document.getElementById('MOHUSTATE'+i).innerHTML="已读";
					document.getElementById('MOHUSTATE'+i).style.color = "#5bb75b";
				}
			}
		} else {
			UM.toast({
			  	  text: response.data.message
				});
		}
	});
	
}

function fanhui(){
	var t = (new Date()).valueOf();
	summer.openWin({
					"id" : "insideInformation"+t,
					"url" : "html/insideInformation.html"
				});
}
