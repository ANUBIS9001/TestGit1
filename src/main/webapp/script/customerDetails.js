var schoolId=getUrlParam("schoolId");
var count=0;
var schoolName=getUrlParam("schoolName");
var myHistory=0;
function JudgeHistory(){
if (document.all.isHistoryPage.value == "false") {
	document.all.isHistoryPage.value = "true";
} else {
	myHistory=1;
}
}

$(".text-center a").click(function(){
	GoBack();
});

$(function(){
	JudgeHistory();
	var c=schoolName.indexOf("（");
	if(c!=-1){
		schoolName=schoolName.substring(0,c);
	}
	var source=getUrlParam("source");
	if(source=="productInformation"&&0==myHistory){
		var productName = getUrlParam("productName");
		//提交洽谈结果需要的参数
		var productId = getUrlParam("productId");
		var LinkResult = getUrlParam("LinkResult");//用来提交洽谈结果的暂存
		var Remark = getUrlParam("Remark");//用来提交洽谈情况的暂存
		var CustomerId = getUrlParam("contactId");
		var pStatus = getUrlParam("Status");
//		$(".text-center a").attr("href","/pages/productInformation.html?schoolId="+schoolId+'&schoolName='
//				+schoolName+'&productId='+productId+'&productName='+productName+'&Remark='+Remark
//				+'&LinkResult='+LinkResult+'&CustomerId='+CustomerId);
		PushBackUrl('/pages/productInformation.html?schoolId='+schoolId+'&schoolName='
			+schoolName+'&productId='+productId+'&productName='+productName+'&Remark='+Remark+'&Status='+pStatus
			+'&LinkResult='+LinkResult+'&CustomerId='+CustomerId,"产品");
		$(".text-center a").html("产品");
	}else if(source=="mySchools"&&0==myHistory){
		var uriParams =getUrlParam("uriParams");
		var pageUrl =getUrlParam("pageUrl");
		uriParams=decodeURIComponent(uriParams);
//		$(".text-center a").attr("href",pageUrl+uriParams);
		PushBackUrl(pageUrl+uriParams,"我的");
		$(".text-center a").html("我的");
	}else if(source=="useDetails"&&0==myHistory){
		var uriParams =getUrlParam("uriParams");
		var pageUrl =getUrlParam("pageUrl");
		uriParams=decodeURIComponent(uriParams);
		PushBackUrl(pageUrl+uriParams,"订单");
		$(".text-center a").html("订单");
	}else if(source=="customerScreening"&&0==myHistory){
		PushBackUrl('/pages/customerScreening.html?'+decodeURIComponent(getUrlParam("paramList")),'列表');
		console.log('/pages/customerScreening.html?'+decodeURIComponent(getUrlParam("paramList")));
		$(".text-center a").html("列表");
	}else {
		$(".text-center a").html(GetBackLabel());
	}
	
	$("#schoolName h3 a").attr('href','/pages/customer_D.html?schoolId='+schoolId+'&schoolName='+schoolName);
	$("#schoolName1").html(schoolName).css({"text-indent":"10px"});
	$("#customerP").attr("href",'/pages/customer_P.html?schoolId='+schoolId+'&schoolName='+schoolName);
	getSchoolProduct(schoolId);
	getSchoolEvent(schoolId);
	 $("#event").scroll(
	    		function(){
	    			 var event=document.getElementById("event");
	    			if (event.scrollHeight==event.clientHeight+event.scrollTop){
	    				getSchoolEvent(schoolId);
	    				count=count+3;
	                    }

	    		}
	);
	 
	 GetLabelSections();
});

function getSchoolProduct(schoolId){
	$('#product').html('');
	$.ajax({
		url:"/customer/getSchoolProducts",
		type : 'GET',
		dataType : 'json',
		data : {
			schoolId:schoolId
		},
		success:function(data){
			var resultList=data;
			var userId=resultList.userId;
			var product=resultList.Data.List;
			if(product==null || product ==""){
				$("#product").append('<p class="col-xs-12">该学校还未使用任何产品</p>');
				return;
			}
			if(resultList.Code=="200"){
				var Str="";
				for(var i=0;i<3&&i<product.length;i++){
					var status=product[i].Status;
					var status1;
					switch(status)
					{
					 case -1:status1 ="已过期"; break;
					 case 1: status1 = "有联系"; break;
					 case 2: status1 ="有意向"; break;
	                 case 3: status1 = "待试用"; break;
	                 case 4: status1 = "待使用"; break;
	                 case 5: status1 = "已试用"; break;
	                 case 6: status1 = "已使用"; break;
	                 default: status1 = "未联系"; break;
					}
					var seller=product[i].Seller;
					if(seller==null || seller=="null"){
						seller="";
					}
					var tempStates="";
					var temp="";
					if(userId==product[i].SellerID){
						temp='shengzhdian';
					}else{
						temp+='baiqiang';
					}
					if(product[i].CreatorProtect==1){
						tempStates+='<kbd class="'+temp+'">保护</kbd>';
					}
					if(product[i].IsAgent==true){
						tempStates+='<kbd class="'+temp+'">代</kbd>';
					}
					if(product[i].IsHave==1){
						tempStates+='<kbd class="'+temp+'">保留</kbd>';
					}
					if(product[i].IsLocked==1){
						tempStates+='<kbd class="'+temp+'">锁定</kbd>';
					}
					if(product[i].ProtectType>0){
						tempStates+='<kbd class="'+temp+'">名校分配</kbd>';
					}
					if(status==-1 && product[i].BuffDays>0){
						tempStates+='<kbd class="'+temp+'">缓</kbd>';
					}
//					tempStates+='</kbd>';
					Str+='<li>';
					if(temp=='baiqiang'&&(tempStates!=''||(status>=3&&status<=6))){
						Str+='<a href="productInformation.html?productId='+product[i].ProductID+'&productName='+product[i].ProductName+'&schoolId='+schoolId+'&schoolName='+schoolName+'&source=customerDetails&ifLock='+product[i].IsLocked+'&Status='+status+'" style="color:grey" onclick="return false" class="col-xs-7 ">'+product[i].ProductName;
						Str+=tempStates+'</a>';
					}else{
						Str+='<a href="productInformation.html?productId='+product[i].ProductID+'&productName='+product[i].ProductName+'&schoolId='+schoolId+'&schoolName='+schoolName+'&source=customerDetails&ifLock='+product[i].IsLocked+'&Status='+status+'" class="col-xs-7 ">'+product[i].ProductName;
						Str+=tempStates+'</a>';
					}
					Str+='<span class="col-xs-2 ">'+status1+'</span><span class="col-xs-3 col-sm-3">'+seller+'</span>';
					Str+='</li>';
				}
				$("#product").append(Str);
			}else{
				alert("错误码"+resultList.Code+" ");
			}
		},
		
	});
}

function getSchoolEvent(){
//	$("#event").html('');
	$.ajax({
		url:"/customer/getSchoolEvents",
		type : 'POST',
		dataType : 'json',
		data : {
			schoolId:schoolId,
			count:count,
		},
		success:function(data){
			var resultList=data.data;
			var product=resultList.product;
			if( $("#event").html().indexOf("该学校没有更多事件")>0){
				return;
			}
			if(product==null || product =="" ){
				$("#event").append('<p class="col-xs-12">该学校没有更多事件</p>');
				return;
			}
			if(resultList.code=="200"){
				var Str="";
				for(var i=0;i<product.length;i++){
					var time=product[i].AddTime;
					var localTime=getLocalTime(time);
					Str+='<div>';
					Str+='<p><span class="col-xs-8">'+ localTime+'</span><span class="col-xs-4">'+ product[i].SellerName +'</span></p>';
					var content=product[i].EventContent;
					var c=content.indexOf("(");
					if(c!=-1){
						content=content.substring(0,c);
					}
					Str+='<p class="col-xs-12">'+product[i].productName+" "+content+'</p>';
					Str+='</div>';
				}
			$("#event").append(Str);	
			}else{
				alert("错误码"+resultList.Code+" ");
			}
		},
	});
	
}

$("#schoolLabel").click(function(){
	window.location.href='/pages/label.html?source=customerDetails&schoolID='+schoolId+'&schoolName='+schoolName;
});

//用来得到需要查询的标签分类
function GetLabelSections(){
	$.ajax({
		url:"/label/GetLabelSections.json",
		dataType:'json',
		type:'POST',
		data:{
		},
		success:function(data){
			if(data.labelSections!=null){
				QueryTagByOrgid(data.labelSections);
			}
		}
	});
}

//按照组织查询标签
function QueryTagByOrgid(labelSections){
	$.ajax({
		url:"/label/QueryTagByOrgid.json",
		dataType:'json',
		type:'POST',
		data:{
			schoolID : schoolId,
			labelSections : labelSections,
		},
		success:function(data){
			if(null==data){
				$.alert("加载组织绑定标签失败！");
			}else{
				if(data.code==0){
					tagStr = "";
					var dataList = data.data; 
					for(var index in dataList){
						tagStr+="<a href='#' class='a1'>"+dataList[index].name+"</a>";
					}
					$(".add").append(tagStr);
				}else{
					$.alert("加载组织绑定标签失败！");
				}
				if($("#schoolLabel").height()<20){
					$("#schoolLabel").height(30);
				}
			}
		}
	});
}


