var pageNo=1;
var pageCount=0;
var stagesTemp=getUrlParam("stages");
var stagesNameTemp=getUrlParam("stagesName");
var schoolLevelTemp=getUrlParam("schoolLevel");
var schoolLevelNameTemp=getUrlParam("schoolLevelName");
var schoolTypeTemp=getUrlParam("schoolType");
var schoolTypeNameTemp=getUrlParam("schoolTypeName");
var stagesGlob=null;
var stagesNameGlob='';
var schoolLevelGlob=null;
var schoolLevelNameGlob='';
var schoolTypeGlob=null;
var schoolTypeNameGlob='';
var isPageUp=0;
var positionNameTemp='';
var mySellerId=null;
var statusID='';
var statusName='';
//产品名称和id
var productId=null;
var productName=null;
var statusNameTemp='';
//根据Id和名字查询的参数
var schoolNameS='';
var schoolIDs=0;
var searchType=0;
//判断是否是有产品参数
var isProduct=false;
$(function(){
	//将地区回显并保持选定的状态
	BackAreaCondition();
	
	FirstInCSS();
	
	getAllProduct();
	GetSellerInfo();
	$('#tbody').height($(window).height()-($(".header").height()+60+$(".nav-header").height()));
	$("#confirm").click(function(){
		
		
		RefreshAreaID();
		
		pageNo=1;
		$('#tbody').html("");
		
		GetCustomerListSelective();
	});

	if(getUrlParam('stagesName')!='' &&getUrlParam('stagesName')!=null){
		var h = $("#sstages a label");
		if(getUrlParam('stagesName')=="不限"){
			h.html(getUrlParam('stagesName')).css('color','black');
		}else{
			h.html(getUrlParam('stagesName')).css('color','red');
		}
	}
	if(getUrlParam('schoolLevelName')!='' &&getUrlParam('schoolLevelName')!=null){
		var h = $("#sschoolLevel a label");
		if(getUrlParam('schoolLevelName')=="不限"){
			h.html(getUrlParam('schoolLevelName')).css('color','black');
		}else{
			h.html(getUrlParam('schoolLevelName')).css('color','red');
		}
	}
	if(getUrlParam('schoolTypeName')!='' &&getUrlParam('schoolTypeName')!=null){
		var h = $("#sschoolType a label");
		if(getUrlParam('schoolTypeName')=="不限"){
			h.html(getUrlParam('schoolTypeName')).css('color','black');
		}else{
			h.html(getUrlParam('schoolTypeName')).css('color','red');
		}
	}
	if(getUrlParam('searchType')!='' &&getUrlParam('searchType')!=null){
		var type=getUrlParam('searchType');
		if(type==1){
			$("#exampleInputEmail2").val(getUrlParam('schoolIDs'));
			schoolIDs=parseInt(getUrlParam('schoolIDs'));
		}else if(type==2){
			$("#exampleInputEmail2").val(getUrlParam('schoolNameS'));
			schoolNameS=getUrlParam('schoolNameS');
			$(".sousuo select  option[value='name']").attr("selected", true); 
		}
	}
	var nScrollHight = 0; //滚动距离总长(注意不是滚动条的长度)
    var nScrollTop = 0;   //滚动到的当前位置
    var nDivHight = $("#tbody").height();
    $("#tbody").scroll(function(){
      nScrollHight = $(this)[0].scrollHeight;
      nScrollTop = $(this)[0].scrollTop;
      if(nScrollTop + nDivHight >= nScrollHight){
	          pageNo=pageNo+1;
			  if(pageNo<=pageCount){
				if(isPageUp==0){
					GetCustomerListSelective();
				}
			  }
      }
    });
});

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
			if(getUrlParam("type")=="1"){
				getSearchResult();
				isPageUp=1;
			}else{
				GetCustomerListSelective();
			}
		}
	});
}
//根据学段过滤学校
function getSchoolListByStages(stages1,stages2){
	stagesGlob=stages1;
	stagesNameGlob=stages2;
}

//按照学校等级过滤
function getSchoolListBySchoolLevel(SchoolLevel1,schoolLevel2){
	schoolLevelGlob=SchoolLevel1;
	schoolLevelNameGlob=schoolLevel2;
}
//按照学校类别过滤
function getSchoolListBySchoolType(schoolType1,schoolType2){
	schoolTypeGlob=schoolType1;
	schoolTypeNameGlob=schoolType2;
}
function getStatusId(statusId,statusN){
	statusID=statusId;
	statusNameTemp=statusN;
}
function getProductInfo(id,name){
	productId=id;
	productName=name;
	isProduct=true;
}
//点击地区变化
function getSchoolListByPosition(pid,cid,did,obj,index){
	ProvinceIDGlob=pid;
	CityIDGlob=cid;
	DistrictIDGlob=did;
	productId=null;
	statusID='';
	var Str="";
	switch(index)
	{
	 case 0:Str =$(obj).html(); break;
	 case 1: Str = $(obj).prev().html()+'.'+$(obj).html(); break;
	 case 2: Str = $(obj).prev().prev().html()+'.'+$(obj).prev().html()+'.'+$(obj).html(); break;
     default: status1 = "不限"; break;
	}
//	alert(Str);
	var h = $(".container-list li:first-child a label");
	h.html(Str).css("color","red");
	positionNameTemp=Str;
	$("#tbody").html("");
	GetCustomerListSelective();
	
	BackAreaCondition();
}

//获得产品列表
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
				str +='<a href="javascript:;" data_productID="'+dataList[index].id+'" onclick="getProductInfo(\''+dataList[index].id+'\',\''+dataList[index].name+'\')">'+dataList[index].name+'</a>';
			}
			$('#productID').append(str);
			$("#productID").children("a").on("click", function() {
				var h = $(this).html();
				if(h=="不限"){
					$(this).parent().prev("a").children("label").html(h).css('color','black');
				}else{
					$(this).parent().prev("a").children("label").html(h).css('color','red');
				}
				$(this).parent().hide(500);
			});
		}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
        } 
	})
}
var stagesName='';
var schoolLevelName='';
var schoolTypeName='';
function GetCustomerListSelective(){
	$('#loadinggif').show();
	isPageUp=0;
	var typeWord=$(".sousuo select").val().trim();
	var keyWord=$("#exampleInputEmail2").val().trim();
	if(typeWord=="id"&&keyWord!=""){
		if(keyWord.match('^[0-9]*$')!=null){
			schoolIDs=keyWord;
			searchType=1;
		}else{
			$(".text-center h1").html("客户列表[0个]");
			$.alert('请输入正确的学校ID');
			$('#loadinggif').hide();
			return;
		}
	}else if(typeWord=="name"&&keyWord!=''){
		schoolNameS=keyWord;
		searchType=2;
	}else if(keyWord==""){
		schoolIDs=0;
		schoolNameS='';
	}
	if(stagesGlob==null && stagesTemp!=null){
		stages=stagesTemp;
		stagesName=stagesNameTemp;
	}else{
		stages=stagesGlob;
		stagesName=stagesNameGlob;
	}
	if(schoolLevelGlob==null && schoolLevelTemp!=null){
		schoolLevel=schoolLevelTemp;
		schoolLevelName=schoolLevelNameTemp;
	}else{
		schoolLevel=schoolLevelGlob;
		schoolLevelName=schoolLevelNameGlob;
	}
	if(schoolTypeGlob==null && schoolTypeTemp!=null){
		schoolType=schoolTypeTemp;
		schoolTypeName=schoolTypeNameTemp;
	}else{
		schoolType=schoolTypeGlob;
		schoolTypeName=schoolTypeNameGlob;
	}
	statusName=statusNameTemp;
	var paramList='%26stages='+stages+'%26schoolLevel='+schoolLevel+'%26schoolType='+schoolType
	+'%26provinceID='+ProvinceIDGlob+'%26cityID='+CityIDGlob+'%26districtID='+DistrictIDGlob+'%26positionName='+positionNameTemp
	+'%26schoolLevelName='+schoolLevelName+'%26stagesName='+stagesName+'%26schoolTypeName='+schoolTypeName
	+'%26productName='+productName+'%26statusName='+statusName+'%26searchType='+searchType
	+'%26schoolIDs='+schoolIDs+'%26schoolNameS='+schoolNameS;
	if(isProduct==true){
		window.location.href="/pages/productScreening.html?source=customerScreening&productId="+productId+"&stages="+stages+"&productName="+productName
			+'&provinceID='+ProvinceIDGlob+'&cityID='+CityIDGlob+'&districtID='+DistrictIDGlob
			+"&schoolLevel="+schoolLevel+"&schoolType="+schoolType+"&statusID="+statusID+"&paramList="+encodeURIComponent(paramList);
		return;
	}
	$.ajax({
		url:"/customer/getSchoolListBySearchAll",
		dataType:'json',
		type:'POST',
		data:{
			stages:stages,
			schoolLevel:schoolLevel,
			schoolType:schoolType,
			provinceID : ProvinceIDGlob,
			cityID : CityIDGlob,
			districtID : DistrictIDGlob,
			schoolName:schoolNameS,
			schoolID:schoolIDs,
			page : pageNo,
			pageSize : 20
		},
		async:false,
		success:function(data){
			
			$('#loadinggif').hide();
			
			pageCount = data.Data.PageCount;
			if(data.error!=null){
				$.alert("对不起，数据出现错误，错误码："+data.error);
				return;
			}
			if(data.Data.RowCount!=null){
				$(".text-center h1").html("客户列表["+data.Data.RowCount+"个]");
			}
			
			var dataList = data.Data.List;
			if(dataList==null ||dataList==""){
				$('#tbody').append('<span style="margin-left:30%">没有符合条件的学校<span>');
				return;
			}
			for(var i=0;i<dataList.length;i++) {
				var str = '';
				str+='<li>';
				str+='<a >';
				str+='<label onclick="javascript:window.location.href=\'/pages/customerDetails.html?source=customerScreening&schoolId='+dataList[i].SchoolID+'&schoolName='+dataList[i].SchoolName+'&paramList='+encodeURIComponent(paramList)+' \'">'+dataList[i].SchoolName+'</label>';
				str+='<span id="AttentionStar'+dataList[i].SchoolID+'" data_id="'+dataList[i].SchoolID+'" class="glyphicon glyphicon-star cl-guanzhu pull-right"  style="padding-right:5%;color:#999;"></span></a>';
				str+='<div>';
				str+='<div><span>['+dataList[i].SchoolID+']</span>';
				if(dataList[i].ProvinceName!=null && dataList[i].ProvinceName!="null"){
					str+='<a href="#" onclick="javascript:getSchoolListByPosition('+dataList[i].ProvinceID+',0,0,this,0);">'+dataList[i].ProvinceName+'</a>';
				}
				if(dataList[i].CityName!=null && dataList[i].CityName!="null"){
					str+='<a href="#" onclick="javascript:getSchoolListByPosition('+dataList[i].ProvinceID+','+dataList[i].CityID+',0,this,1);"> '+dataList[i].CityName+'</a>';
				}
				if(dataList[i].DistrictName!=null && dataList[i].DistrictName!="null"){
					str+='<a href="#" onclick="javascript:getSchoolListByPosition('+dataList[i].ProvinceID+','+dataList[i].CityID+','+dataList[i].DistrictID+',this,2);"> '+dataList[i].DistrictName+'</a>';
				}
				str+='</div><div>';
				if(dataList[i].SchoolLevel!=null&&dataList[i].SchoolLevel!="null"){
					var t=dataList[i].SchoolLevel.split(",");
					for( var index in t){
						if(t[index]=="3"){
							str +='<kbd class="shengzhdian">省重点</kbd>';
						}
						if(t[index]=="5"){
							str +='<kbd class="baiqiang">百强校</kbd>';
						}
					}
				}
				str+='</div></a></li>';
				$('#tbody').append(str);
				//刷新关注信息
				MyAttentionSchool($('#AttentionStar'+dataList[i].SchoolID),dataList[i].SchoolID,1,mySellerId,dataList[i].SchoolName);
				
				$('#AttentionStar'+dataList[i].SchoolID).on("click", function() {
					var color = $(this).css("color");
					if (color == "rgb(235, 147, 22)") {
						ModifyAttention("del",$(this).attr("data_id"),1,mySellerId);
						$(this).css("color", "#999");
					} else {
						ModifyAttention("add",$(this).attr("data_id"),1,mySellerId);
						$(this).css("color", "#EB9316");
					}
				});
			}
		}, 
		
	});
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
				$(star).css("color", "red");
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

//清空所有的呃查询条件
function ClearAllCondition(){
	province();
	ClearAreaStatus();
	RefreshAreaID();
	
	stagesGlob='';
	schoolLevelGlob='';
	schoolTypeGlob='';
	productId=null;
	statusID='';
	stagesNameGlob='';
	schoolLevelNameGlob='';
	schoolTypeNameGlob='';
	$("#exampleInputEmail2").val("");
	schoolNameS='';
	schoolIDs=0;
	searchType=0;
	$(".sousuo select  option[value='id']").prop("selected", true); 
}
$(".tch2").on("click", function() {
	BackCondition1();
});
function BackCondition1(){
	if(stagesName==''||stagesName=='null'||stagesName=='不限'){
		$("#sstages a label").html("不限").css("color","black");
	}else{
		$("#sstages a label").html(stagesName).css("color","red");
	}
	if(schoolLevelName==''||schoolLevelName=='null'||schoolLevelName=='不限'){
		$("#sschoolLevel a label").html("不限").css("color","black");
	}else{
		$("#sschoolLevel a label").html(schoolLevelName).css("color","red");
	}
	if(schoolTypeName==''||schoolTypeName=='null'||schoolTypeName=='不限'){
		$('#sschoolType a label').html("不限").css("color","black");
	}else{
		$('#sschoolType a label').html(schoolTypeName).css("color","red");
	}
	if(statusName==''||statusName=='null'||statusName=='不限'){
		$('#sstatus a label').html("不限").css("color","black");
	}else{
		$('#sstatus a label').html(statusName).css("color","red");
	}
	if(searchType==1){
		$("#exampleInputEmail2").val(schoolIDs);
		$(".sousuo select  option[value='id']").prop("selected", true); 
	}else if(searchType==2){
		$("#exampleInputEmail2").val(schoolNameS);
		$(".sousuo select  option[value='name']").prop("selected", true); 
	}
}
