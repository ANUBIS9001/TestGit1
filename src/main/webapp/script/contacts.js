var name = "";
var job = "";
var tel = "";
var mobilephone = "";
var email = "";
var qq = "";
var pageNo = 1;
var pageCount =1;

var schoolId = getUrlParam("schoolID");
var productId = getUrlParam("productID");
var productName = getUrlParam("productName");
var Status = getUrlParam("Status");

//暂存提交洽谈结果需要的参数
var SchoolName = getUrlParam("SchoolName");
var LinkResult = getUrlParam("LinkResult");//用来提交洽谈结果的暂存
var Remark = getUrlParam("Remark");//用来提交洽谈情况的暂存
$(document).ready(function() {
				var i = 1;
				var m = 1;
//				$("#Telephone").click(function() {
//					if (i < 2) {
//						$(this).parent("li").before("<li><label name=\"tel\">电话" + i + "</label><input type='text' /><span class='glyphicon glyphicon-minus-sign posi' ></span></li>");
//						i++;
//					}
//					$(".glyphicon-minus-sign").click(function() {
//						$(this).parent("li").remove();
//						i--;
//					});
//				});
//				$("#mobilePhone").click(function() {
//					if (m < 3) {
//						$(this).parent("li").before("<li><label name=\"mobile\">手机" + m + "</label><input type='text' /><span class='glyphicon glyphicon-minus-sign posi' ></span></li>");
//						m++;
//					};
//					$(".glyphicon-minus-sign").click(function() {
//						$(this).parent("li").remove();
//						m--;
//						if(m<1){
//							m=1;
//						}
//					})
//				});
				$(".glyphicon-plus").click(function(){
					$(".tch1").show().css({"top":($(window).height()-$(".tch1").height())/2});
					$(".tch2").show();
				})
				$(".btn-default").click(function(){
					$(".tch1").hide();
					$(".tch2").hide();
				})
				loadContactsList();
				$(window).scroll(function(){
					if ((document.documentElement.scrollHeight) == (document.documentElement.scrollTop | document.body.scrollTop) + document.documentElement.clientHeight){
						pageNo=pageNo+1;
						if(pageNo<=pageCount){
							loadContactsList();
						}
				    }
			    });
			})
//加载学校联系人
function loadContactsList(){
	var url = "/customer/contacts.html";
	var schoolID = getUrlParam("schoolID");
	var sellerID = getUrlParam("sellerID");
	var option = {
		url:url,
		data:{"schoolID":schoolID,"pageNo":pageNo,"sellerID":sellerID},
		dataType:'json',
		success:function(data){
			var state = data.state;
			var msg = data.message;
			if(state==1){
				$.alert(msg);
				return;
			}
			var height = document.documentElement.clientHeight;
			var heightTop = document.getElementById("top").offsetHeight;
			var heightNav = document.getElementById("nav").offsetHeight;
			var divHeight = height-heightTop-heightNav;
			document.getElementById("contactsList").style.height=divHeight+"px";
			var contact = eval(data.contact);
			pageCount = data.pageCount;
			if(state==0){//请求成功
				if(contact!= "null" && contact!=null){
					var contactString = "";
					for(var i=0;i<contact.length;i++){
						
						var telephone=null;
						if(contact[i].LinkMobile!=null&& $.trim(contact[i].LinkMobile)!=""){
							telephone = contact[i].LinkMobile;
						}else{
							telephone = contact[i].LinkPhone;
						}
						
						contactString += "<li class=\"panel-footer1\">\
							<span class=\"col-xs-4 col-sm-4\">"+contact[i].Customer+"</span>\
							<span class=\"col-xs-5 col-sm-5\">"+telephone+"</span>\
							<input type=\"hidden\" value=\""+contact[i].CustomerID+"\"/>\
							<a href=\"#\" onclick=\"chooseContact(this)\" class=\"col-xs-3 col-sm-3  btn btn-primary\">选择</a>\
							</li>";
					}
					$("#contactsList").append(contactString);
				}else{
					$("#contactsList").append("<p style='text-align:center'>"+data.message+"</p>");
					return;
				}
			}else{
				$.alert(data.message);
				return;
			}
		},
		 error: function(XMLHttpRequest, textStatus, errorThrown) {
			 $.alert("获取联系人失败");
         }
	}
	$.ajax(option);
}
//添加联系人
function addContacts(){
	if(!validateContact()){
		return;
	};
	var schoolID = getUrlParam("schoolID");
	var sellerID = getUrlParam("sellerID");
	var sellerName = getUrlParam("sellerName");
	var url = "/customer/addContact.html"
    var option = {
    	url:url,
    	data:{"name":name,"job":job,"tel":tel,"mobilephone":mobilephone,"email":email,"qq":qq,"schoolID":schoolID,"sellerID":sellerID,"sellerName":sellerName},
    	type:'post',
    	dataType:'json',
    	success:function(data){
    		$.alert(data.message);
    		if(data.state==0){
    			location.reload(true);
    		}
    	},
    	error: function(XMLHttpRequest, textStatus, errorThrown) {
    		$.alert("添加联系人失败")
        }
    }
	$.ajax(option);
}
//添加联系人验证
function validateContact(){
	name = $("input[name=name]").val().trim();
	if(name==""){
		$.alert("姓名不能为空");
		return false;
	}
	if(!isName(name)){
		$.alert("请输入正确的姓名");
		return false;
	}
	job  = $("input[name=job]:checked").val().trim();
	if(job==""){
		$.alert("职位不能为空");
		return false;
	}
	tel = $("input[name=tel]").val().trim();
	if(tel==""){
		$.alert("电话号码不能为空");
		return false;
	}
	if(!isTel(tel)){
		$.alert("请输入正确的电话号码");
		return false;
	}
	mobilephone = $("input[name=mobilephone]").val().trim();
	if(mobilephone==""){
		$.alert("手机号码不能为空");
		return false;
	}
	if(!isMobile(mobilephone)){
		$.alert("请输入正确的手机号码");
		return false;
	}
	email = $("input[name=email]").val().trim();
	if(email!=""){
		if(!isEmail(email)){
			$.alert("请输入正确的电子邮箱");
			return false;
		}
	}
	qq = $("input[name=qq]").val().trim();
	if(qq!=""){
		if(!isQQ(qq)){
			$.alert("请输入正确的QQ号码");
			return false;
		}
	}
	return true;
}
//选择联系人,跳转到产品详细信息页面
function chooseContact(obj){
	var id = $(obj).prev().val();
	var mobile = $(obj).prev().prev().html();
	var name = encodeURI($(obj).prev().prev().prev().html());
	window.location.href="/pages/productInformation.html?contactId="+id+"&contactName="+name+"&contactMobile="+mobile+"&schoolId="+schoolId+"&productId="+productId+"&productName="+productName+"&schoolName="+SchoolName+"&LinkResult="+LinkResult+"&Remark="+Remark+"&Status="+Status;
}
