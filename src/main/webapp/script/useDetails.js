var processStatusMap = {"1":"已确认","0":"未确认"};
var serviceLevelMap = {"0":"普通","2":"中端","3":"高端"};
var isFreeSchoolMap = {"1":"否","0":"是"};
var signedTypeMap = {"0":"非业务人员标准","1":"续签","2":"新签","3":"续转新","4":"协议新签"};

//返回到上一页的参数
var mySwitch = "";
var mySwitchType = "";
var sellerID = "";
var sellerName = "";
//返回到本页
var source = "useDetails";
var uriParams = decodeURIComponent(window.location.search);
if(uriParams.indexOf("source=")!=-1){
	uriParams = encodeURIComponent("?"+uriParams.substring(uriParams.indexOf('&')+1,uriParams.length));
}else{
	uriParams = encodeURIComponent(uriParams);
}
var pageUrlThis = "/pages/useDetails.html";
//别的页面过来的
var pageUrlOther = "";
var uriParamsOther = "";
//学校页面参数
var schoolId="";
var schoolName="";
//产品页面参数
var productId="";
var productName="";
//产品状态
var status = "";
//省市区回显
var provinceId = 0;
var provinceName = "";
var cityId = 0;
var cityName = "";
var districtId = 0;
var districtName = "";
//产品回显
var productIdShow="";
var productNameShow="";
//客户类型回显
var customerType = "";
var customerTypeName = "";
//模糊搜索回显
var searchType = "";
var keywords = "";
//学段回显
var periodId = "";
var periodName = "";
//状态回显
var statusParamId = "";
var statusParamName = "";
//学校等级回显
var schoolLevelId = "";
var schoolLevelName = "";
//服务等级回显
var serviceLevelId = "";
var serviceLevelName = "";
//是否是模糊搜索的标记
var ifFuzzy = 0;

$(function(){
	loadData();
	$("#guanzhuSpan").on("click", function() {
		var color = $(this).css("color");
		if (color == "rgb(235, 147, 22)") {
			ModifyAttention("del");
			$(this).css("color", "#999").attr("data-original-title","未关注");
			
			$("#ulOperate .tooltip-inner").html("&nbsp;未关注&nbsp;");
		} else {
			ModifyAttention("add");
			$(this).css("color", "#EB9316").attr("data-original-title","关注");
			
			$("#ulOperate .tooltip-inner").html("&nbsp;已关注&nbsp;");
		}
	});
	$('[data-toggle="tooltip"]').tooltip();
});
//加载页面数据
function loadData(){
	var permit =getUrlParam("permit")==null?"":getUrlParam("permit");
	pageUrlOther =getUrlParam("pageUrl")==null?"":getUrlParam("pageUrl");
	uriParamsOther =getUrlParam("uriParams")==null?"":decodeURIComponent(getUrlParam("uriParams"));
	mySwitch =getUrlParam("mySwitch")==null?"":getUrlParam("mySwitch");
	mySwitchType =getUrlParam("mySwitchType")==null?"":getUrlParam("mySwitchType");
	sellerID =getUrlParam("sellerID")==null?"":getUrlParam("sellerID");
	sellerName =getUrlParam("sellerName")==null?"":getUrlParam("sellerName");
	schoolId =getUrlParam("schoolId")==null?"":getUrlParam("schoolId");
	schoolName =getUrlParam("schoolName")==null?"":getUrlParam("schoolName");
	productId =getUrlParam("productId")==null?"":getUrlParam("productId");
	productName =getUrlParam("productName")==null?"":getUrlParam("productName");
	var beginTime =getUrlParam("beginTime")==null?"":getUrlParam("beginTime");
	var endTime =getUrlParam("endTime")==null?"":getUrlParam("endTime");
	status =getUrlParam("status");
	var contractRMB =getUrlParam("contractRMB")==null?"":getUrlParam("contractRMB");
	var totalReceiveRMB =getUrlParam("totalReceiveRMB")==null?"":getUrlParam("totalReceiveRMB");
	var diffReceiveRMB =getUrlParam("diffReceiveRMB")==null?"":getUrlParam("diffReceiveRMB");
	var sendTime =getUrlParam("sendTime")==null?"":getUrlParam("sendTime");
	var signedType =getUrlParam("signedType")==null?"":getUrlParam("signedType");
	var isFreeSchool =getUrlParam("isFreeSchool")==null?"":getUrlParam("isFreeSchool");
	var protocolStatus =getUrlParam("protocolStatus")==null?"":getUrlParam("protocolStatus");
	var deliveryStatus =getUrlParam("deliveryStatus")==null?"":getUrlParam("deliveryStatus");
	var protocolBackStatus =getUrlParam("protocolBackStatus")==null?"":getUrlParam("protocolBackStatus");
	var billStatus =getUrlParam("billStatus")==null?"":getUrlParam("billStatus");
	var receiveMoneyStatus =getUrlParam("receiveMoneyStatus")==null?"":getUrlParam("receiveMoneyStatus");
	var useType =getUrlParam("useType")==null?"":getUrlParam("useType");
	var expiredBeginTime =getUrlParam("expiredBeginTime")==null?"":getUrlParam("expiredBeginTime");
	var expiredEndTime =getUrlParam("expiredEndTime")==null?"":getUrlParam("expiredEndTime");
	var serviceLevel =getUrlParam("serviceLevel")==null?"":getUrlParam("serviceLevel");
	searchType =getUrlParam("searchType")==null?"":getUrlParam("searchType");
	keywords =getUrlParam("keywords")==null?"":getUrlParam("keywords");
	provinceId = getUrlParam("provinceId")==null?"":getUrlParam("provinceId");
	provinceName = getUrlParam("provinceName")==null?"":getUrlParam("provinceName");
	cityId = getUrlParam("cityId")==null?"":getUrlParam("cityId");
	cityName = getUrlParam("cityName")==null?"":getUrlParam("cityName");
	districtId = getUrlParam("districtId")==null?"":getUrlParam("districtId");
	districtName = getUrlParam("districtName")==null?"":getUrlParam("districtName");
	productIdShow = getUrlParam("productIdShow")==null?"":getUrlParam("productIdShow");
	productNameShow = getUrlParam("productNameShow")==null?"":getUrlParam("productNameShow");
	customerType = getUrlParam("customerType")==null?"":getUrlParam("customerType");
	customerTypeName = getUrlParam("customerTypeName")==null?"":getUrlParam("customerTypeName");
	periodId = getUrlParam("periodId")==null?"":getUrlParam("periodId");
	periodName = getUrlParam("periodName")==null?"":getUrlParam("periodName");
	statusParamId = getUrlParam("statusParamId")==null?"":getUrlParam("statusParamId");
	statusParamName = getUrlParam("statusParamName")==null?"":getUrlParam("statusParamName");
	schoolLevelId = getUrlParam("schoolLevelId")==null?"":getUrlParam("schoolLevelId");
	schoolLevelName = getUrlParam("schoolLevelName")==null?"":getUrlParam("schoolLevelName");
	serviceLevelId = getUrlParam("serviceLevelId")==null?"":getUrlParam("serviceLevelId");
	serviceLevelName = getUrlParam("serviceLevelName")==null?"":getUrlParam("serviceLevelName");
	ifFuzzy = getUrlParam("ifFuzzy")==null?0:getUrlParam("ifFuzzy");
	
	//跳转的判断
	var sourceOther=getUrlParam("source");
	var backUrl = "";
	if(sourceOther=="mySchools"){
		backUrl = "/pages/mySchools.html?sellerID="+sellerID+"&sellerName="+sellerName+"&mySwitch="+mySwitch+"&mySwitchType="+mySwitchType+"&provinceID="+provinceId+"&cityID="+cityId+"&districtID="+districtId+"&productIdShow="+productIdShow+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&productNameShow="+productNameShow+"&customerTypeName="+customerTypeName+"&periodId="+encodeURIComponent(periodId)+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
		$('#LinkHistory span').html("列表");
		PushBackUrl(backUrl,"列表");
		
	}else if(sourceOther=="productInformation"){
		backUrl = pageUrlOther+decodeURIComponent(uriParamsOther);
		$('#LinkHistory span').html("详情");
		PushBackUrl(backUrl,"详情");
	}else {
		//没有条件的是回退的
		$('#LinkHistory span').html(GetBackLabel());
	}
	
	$("#LinkHistory").click(function(){
		GoBack();
	});
	
	if((getUrlParam("source")==null?"":getUrlParam("source"))=="productInformation"){
		$("#zkSchool").hide();
		$("#zkProduct").hide();
		$("#zkSchoolName").hide();
		$("#zkProductName").hide();
	}
	//关注
	if(mySwitch == "7"){
		$("#divOperate").show();
	}
	//回访
	if(permit=="0" || (getUrlParam("source")==null?"":getUrlParam("source"))=="productInformation"){
		$("#revisit").hide();
	}
	$("#title").html(mySwitchType);
	$("#schoolName").html(schoolName);
	$("#productName").html(productName);
	if(schoolName==""){
		$("#schoolDiv").hide();
	}
	if(productName==""){
		$("#productDiv").hide();
	}
	if(serviceLevel==""){
		document.getElementById("serviceLevelDiv").style.display="none";
	}else{
		$("#serviceLevel").html("服务等级："+serviceLevelMap[serviceLevel]);
	}
	$("#beginTime").html(beginTime);
	$("#beginTimePartPay").html(beginTime);
	$("#endTime").html(endTime);
	$("#endTimePartPay").html(endTime);
	$("#totalMoney").html(contractRMB);
	$("#receiveMoney").html(totalReceiveRMB);
	$("#notReceiveMoney").html(diffReceiveRMB);
	$("#sendTime").html(sendTime);
	$("#protocolMoney").html(contractRMB);
	
	//流程
	if((protocolStatus == null || protocolStatus=="") && (deliveryStatus == null || deliveryStatus=="") && (protocolBackStatus==null || protocolBackStatus=="") && (billStatus==null || billStatus=="") && (receiveMoneyStatus==null || receiveMoneyStatus=="")){
		$("#process").hide();
	}else{
		$("#process").show();
		if(protocolStatus==""){
			$("#p1").hide();
		}else{
			if(protocolStatus=="1"){
				$("#b1").removeClass();
				$("#b1").addClass("glyphicon glyphicon-ok-sign text-success");
				$("#protocolStatus").html(processStatusMap[protocolStatus]);
			}else{
				$("#b1").removeClass();
				$("#b1").addClass("glyphicon glyphicon-exclamation-sign text-danger");
				$("#protocolStatus").html(processStatusMap[protocolStatus]);
			}
		}
		if(deliveryStatus==""){
			$("#p2").hide();
		}else{
			if(deliveryStatus=="1"){
				$("#b2").removeClass();
				$("#b2").addClass("glyphicon glyphicon-ok-sign text-success");
				$("#deliveryStatus").html(processStatusMap[deliveryStatus]);
			}else{
				$("#b2").removeClass();
				$("#b2").addClass("glyphicon glyphicon-exclamation-sign text-danger");
				$("#deliveryStatus").html(processStatusMap[deliveryStatus]);
			}
		};
		if(protocolBackStatus==""){
			$("#p3").hide();
		}else{
			if(protocolBackStatus=="1"){
				$("#b3").removeClass();
				$("#b3").addClass("glyphicon glyphicon-ok-sign text-success");
				$("#protocolBackStatus").html(processStatusMap[protocolBackStatus]);
			}else{
				$("#b3").removeClass();
				$("#b3").addClass("glyphicon glyphicon-exclamation-sign text-danger");
				$("#protocolBackStatus").html(processStatusMap[protocolBackStatus]);
			}
		};
		if(billStatus==""){
			$("#p4").hide();
			
		}else{
			if(billStatus=="1"){
				$("#b4").removeClass();
				$("#b4").addClass("glyphicon glyphicon-ok-sign text-success");
				$("#billStatus").html(processStatusMap[billStatus]);
			}else{
				$("#b4").removeClass();
				$("#b4").addClass("glyphicon glyphicon-exclamation-sign text-danger");
				$("#billStatus").html(processStatusMap[billStatus]);
			}
		};
		if(receiveMoneyStatus==""){
			$("#p5").hide();
		}else{
			if(receiveMoneyStatus=="1"){
				$("#b5").removeClass();
				$("#b5").addClass("glyphicon glyphicon-ok-sign text-success");
				$("#receiveMoneyStatus").html(processStatusMap[receiveMoneyStatus]);
			}else{
				$("#b5").removeClass();
				$("#b5").addClass("glyphicon glyphicon-exclamation-sign text-danger");
				$("#receiveMoneyStatus").html(processStatusMap[receiveMoneyStatus]);
			}
		};
	}
	if(signedType==""){
		$("#signedType").hide();
	}else{
		$("#contractStatus").html(signedTypeMap[signedType]);//签约状态
	}
	if(isFreeSchool==""){
		$("#isFreeSchool").hide();
	}else{
		$("#resourceCooperation").html(isFreeSchoolMap[isFreeSchool]);//是否资源合作学校
	}
	
	if(mySwitch != ""){
		if(mySwitch != "11" && mySwitch != "12"){
			if(mySwitch != "7"){
				if(beginTime!="" && endTime!=""){
					document.getElementById("useTrial").style.display="block";
				}else{
					$("#noDate").show();
				}
//				document.getElementById("useTrial").style.display="block";
				switch(status){
				case "-1":if(useType=="1"){$("#timeTitle").html("使用时间");$("#beginTitle").html("使用开始日期：");$("#endTitle").html("使用结束日期：");document.getElementById("process").style.display="block";$("#beginTime").html(expiredBeginTime);$("#endTime").html(expiredEndTime);}else{$("#timeTitle").html("试用时间");$("#beginTitle").html("试用开始日期：");$("#endTitle").html("试用结束日期：");$("#beginTime").html(expiredBeginTime);$("#endTime").html(expiredEndTime);}break;
				case "4":$("#timeTitle").html("使用时间");$("#beginTitle").html("使用开始日期：");$("#endTitle").html("使用结束日期：");break;
				case "6":$("#timeTitle").html("使用时间");$("#beginTitle").html("使用开始日期：");$("#endTitle").html("使用结束日期：");if(beginTime!="" && endTime!=""){document.getElementById("useTrial").style.display="block";}break;
				case "3":$("#timeTitle").html("试用时间");$("#beginTitle").html("试用开始日期：");$("#endTitle").html("试用结束日期：");break;
				case "5":$("#timeTitle").html("试用时间");$("#beginTitle").html("试用开始日期：");$("#endTitle").html("试用结束日期：");
				}
			}else{
				$("#timeTitle").html("起止时间");$("#beginTitle").html("开始日期：");$("#endTitle").html("结束日期：");if(beginTime!="" && endTime!=""){document.getElementById("useTrial").style.display="block";}else{$("#noDate").show();}
			}
		}else{
			switch(mySwitch){
			case "11":document.getElementById("partPay").style.display="block";break;
			case "12":document.getElementById("noBackProtocol").style.display="block";
			}
		}
	}else{
		$("#timeTitle").html("起止时间");$("#beginTitle").html("开始日期：");$("#endTitle").html("结束日期：");if(beginTime!="" && endTime!=""){document.getElementById("useTrial").style.display="block";}else{$("#noDate").show();}
	}
}

//返回跳转
function goBack(){encodeURIComponent(decodeURIComponent(window.location.search));
	var source =getUrlParam("source")==null?"":getUrlParam("source");
	var backUrl = "";
	if(source!=""){
//		backUrl = pageUrlOther+decodeURIComponent(uriParamsOther);
		window.history.go(-1);
	}else{
		backUrl = "/pages/mySchools.html?sellerID="+sellerID+"&mySwitch="+mySwitch+"&mySwitchType="+mySwitchType+"&provinceID="+provinceId+"&cityID="+cityId+"&districtID="+districtId+"&productIdShow="+productIdShow+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&productNameShow="+productNameShow+"&customerTypeName="+customerTypeName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
		window.location.href = backUrl;
	}
}
//跳转学校相关页面
function toSchool(){
	if((getUrlParam("source")==null?"":getUrlParam("source"))=="productInfomation"){
		return false;
	}else{
		window.location.href="/pages/customerDetails.html?source="+source+"&schoolId="+schoolId+"&schoolName="+schoolName+"&pageUrl="+pageUrlThis+"&uriParams="+uriParams;
	}
}
//跳转产品相关页面
function toProduct(){
	if((getUrlParam("source")==null?"":getUrlParam("source"))=="productInfomation"){
		return false;
	}else{
		window.location.href="/pages/productScreening.html?source="+source+"&productId="+productId+"&productName="+productName+"&pageUrl="+pageUrlThis+"&uriParams="+uriParams;
	}
}
//跳转到回访页面
function toRevisit(){
	if((getUrlParam("permit")==null?"":getUrlParam("permit"))=="0" || (getUrlParam("source")==null?"":getUrlParam("source"))=="productInfomation"){
		return false;
	}else{
		window.location.href="/pages/productInformation.html?source="+source+"&Status="+status+"&schoolId="+schoolId+"&schoolName="+schoolName+"&productId="+productId+"&productName="+productName+"&pageUrl="+pageUrlThis+"&uriParams="+uriParams;
	}
}
//用来修改关注状态
function ModifyAttention(type){
	$.ajax({
		url:"/product/ModifyAttention.json",
		dataType:'json',
		type:'POST',
		data:{
			schoolId : schoolId,
			productId : productId,
			sellerId : sellerID,
			type : type
		},
		success:function(data){
			if(data.error!=null){
				$.alert("修改关注信息出现错误："+data.error);
				return;
			}
		}
	});
}
