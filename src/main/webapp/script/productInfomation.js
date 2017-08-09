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


var schoolId = getUrlParam("schoolId");
var productId = getUrlParam("productId");
var productName = getUrlParam("productName");

//提交洽谈结果需要的参数
var SchoolName = getUrlParam("schoolName");
var LinkResult = getUrlParam("LinkResult");//用来提交洽谈结果的暂存
var Remark = getUrlParam("Remark");//用来提交洽谈情况的暂存
var CustomerId = getUrlParam("contactId");
var sellerId = null;//之后调用访问后台的方法获得sellerid
var sellerName = null;//之后调用访问后台的方法获得sellername

//是否锁定
var ifLock = getUrlParam("ifLock");

//用来判断是否只能回访
var Status = getUrlParam("Status");

//跳转的判断
function JumpUrl(){
var source=getUrlParam("source");
if(source=="customerDetails"&&0==myHistory){
	$('#LinkHistory').html("客户");
	
	PushBackUrl("/pages/customerDetails.html?schoolId="+schoolId+"&schoolName="
			+SchoolName+"&LinkResult="+LinkResult+"&Remark="+Remark+"&CustomerId="+CustomerId+"&productId="+productId+"&productName="+productName,"客户");
}else if(source=="customer_P"&&0==myHistory){
	$('#LinkHistory').html("客户");
	
	PushBackUrl("/pages/customerDetails.html?schoolId="+schoolId+"&schoolName="
			+SchoolName+"&LinkResult="+LinkResult+"&Remark="+Remark+"&CustomerId="+CustomerId+"&productId="+productId+"&productName="+productName,"客户");
}else if(source=="mySchools"&&0==myHistory){
	$('#LinkHistory').html("我的");//我的学校列表
	
	PushBackUrl(getUrlParam("pageUrl")+decodeURIComponent(getUrlParam("uriParams")),"我的");
}else if(source=="useDetails"&&0==myHistory){
	$('#LinkHistory').html("订单");//订单详情
	
	PushBackUrl(getUrlParam("pageUrl")+decodeURIComponent(getUrlParam("uriParams")),"订单");
	
}else if(source=="productScreening"&&0==myHistory){
	$('#LinkHistory').html("列表");
	
	PushBackUrl(getUrlParam("pageUrl")+decodeURIComponent(getUrlParam("uriParams")),"列表");
}else{
	//没有条件的是回退的
	$('#LinkHistory').html(GetBackLabel());
}
}

$(function() {
	JudgeHistory();
	JumpUrl();
	
	GetSellerInfo();
	
	var uriParams= '&schoolId='+schoolId+'&schoolName='+SchoolName+'&productId='+productId+'&productName='+productName+'&ifLock='+ifLock+'&Status='+Status;
	
	$('#pName').click(function(){window.location.href="/pages/productScreening.html?productId="+productId+"&productName="+productName+"&uriParams="+encodeURIComponent(uriParams)+"&source=productInformation"});
	
	$('#pName').html(productName);
	
	$('#disnoSchoolName').click(function(){window.location.href="/pages/customerDetails.html?source=productInformation&schoolId="+schoolId+"&schoolName="+SchoolName+"&LinkResult="+LinkResult+"&Remark="+Remark+"&CustomerId="+CustomerId+"&productId="+productId+"&productName="+productName+"&Status="+Status});
	$('#disnoSchoolName').html(SchoolName);
	
	//装入参数，包括seller信息的赋值和从其它页面传入的填写信息回显
	if(Remark!=null&&Remark!="null"){
		$('#textareaRemark').html(Remark);
	}
	if(LinkResult=="contacted"){
		$('#contacted').attr("checked","checked");
	}else if(LinkResult=="revisit"){
		$('#revisit').attr("checked","checked");
	}else if(LinkResult=="noIntention"){
		$('#noIntention').attr("checked","checked");
	}
	
	if(ifLock==1||Status<0||Status>2){
		$('#contacted').attr("disabled","disabled");
		$('#noIntention').attr("disabled","disabled");
		$('#revisit').attr("checked","checked");
	}
	
	refreshUserDetailLink();
	toUserDetailsBack();
})

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
			
			sellerId = data.sellerId;
			sellerName = data.sellerName;
			GetSchoolLinkById();
			MyAttentionSchool();
			
			$('#contactLink').click(function(){window.location.href="/pages/contacts.html?schoolID="+schoolId+"&productID="+productId+"&productName="+productName+"&SchoolName="+SchoolName+"&LinkResult="+LinkResult+"&Remark="+Remark+"&sellerID="+sellerId+"&sellerName="+sellerName+"&Status="+Status});
		}
	});
}

//用来显示关注状况
function MyAttentionSchool(){
	$.ajax({
		url:"/product/MyAttentionSchool.json",
		dataType:'json',
		type:'POST',
		data:{
			schoolId : schoolId,
			productId : productId,
			sellerId : sellerId,
			schoolName : SchoolName
		},
		success:function(data){
			if(data.error!=null){
				$.alert("查询关注信息出现错误："+data.error);
				return;
			}
			
			if(data.Data.List==null){
				$("#guanzhuSpan").css("color", "#999").attr("data-original-title","取消关注");
			}else{
				$("#guanzhuSpan").css("color", "#EB9316").attr("data-original-title","关注");
			}
		}
	});
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
			sellerId : sellerId,
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

//用来暂存输入的洽谈情况并更新传递参数的url
function updateLinkResult(){
	if($('input:radio[name="huizhi"]:checked').attr("id")=="contacted"){
		LinkResult = "contacted";
	}else if($('input:radio[name="huizhi"]:checked').attr("id")=="revisit"){
		LinkResult = "revisit";
	}else if($('input:radio[name="huizhi"]:checked').attr("id")=="noIntention"){
		LinkResult = "noIntention";
	}
	Remark = $('#textareaRemark').val();
	
	$('#contactLink').click(function(){window.location.href="/pages/contacts.html?schoolID="+schoolId+"&productID="+productId+"&productName="+productName+"&SchoolName="+SchoolName+"&LinkResult="+LinkResult+"&Remark="+Remark+"&sellerID="+sellerId+"&sellerName="+sellerName+"&Status="+Status});
	
	refreshUserDetailLink();
}

//获得联系人的接口
function loadContact(){
	var url = "/customer/contacts.html";
	var option = {
		url:url,
		data:{"schoolID":schoolId,"pageNo":1,"sellerID":sellerId,"sellerName":sellerName},
		dataType:'json',
		success:function(data){
			var state = data.state;
			var msg = data.message;
			if(state==1){
				$('#contactPerson').append('<div><p>'+msg+'</p></div>');
				return;
			}
			var contact = eval(data.contact);
			if(state==0){//请求成功
				if(contact!= "null" && contact!=null){
					CustomerId = contact[0].CustomerID
					$('#contactPerson').html("");
					var telephone=null;
					if(contact[0].LinkMobile!=null&& $.trim(contact[0].LinkMobile)!=""){
						telephone = contact[0].LinkMobile;
					}else{
						telephone = contact[0].LinkPhone;
					}
					$('#contactPerson').append('<li><a href="#" class="col-xs-4 col-sm-4">'+contact[0].Customer+'</a><span class="col-xs-5 col-sm-5">'+telephone+'</span><a href="tel:'+telephone+'" class="col-xs-3 col-sm-3 text-center glyphicon glyphicon-earphone"></a></li>');
				}else{
					$('#contactPerson').append('<div><p>暂无联系人</p></div>');
					return;
				}
			}
		},
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
			 $('#contactPerson').append('<div><p>异常</p></div>');
         }
	}
	$.ajax(option);
}

//得到洽谈情况列表
function GetSchoolLinkById() {
	$('#loadinggif').show();
	$('#discussion').html("");
	
	var contactMobile = getUrlParam("contactMobile");
	var contactName = getUrlParam("contactName");
	
	if(contactMobile!=null){
		$('#contactPerson').html("");
		$('#contactPerson').append('<li><a href="#" class="col-xs-4 col-sm-4">'+contactName+'</a><span class="col-xs-5 col-sm-5">'+contactMobile+'</span><a href="tel:'+contactMobile+'" class="col-xs-3 col-sm-3 text-center glyphicon glyphicon-earphone"></a></li>');
	}else{
		loadContact();
	}
	
	$.ajax({
		url : '/product/GetSchoolLinkById.json',
		dataType : 'json',
		type : 'post',
		data : {
			schoolId : schoolId,
			productId : productId,
			sellerId : sellerId
		},
		success : function(data) {
			$('#loadinggif').hide();
			
			if(data.error!=null){
				$('#discussion').append('<div><p>'+data.error+'</p></div>');
				
				//此处如果是没有权限则隐藏层
				if(data.denied!=null){
					$('#discussion').append('<div><p>无权操作他人所属校！</p></div>');
					$('#divResult').css("display","none");				
				}
				
				return;
			}
			
			if(data.Message!="执行成功！"){
				$('#discussion').append('<div><p>'+data.Message+'</p></div>');
				$('#divResult').css("display","none");
				return;
			}
			
			if(data.Data==null){
				$('#discussion').append('<div><p>没有查询到数据！</p></div>');
				return;
			}
			
			var str = '';
			var dataList = data.Data.List;
			for(var index in dataList) {
				
				str += '<div><p><span class="col-xs-9">'+dataList[index].LinkTime+'</span><span class="col-xs-3">'+dataList[index].SalesMan+'</span></p>'
				str += '<p><span class="col-xs-9">'+dataList[index].Remark+'</span><span class="col-xs-3">'+dataList[index].LinkResult+'</span></p></div>'
				
			}
			$('#discussion').append(str);
			
			//toUserDetailsBack();
		}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
//            $.alert(errorThrown); 
        } 
	})
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

//刷新跳转的参数
function refreshUserDetailLink(){
	//用来后退的参数变量
	var pageUrl = "/pages/productInformation.html";
	var uriParams = "?schoolId="+schoolId+"&productId="+productId+"&productName="+productName+"&schoolName="+SchoolName+"&LinkResult="+LinkResult+"&Remark="+Remark+"&contactId="+CustomerId+"&ifLock="+ifLock+"&Status="+Status;
	
	$('#showProDetail').click(function(){window.location.href="/pages/useDetails.html?source=productInformation&schoolName="+SchoolName+"&productName="+productName+"&schoolId="+schoolId+"&productId="+productId+"&beginTime="+beginTime+"&endTime="+endTime+"&mySwitchType="+productName+"&pageUrl="+pageUrl+"&uriParams="+encodeURIComponent(uriParams)});
}

var beginTime="";
var endTime="";
//用来更新从userDetails返回的页面参数
function toUserDetailsBack(){
	$.ajax({
		url:'/customer/orderDetails',
		type:'post',
		data:{"schoolID":schoolId,"productID":productId},
		dataType:'json',
		success:function(data){
			if(data.state==0){
				if(data.orderDetails!="null"){
					 beginTime = (data.orderDetails)[0].BeginTime == undefined?"":(data.orderDetails)[0].BeginTime;
					 if(beginTime != ""){
						 beginTime = new Date(parseInt(beginTime.slice(6,beginTime.length-2))).Format("yyyy-MM-dd");
					 }
					 endTime = (data.orderDetails)[0].EndTime== undefined?"":(data.orderDetails)[0].EndTime;
					 if(beginTime != ""){
						 endTime = new Date(parseInt(endTime.slice(6,endTime.length-2))).Format("yyyy-MM-dd");
					 }
					 
					 //用来后退的参数变量
					 refreshUserDetailLink();
				}else{
					//$.alert("订单详情为空");
				}
			}else{
				//$.alert(data.message);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			 //$.alert("获得订单详情失败");
      }
	})
}

//判断字符串长度的方法
function getByteLen(val) {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
         var a = val.charAt(i);
         if (a.match(/[^\x00-\xff]/ig) != null) 
        {
            len += 2;
        }
        else
        {
            len += 1;
        }
    }
    return len;
}

//增加洽谈情况的方法
function AddSchoolLink() {
	//异常处理及限制
	if($('#contactPerson').text()==""||CustomerId==0||CustomerId==null){
		$.alert("没有选择联系人，或者联系人ID为0");
		return;
	}
	
	if($('#textareaRemark').val()==""||$('#textareaRemark').val()==undefined){
		$.alert("请先填写洽谈情况！");
		return;
	}
	
	if(getByteLen($('#textareaRemark').val())>100){
		$.alert("洽谈情况内容长度超过限制！最多50个汉字");
		return;
	}
	
	$.ajax({
		url : '/product/AddSchoolLink.json',
		dataType : 'json',
		type : 'post',
		data : {
			SchoolId : schoolId,
			productId : productId,
			SchoolName : SchoolName,
			LinkResult : LinkResult,
			Remark : Remark,
			CustomerId : CustomerId,
			SellerID : sellerId,
			SellerName : sellerName,
		},
		success : function(data) {
			$('#loadinggif').hide();
			
			if(data.error!=null){
				$.alert(data.error);
				return;
			}
			
			if(data.Message!="执行成功！"){
				alerrt(data.Message);
				return;
			}
			
			$.alert("保存成功！",MyCallBack);
			
		}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
//            $.alert(errorThrown); 
        } 
	})
}

function MyCallBack(){
	location.reload();
}