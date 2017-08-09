var ProvinceIDGlob=0;
var CityIDGlob=0;
var DistrictIDGlob=0;

ProvinceIDGlob=getUrlParam("provinceID")==null ? 0:getUrlParam("provinceID");
CityIDGlob=getUrlParam("cityID")==null ? 0:getUrlParam("cityID");
DistrictIDGlob=getUrlParam("districtID")==null ? 0:getUrlParam("districtID");

//var ifFirstIn=true;

//用来暂时存储省市回显内容的变量
var temporaryProvince="";
var temporaryCity="";
var temporaryDistrict="";

//用来缓存地区查询条件id的变量
var ProvinceIDCache=0;
var CityIDCache=0;
var DistrictIDCache=0;

//初始化样式的加载
function FirstInCSS(){
	$("#con").on("click", function() {
		$(".container-list li>div").hide();
		$(".tch2").show();
		$(".condition").show().animate({
			"left": "10%"
		}, 600);
	});
	$(".tch2").click(function() {
		time();
	});
	$(".container-list li:gt(0)>a").on("click", function() {
		$(this).next("div").toggle(500).parent().siblings().children("div").hide();
		$(".container-list li:eq(0)").children("div").hide(500);
	}).next("div").children("a").on("click", function() {
		var h = $(this).html();
		
		if(h=="不限"||h=="全部"){
			$(this).parent().prev("a").children("label").html(h).css("color","black");
		}else{
			$(this).parent().prev("a").children("label").not(".class_goback").html(h).css("color","red");
		}
		
		$(this).parent().hide(500);
	});
	$(".condition header a").on("click", function() {
		time();
	});
	$(".qingchu a").on("click", function() {
		$(".container-list li>a label").not('#productID_label').html("不限").css("color","black");
		
		$("#mySchools_label").html("全部").css("color","black");
		$("#canLink_label").html("全部").css("color","black");
		
		$("#exampleInputEmail2").val("");
		$(".container-list li>div").hide();
	});
	
	$(".container-list li:eq(0)>a").on("click", function() {
		//打开地区时刷新
		var ifhide=false;
		if($("#region-list").css("display")=='none'){
			ifhide=true;
		}
		
		$(this).next().toggle(500);
		$(".container-list li:gt(0)").children("div").hide(500);
		var h = $(".container-list li:first-child a label");
		
		//打开地区时刷新
		if(ifhide==true){
			selectAreaCount=0;
			province();	
		}
		
//		$(this).next().children("a").on("click", function() {
//			if (h.html() == "不限") {
//				h.html($(this).html()).css("color","red");
//			} 
//		})
	})

}

function time() {
	$(".condition").animate({
		"left": "100%"
	}, 300, function() {
		$(this).hide();
		$(".tch2").hide()
	});
}

//将暂存的地区id刷新到全局地区id变量
function RefreshAreaID(){
	ProvinceIDGlob = ProvinceIDCache;
	CityIDGlob = CityIDCache;
	DistrictIDGlob = DistrictIDCache;
}

//当页面回显的时候缓存数据和当前地区id一致
function BackShowAreaID(){
	ProvinceIDCache = ProvinceIDGlob;
	CityIDCache = CityIDGlob;
	DistrictIDCache = DistrictIDGlob;
}

//用来清空地区查询条件
function ClearAreaStatus(){
	ProvinceIDCache=0;
	CityIDCache=0;
	DistrictIDCache=0;
	temporaryProvince="";
	temporaryCity="";
	temporaryDistrict="";
	//选择层级计数归零
	selectAreaCount=0;
}

var ifBackAreaCondition=false;
//用来回显地区
function BackAreaCondition(){
	ClearAreaStatus();
	var h = $(".container-list li:first-child a label");
	h.html("不限").css("color","black"); 
	
	ifBackAreaCondition=true;
	province();
}

var selectAreaCount=0;
//地区点击后可以在上方显示的js
function RegionShowOnClick(areaCom,areaName){
	var h = $(".container-list li:first-child a label");
	
	if(selectAreaCount<=2){
		if (h.html() == "不限") {
			h.html(areaName).css("color","red");
		} else {
			h.html(h.html() + "." + areaName).css("color","red");
		}
	}
	++selectAreaCount;
	if(selectAreaCount>2){
		$(areaCom).parent().hide(500);
	}
	
	if(ifBackAreaCondition==true){
		SaveRegionCondition();
	}
}

//上一次当前页面查询条件选择后的反显
var regionConditionBack=null;
function SaveRegionCondition(){
	var h = $(".container-list li:first-child a label");
	regionConditionBack=h.html();
}

//查询省份列表
function province() {
	$("#region-list").children("a").remove();
	
	$.ajax({
		url : '/customer/GetProvince.json',
		dataType : 'json',
		type : 'post',
		data : {
		},
		success : function(data) {

			if(data.error!=null){
				$.alert("对不起，数据出现错误，错误码："+data.error);
				return;
			}
			var province = [];
			var dataList = data.Data;
			
			province.push("<a href='javascript:;' data_id='0'>不限</a>");
			
			for(var index in dataList) {
				province.push("<a href='javascript:;' data_id='"+dataList[index].id+"'>"+dataList[index].name+"</a>");
			}
			
			for (var i = 0; i < province.length; i++) {
				$("#region-list").append(province[i]);
			}
			
			$("#region-list a").on("click", function() {
				
				//打开地区时刷新
				var h = $(".container-list li:first-child a label");
				h.html("不限").css("color","black");
				
				if($(this).attr("data_id")!=0)
				{
					ClearAreaStatus();
					
					temporaryProvince = $(this).html();
					RegionShowOnClick($(this),temporaryProvince);
					city($(this).attr("data_id"));
				}else{
					$(".region").hide().children("h3").children().remove();
					ClearAreaStatus();
					var h = $(".container-list li:first-child a label");
					h.html("不限").css("color","black"); 
				}
			})
			
			if(ifBackAreaCondition==true){
				if(ProvinceIDGlob!=0){
					$("#region-list a[data_id='"+ProvinceIDGlob+"']").click();
				}else{
					ifBackAreaCondition=false;
				}
			}
			
			//第一次到达页面执行方法，回显地区条件
//			if(ifFirstIn==true){
//				ifFirstIn=false;
//				BackAreaCondition();
//			}
			
		}, 
      error: function (XMLHttpRequest, textStatus, errorThrown) { 
//          $.alert(errorThrown); 
      } 
	})

}

//查询城市列表
function city(ProvinceID) {
	ProvinceIDCache=ProvinceID;
	$("#region-list").children("a").remove();
	
	$.ajax({
		url : '/customer/GetCityByProvinceID.json',
		dataType : 'json',
		type : 'post',
		data : {
			ProvinceID:ProvinceID
		},
		success : function(data) {

			if(data.error!=null){
				$.alert("对不起，数据出现错误，错误码："+data.error);
				return;
			}
			var city = [];
			var dataList = data.Data;
			
			city.push("<a href='javascript:;' data_id='0' class='class_goback'>后退</a>");
			
			for(var index in dataList) {
				city.push("<a href='javascript:;' data_id='"+dataList[index].id+"'>"+dataList[index].name+"</a>");
			}
			
			for (var i = 0; i < city.length; i++) {
				$("#region-list").append(city[i]);
			}
			
			$("#region-list a").on("click", function() {
				if($(this).attr("data_id")!=0){
					temporaryCity = $(this).html();
					RegionShowOnClick($(this),temporaryCity);
					area($(this).attr("data_id"));
				}else{
					ClearAreaStatus();
					var h = $(".container-list li:first-child a label");
					h.html("不限").css("color","black");
					province();
				}
			})
			
			if(ifBackAreaCondition==true){
				if(CityIDGlob!=0){
					$("#region-list a[data_id='"+CityIDGlob+"']").click();
				}else{
					ifBackAreaCondition=false;
				}
			}
		}, 
      error: function (XMLHttpRequest, textStatus, errorThrown) { 
//          $.alert(errorThrown); 
      } 
	})
	
}

//查询区县列表
function area(CityID) {
	CityIDCache=CityID;
	$("#region-list").children("a").remove();
	
	$.ajax({
		url : '/customer/GetDistrictByCityID.json',
		dataType : 'json',
		type : 'post',
		data : {
			CityID:CityID
		},
		success : function(data) {

			if(data.error!=null){
				$.alert("对不起，数据出现错误，错误码："+data.error);
				return;
			}
			var area = [];
			var dataList = data.Data;
			
			area.push("<a href='javascript:;' data_id='0' class='class_goback'>后退</a>");
			
			for(var index in dataList) {
				area.push("<a href='javascript:;' data_id='"+dataList[index].id+"'>"+dataList[index].name+"</a>");
			}
			
			for (var i = 0; i < area.length; i++) {
				$("#region-list").append(area[i]);
			}
			
			$("#region-list a").on("click", function() {
				if($(this).attr("data_id")!=0){
					temporaryDistrict=$(this).html();
					DistrictIDCache = $(this).attr("data_id");
					RegionShowOnClick($(this),temporaryDistrict);
					
					RefreshAreaID();
				}else{
					CityIDCache=0;
					DistrictIDCache=0;
					temporaryCity="";
					temporaryDistrict="";
					selectAreaCount=1;
					city(ProvinceIDCache);
					var h = $(".container-list li:first-child a label");
					h.html(temporaryProvince).css("color","red");
				}
			})
			
			if(ifBackAreaCondition==true){
				if(DistrictIDGlob!=0){
					$("#region-list a[data_id='"+DistrictIDGlob+"']").click();
				}
				ifBackAreaCondition=false;
			}
		}, 
      error: function (XMLHttpRequest, textStatus, errorThrown) { 
//          $.alert(errorThrown); 
      } 
	})
	
}