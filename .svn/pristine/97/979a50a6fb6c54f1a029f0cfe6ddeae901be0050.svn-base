summerready = function() {
		imeterReading();
		//time(2);
}

function goMeterReading(){
	var roomId = $("#roomList").val();
	var t = (new Date()).valueOf();
	summer.openWin({
	        "id" : "addMeterReading"+t,
	        "url" : "html/addMeterReading.html?roomId="+roomId
	    });

}

function fanhui(){
	summer.closeWin({});
}

//抄表(社区)
function imeterReading(){
	//alert(111);
	//添加抄表人
	document.getElementById("readingDetails").innerHTML = '抄表人: '+summer.getAppStorage("userName");
	$("#meterReadingID").empty();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url') + '/CopyForm/getCommunityList',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"tenantId" : summer.getAppStorage("tenantId")
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2: token"
		}
	}, function(response) {
	//alert(response.data) class="active"
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var communityList = response.data.communityList;
		
		if(code=="200"){
			for (var i = 0; i < communityList.length; i++) {
				var community = communityList[i];
				var $li = $(
					'<li class="pitch" id="pitchOn'+i+'"><a id="NameID'+i+'" onclick="particulars(this,'+i+')" >'+community.communityName+'</a><span></span></li>'
					+'<input type="hidden" id="communityID'+i+'" value="'+community.communityId+'"/>'
				);
				$li.appendTo($("#meterReadingID"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
		});
}

//抄表详情(小区)
function particulars(t,i){
//增加选中社区效果
	$("#pitchOn"+i).addClass('active').siblings().removeClass('active');

	//$("#pitchOn"+i).siblings("active");
	//document.getElementsByName("pitch").removeClass("active");
$("#villageList").empty();
	var $option = $(
	'<option selected = "selected">请选择小区</option>'
	);
	$option.appendTo($("#villageList"));
	var id = $("#communityID" + i).val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/CopyForm/getVillageList',
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
		var villageList = response.data.villageList
		if(code == "200"){
			for (var i = 0; i < villageList.length; i++) {
				var village = villageList[i];
				if(village.villageId != null){
					var $option = $(
					'<option value="'+village.villageId+'">'+village.villageName+'</option>'
					);
					$option.appendTo($("#villageList"));
				}else{
					var $option = $(
					'<option>暂无小区信息</option>'
					);
					$option.appendTo($("#villageList"));
				}
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
	});
}

//楼栋详情
function buildingChange(){
	$("#buildingList").empty();
	var $option = $(
	'<option selected = "selected">请选择楼栋</option>'
	);
	$option.appendTo($("#buildingList"));
	var id = $("#villageList").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/CopyForm/getBuildingList',
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
		var buildingList = response.data.buildingList
		if(code == "200"){
			for (var i = 0; i < buildingList.length; i++) {
				var building = buildingList[i];
				if(building.buildingId != null){
					var $option = $(
					'<option value="'+building.buildingId+'">'+building.buildingName+'</option>'
				);
				$option.appendTo($("#buildingList"));
				}else{
					var $option = $(
					'<option >暂无楼栋信息</option>'
				);
				$option.appendTo($("#buildingList"));
				}
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
	});
}
//单元详情
function elementChange(){
	$("#elementList").empty();
	var $option = $(
	'<option selected = "selected">请选择单元号</option>'
	);
	$option.appendTo($("#elementList"));
	var id = $("#buildingList").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/CopyForm/getElementList',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"id" : id
		},
		header : {
			//Authorization : "OAuth2: token",
			Authorization : "OAuth2: token"
			//"Content-Type" : "application/json"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var elementList = response.data.elementList
		if(code == "200"){
			for (var i = 0; i < elementList.length; i++) {
				var ELM = elementList[i];
					var $option = $(
					'<option value="'+ELM.unitNumber+'">'+ELM.unitNumber+'</option>'
				);
				$option.appendTo($("#elementList"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
	});
}
//楼层详情
function floorChange(){
	$("#floorList").empty();
	var $option = $(
	'<option selected = "selected">请选择楼层</option>'
	);
	$option.appendTo($("#floorList"));
	var id = $("#elementList").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/CopyForm/getFloorList',
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
		var floorList = response.data.floorList
		if(code == "200"){
			for (var i = 0; i < floorList.length; i++) {
				var floor = floorList[i];
					var $option = $(
					'<option value="'+floor.floorNumber+'">'+floor.floorNumber+'</option>'
				);
				$option.appendTo($("#floorList"));
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
	});
}
//房间详情
function roomHouseChange(){
	$("#roomList").empty();
	var $option = $(
	'<option selected = "selected">请选择房间</option>'
	);
	$option.appendTo($("#roomList"));
	var id = $("#floorList").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage('url')+'/CopyForm/getRoomList',
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
		var roomList = response.data.roomList;
		if(code == "200"){
			for (var i = 0; i < roomList.length; i++) {
				var room = roomList[i];
				if(room.id != null){
					var $option = $(
					'<option value="'+room.id+'">'+room.houseName+'</option>'
				);
				$option.appendTo($("#roomList"));
				}else{
					var $option = $(
					'<option >暂无房间信息</option>'
				);
				$option.appendTo($("#roomList"));
				}
			}
		}else{
			UM.toast({
				    text: response.data.message
				});
		}
	});	
}

/*window.onload = function (){
	imeterReading();
}*/
