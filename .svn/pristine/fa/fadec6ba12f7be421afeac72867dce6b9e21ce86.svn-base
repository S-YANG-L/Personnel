var OrderState ='';
summerready = function(){
    backlog();
    
}﻿ 

function standby_notice_info(t,i,state){
	//获取id
	var id = $("#orderID"+i).val();
	var t = (new Date()).valueOf();
	summer.openWin({
		"id":"standby_notice_info"+t,
        "url" : "html/standby_notice_info.html?id="+id+"&state="+state
    });
}

//待办事项
function backlog(){
	OrderState ='0';
	$("#commission").val("");
	$("#orderCommission").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url') +'/order/getbacklog',
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
			//alert(state);
		if(state=="200"){
			for (var i = 0; i < orderList.length; i++) {
					var order = orderList[i];
					//投诉咨询
				if(order.orderType =="0"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',1)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 联系人:'+order.realEstateCustomer+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
				//报修
				if(order.orderType =="1"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',1)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 报修人:'+order.repairPeople+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
				//预约
				if(order.orderType =="2"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',1)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 联系人:'+order.realEstateCustomer+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
			}
		}else{
			UM.toast({
			  	  text: state
				});
		}
			
		});
}

//已办事项 
function haveFinished(){
	OrderState ='2';
	$("#commission").val("");
	$("#orderCommission").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url') +'/order/haveFinished',
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
			//alert(state);
		if(state=="200"){
			for (var i = 0; i < orderList.length; i++) {
					var order = orderList[i];
					//投诉咨询
				if(order.orderType =="0"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',2)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 联系人:'+order.realEstateCustomer+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
				//报修
				if(order.orderType =="1"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',2)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 报修人:'+order.repairPeople+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
				//预约
				if(order.orderType =="2"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',2)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 联系人:'+order.realEstateCustomer+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
			}
		}else{
			UM.toast({
			  	  text:state
				});
		}
			
		});
}

//拒接事项 
function refusing(){
	OrderState ='3';
	$("#commission").val("");
	$("#orderCommission").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url') +'/order/getRefusing',
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
			//alert(state);
		if(state=="200"){
			for (var i = 0; i < orderList.length; i++) {
					var order = orderList[i];
					//投诉咨询
				if(order.orderType =="0"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',3)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 联系人:'+order.realEstateCustomer+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
				//报修
				if(order.orderType =="1"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',3)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 报修人:'+order.repairPeople+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
				//预约
				if(order.orderType =="2"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+',3)">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 联系人:'+order.realEstateCustomer+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
			}
		}else{
			UM.toast({
			  	  text: state
				});
		}
			
		});
}
//模糊查询
function obscure(){
var orderContent =$("#commission").val();
	$("#orderCommission").empty();
	var state ="";
	if(OrderState == "0"){
		state = "1";
	}
	if(OrderState == "2"){
		state = "2";
	}
	if(OrderState == "3"){
		state = "3";
	}
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url') +'/order/obscure',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"singleId" : summer.getAppStorage("userId"),
			"tenantId" : summer.getAppStorage("tenantId"),
			"orderContent" : orderContent,
			"state" : OrderState
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
			//alert(state);
		if(state=="200"){
			for (var i = 0; i < orderList.length; i++) {
					var order = orderList[i];
					//投诉咨询
				if(order.orderType =="0"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+','+state+')">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 联系人:'+order.realEstateCustomer+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
				//报修
				if(order.orderType =="1"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+','+state+')">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 报修人:'+order.repairPeople+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							     +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
				//预约
				if(order.orderType =="2"){
					var $li = $(
							'<li>'
							  +'<a href="#" class="btn" onclick="standby_notice_info(this,'+i+','+state+')">'
							  +'<input type="hidden" value="'+order.idString+'" id="orderID'+i+'" />'
							   +'<div class="center-icon">'
								 +'<img alt="" src="../img/bill-icon.png">'
							   +'</div>'
							   +'<div class="um-media-body">'
							     +'<h4 class="um-media-heading um-mobilebt32">'+order.orderContent+'</h4>'
							     +'<p class="um-mobilebthui"> 联系人:'+order.realEstateCustomer+'</p>'
							     +'<p class="um-mobilebthui"> 电话:'+order.contactNumber+'</p>'
							    +'<p class="um-mobilebthui"> 制单日期:'+order.draftDate+'</p>'
							   +'</div>'
							  +'</a>'
							+'</li>'
						);
						$li.appendTo($("#orderCommission"));
				}
			}
		}else{
			UM.toast({
			  	  text: state
				});
		}
			
		});
}

function fanhui(){
	summer.closeWin({});
}