var timers;
$(document).ready(function() {
	$("#name").blur(function() {
		//不正确，弃用
		/*var myReg = /^[\u4e00-\u9fa5]+$/;*/
		var myReg=/^[\u4e00-\u9fa5 ]{2,4}$/;
		var leng = $(this).val().length;
		$(this).next("span").remove();
		if (!myReg.test($(this).val())) {
			$(this).val("你的输入不是中文").css({
				"color": "red"
			}).after("<span class='glyphicon glyphicon-remove pull-right' style='color:red;'></span>");
		} else {
			$(this).after("<span class='glyphicon glyphicon-ok pull-right'></span>");
		}
	}).focus(function() {
		if ($(this).val() == "你的输入不是中文") {
			$(this).val("").css({
				"color": "#333"
			});
		}
	});
	$("#shouji").blur(function() {
		//此手机号验证正则未与时俱进，故弃用
		/*var myReg = /^(((13[0-9]{1})|159|153)+\d{8})$/;*/
		var myReg=/^(1+\d{10})$/;
		var leng = $(this).val().length;
		$(this).next("span").remove();
		if (!myReg.test($(this).val())) {
			$(this).attr("placeholder","你的输入不是正确的手机号").css({
				"color": "red"
			}).after("<span class='glyphicon glyphicon-remove pull-right' style='color:red;'></span>");
		} else {
			$(this).after("<span class='glyphicon glyphicon-ok pull-right'></span>");
		}
	}).focus(function() {
		if ($(this).val() == "你的输入不是正确的手机号") {
			$(this).val("").css({
				"color": "#333"
			});
		}
	});
	$("#Email").blur(function() {
		//太死板，弃用
		/*var myReg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/;*/
		var myReg=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		var leng = $(this).val().length;
		$(this).next("span").remove();
		if (!myReg.test($(this).val())) {
			$(this).val("你的输入邮箱格式不正确").css({
				"color": "red"
			}).after("<span class='glyphicon glyphicon-remove pull-right' style='color:red;'></span>");
		} else {
			$(this).after("<span class='glyphicon glyphicon-ok pull-right'></span>");
		}
	}).focus(function() {
		if ($(this).val() == "你的输入邮箱格式不正确") {
			$(this).val("").css({
				"color": "#333"
			});
		}
	});
	/*$("#yanzheng").click(function() {
		
		$(this).html("获取验证码").prepend("<b></b>");
		timers = setInterval(time, 500);
	});*/

});
//验证码发送效果不符要求
/*var i = 300;
function time() {
	if (i >= 1) {
		$("#yanzheng").children("b").html("(" + (i--) + "s)");
	} else {
		i = 300;
		$("#yanzheng").html("重新获取验证码");
		clearInterval(timers);
	}

}*/