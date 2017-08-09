var sellerID ="";
var sellerName = "";
$(function(){
	loadMyInfo();
});
//加载页面信息
function loadMyInfo(){
	$.ajaxSetup({
		contentType:"application/x-www-form-urlencoded;charset=utf-8",
		complete:function(XMLHttpRequest,textStatus){
			var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus
			if(sessionstatus=="timeout"){
				//如果超时就处理 ，强制刷新
				window.location.href="/pages/mine.html?r="+new Date().getTime();
			}
		}
	});
	$.ajax({
		url:'/seller/myInfo.html',
		dataType:'json',
		type:"post",
		success:function(data){
			if(data.state=="0"){
				sellerID = data.sellerID;
				sellerName = data.sellerName;
				$("#sellerName").prepend(data.sellerName);
			}else{
				//跳转到错误页面
				window.location.href="/pages/error/commonError.html";
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			$.alert("获取用户信息失败");
      }
	});
}
//我的学校
function toMySchools(obj,mySwitch){
	var mySwitchType = $(obj).html();
	window.location.href = "/pages/mySchools.html?source=mine&sellerID="+sellerID+"&mySwitch="+mySwitch+"&mySwitchType="+mySwitchType+"&sellerName="+sellerName;
}
