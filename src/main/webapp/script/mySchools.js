var pageNo = 1;
var pageCount =1;
var params = {};
var url = "";
var statusMap = {"100":"不限","-2":"关","-1":"过","0":"未联","1":"联","2":"意","3":"待试","4":"待使","5":"试","6":"使"};
//产品使用状态
var useStatusMap = {"-3":"已删除","-2":"已关闭","-1":"已过期","1":"有联系","2":"有意向","3":"待试","4":"待使","5":"试用","6":"使用","0":"未联系"};
//客户类型
var customerTypeMap = {"1":"小学","2":"中学","4":"县教育局","5":"教育厅","6":"培训机构","7":"幼儿园","8":"出版社","9":"公司","10":"市教育局"};
//学段
var periodMap = {"1":"小学","2":"初中","3":"高中","4":"小初","5":"初高","6":"小初高","7":"幼儿园"};
//状态筛选条件
var statusParamMap = {"-2":"已关闭","-1":"已过期","0":"未联系","1":"已联系","2":"有意向","3":"待试用","4":"待使用","5":"已试用","6":"已使用"};
//协议筛选条件
var protocolMap = {"1":"续费","2":"新签","3":"续转新","4":"协议新签"};
//学校等级筛选条件
var schoolLevelMap = {"0":"普通","1":"县重点","2":"市重点","3":"省重点","4":"国家重点","5":"百强校","6":"资源校"}; 
//是否锁定的筛选条件
var isLockMap = {"1":"是","0":"否"};
//服务等级
var serviceLevelMap = {"0":"普通","2":"中端","3":"高端"};
//筛选条件
var mySwitch = "";
var mySwitchType = "";
var provinceId = 0;
var provinceName = "";
var cityId = 0;
var cityName = "";
var districtId = 0;
var districtName = "";
var productId = 0;
var schoolId = 0;
var schoolName = "";
var productName="";
var sellerID = "";
var sellerName = "";
var customerType = "";
var customerTypeName = "";
var periodId = "";
var periodName = ""
var statusParamId = "";
var statusParamName = "";
var protocolId = "";
var protocolName = ""; 
var schoolLevelId = "";
var schoolLevelName = "";
var serviceLevelId = "";
var serviceLevelName = "";
var isLockId = "";
var isLockName = "";
var searchType = "学校ID";
var keywords = "";
//流程状态
var protocolStatus="";
var deliveryStatus="";
var protocolBackStatus="";
var billStatus="";
var receiveMoneyStatus="";
//省份map
var provinceMap = {};
//控制是否是模糊搜索
var ifFuzzy=0;
//返回本页的参数
var uriParams = decodeURIComponent(window.location.search);
if(uriParams.indexOf("source=")!=-1){
	uriParams = "?"+uriParams.substring(uriParams.indexOf('&')+1,uriParams.length);
}
var source = "mySchools";
var pageUrl = "/pages/mySchools.html";
//防止地区查询触发滚动的变量
var ifFirstQuery=true;
//用户地区的选择缓存
var provinceIdCache = 0;
var provinceNameCache = "";
var cityIdCache = 0;
var cityNameCache = "";
var districtIdCache = 0;
var districtNameCache ="";
//选择产品的缓存
var productIdCache = 0;
var productNameCache = "";
//选择客户类型的缓存
var customerTypeCache = "";
var customerTypeNameCache = "";
//学段缓存
var periodCache = "";
var periodNameCache = "";
//状态缓存
var statusParamCache = "";
var statusParamNameCache = "";
//协议缓存
var protocolCache = "";
var protocolNameCache = "";
//学校等级缓存
var schoolLevelCache = "";
var schoolLevelNameCache = "";
//服务等级缓存
var serviceLevelCache = "";
var serviceLevelNameCache = "";
//是否锁定缓存
var isLockCache = "";
var isLockNameCache = "";

$(function() {
	if((getUrlParam("source")==null?"":getUrlParam("source"))=="wechat"){
		delCookie("historyGoBack");
		delCookie("historyName");
	};
	//默认筛选条件加载
	getAllPeriod();
	getAllStatusParam();
	getAllSchoolLevel();
	getAllServiceLevel();
	getAllCustomerType();
	getAllProduct();
	//跳转的判断
	var sourceOther=getUrlParam("source");
	var backUrl = "";
	if(sourceOther=="mine"){
		backUrl = "/pages/mine.html";
		$('#LinkHistory span').html("首页");
		
		PushBackUrl(backUrl,"首页");
		
	}else if(sourceOther=="wechat"){//微信点击我的订单
		backUrl = "/pages/mine.html";
		$('#LinkHistory span').html("首页");
		PushBackUrl(backUrl,"首页");
	}else {
		//没有条件的是回退的
		$('#LinkHistory span').html(GetBackLabel());
	}
	
	$("#LinkHistory").click(function(){
		GoBack();
	});
	
	//将地区回显并保持选定的状态
	BackAreaCondition();
	FirstInCSS();
	
	if((getUrlParam("provinceName")==null?"":getUrlParam("provinceName"))!=""){
		ProvinceIDGlob = getUrlParam("provinceID");
		provinceName = getUrlParam("provinceName");
		ProvinceIDCache = getUrlParam("provinceID");
		temporaryProvince = getUrlParam("provinceName");
		var regionStr = "";
		regionStr += getUrlParam("provinceName");
		if((getUrlParam("cityName")==null?"":getUrlParam("cityName"))!=""){
			CityIDGlob = getUrlParam("cityID");
			cityName = getUrlParam("cityName");
			CityIDCache = getUrlParam("cityID");
			temporaryCity = getUrlParam("cityName");
			regionStr = regionStr + "."+getUrlParam("cityName");
			if((getUrlParam("districtName")==null?"":getUrlParam("districtName"))!=""){
					DistrictIDGlob = getUrlParam("districtID");
					districtName = getUrlParam("districtName");
					DistrictIDCache = getUrlParam("districtID");
					temporaryDistrict = getUrlParam("districtName");
				regionStr = regionStr + "."+getUrlParam("districtName");
			}
		}
		$("#regionShow").html(regionStr).css("color","red");
	}
		
	if(getUrlParam("mySwitch")=="3" || getUrlParam("mySwitch")=="4" || getUrlParam("mySwitch")=="8"){
		$("#serviceLevelLi").show();
	}else{
		$("#serviceLevelLi").hide();
	}
	if(getUrlParam("mySwitch")=="6"){
		$("#productLi").hide();
		$("#statusParamLi").hide();
	}
	if(getUrlParam("mySwitch")=="3" || getUrlParam("mySwitch")=="4" ||getUrlParam("mySwitch")=="8" ||getUrlParam("mySwitch")=="9" || getUrlParam("mySwitch")=="10" ||getUrlParam("mySwitch")=="11" ||getUrlParam("mySwitch")=="12"){
		$("#statusParamLi").hide();
	}
	ifFuzzy = getUrlParam("ifFuzzy")==null?0:getUrlParam("ifFuzzy");
	//产品回显
	if(((getUrlParam("productNameShow")==null?"":getUrlParam("productNameShow"))!="") && ifFuzzy==0){
		productId = getUrlParam("productIdShow");
		productName = getUrlParam("productNameShow");
		var productStr = "";
		productStr = getUrlParam("productNameShow");
		$("#productShow").html(productStr).css("color","red");
	}
	//客户类型回显
	if(((getUrlParam("customerTypeName")==null?"":getUrlParam("customerTypeName"))!="") && ifFuzzy==0){
		customerType = getUrlParam("customerType");
		customerTypeName = getUrlParam("customerTypeName");
		var customerTypeStr = "";
		customerTypeStr = getUrlParam("customerTypeName");
		$("#customerTypeShow").html(customerTypeStr).css("color","red");
	}
	//学段回显
	if(((getUrlParam("periodName")==null?"":getUrlParam("periodName"))!="") && ifFuzzy==0){
		periodId = getUrlParam("periodId");
		periodName = getUrlParam("periodName");
		var periodStr = "";
		periodStr = getUrlParam("periodName");
		$("#periodShow").html(periodStr).css("color","red");
	}
	//状态回显
	if(((getUrlParam("statusParamName")==null?"":getUrlParam("statusParamName"))!="") && ifFuzzy==0){
		statusParamId = getUrlParam("statusParamId");
		statusParamName = getUrlParam("statusParamName");
		var statusParamStr = "";
		statusParamStr = getUrlParam("statusParamName");
		$("#statusParamShow").html(statusParamStr).css("color","red");
	}
	//学校等级回显
	if(((getUrlParam("schoolLevelName")==null?"":getUrlParam("schoolLevelName"))!="") && ifFuzzy==0){
		schoolLevelId = getUrlParam("schoolLevelId");
		schoolLevelName = getUrlParam("schoolLevelName");
		var schoolLevelStr = "";
		schoolLevelStr = getUrlParam("schoolLevelName");
		$("#schoolLevelShow").html(schoolLevelStr).css("color","red");
	}
	//服务等级回显
	if(((getUrlParam("serviceLevelName")==null?"":getUrlParam("serviceLevelName"))!="") && ifFuzzy==0){
		serviceLevelId = getUrlParam("serviceLevelId");
		serviceLevelName = getUrlParam("serviceLevelName");
		var serviceLevelStr = "";
		serviceLevelStr = getUrlParam("serviceLevelName");
		$("#serviceLevelShow").html(serviceLevelStr).css("color","red");
	}
	$('#schoolList').css('top',$("#schoolList").position().top+10);
	if(((getUrlParam("searchType")==null?"":getUrlParam("searchType")))!=""){
		$("#searchSelect").val(getUrlParam("searchType"));
		$("#searchText").val((getUrlParam("keywords")==null?"":getUrlParam("keywords")));
		searchType = getUrlParam("searchType");
		keywords = getUrlParam("keywords"); 
		if((getUrlParam("keywords")==null?"":getUrlParam("keywords"))!=""){
			if(getUrlParam("searchType")=="学校ID"){
				pageNo=1;
				schoolId = getUrlParam("keywords");
				schoolName = "";
			}else{
				pageNo=1;
				schoolId = "0";
				schoolName = getUrlParam("keywords");
			}
			$("#schoolList").html("");
			loadSchoolList();
		}else{
			pageNo=1;
			schoolId = 0;
			schoolName = "";
			$("#schoolList").html("");
			loadSchoolList();
		}
	}else{
		pageNo=1;
		schoolId = 0;
		schoolName = "";
		$("#schoolList").html("");
		loadSchoolList();
	}
	$('#schoolList').height($(window).height()-($("header").height()+$(".nav-header").height())-20);
	
	$('#loadinggif').height($(window).height()-($("header").height()+$(".nav-header").height())-20);
	//新的翻页代码
	var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
    var nScrollTop = 0;   //滚动到的当前位置
    var nDivHight = $("#schoolList").height();
    $("#schoolList").scroll(function(){
      nScrollHight = $(this)[0].scrollHeight;
      nScrollTop = $(this)[0].scrollTop;
      if(nScrollTop + nDivHight >= nScrollHight){
    	  if(ifFirstQuery==false){
	          pageNo=pageNo+1;
			  if(pageNo<=pageCount){
				if(ifFuzzy==0){
					loadSchoolList();
				}
			  }
    	  }
      }
    });
	
});

//获得学段
function getAllPeriod(){
	$('#periodList').html("");
	var str = '<a href="javascript:;" onclick="selectPeriod(this,\'\',\'不限\')" data_id="">不限</a>';
	var dataList = periodMap;
	for(var key in dataList) {
		str +='<a href="javascript:;" onclick="selectPeriod(this,'+key+',\''+dataList[key]+'\')" data_id="'+key+'">'+dataList[key]+'</a>';
	}
	$('#periodList').append(str);
};
//获得状态
function getAllStatusParam(){
	$('#statusParamList').html("");
	var str = '<a href="javascript:;" onclick="selectStatusParam(this,\'\',\'不限\')" data_id="">不限</a>';
	var dataList = statusParamMap;
	for(var key in dataList) {
		str +='<a href="javascript:;" onclick="selectStatusParam(this,'+key+',\''+dataList[key]+'\')" data_id="'+key+'">'+dataList[key]+'</a>';
	}
	$('#statusParamList').append(str);
};
//获得学校等级
function getAllSchoolLevel(){
	$('#schoolLevelList').html("");
	var str = '<a href="javascript:;" onclick="selectSchoolLevel(this,\'\',\'不限\')" data_id="">不限</a>';
	var dataList = schoolLevelMap;
	for(var key in dataList) {
		str +='<a href="javascript:;" onclick="selectSchoolLevel(this,'+key+',\''+dataList[key]+'\')" data_id="'+key+'">'+dataList[key]+'</a>';
	}
	$('#schoolLevelList').append(str);
};
//获得服务等级
function getAllServiceLevel(){
	$('#serviceLevelList').html("");
	var str = '<a href="javascript:;" onclick="selectServiceLevel(this,\'\',\'不限\')" data_id="">不限</a>';
	var dataList = serviceLevelMap;
	for(var key in dataList) {
		str +='<a href="javascript:;" onclick="selectServiceLevel(this,'+key+',\''+dataList[key]+'\')" data_id="'+key+'">'+dataList[key]+'</a>';
	}
	$('#serviceLevelList').append(str);
}
//查询客户类别列表
function getAllCustomerType(){
	$('#customerTypeList').html("");
	var str = '<a href="javascript:;" onclick="selectCustomerType(this,\'\',\'不限\')" data_id="">不限</a>';
	var dataList = customerTypeMap;
	for(var index in dataList) {
		str +='<a href="javascript:;" onclick="selectCustomerType(this,'+index+',\''+dataList[index]+'\')" data_id="'+index+'">'+dataList[index]+'</a>';
	}
	$('#customerTypeList').append(str);
}

//查询产品列表
function getAllProduct(){
	$('#productList').html("");
	
	$.ajax({
		url : '/product/GetAllProduct.json',
		dataType : 'json',
		type : 'post',
		data : {
		},
		success : function(data) {
			
			if(data.error!=null){
				$.alert("对不起，数据出现错误："+data.error);
				return;
			}
			var str = '<a href="javascript:;" onclick="selectProduct(this,0,\'不限\')" data_id="0">不限</a>';
			var dataList = data;
			for(var index in dataList) {
				str +='<a href="javascript:;" onclick="selectProduct(this,'+dataList[index].id+',\''+dataList[index].name+'\')" data_id="'+dataList[index].id+'">'+dataList[index].name+'</a>';
			}
			$('#productList').append(str);
		}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
            $.alert(errorThrown); 
        } 
	})
}

//客户类别不限
function selectAllCustomerType(){
	$("#ulProductList").hide();
	customerType = "";
	customerTypeName = "";
	schoolName = "";
	schoolId = 0;
	$("#showCustomerTypeName").html("");
	if($("#showProvince").html()==""){
		$("#showProvince").css("display","none");
	}
	if($("#showCity").html()==""){
		$("#showCity").css("display","none");
	}
	if($("#showDistrict").html()==""){
		$("#showDistrict").css("display","none");
	}
	if($("#showProvince").html()=="" && $("#showCity").html()=="" && $("#showDistrict").html()=="" && $("#showCustomerTypeName").html()==""){
		ProvinceIDGlob=0;CityIDGlob=0;DistrictIDGlob=0;customerType="";
		$('#allList').css("display","block");
	}else{
		$('#allList').css("display","none");
	}
	pageNo=1;
	ifFirstQuery=true;
	$('#schoolList').html("");
	ifFuzzy=0;
	loadSchoolList();
}

//选择学段
function selectPeriod(obj,id,name){
	$("#periodList").hide(500);
	periodCache = id;
	periodNameCache = name;
	if($(obj).attr("data_id")!=""){
		$(obj).parent().prev("a").children("label").html(name).css("color","red");
	}else{
		$(obj).parent().prev("a").children("label").html(name).css("color","");
		periodNameCache = "";
	}
};
//选择状态
function selectStatusParam(obj,id,name){
	$("#statusParamList").hide(500);
	statusParamCache = id;
	statusParamNameCache = name;
	if($(obj).attr("data_id")!=""){
		$(obj).parent().prev("a").children("label").html(name).css("color","red");
	}else{
		$(obj).parent().prev("a").children("label").html(name).css("color","");
		statusParamNameCache = "";
	}
};
//选择学校等级
function selectSchoolLevel(obj,id,name){
	$("#schoolLevelList").hide(500);
	schoolLevelCache = id;
	schoolLevelNameCache = name;
	if($(obj).attr("data_id")!=""){
		$(obj).parent().prev("a").children("label").html(name).css("color","red");
	}else{
		$(obj).parent().prev("a").children("label").html(name).css("color","");
		schoolLevelNameCache = "";
	}
};
//选择服务等级
function selectServiceLevel(obj,id,name){
	$("#serviceLevelList").hide(500);
	serviceLevelCache = id;
	serviceLevelNameCache = name;
	if($(obj).attr("data_id")!=""){
		$(obj).parent().prev("a").children("label").html(name).css("color","red");
	}else{
		$(obj).parent().prev("a").children("label").html(name).css("color","");
		serviceLevelNameCache = "";
	}
};
//选择客户类别
function selectCustomerType(obj,id,name){
	$("#customerTypeList").hide(500);
	customerTypeCache = id;
	customerTypeNameCache = name;
	if($(obj).attr("data_id")!=""){
		$(obj).parent().prev("a").children("label").html(name).css("color","red");
	}else{
		$(obj).parent().prev("a").children("label").html(name).css("color","");
		customerTypeNameCache = "";
	}
}

//产品不限
function selectAllProduct(){
	$("#ulProductList").hide();
	productName = "";
	productId = 0;
	schoolName = "";
	schoolId = 0;
	$("#showProductName").html("");
	if($("#showProvince").html()==""){
		$("#showProvince").css("display","none");
	}
	if($("#showCity").html()==""){
		$("#showCity").css("display","none");
	}
	if($("#showDistrict").html()==""){
		$("#showDistrict").css("display","none");
	}
	if($("#showProvince").html()=="" && $("#showCity").html()=="" && $("#showDistrict").html()=="" && $("#showProductName").html()==""){
		ProvinceIDGlob=0;CityIDGlob=0;DistrictIDGlob=0;productId=0;
		$('#allList').css("display","block");
	}else{
		$('#allList').css("display","none");
	}
	pageNo=1;
	ifFirstQuery=true;
	$('#schoolList').html("");
	ifFuzzy=0;
	loadSchoolList();
}
//选择产品
function selectProduct(obj,id,name){
	$("#productList").hide(500);
	productIdCache = id;
	productNameCache = name;
	if($(obj).attr("data_id")!=0){
		$(obj).parent().prev("a").children("label").html(name).css("color","red");
	}else{
		$(obj).parent().prev("a").children("label").html(name).css("color","");
		productNameCache = "";
	}
}
//查询选项
function selectID(){
	document.getElementById("ssou").value=$("#selectID").html();
}
function selectName(){
	document.getElementById("ssou").value=($("#selectName").html());
}
//关键字查询的方法
function keywordsFunction(){
	ifFuzzy=1;
	keywords=$("#searchText").val().trim();
	if(keywords==""){
		pageNo=1;
		schoolId = 0;
		schoolName = "";
	}else{
		if($("#searchSelect").val()=="id"){
			searchType = "id";
			if(isNaN($("#searchText").val())){
				$.alert("请输入正确的ID");
				return false;
			}
			pageNo=1;
			schoolId = $("#searchText").val().trim()==""?"0":$("#searchText").val().trim();
			schoolName = "";
		}else{
			searchType = "学校名称";
			if(!isNaN($("#searchText").val())){
				$.alert("请输入正确的名称");
				return false;
			}
			pageNo=1;
			schoolId = "0";
			schoolName = $("#searchText").val().trim();
		}
	}
	ProvinceIDGlob = 0;
	CityIDGlob = 0;
	DistrictIDGlob = 0;
	productId = 0;
	customerType = "";
	periodId = "";
	statusParamId = "";
	schoolLevelId = "";
	serviceLevelId = "";
	
	provinceName = "";
	cityName = "";
	districtName = "";
	 
	productName = ""; 
	customerTypeName = "";
	periodName = "";
	statusParamName = "";
	schoolLevelName = "";
	serviceLevelName = "";
	
	//清空缓存
	ClearAllCondition();
	
	$("#schoolList").html("");
	loadSchoolList();
	$(".condition").animate({
		"left": "100%"
	}, 300, function() {
		$(this).hide();
		$(".tch2").hide()
	});
}
//条件查询
function loadSchoolList(){
	$('#loadinggif').show();
	getParamsAndUri();
	var option = {
		url:url,
		data:params,
		type:'post',
		dataType:'json',
		success:function(data){
			$('#loadinggif').hide();
			dataHandle(data);
			
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#loadinggif').hide();
			$.alert("获取学校列表失败");
        }
	};
	$.ajax(option);
}
//参数和Uri
function getParamsAndUri(){
	mySwitch = getUrlParam("mySwitch");//用户选择点击的菜单（保留，试用，代理。。。）
	mySwitchType = getUrlParam("mySwitchType");
	$("#pageTitle").html(mySwitchType);
	sellerID = getUrlParam("sellerID");
	sellerName = getUrlParam("sellerName");
	switch(mySwitch){
	case "1":params = {"sellerID":sellerID,"pageNo":pageNo,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"productId":productId,"schoolId":schoolId,"schoolName":schoolName,"status":statusParamId,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId};url = "/seller/myHaveSchool.html";break;
	case "2":params = {"sellerID":sellerID,"pageNo":pageNo,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"productId":productId,"schoolId":schoolId,"schoolName":schoolName};url = "/seller/myAgentSchool.html";break;
	case "3":params = {"sellerID":sellerID,"status":"5","pageNo":pageNo,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"productId":productId,"schoolId":schoolId,"schoolName":schoolName,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId,"useLevel":serviceLevelId};url = "/seller/useSchoolList.html";break;
	case "4":params = {"sellerID":sellerID,"status":"6","pageNo":pageNo,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"productId":productId,"schoolId":schoolId,"schoolName":schoolName,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId,"useLevel":serviceLevelId};url = "/seller/useSchoolList.html";break;
	case "5":params = {"sellerID":sellerID,"pageNo":pageNo,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"productId":productId,"schoolId":schoolId,"schoolName":schoolName};url = "/seller/myContactSchool.html";break;//联系
	case "6":params = {"sellerID":sellerID,"pageNo":pageNo,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"schoolId":schoolId,"schoolName":schoolName,"customerType":customerType,"stages":periodId,"schoolLevel":schoolLevelId};url = "/seller/myProtectSchool.html";break;
	case "7":params = {"sellerID":sellerID,"pageNo":pageNo,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"productId":productId,"schoolId":schoolId,"schoolName":schoolName,"status":statusParamId,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId};url = "/seller/myAttentionSchool.html";break;
	case "8":params = {"sellerID":sellerID,"pageNo":pageNo,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"productId":productId,"schoolId":schoolId,"schoolName":schoolName,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId,"useLevel":serviceLevelId};url = "/seller/myOrders.html";break;//订单
	case "9":params = {"sellerID":sellerID,"status":"6","productID":productId,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"schoolId":schoolId,"schoolName":schoolName,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId};url = "/seller/myOneMonthExpiredInUse.html";break;
	case "10":params = {"sellerID":sellerID,"status":"5","productID":productId,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"schoolId":schoolId,"schoolName":schoolName,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId};url = "/seller/myFiveDaysExpiredInTrial.html";break;
	case "11":params = {"sellerID":sellerID,"productID":productId,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"schoolId":schoolId,"schoolName":schoolName,"status":statusParamId,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId};url = "/seller/myPartPayInUse.html";break;
	case "12":params = {"sellerID":sellerID,"productID":productId,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob,"schoolId":schoolId,"schoolName":schoolName,"status":statusParamId,"schoolType":customerType,"stages":periodId,"schoolLevel":schoolLevelId};url = "/seller/myNoBackProtocolPostOneMonth.html";
	}
}
//返回数据处理
function dataHandle(data){
	var state = data.state;
	var msg = data.message;
	if(state==1){
		if(pageNo==1){
			$("#schoolList").append("<p style='text-align:center'>"+data.message+"</p>");
			return;
		}
		return;
	}
	var schoolList = eval(data.schoolList);
	if(state==0){//请求成功
		if(schoolList!= "null" && schoolList!=null){
			pageCount = data.pageCount==undefined?pageCount:data.pageCount;
			pageCount = (pageCount=="null" || pageCount ==null || pageCount =="")?0:pageCount;
			if(mySwitch!="9" && mySwitch!="10" && mySwitch!="11" && mySwitch!="12"){
				var rowCount = data.rowCount==undefined?0:data.rowCount;
				rowCount = (rowCount=="null" || rowCount ==null || rowCount =="")?0:rowCount;
				$("#pageTitle").append("["+rowCount+"]");
			}
			var backSwitch = data.backSwitch;
			var contactString = "";
			for(var i=0;i<schoolList.length;i++){
				var schoolElement = schoolList[i]; 
				var beginTime = (schoolElement.BeginTime)==undefined?"":((schoolElement.BeginTime));
				if(beginTime !=""){
					beginTime = new Date(parseInt(beginTime.slice(6,beginTime.length-2))).Format("yyyy-MM-dd");
				}
				var endTime = (schoolElement.EndTime)==undefined?"":((schoolElement.EndTime));
				if(endTime!=""){
					endTime = new Date(parseInt(endTime.slice(6,endTime.length-2))).Format("yyyy-MM-dd");
				}
				var orderNum = schoolElement.OrderNum;
				var buffDays = (schoolElement.BuffDays)==undefined?0:(schoolElement.BuffDays);
				var productID = schoolElement.ProductID;
				var productName = (schoolElement.ProductName)==undefined?"":(schoolElement.ProductName);
				var schoolID = (schoolElement.SchoolID)==undefined?"":(schoolElement.SchoolID);
				var schoolName = (schoolElement.SchoolName)==undefined?"":(schoolElement.SchoolName);
				var serviceLevel = (schoolElement.UseLevel)==undefined?"":(schoolElement.UseLevel); 
				//省
				var schoolProvinceId = (schoolElement.ProvinceID)==undefined?"0":(schoolElement.ProvinceID);
				var schoolProvinceName = (schoolElement.ProvinceName)==undefined?"":(schoolElement.ProvinceName);
				//市
				var schoolCityId = (schoolElement.CityID)==undefined?"0":(schoolElement.CityID);
				var schoolCityName = (schoolElement.CityName)==undefined?"":(schoolElement.CityName);
				//区
				var schoolDistrictId = (schoolElement.DistrictID)==undefined?"0":(schoolElement.DistrictID);
				var schoolDistrictName = (schoolElement.DistrictName)==undefined?"":(schoolElement.DistrictName);
				var seller = "";
				if(mySwitch!="1" && mySwitch!="11"){
					seller = schoolElement.Seller;
				}else{
					seller = schoolElement.SellerName;
				}
				var contractRMB = (schoolElement.ContractRMB)==undefined?"":(schoolElement.ContractRMB);
				var totalReceiveRMB = (schoolElement.TotalReceiveRMB)==undefined?"":(schoolElement.TotalReceiveRMB);
				var diffReceiveRMB = (schoolElement.DiffReceiveRMB)==undefined?"":(schoolElement.DiffReceiveRMB);
				var sendTime = (schoolElement.SendTime)==undefined?"":(schoolElement.SendTime);
				var addTime = (schoolElement.AddTime)==undefined?"":(schoolElement.AddTime);//我的关注的 时间
				if(sendTime!=""){
					sendTime = new Date(parseInt(sendTime.slice(6,sendTime.length-2))).Format("yyyy-MM-dd");
				}
				var signedType = (schoolElement.SignedType)==undefined?"":(schoolElement.SignedType);
				var isFreeSchool = (schoolElement.IsFreeSchool)==undefined?"":(schoolElement.IsFreeSchool);
				//保护
				var isCreatorProtect = (schoolElement.CreatorProtect)==undefined?0:(schoolElement.CreatorProtect);
				//短期保护
				var isShortProtect = (schoolElement.IsShortProtect)==undefined?0:(schoolElement.IsShortProtect);
				//分配
				var isExpireAllot = (schoolElement.ExpireAllot)==undefined?0:(schoolElement.ExpireAllot);
				//名校分配
				var isProtectType = (schoolElement.ProtectType)==undefined?0:(schoolElement.ProtectType);
				//百强校
				var isBaiQiang = (schoolElement.IsBaiQiang)==undefined?0:(schoolElement.IsBaiQiang);
				//省重点
				var isShengZhongDian = (schoolElement.IsShengZhongDian)==undefined?0:(schoolElement.IsShengZhongDian);
				//学校等级
				var schoolLevelData = (schoolElement.SchoolLevel)==undefined?"":(schoolElement.SchoolLevel);
				//使用状态
				var status = (schoolElement.Status)==undefined?0:(schoolElement.Status);
				//锁定
				var isLocked = (schoolElement.IsLocked)==undefined?0:(schoolElement.IsLocked);
				//保留
				var isHave = (schoolElement.IsHave)==undefined?0:(schoolElement.IsHave);
				//代理
				var isAgent = (schoolElement.IsAgent)==undefined?false:(schoolElement.IsAgent);
				var showStatus = "";
				var iconStr="";
				//图标是否显示
				if(isHave==1){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">保</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">保</kbd>&nbsp;';
					}
				}
				if(isCreatorProtect==1){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">保护</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">保护</kbd>&nbsp;';
					}
				}
				if(isAgent==true){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">代</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">代</kbd>&nbsp;';
					}
				}
				if(isLocked==1){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">锁</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">锁</kbd>&nbsp;';
					}
				}
				if(schoolLevelData!=""){
					var schoolLevelSplit = schoolLevelData.split(",");
					var isShengImport = false;
					var isBaiqiang = false;
					for(var item in schoolLevelSplit){
						if(schoolLevelSplit[item]=="3"){
							isShengImport = true;
						}
						if(schoolLevelSplit[item]=="5"){
							isBaiqiang = true;
						}
					}
					if(isShengImport){
						iconStr +='<kbd class="shengzhongdian">省重点</kbd>&nbsp;';
					}
					if(isBaiqiang){
						iconStr +='<kbd class="baiqiang">百强校</kbd>&nbsp;';
					}				
				}
				if(status==5 && mySwitch!="3" && mySwitch!="4" && mySwitch!="9" && mySwitch!="10"){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">试</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">试</kbd>&nbsp;';
					}
				}
				if(status==6 && mySwitch!="3" && mySwitch!="4" && mySwitch!="9" && mySwitch!="10"){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">使</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">使</kbd>&nbsp;';
					}
				}
				if(status==3 && mySwitch!="3" && mySwitch!="4" && mySwitch!="9" && mySwitch!="10"){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">待试</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">待试</kbd>&nbsp;';
					}
				}
				if(status==4 && mySwitch!="3" && mySwitch!="4" && mySwitch!="9" && mySwitch!="10"){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">待使</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">待使</kbd>&nbsp;';
					}
				}
				if(status==0 && mySwitch!="3" && mySwitch!="4" && mySwitch!="9" && mySwitch!="10"){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">未联系</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">未联系</kbd>&nbsp;';
					}
				}
				if(status==1 && mySwitch!="3" && mySwitch!="4" && mySwitch!="9" && mySwitch!="10"){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">已联系</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">已联系</kbd>&nbsp;';
					}
				}
				if(isShortProtect==1){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">短保</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">短保</kbd>&nbsp;';
					}
				}
				if(isProtectType>0){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">名校分配</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">名校分配</kbd>&nbsp;';
					}
				}
				if(buffDays>0 && status==-1){
					if(sellerName==seller){
						iconStr +='<kbd class="selfSchoolStatus">缓</kbd>&nbsp;';
					}else{
						iconStr +='<kbd class="othersSchoolStatus">缓</kbd>&nbsp;';
					}
				}
				
				var paramsString = "orderNum="+orderNum+"&sellerID="+sellerID+"&sellerName="+encodeURIComponent(sellerName)+"&productId="+productID+"&productName="+encodeURIComponent(productName)+"&schoolId="+schoolID+"&schoolName="+encodeURIComponent(schoolName)+"&mySwitchType="+encodeURIComponent(mySwitchType)+"&beginTime="+beginTime+"&endTime="+endTime+"&status="+status+"&mySwitch="+mySwitch+"&contractRMB="+contractRMB+"&totalReceiveRMB="+totalReceiveRMB+"&diffReceiveRMB="+diffReceiveRMB+"&sendTime="+sendTime+"&signedType="+signedType+"&isFreeSchool="+isFreeSchool+"&serviceLevel="+serviceLevel;
				if(backSwitch=="1"){//其他(除了保护和快过期)
					if(mySwitch=="7"){//我的关注
						contactString += "<li><div><a href=\"javascript:void(0)\" class=\"col-xs-8\" onclick=\"attentionDetails('"+isHave+"','"+isAgent+"','"+buffDays+"','"+status+"','"+sellerID+"','"+seller+"','"+sellerName+"','"+schoolID+"','"+productID+"','"+schoolName+"','"+productName+"')\">"
					}else{
						if(status ==-1 || status ==4 || status ==6 || status ==3 || status ==5 || status ==1 || status==0){
							if(status==-1){
								contactString += "<li><div><a href=\"javascript:void(0)\"  class=\"col-xs-8\"  id=\"schoolName\" onclick=\"expiredProcessStatus('"+sellerID+"','"+schoolID+"','"+productID+"','"+paramsString+"')\">"
							}else{
								contactString += "<li><div><a href=\"javascript:void(0)\" class=\"col-xs-8\"  orderNum=\""+orderNum+"\" onclick=\"toStatusDetails('"+sellerID+"',this,'"+schoolId+"','"+schoolName+"','"+productId+"','"+status+"','"+paramsString+"')\">"
							}
						} else{
							contactString += "<li><div><a href=\"javascript:void(0)\" class=\"col-xs-8\"  onclick=\"return false;\" disabled=\"disabled\">"
						}
					}
					contactString += "<span style=\"font-weight:bold\">"+schoolName+"</span></a><a href=\"javascript:void(0)\" class=\"col-xs-4\"><span style=\"font-size:13px;\">"+productName+"</span></a></div>\
									<div><div class=\"col-xs-8 over_hide\" ><span style=\"color:#777;font-size:13px\">["+schoolID+"]</span>";
					if(schoolProvinceId!=0){
						contactString += "<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"pList\" onclick=\"clickProvince(this)\" pid = \""+schoolProvinceId+"\">"+schoolProvinceName+"</a>";
					}
					if(schoolCityId!=0){
						contactString += ".<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"cList\" onclick=\"clickCity(this)\" cid=\""+schoolCityId+"\">"+schoolCityName+"</a>";
					}
					if(schoolDistrictId!=0){
						contactString += ".<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"dList\" onclick=\"clickDistrict(this)\" did=\""+schoolDistrictId+"\">"+schoolDistrictName+"</a>";
					}
					contactString += "</div><div class=\"col-xs-4\" style=\"text-align:center\">";
					contactString += iconStr+"</div></div></li>";
				}
				if(backSwitch=="2"){//保护
					contactString += "<li><div><a href=\"javascript:void(0)\" class=\"col-xs-8\" onclick=\"toCustomerDetails('"+paramsString+"')\"><span style=\"font-weight:bold\">"+schoolName+"</span></a></div>\
									<div><div class=\"col-xs-8 over_hide\"><span style=\"color:#777;font-size:13px\">["+schoolID+"]</span>";
					if(schoolProvinceId!=0){
						contactString += "<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"pList\" onclick=\"clickProvince(this)\" pid = \""+schoolProvinceId+"\">"+schoolProvinceName+"</a>";
					}
					if(schoolCityId!=0){
						contactString += ".<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"cList\" onclick=\"clickCity(this)\" cid=\""+schoolCityId+"\">"+schoolCityName+"</a>";
					}
					if(schoolDistrictId!=0){
						contactString += ".<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"dList\" onclick=\"clickDistrict(this)\" did=\""+schoolDistrictId+"\">"+schoolDistrictName+"</a>";
					}
					contactString += "</div><div class=\"col-xs-4\">";
					contactString += iconStr+"</div></div></li>";
				}
				if(backSwitch=="3"){//快过期
					contactString += "<li><div><a href=\"javascript:void(0)\" class=\"col-xs-8\" onclick=\"toExpiredDetails('"+mySwitch+"','"+paramsString+"')\">\
					<span style=\"font-weight:bold;\">"+schoolName+"</span></a><a href=\"javascript:void(0)\" class=\"col-xs-4\"><span style=\"font-size:13px;\">"+productName+"</span></a></div>\
					<div><div class=\"col-xs-8 over_hide\" ><span style=\"color:#777;font-size:13px\">["+schoolID+"]</span>";
					if(schoolProvinceId!=0){
						contactString += "<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"pList\" onclick=\"clickProvince(this)\" pid = \""+schoolProvinceId+"\">"+schoolProvinceName+"</a>";
					}
					if(schoolCityId!=0){
						contactString += ".<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"cList\" onclick=\"clickCity(this)\" cid=\""+schoolCityId+"\">"+schoolCityName+"</a>";
					}
					if(schoolDistrictId!=0){
						contactString += ".<a href=\"javascript:void(0);\" style=\"font-size:13px\" class=\"dList\" onclick=\"clickDistrict(this)\" did=\""+schoolDistrictId+"\">"+schoolDistrictName+"</a>";
					}
					contactString += "</div><div class=\"col-xs-4\">";
					contactString += iconStr+"</div></div></li>";
				}
			}
			$("#schoolList").append(contactString);
			ifFirstQuery=false;
			
			document.getElementById("schoolList").style.display="block";
		}else{
			if(pageNo==1){
				$("#schoolList").append("<p style='text-align:center'>"+data.message+"</p>");
				if(mySwitch!="9" && mySwitch!="10" && mySwitch!="11" && mySwitch!="12"){
					var rowCount = data.rowCount==undefined?0:data.rowCount;
					rowCount = (rowCount=="null" || rowCount ==null || rowCount =="")?0:rowCount;
					$("#pageTitle").append("["+rowCount+"]");
				}
				return;
			}
		}
	}else{
		if(pageNo==1){
			$("#schoolList").append("<p style='text-align:center'>"+data.message+"</p>");
			return;
		}
	}
} 
//我 的关注跳转
function attentionDetails(isHave,isAgent,buffDays,status,sellerID,seller,sellerName,schoolID,productID,schoolName,productNameThis){
	$.ajax({
		url:'/customer/orderDetails',
		type:'post',
		data:{"schoolID":schoolID,"productID":productID},
		dataType:'json',
		success:function(data){
			if(data.state==0){
				var beginTime = "";
				var endTime = "";
				var serviceLevel = "";
				if(data.orderDetails!="null"){
					 beginTime = ((data.orderDetails)[0].BeginTime) == undefined?"":((data.orderDetails)[0].BeginTime);
					 if(beginTime != ""){
						 beginTime = new Date(parseInt(beginTime.slice(6,beginTime.length-2))).Format("yyyy-MM-dd");
					 }
					 endTime = ((data.orderDetails)[0].EndTime)== undefined?"":((data.orderDetails)[0].EndTime);
					 if(beginTime != ""){
						 endTime = new Date(parseInt(endTime.slice(6,endTime.length-2))).Format("yyyy-MM-dd");
					 }
					 serviceLevel = ((data.orderDetails)[0].UseLevel)==undefined?"":((data.orderDetails)[0].UseLevel);
					 if(seller!=sellerName && ((status==-1 && buffDays!="" && buffDays>0) ||(isHave==1 || isAgent!=false || (status==3 || status==4 || status==5 || status==6 )))){
						 window.location.href="/pages/useDetails.html?source="+source+"&sellerID="+sellerID+"&sellerName="+encodeURIComponent(sellerName)+"&schoolId="+schoolID+"&productId="+productID+"&productName="+encodeURIComponent(productNameThis)+"&schoolName="+encodeURIComponent(schoolName)+"&mySwitchType="+encodeURIComponent(mySwitchType)+"&beginTime="+beginTime+"&endTime="+endTime+"&mySwitch="+mySwitch+"&serviceLevel="+serviceLevel+"&permit=0"+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
					 }else{
						 window.location.href="/pages/useDetails.html?source="+source+"&sellerID="+sellerID+"&sellerName="+encodeURIComponent(sellerName)+"&schoolId="+schoolID+"&productId="+productID+"&productName="+encodeURIComponent(productNameThis)+"&schoolName="+encodeURIComponent(schoolName)+"&mySwitchType="+encodeURIComponent(mySwitchType)+"&beginTime="+beginTime+"&endTime="+endTime+"&mySwitch="+mySwitch+"&serviceLevel="+serviceLevel+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
					 }
				}else{//订单详情为空
					window.location.href="/pages/useDetails.html?source="+source+"&sellerID="+sellerID+"&sellerName="+encodeURIComponent(sellerName)+"&schoolId="+schoolID+"&productId="+productID+"&productName="+encodeURIComponent(productNameThis)+"&schoolName="+encodeURIComponent(schoolName)+"&mySwitchType="+encodeURIComponent(mySwitchType)+"&beginTime="+beginTime+"&endTime="+endTime+"&mySwitch="+mySwitch+"&serviceLevel="+serviceLevel+"&permit=0"+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
				}
			}else{
				$.alert(data.message);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 $.alert("获得订单详情失败");
      }
	})
}
//状态详情
function toStatusDetails(sellerID,obj,schoolId,schoolName,productID,status,params){
	var orderNum = $(obj).attr("orderNum");
	if(((getUrlParam("provinceID")==null?"":getUrlParam("provinceID")))!=""){
		uriParams = encodeURIComponent(uriParams.substring(0,uriParams.indexOf("&provinceID=")) +"&provinceID="+ProvinceIDGlob+"&cityID="+CityIDGlob+"&districtID="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy);
	}else{
		uriParams = encodeURIComponent(uriParams +"&provinceID="+ProvinceIDGlob+"&cityID="+CityIDGlob+"&districtID="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy);
	}
	switch(status){
	case "4":window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&status=6"+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;break;
	case "6":usedProcessStatus(sellerID,orderNum,schoolId,schoolName,productID);window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&status=6"+"&protocolStatus="+protocolStatus+"&deliveryStatus="+deliveryStatus+"&protocolBackStatus="+protocolBackStatus+"&billStatus="+billStatus+"&receiveMoneyStatus="+receiveMoneyStatus+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;break;
	case "3":window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&status=5"+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;break;
	case "5":window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&status=5"+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;break;
	case "1":window.location.href="/pages/productInformation.html?source="+source+"&"+params+"&pageUrl="+pageUrl+"&uriParams="+uriParams;break;
	case "0":window.location.href="/pages/productInformation.html?source="+source+"&"+params+"&pageUrl="+pageUrl+"&uriParams="+uriParams;
	}
}
//获得使用过期的流程状态
function expiredProcessStatus(sellerId,schoolId,productID,params){
	$.ajax({
		url:'/seller/processStatuses',
		type:'post',
		data:{"sellerID":sellerId,"schoolID":schoolId,"productID":productID},
		dataType:'json',
		success:function(data){
			var expiredBeginTime = data.beginTime == undefined?"":data.beginTime;
			if(expiredBeginTime != ""){
				expiredBeginTime = new Date(parseInt(data.beginTime.slice(6,data.beginTime.length-2))).Format("yyyy-MM-dd");
			}
			var expiredEndTime = data.endTime == undefined?"":data.endTime;
			if(expiredEndTime != ""){
				expiredEndTime = new Date(parseInt(data.endTime.slice(6,data.endTime.length-2))).Format("yyyy-MM-dd");
			}
			if(data.state=="0"){
				window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&status=6"+"&protocolStatus="+data.protocolStatus+"&deliveryStatus="+data.deliveryStatus+"&protocolBackStatus="+data.protocolBackStatus+"&billStatus="+data.billStatus+"&receiveMoneyStatus="+data.receiveMoneyStatus+"&useType=1&expiredBeginTime="+expiredBeginTime+"&expiredEndTime="+expiredEndTime+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
			}else if(data.state=="3"){//没有获取到流程
				if(data.useExpired=="1"){//试用过期没有流程
					window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&status=6"+"&protocolStatus=&deliveryStatus=&protocolBackStatus=&billStatus=&receiveMoneyStatus=&useType=0&expiredBeginTime="+expiredBeginTime+"&expiredEndTime="+expiredEndTime+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
					return;
				}else{//流程获取失败的
					window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&status=6"+"&protocolStatus=&deliveryStatus=&protocolBackStatus=&billStatus=&receiveMoneyStatus=&useType=0&expiredBeginTime="+expiredBeginTime+"&expiredEndTime="+expiredEndTime+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
					return;
				}
			}else if(data.state=="2"){//无权限
				$("#schoolName").attr("data-toggle","popover");
				$("#schoolName").attr("data-placement","top");
				$("#schoolName").attr("data-content","已被其他人员试用、使用，不能查看");
				$('#schoolName').popover();
				return;
			}else{//其他
				return false;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 $.alert("获得使用过期的流程状态失败");
      }
	})
}
//已使用(获取流程状态)
function usedProcessStatus(sellerID,orderNum,schoolId,schoolName,productID){
	var url = "";
	var params = {};
	if(mySwitch=="4" || mySwitch=="8"){//我的使用或者我的订单
		url = "/seller/processStatusByOrderNumAndSellerId";
		params = {"sellerID":sellerID,"orderNum":orderNum};
		processStatus(url,params);
	}else{//其他
		url = "/seller/processStatusByParams";
		params = {"sellerID":sellerID,"schoolId":schoolId,"schoolName":schoolName,"productId":productID,"pageNo":1,"provinceId":ProvinceIDGlob,"cityId":CityIDGlob,"districtId":DistrictIDGlob};
		processStatus(url,params);
	}
}
//查询流程状态(已使用)
function processStatus(url,params){
	$.ajax({
		url:url,
		type:'post',
		async: false,
		data:params,
		dataType:'json',
		success:function(data){
			var state = data.state;
			var msg = data.message;
			if(state==0){//请求成功
				protocolStatus = data.protocolStatus;
				deliveryStatus = data.deliveryStatus;
				protocolBackStatus = data.protocolBackStatus;
				billStatus = data.billStatus;
				receiveMoneyStatus = data.receiveMoneyStatus;
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 $.alert("获取已使用的流程失败");
      }
	});
}
//跳到产品详情页面
function toCustomerDetails(params){
	if(((getUrlParam("provinceID")==null?"":getUrlParam("provinceID")))!=""){
		uriParams = encodeURIComponent(uriParams.substring(0,uriParams.indexOf("&provinceID=")) +"&provinceID="+ProvinceIDGlob+"&cityID="+CityIDGlob+"&districtID="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy);
	}else{
		uriParams = encodeURIComponent(uriParams +"&provinceID="+ProvinceIDGlob+"&cityID="+CityIDGlob+"&districtID="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy);
	}
	window.location.href="/pages/customerDetails.html?source="+source+"&"+params+"&pageUrl="+pageUrl+"&uriParams="+uriParams;
}
//跳到快过期产品详情页面
function toExpiredDetails(mySwitch,params){
	if(((getUrlParam("provinceID")==null?"":getUrlParam("provinceID")))!=""){
		uriParams = encodeURIComponent(uriParams.substring(0,uriParams.indexOf("&provinceID=")) +"&provinceID="+ProvinceIDGlob+"&cityID="+CityIDGlob+"&districtID="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy);
	}else{
		uriParams = encodeURIComponent(uriParams +"&provinceID="+ProvinceIDGlob+"&cityID="+CityIDGlob+"&districtID="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy);
	}
	switch(mySwitch){
	case "9":window.location.href="/pages/productInformation.html?source="+source+"&"+params+"&pageUrl="+pageUrl+"&uriParams="+uriParams;break;
	case "10":window.location.href="/pages/productInformation.html?source="+source+"&"+params+"&pageUrl="+pageUrl+"&uriParams="+uriParams;break;
	case "11":window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;break;
	case "12":window.location.href="/pages/useDetails.html?source="+source+"&"+params+"&provinceId="+ProvinceIDGlob+"&cityId="+CityIDGlob+"&districtId="+DistrictIDGlob+"&customerType="+customerType+"&provinceName="+provinceName+"&cityName="+cityName+"&districtName="+districtName+"&customerTypeName="+customerTypeName+"&productIdShow="+productId+"&productNameShow="+productName+"&periodId="+periodId+"&periodName="+periodName+"&statusParamId="+statusParamId+"&statusParamName="+statusParamName+"&schoolLevelId="+schoolLevelId+"&schoolLevelName="+schoolLevelName+"&serviceLevelId="+serviceLevelId+"&serviceLevelName="+serviceLevelName+"&searchType="+searchType+"&keywords="+keywords+"&ifFuzzy="+ifFuzzy;
	}
}
//日期格式转换
Date.prototype.Format = function (fmt) { //
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//返回到“我的”页面
function goBack(){
	window.location.href = "/pages/mine.html";
}
//原始js
$(function() {
	//隐藏的筛选条件点击事件
	$(".hideCondition").on("click", function() {
		if($(this).parent().css("display")=="none"){
			return false;
		}
	})
	//确定点击事件
	$(".condition header a").on("click", function() {
		Screening();
	});
	//搜索
	$("#searchButton").click(function(){
		keywordsFunction();
		$(".container-list li>a label").html("不限").css("color","");
	});
})

//用筛选页面要清空筛选选单的参数
function Screening(){
	RefreshAreaID();
	
	provinceName = temporaryProvince;
	cityName = temporaryCity;
	districtName = temporaryDistrict;
	
	productId = productIdCache; 
	productName = productNameCache; 
	customerType = customerTypeCache;
	customerTypeName = customerTypeNameCache;
	periodId = periodCache;
	periodName = periodNameCache;
	statusParamId = statusParamCache;
	statusParamName = statusParamNameCache;
	schoolLevelId = schoolLevelCache;
	schoolLevelName = schoolLevelNameCache;
	serviceLevelId = serviceLevelCache;
	serviceLevelName = serviceLevelNameCache;
	
	pageNo=1;
	
	if($("#searchText").val().trim()==""){
		searchType = "学校ID";
		keywords="";
		schoolId = 0;
		schoolName = "";
	}else{
		if($("#searchSelect").val()=="学校ID"){
			if(isNaN($("#searchText").val())){
				keywords = "";
				$.alert("请输入正确的ID");
				$("#pageTitle").html(mySwitchType+"[0]");
				$('#schoolList').html("");
				return false;
			}
			searchType = "学校ID";
			keywords=$("#searchText").val().trim();
			schoolId = keywords;
			schoolName = "";
		}else{
			searchType = "学校名称";
			keywords=$("#searchText").val().trim();
			schoolId = 0;
			schoolName = keywords;
		}
	}
	
	ifFirstQuery = true;
	$('#schoolList').html("");
	ifFuzzy=0;
	loadSchoolList();
}

//清空所有的呃查询条件
function ClearAllCondition(){
	province();
	ClearAreaStatus();
	RefreshAreaID();
	
	productIdCache = 0; 
	productNameCache = ""; 
	customerTypeCache = "";
	customerTypeNameCache = "";
	
	//学段缓存
	periodCache = "";
	periodNameCache = "";
	//状态缓存
	statusParamCache = "";
	statusParamNameCache = "";
	//学校等级缓存
	schoolLevelCache = "";
	schoolLevelNameCache = "";
	//服务等级缓存
	serviceLevelCache = "";
	serviceLevelNameCache = "";
	//模糊搜索清空
	$("#searchSelect").val("学校ID");
	$("#searchText").val("");
}
//回显
$("#con").on("click", function() {	
	ClearAreaStatus();
	productIdCache = 0; 
	productNameCache = ""; 
	customerTypeCache = "";
	customerTypeNameCache = "";
	
	//学段缓存
	periodCache = "";
	periodNameCache = "";
	//状态缓存
	statusParamCache = "";
	statusParamNameCache = "";
	//学校等级缓存
	schoolLevelCache = "";
	schoolLevelNameCache = "";
	//服务等级缓存
	serviceLevelCache = "";
	serviceLevelNameCache = "";
	
	//模糊搜索框
	$("#searchSelect").val(searchType);
	$("#searchText").val(keywords);
	//地区
	if(provinceName!=""){
		if(cityName==""){
			$("#regionShow").html(provinceName).css("color","red");
		}else{
			if(districtName==""){
				$("#regionShow").html(provinceName+"."+cityName).css("color","red");
			}else{
				$("#regionShow").html(provinceName+"."+cityName+"."+districtName).css("color","red");
			}
		}
		
	}else{
		$("#regionShow").html("不限").css("color","");
	}
	//学段
	if(periodName!=""){
		$("#periodShow").html(periodName).css("color","red");
	}else{
		$("#periodShow").html("不限").css("color","");
	}
	//产品
	if(productName!=""){
		$("#productShow").html(productName).css("color","red");
	}else{
		$("#productShow").html("不限").css("color","");
	}
	//状态
	if(statusParamName!=""){
		$("#statusParamShow").html(statusParamName).css("color","red");
	}else{
		$("#statusParamShow").html("不限").css("color","");
	}
	//学校等级
	if(schoolLevelName!=""){
		$("#schoolLevelShow").html(schoolLevelName).css("color","red");
	}else{
		$("#schoolLevelShow").html("不限").css("color","");
	}
	//服务等级
	if(serviceLevelName!=""){
		$("#serviceLevelShow").html(serviceLevelName).css("color","red");
	}else{
		$("#serviceLevelShow").html("不限").css("color","");
	}
	//客户类型
	if(customerTypeName!=""){
		$("#customerTypeShow").html(customerTypeName).css("color","red");
	}else{
		$("#customerTypeShow").html("不限").css("color","");
	}
	//回显
	BackShowAreaID();
	temporaryProvince = provinceName;
	temporaryCity = cityName;
	temporaryDistrict = districtName;
	
	productIdCache = productId;  
	productNameCache = productName;  
	customerTypeCache = customerType;
	customerTypeNameCache = customerTypeName;
	periodCache = periodId;
	periodNameCache = periodName;
	statusParamCache = statusParamId;
	statusParamNameCache = statusParamName;
	schoolLevelCache = schoolLevelId;
	schoolLevelNameCache = schoolLevelName;
	serviceLevelCache = serviceLevelId;
	serviceLevelNameCache = serviceLevelName;
});
//列表中的省市区点击事件
function clickProvince(obj){
	if($(obj).attr("pid")==""){
		return false;
	}
	pageNo=1;
	ProvinceIDCache = $(obj).attr("pid");
	ProvinceIDGlob = ProvinceIDCache;
	window.provinceName = $(obj).html();
	CityIDCache = 0;
	CityIDGlob = CityIDCache;
	window.cityName = "";
	DistrictIDCache = 0;
	DistrictIDGlob = DistrictIDCache;
	window.districtName = "";
	$(".container-list li:first-child a label").html($(obj).html()).css("color","red");
	
	//模糊搜索清空
	$("#searchSelect").val("id");
	$("#searchText").val("");
	searchType = "学校ID";
	keywords = "";
	window.schoolId = 0;
	window.schoolName = "";
	
	ifFuzzy=0;
	ifFirstQuery = true;
	$('#schoolList').html("");
	loadSchoolList();
}
function clickCity(obj){
	if($(obj).attr("cid")==""){
		return false;
	}
	pageNo=1;
	ProvinceIDCache = $(obj).prev().attr("pid");
	ProvinceIDGlob = ProvinceIDCache;
	window.provinceName = $(obj).prev().html();
	CityIDCache = $(obj).attr("cid");
	CityIDGlob = CityIDCache;
	window.cityName = $(obj).html();
	DistrictIDCache = 0;
	DistrictIDGlob = DistrictIDCache;
	window.districtName = "";
	$(".container-list li:first-child a label").html($(obj).prev().html()+"."+$(this).html()).css("color","red");
	//模糊搜索清空
	$("#searchSelect").val("id");
	$("#searchText").val("");
	searchType = "学校ID";
	keywords = "";
	window.schoolId = 0;
	window.schoolName = "";
	
	ifFuzzy=0;
	ifFirstQuery = true;
	$('#schoolList').html("");
	loadSchoolList();
}
function clickDistrict(obj){
	if($(obj).attr("did")==""){
		return false;
	}
	pageNo=1;
	ProvinceIDCache = $(obj).prev().prev().attr("pid");
	ProvinceIDGlob = ProvinceIDCache;
	window.provinceName = $(obj).prev().prev().html();
	CityIDCache = $(obj).prev().attr("cid");
	CityIDGlob = CityIDCache;
	window.cityName = $(obj).prev().html();
	DistrictIDCache = $(obj).attr("did");
	DistrictIDGlob = DistrictIDCache;
	window.districtName = $(obj).html();
	$(".container-list li:first-child a label").html($(obj).prev().prev().html()+"."+$(obj).prev().html()+"."+$(obj).html()).css("color","red");
	
	//模糊搜索清空
	$("#searchSelect").val("id");
	$("#searchText").val("");
	searchType = "学校ID";
	keywords = "";
	window.schoolId = 0;
	window.schoolName = "";
	
	ifFuzzy=0;
	ifFirstQuery = true;
	$('#schoolList').html("");
	loadSchoolList();
}