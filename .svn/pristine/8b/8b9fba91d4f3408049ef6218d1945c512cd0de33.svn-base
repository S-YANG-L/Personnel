//获取路径中的值
function getQueryString(name) { 
var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
var r = window.location.search.substr(1).match(reg); 
if (r != null) return unescape(r[2]); return null; 
}

//生成抄表单号
function getMeterReadingNum(){
	var oddNumder="CBD"+getNowFormatDate(0)+RndNum(5);
	$("#READING_NUM").val(oddNumder);
}
//抄表日期
function getOddTime(){
	$("#READING_DATE").val(getNowFormatDate(1));
}

//获取仪表名称
function getOddDetail(){
	var roomId = getQueryString("roomId");
	var INSTRUMENT_TYPE = $("#INSTRUMENT_TYPE").val();
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/CopyForm/getOddDetail',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"roomId":roomId,
			"INSTRUMENT_TYPE":INSTRUMENT_TYPE
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2:token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		var infosList = response.data.infosList;
		if(code=="200"){
			var info = 	infosList[0];
			//仪表名称
			$("#INSTRUMENT_NAME").val(info.instrumentName);
			//仪表编号
			$("#INSTRUMENT_NUMBER").val(info.instrumentNumber);
			//单价
			$("#UNIT_PRICE").val(info.unitPrice);
			//旧刻度值
			$("#OLD_SCALE").val(info.initialReading);
			//仪表信息id
			$("#InfoId").val(info.id);
		}
		});
}

//计算刻度差 总价
function getRests(){
	var SCALE = $("#SCALE").val()//新刻度
	var OLD_SCALE = $("#OLD_SCALE").val()//旧刻度
	var UNIT_PRICE = $("#UNIT_PRICE").val()//单价
	if(SCALE>OLD_SCALE){//判断新旧刻度cha
	var SCALE_DIFFERENCE = SCALE-OLD_SCALE;
	$("#SCALE_DIFFERENCE").val(SCALE_DIFFERENCE)//刻度差
	var TOTAL_PRICE = SCALE_DIFFERENCE*UNIT_PRICE
	$("#TOTAL_PRICE").val(TOTAL_PRICE)//总价
	}else{
		$("#SCALE").val("");
		UM.toast({
				    text: "新刻度不得小于旧刻度"
				});
	}
}

//提交
function submitAll(){
	var READING_NUM = $("#READING_NUM").val();//抄表单号
	var READING_DATE = $("#READING_DATE").val();//抄表日期
	var READING_TYPE = $("#READING_TYPE").val();//抄表类型
	var INSTRUMENT_TYPE = $("#INSTRUMENT_TYPE").val();//仪表类型
	var IS_OPEN_ACCOUNT = $("#IS_OPEN_ACCOUNT").val();//是否开账
	var OPEN_ACCOUNT_DATE = $("#OPEN_ACCOUNT_DATE").val();//缴费截止日
	var INSTRUMENT_NAME = $("#INSTRUMENT_NAME").val();//仪表名称
	var INSTRUMENT_NUMBER = $("#INSTRUMENT_NUMBER").val();//仪表编号
	var SCALE = $("#SCALE").val();//新刻度
	var OLD_SCALE = $("#OLD_SCALE").val();//旧刻度
	var SCALE_DIFFERENCE = $("#SCALE_DIFFERENCE").val();//刻度差
	var UNIT_PRICE = $("#UNIT_PRICE").val();//单价
	var TOTAL_PRICE = $("#TOTAL_PRICE").val();//总价
	var InfoId = $("#InfoId").val();//仪表信息id
	var roomId = getQueryString("roomId");//房屋id
	//alert(InfoId);
	
	summer.ajax({
		type : 'post',
		url : summer.getAppStorage("url")+'/CopyForm/submitOddAll',
		param : {
			"token":summer.getAppStorage("tokenEntity").token,
			"READING_NUM":READING_NUM,
			"READING_TYPE":READING_TYPE,
			"INSTRUMENT_TYPE":INSTRUMENT_TYPE,
			"IS_OPEN_ACCOUNT":IS_OPEN_ACCOUNT,
			"OPEN_ACCOUNT_DATE":OPEN_ACCOUNT_DATE,
			"INSTRUMENT_NAME":INSTRUMENT_NAME,
			"INSTRUMENT_NUMBER":INSTRUMENT_NUMBER,
			"SCALE":SCALE,
			"OLD_SCALE":OLD_SCALE,
			"SCALE_DIFFERENCE":SCALE_DIFFERENCE,
			"UNIT_PRICE":UNIT_PRICE,
			"TOTAL_PRICE":TOTAL_PRICE,
			"InfoId":InfoId,
			"tenantId":summer.getAppStorage("tenantId"),
			"READING_DATE":READING_DATE,
			"roomId":roomId,
			"copy_name_id":summer.getAppStorage("userId")
		},
		header : {
			//Authorization : "OAuth2: token",
			//"Content-Type" : "application/json"
			Authorization : "OAuth2:token"
		}
	}, function(response) {
		response.data = JSON.parse(response.data);
		var code = response.data.code;
		if(code=="200"){
			UM.toast({
				    text: "保存成功"
				});
			var timestamp = (new Date()).valueOf();
			summer.openWin({
			"id" :"meterredHistory"+timestamp,
	        "url" : "html/meterredHistory.html"
	    });
		}else{
			UM.toast({
				    text: response.data.massage
				});
		}
		});
	
}
//比较日期
function compareDate(){
	//获取
	var OPEN_ACCOUNT_DATE = $("#OPEN_ACCOUNT_DATE").val();
	//当前日期
	var nowTime = getNowFormatDate(1);
	if((new Date(nowTime.replace(/-/g,"\/"))) > (new Date(OPEN_ACCOUNT_DATE.replace(/-/g,"\/")))){
		UM.toast({
				    text: "开账日期不得小于当前日期"
				});
			$("#OPEN_ACCOUNT_DATE").val("")
	}
}



//获取当前时间
function getNowFormatDate(i) {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	if(i==0){
		var currentdate = year + month + strDate;
	}
	if(i==1){
		var currentdate = year +seperator1+ month +seperator1+strDate;
	}
	
	return currentdate;
}
//产生随机数函数
function RndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}

summerready = function() {
	getMeterReadingNum();
	getOddTime();
}
function fanhui(){
	summer.closeWin({});
}