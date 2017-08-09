$.ajaxSetup({
	contentType:"application/x-www-form-urlencoded;charset=utf-8",
	complete:function(XMLHttpRequest,textStatus){
		var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus
		if(sessionstatus=="timeout"){
			alert("页面超时！");
			//如果超时就处理 ，强制刷新
			window.location.reload(true);
		}
	}
});