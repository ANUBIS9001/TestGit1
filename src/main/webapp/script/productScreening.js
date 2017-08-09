var myHistory=0;
function JudgeHistory(){
if (document.all.isHistoryPage.value == "false") {
	document.all.isHistoryPage.value = "true";
} else {
	myHistory=1;
}
}

$("#LinkHistory").click(function(){
	GoBack();
});

var pageNo=1;
var pageCount=0;

//产品入口带的产品参数
var productIDGlob=getUrlParam("productId");
var productNameGlob=getUrlParam("productName");

//用来比对的当前用户sellerid
var mySellerId=null;

//必传的当前sellerid
var loginID=null;

//防止地区查询触发滚动的变量
var ifFirstQuery=true;

//跳转的判断
function JumpUrl(){
var source=getUrlParam("source");
if(source=="useDetails"&&0==myHistory){
	$('#LinkHistory span').html("订单");//订单详情
	
	PushBackUrl(getUrlParam("pageUrl")+decodeURIComponent(getUrlParam("uriParams")),"订单");
}else if(source=="customerScreening"&&0==myHistory){
	$('#LinkHistory span').html("客户");//客户列表
	
	PushBackUrl('/pages/customerScreening.html?'+decodeURIComponent(getUrlParam("paramList")),"客户");
}else if(source=="productInformation"&&0==myHistory){
	var backProInfoUrl='/pages/productInformation.html?productId='+productIDGlob+'&productName='+productNameGlob;
	$('#LinkHistory span').html("详情");
	
	PushBackUrl(backProInfoUrl+decodeURIComponent(getUrlParam("uriParams")),"详情");
}else if(source=="product"&&0==myHistory){
	$('#LinkHistory span').html("分类");
	$("#LinkHistory").attr("href","javascript:void(0);");
	PushBackUrl("/pages/product.html","分类");
}else {
	//没有条件的是回退的
	$('#LinkHistory span').html(GetBackLabel());
}
}

$(function() {
	//后退功能
	JudgeHistory();
	JumpUrl();
	
	//将地区回显并保持选定的状态
	BackAreaCondition();
	
	FirstInCSS();
	
	GetSellerInfo();
	
	$('#pName').html(productNameGlob);
	
	$('#tbody').height($(window).height()-($("header").height()+$(".header").height()+10+$(".nav-header").height()));
	$('#loadinggif').height($(window).height()-($("header").height()+$(".header").height()+10+$(".nav-header").height()));
	
	//新的翻页代码
	var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
    var nScrollTop = 0;   //滚动到的当前位置
    var nDivHight = $("#tbody").height();
    $("#tbody").scroll(function(){
      nScrollHight = $(this)[0].scrollHeight;
      nScrollTop = $(this)[0].scrollTop;
      if(nScrollTop + nDivHight >= nScrollHight){
    	  if(ifFirstQuery==false)
    	  {
	          pageNo=pageNo+1;
			  if(pageNo<=pageCount){
					GetSchoolListSelective();
			  }
    	  }
      }
    });
})

var stagesBack=null;
var productIDBack=null;
var schoolTypeBack=null;
var statusIDBack=null;
var contractTypeBack=null;
var schoolLevelBack=null;
var isLockBack=null;
var sellerIdBack=null;
var canLinkBack=null;

var schoolIDBack=null;
var schoolNameBack=null;
var searchTypeBack=null;

var firstBackCondition=true;
//用来反显参数和获得返回参数的方法--增加没有url参数的判断
function BackCondition(){
	
	//新增的schoolID和schoolName参数
	var schoolID = schoolIDBack==null&&firstBackCondition==true?getUrlParam("schoolID"):schoolIDBack;
	if(schoolID!=null&&schoolID!="null"&&schoolID!=0){
		$("#exampleInputEmail2").val(schoolID);
	}
	var schoolName = schoolNameBack==null&&firstBackCondition==true?getUrlParam("schoolName"):schoolNameBack;
	if(schoolName!=null&&schoolName!="null"){
		$("#exampleInputEmail2").val(schoolName);
	}
	
	var searchType = searchTypeBack==null&&firstBackCondition==true?getUrlParam("searchType"):searchTypeBack;
	if(searchType=="id"){
		$(".sousuo select  option[value='id']").prop("selected", true); 
	}else if(searchType=="name"){
		$(".sousuo select  option[value='name']").prop("selected", true); 
	}
	
	
	var stages = stagesBack==null&&firstBackCondition==true?getUrlParam("stages"):stagesBack;
	if(stages!=null&&stages!="null"&&stages!=""){
		$("#stages a").removeClass("on"); 
		$("#stages a[data_stages='"+stages+"']").attr("class","on"); 
		$("#stages_label").html($("#stages a[data_stages='"+stages+"']").html()).css("color","red");
	}else{
		$("#stages a").removeClass("on"); 
		$("#stages a[data_stages='"+stages+"']").attr("class","on");
		$("#stages_label").html("不限").css("color","black");
	}
	
	var productID = productIDBack==null&&firstBackCondition==true?getUrlParam("productId"):productIDBack;
	if(productID!=null&&productID!="null"){
		$("#productID a").removeClass("on"); 
		$("#productID a[data_productID='"+productID+"']").attr("class","on"); 
		$("#productID_label").html($("#productID a[data_productID='"+productID+"']").html()).css("color","red");
	}
	
	var schoolType = schoolTypeBack==null&&firstBackCondition==true?getUrlParam("schoolType"):schoolTypeBack;
	if(schoolType!=null&&schoolType!="null"&&schoolType!=""){
		$("#schoolType a").removeClass("on"); 
		$("#schoolType a[data_schoolType='"+schoolType+"']").attr("class","on"); 
		$("#schoolType_label").html($("#schoolType a[data_schoolType='"+schoolType+"']").html()).css("color","red");
	}else{
		$("#schoolType a").removeClass("on"); 
		$("#schoolType a[data_schoolType='"+schoolType+"']").attr("class","on"); 
		$("#schoolType_label").html("不限").css("color","black");
	}
	
	var statusID = statusIDBack==null&&firstBackCondition==true?getUrlParam("statusID"):statusIDBack;
	if(statusID!=null&&statusID!="null"&&statusID!=""){
		$("#statusID a").removeClass("on"); 
		$("#statusID a[data_statusID='"+statusID+"']").attr("class","on");  
		$("#statusID_label").html($("#statusID a[data_statusID='"+statusID+"']").html()).css("color","red");
	}else{
		$("#statusID a").removeClass("on"); 
		$("#statusID a[data_statusID='"+statusID+"']").attr("class","on");  
		$("#statusID_label").html("不限").css("color","black");
	}
	
	var contractType = contractTypeBack==null&&firstBackCondition==true?getUrlParam("contractType"):contractTypeBack;
	if(contractType!=null&&contractType!="null"){
		$("#contractType a").removeClass("on"); 
		$("#contractType a[data_contractType='"+contractType+"']").attr("class","on"); 
		$("#contractType_label").html($("#contractType a[data_contractType='"+contractType+"']").html()).css("color","red");
	}else{
		$("#contractType a").removeClass("on"); 
		$("#contractType a[data_contractType='"+contractType+"']").attr("class","on"); 
		$("#contractType_label").html("不限").css("color","black");
	}
	
	var schoolLevel = schoolLevelBack==null&&firstBackCondition==true?getUrlParam("schoolLevel"):schoolLevelBack;
	if(schoolLevel!=null&&schoolLevel!="null"&&schoolLevel!=""){
		$("#schoolLevel a").removeClass("on"); 
		$("#schoolLevel a[data_schoolLevel='"+schoolLevel+"']").attr("class","on"); 
		$("#schoolLevel_label").html($("#schoolLevel a[data_schoolLevel='"+schoolLevel+"']").html()).css("color","red");
	}else{
		$("#schoolLevel a").removeClass("on"); 
		$("#schoolLevel a[data_schoolLevel='"+schoolLevel+"']").attr("class","on"); 
		$("#schoolLevel_label").html("不限").css("color","black");
	}
	
	var isLock = isLockBack==null&&firstBackCondition==true?getUrlParam("isLock"):isLockBack;
	if(isLock!=null&&isLock!="null"){
		$("#isLock a").removeClass("on"); 
		$("#isLock a[data_isLock='"+isLock+"']").attr("class","on");
		$("#isLock_label").html($("#isLock a[data_isLock='"+isLock+"']").html()).css("color","red");
	}else{
		$("#isLock a").removeClass("on"); 
		$("#isLock a[data_isLock='"+isLock+"']").attr("class","on");
		$("#isLock_label").html("不限").css("color","black");
	}
	
	var sellerIdTemp = sellerIdBack==null&&firstBackCondition==true?getUrlParam("sellerId"):sellerIdBack;
	if(sellerIdTemp!=null&&sellerIdTemp!="null"){
		//还需要判断是否是当前的sellerid
		if(sellerIdTemp==mySellerId){
			$("#mySchools a").removeClass("on"); 
			$("#mySchools a[data_my='1']").attr("class","on");
			$("#mySchools_label").html($("#mySchools a[data_my='1']").html()).css("color","red");
		}
	}else{
		$("#mySchools a").removeClass("on"); 
		$("#mySchools a[data_my='0']").attr("class","on");
		$("#mySchools_label").html("全部").css("color","black");
	}
	
	var canLinkTemp = canLinkBack==null&&firstBackCondition==true?getUrlParam("canLink"):canLinkBack;
	if(canLinkTemp!=null&&canLinkTemp!="null"){
		$("#canLink a").removeClass("on"); 
		$("#canLink a[data_canLink='"+canLinkTemp+"']").attr("class","on"); 
		$("#canLink_label").html($("#canLink a[data_canLink='"+canLinkTemp+"']").html());
		if(canLinkTemp==1){
			$("#canLink_label").css("color","red");
		}else{
			$("#canLink_label").css("color","black");
		}
	}else{
		$("#canLink a").removeClass("on"); 
		$("#canLink a[data_canLink='"+canLinkTemp+"']").attr("class","on"); 
		$("#canLink_label").html($("#canLink a[data_canLink='1']").html());
		$("#canLink_label").css("color","red");
	}
	
	BackShowAreaID();
	
	var h = $(".container-list li:first-child a label");
	if(regionConditionBack==null){
		h.html("不限");
	}else{
		h.html(regionConditionBack);
		if(regionConditionBack=="不限"){
			h.css("color","black");
		}else{
			h.css("color","red");
		}
	}
	
	firstBackCondition=false;
//	$('#tbody').html("");
//	GetSchoolListSelective();
}

//查询产品劣列表
function getAllProduct(){
	$('#productID').html("");
	
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
			var str = '';
			var dataList = data;
			for(var index in dataList) {
				str +='<a href="javascript:;" data_productID="'+dataList[index].id+'" onclick="setProductInfo(\''+dataList[index].id+'\',\''+dataList[index].name+'\')">'+dataList[index].name+'</a>';
			}
			$('#productID').append(str);
//			BackAreaCondition();
			myFilterCSS();
			//先调用回显和条件返回的。
			BackCondition();
			Screening();
		}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
            //$.alert(errorThrown); 
        } 
	})
}

//将当前页面查询的产品编号和名称进行修改
function setProductInfo(id,name){
	productIDGlob=id;
	productNameGlob=name;
}

//模糊搜索相关
$(document).ready(function() {
	$("#ssou").on("click", function() {
		$(this).next("ul").show();
	});
	$("#ssou").next("ul").find("a").click(function(){
		var val=$(this).html();
		$("#ssou").val(val).html(val+'<span class="glyphicon glyphicon-chevron-down"></span>').next("ul").hide();
	})
	$(document).mouseup(function(e) {
		var _con = $('#ssou').next("ul");
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			_con.hide();
		}
	});
});

//从后台取得sellerID的方法
function GetSellerInfo(){
	$.ajax({
		url:"/product/GetSellerInfo.json",
		dataType:'json',
		type:'POST',
		data:{
		},
		success:function(data){
			if(data.error!=null){
				$.alert("对不起，数据出现错误："+data.error);
				return;
			}
			mySellerId = data.sellerId;
			
			loginID = data.sellerId;
			
			getAllProduct();
		}
	});
}

//清空地区筛选条件用
function ClearCondition(){
	ProvinceIDGlob=0;
	CityIDGlob=0;
	DistrictIDGlob=0;
}

//用筛选页面要清空筛选选单的参数
function Screening(){
	RefreshAreaID();
	
	pageNo=1;
	$('#tbody').html("");
	ifFirstQuery=true;
	GetSchoolListSelective();
}

//按照筛选条件查询
function GetSchoolListSelective() {
	$('#loadinggif').show();
	
	var stages = typeof($('#stages').find(".on").attr("data_stages")) == "undefined" ? null:$('#stages').find(".on").attr("data_stages");
	var productID = typeof($('#productID').find(".on").attr("data_productID")) == "undefined" ? null:$('#productID').find(".on").attr("data_productID");
	var schoolType = typeof($('#schoolType').find(".on").attr("data_schoolType")) == "undefined" ? null:$('#schoolType').find(".on").attr("data_schoolType");
	var statusID = typeof($('#statusID').find(".on").attr("data_statusID")) == "undefined" ? null:$('#statusID').find(".on").attr("data_statusID");
	var contractType = typeof($('#contractType').find(".on").attr("data_contractType")) == "undefined" ? null:$('#contractType').find(".on").attr("data_contractType");
	var schoolLevel = typeof($('#schoolLevel').find(".on").attr("data_schoolLevel")) == "undefined" ? null:$('#schoolLevel').find(".on").attr("data_schoolLevel");
	var isLock = typeof($('#isLock').find(".on").attr("data_isLock")) == "undefined" ? null:$('#isLock').find(".on").attr("data_isLock");
	
	var sellerId = $('#mySchools').find(".on").attr("data_my") == "0" ? null:mySellerId;
	var canLink = $('#canLink').find(".on").attr("data_canLink") == "0" ? 0:1;
	
	if(productIDGlob!=null){
		productID = productIDGlob;
	}
	
	//新增条件
	var schoolID = 0;
	var schoolName =null;
	if($("#exampleInputEmail2").val()!=null&&$("#exampleInputEmail2").val().trim()!=""){
		if($(".sousuo select").val()=="id"){
			schoolID=$("#exampleInputEmail2").val().trim();
			if(!ifNumByReg(schoolID)){
				$.alert("请输入正确的学校ID");
				$('#pName').html(productNameGlob+"[0个]");
				$('#loadinggif').hide();
				return;
			}
		}else{
			schoolName=$("#exampleInputEmail2").val().trim();
		}
	}
	
	schoolIDBack=schoolID;
	schoolNameBack=schoolName;
	searchTypeBack=$(".sousuo select").val();
	
	//用来在收起页签的时候将没有确认查询的条件去掉
	stagesBack=stages;
	productIDBack=productID;
	schoolTypeBack=schoolType;
	statusIDBack=statusID;
	contractTypeBack=contractType;
	schoolLevelBack=schoolLevel;
	isLockBack=isLock;
	sellerIdBack=sellerId;
	canLinkBack=canLink;
	SaveRegionCondition();
	
	//用来拼接返回的参数,由于在标签中使用要注意引号导致的标签不闭合问题
	var pageUrl = '/pages/productScreening.html';
	var uriParams = '?productId='+productIDGlob+'%26productName='+productNameGlob+'%26stages='+stages+'%26schoolType='+schoolType+'%26statusID='+statusID+'%26contractType='+contractType
	                +'%26schoolLevel='+schoolLevel+'%26isLock='+isLock+'%26canLink='+canLink+"%26sellerId="+sellerId  +"%26provinceID="+ProvinceIDGlob  +"%26cityID="+CityIDGlob  +"%26districtID="+DistrictIDGlob
	                +"%26schoolID="+schoolID + "%26schoolName="+schoolName + "%26searchType="+$(".sousuo select").val();
	
	$.ajax({
		url : '/customer/getSchoolListBySearch.json',
		dataType : 'json',
		type : 'post',
		data : {
			sellerID : sellerId,
			stages : stages,
			productID : productID, 
			schoolType : schoolType,
			statusID : statusID, 
			contractType : contractType,
			schoolLevel : schoolLevel, 
			isLock : isLock, 
			provinceID : ProvinceIDGlob,
			cityID : CityIDGlob,
			districtID : DistrictIDGlob,
			page : pageNo,
			pageSize : 20,
			canLink: canLink,
			
			schoolID : schoolID,
			schoolName : schoolName,
			loginID : loginID
		},
		success : function(data) {
			$('#loadinggif').hide();
			
			if(data.Data==null){
				$.alert("没有查询到结果！");
				$('#pName').html(productNameGlob+"[0个]");
				return;
			}
			
			pageCount = data.Data.PageCount;
			
			if(data.error!=null){
				$.alert("对不起，数据出现错误，错误码："+data.error);
				$('#pName').html(productNameGlob+"[0个]");
				return;
			}
			
			var dataList = data.Data.List;
			for(var index in dataList) {
				var str = '';
				
				var ProvinceName="";
				var CityName="";
				var DistrictName="";
				
				var FullSchoolName="【";
				if(dataList[index].ProvinceName!=null && dataList[index].ProvinceName!="null"){
					FullSchoolName+=dataList[index].ProvinceName;
					ProvinceName=dataList[index].ProvinceName;
				}
				if(dataList[index].CityName!=null && dataList[index].CityName!="null"){
					FullSchoolName+='.'+dataList[index].CityName;
					CityName=dataList[index].CityName;
				}
				if(dataList[index].DistrictName!=null && dataList[index].DistrictName!="null"){
					FullSchoolName+='.'+dataList[index].DistrictName;
					DistrictName=dataList[index].DistrictName;
				}
				FullSchoolName+='】';
				
				var InformationUrl= 'javascript:window.location.href=\'/pages/productInformation.html?schoolId='+dataList[index].SchoolID
									+'&schoolName='+dataList[index].SchoolName+'&productId='+productIDGlob+'&productName='+productNameGlob+'&ifLock='+dataList[index].IsLocked
									+'&Status='+dataList[index].Status
									+"&source=productScreening"
									+"&pageUrl="+pageUrl+"&uriParams="+encodeURIComponent(uriParams)+' \'';
				
				var tipClass = "";
				if(mySellerId==dataList[index].SellerID||dataList[index].SellerID==null||canLink==1)
				{
					tipClass = "shengzhdian";
				}else{
					tipClass = "daili";
				}
				
				var colorStr="";
				var iconStr="";
				if(dataList[index].IsHave==1){
					iconStr +='<kbd class="'+tipClass+'">保</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].CreatorProtect==1){
					iconStr +='<kbd class="'+tipClass+'">保护</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].IsAgent==true){
					iconStr +='<kbd class="'+tipClass+'">代</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].IsLocked==1){
					iconStr +='<kbd class="'+tipClass+'">锁</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
								
				if(dataList[index].SchoolLevel!=null&&dataList[index].SchoolLevel!="null"){
					var t=dataList[index].SchoolLevel.split(",");
					for( var indexLevel in t){
						if(t[indexLevel]=="3"){
							iconStr +='<kbd class="shengzhdian">省重点</kbd>&nbsp;';
//							if(tipClass == "daili"){
//								InformationUrl="javascript:$.alert('已被占用');";
//								colorStr='style="color:#999;"';
//							}
						}
						if(t[indexLevel]=="5"){
							iconStr +='<kbd class="baiqiang">百强校</kbd>&nbsp;';
//							if(tipClass == "daili"){
//								InformationUrl="javascript:$.alert('已被占用');";
//								colorStr='style="color:#999;"';
//							}
						}
					}
				}
				
				if(dataList[index].Status==5){
					iconStr +='<kbd class="'+tipClass+'">试用</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].Status==6){
					iconStr +='<kbd class="'+tipClass+'">使用</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].Status==3){//待试用
					iconStr +='<kbd class="'+tipClass+'">试用</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].Status==4){//待使用
					iconStr +='<kbd class="'+tipClass+'">使用</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].IsShortProtect==1){
					iconStr +='<kbd class="'+tipClass+'">短保</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].ProtectType>0){
					iconStr +='<kbd class="'+tipClass+'">名校分配</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				if(dataList[index].BuffDays>0&&dataList[index].Status==-1){
					iconStr +='<kbd class="'+tipClass+'">缓</kbd>&nbsp;';
					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('已被占用');";
						colorStr='style="color:#999;"';
					}
				}
				//判断一贯制是否可联系的代码
				if(dataList[index].ConsistentLink==false){
//					if(tipClass == "daili"){
						InformationUrl="javascript:$.alert('该学校是他人一贯制学校');";
						colorStr='style="color:#999;"';
//					}
				}
				
				str +='<li><a><label '+colorStr+' onclick="'+InformationUrl+'" data-toggle="popover" data-placement="bottom" data-content="已被占用">'+dataList[index].SchoolName+'</label><span id="AttentionStar'+dataList[index].SchoolID+'" data_id="'+dataList[index].SchoolID+'" class="glyphicon glyphicon-star cl-guanzhu pull-right"  style="padding-right:5%;color:#999;"></span></a>';
				str +='<div><div><span>['+dataList[index].SchoolID+']</span>';

				if(dataList[index].ProvinceName!=null && dataList[index].ProvinceName!="null"){
					str+='<a href="#" onclick="javascript:getSchoolListByPosition('+dataList[index].ProvinceID+',0,0);">'+dataList[index].ProvinceName+'</a>';
				}
				if(dataList[index].CityName!=null && dataList[index].CityName!="null"){
					str+='<a href="#" onclick="javascript:getSchoolListByPosition('+dataList[index].ProvinceID+','+dataList[index].CityID+',0);">'+dataList[index].CityName+'</a>';
				}
				if(dataList[index].DistrictName!=null && dataList[index].DistrictName!="null"){
					str+='<a href="#" onclick="javascript:getSchoolListByPosition('+dataList[index].ProvinceID+','+dataList[index].CityID+','+dataList[index].DistrictID+');">'+dataList[index].DistrictName+'</a>';
				}
				str +='</div><div>';
				
				str += iconStr;
				
				str +='</div></div></li>';
				
				$('#tbody').append(str);
				//刷新关注信息
				MyAttentionSchool($('#AttentionStar'+dataList[index].SchoolID),dataList[index].SchoolID,productIDGlob,mySellerId,dataList[index].SchoolName);
				
				$('#AttentionStar'+dataList[index].SchoolID).on("click", function() {
					var color = $(this).css("color");
					if (color == "rgb(235, 147, 22)") {
						ModifyAttention("del",$(this).attr("data_id"),productIDGlob,mySellerId);
						$(this).css("color", "#999");
					} else {
						ModifyAttention("add",$(this).attr("data_id"),productIDGlob,mySellerId);
						$(this).css("color", "#EB9316");
					}
				});
			}
			
			if(data.Data.RowCount!=null){
				$('#pName').html(productNameGlob+"["+data.Data.RowCount+"个]");
			}
			
			
			ifFirstQuery=false;
		}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
//            $.alert(errorThrown); 
        } 
	})
}

//用来修改关注状态
function ModifyAttention(type,schoolIdAttention,productIdAttention,sellerIdAttention){
	$.ajax({
		url:"/product/ModifyAttention.json",
		dataType:'json',
		type:'POST',
		data:{
			schoolId : schoolIdAttention,
			productId : productIdAttention,
			sellerId : sellerIdAttention,
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

//用来显示关注状况
function MyAttentionSchool(star,schoolIdAttention,productIdAttention,sellerIdAttention,SchoolNameAttention){
	$.ajax({
		url:"/product/MyAttentionSchool.json",
		dataType:'json',
		type:'POST',
		data:{
			schoolId : schoolIdAttention,
			productId : productIdAttention,
			sellerId : sellerIdAttention,
			schoolName : SchoolNameAttention
		},
		success:function(data){
			if(data.error!=null){
				$(star).css("color", "#999");
				return;
			}
			
			if(data.Data.List==null){
				$(star).css("color", "#999");
			}else{
				$(star).css("color", "#EB9316");
			}
		}
	});
}

//筛选条件的变化，包括新增加的产品，要在产品加载后调用
function myFilterCSS(){
	$(".container-list div").children("a").on("click", function() {
		$(this).addClass("on").siblings().removeClass("on");
	});
	
	$("#productID").children("a").on("click", function() {
		var h = $(this).html();
		$(this).parent().prev("a").children("label").html(h).css("color", "red");
		$(this).parent().hide(500);
	});
	
	//用来折叠滑动页面时刷新回显条件
	$(".tch2").on("click", function() {
		BackCondition();
	});
}

//清空所有的呃查询条件
function ClearAllCondition(){
	province();
	
	ClearAreaStatus();
	RefreshAreaID();
	
	$("#stages a").removeClass("on"); 
	$("#schoolType a").removeClass("on"); 
	$("#statusID a").removeClass("on"); 
	$("#contractType a").removeClass("on"); 
	$("#schoolLevel a").removeClass("on"); 
	$("#isLock a").removeClass("on"); 
	
	$("#mySchools a").removeClass("on"); 
	$("#mySchools a[data_my='0']").attr("class","on");
	$("#canLink a").removeClass("on");
	$("#canLink a[data_canLink='0']").attr("class","on"); 
	
	$("#exampleInputEmail2").val("");
	$(".sousuo select  option[value='id']").prop("selected", true); 
}


//点击地区之后的查询
function getSchoolListByPosition(pid,cid,did){
	ProvinceIDCache=pid;
	CityIDCache=cid;
	DistrictIDCache=did;
	
	Screening();
	BackAreaCondition();
}
