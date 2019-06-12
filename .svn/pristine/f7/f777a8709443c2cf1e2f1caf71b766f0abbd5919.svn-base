function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
}

summerready = function() {
	serveDetails();
	//messageNumber();
}

function serveDetails(){
	var id = getQueryString("id");
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url') +'/insideInformation/serveMessageDetails',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var PN = response.data.PrgInternalNotification;
		if(code=="200"){
			var $div = $(
					'<div class="um-noticediv" style="margin-bottom:0.64rem;">'
						+'<div class="notice-head">'
							+'<div class="center-icon">'
								+'<img alt="" src="../img/inside-icon.png">'
							+'</div>'
							+'<div style="float:left;">'
								+'<h4 class="um-media-heading um-mobilebt32">'+PN.publisher+'</h4>'
								+'<p class="um-mobilebthui">'+PN.lastUpdateDate+'</p>'
							+'</div>'
						+'</div>'
						+'<ul>'
							+'<li><span>标题</span> <span>'+PN.title+'</span> </li>'
							+'<li><span>详情</span> <span>'+PN.content+'</span> </li>'
						+'</ul>'
					+'</div>'
					 );
				$div.appendTo($("#messageDiv"));
		}else{
			UM.toast({
			  	  text: response.data.message
				});
		}
		});
}

function fanhui() {
    summer.closeWin({});
}