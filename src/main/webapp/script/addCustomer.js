var schoolNameTemp="";
var addSchoolTye;
var addSchoolLevel;
var addSchoolStage;
var messageCode="";
var submitMessgae="";


function getSchoolName(){
	schoolName=$("#addCustomerName").val();
	$(".selectInfor ").val(-1);
	$("#addSchoolStage input").prop("checked",false);
	if(schoolName==""){
		return "请输入用户名";
	}else if(!isSchoolName(schoolName) || schoolName.length>50){
		return "学校名称只允许出现汉字、字母、数字和中文输入模式下的小括号（）";
	}else{
		$.ajax({
			url:'/customer/checkSchoolName',
			type:'POST',
			dataType:'json',
			async:false,
			data:{
				schoolName:schoolName
			},
			success:function(data){
				var message=data.Code;
				if(message=="200"){
					messageCode= "success";
					$("#lname").val(schoolName);
				}else if(message=="402"){
					messageCode= "客户名称已存在，请重新输入";
				}
			}
		});
		return messageCode;
	}
}


function getProvince(){
	$("#addProvince").children("option").remove();
	$("#addCity").children("option").not(".b").remove();
	$("#addArea").children("option").not(".b").remove();
	$.ajax({
		url : '/customer/GetProvince.json',
		dataType : 'json',
		type : 'post',
		data : {
		},
		success : function(data) {
			var province = [];
			var dataList = data.Data;
			province.push("<option value='-1'>选择省份</option>");
			for(var index in dataList) {
				province.push("<option value='"+dataList[index].id+"'>"+dataList[index].name+"</option>");
			}
			$("#addProvince").append(province);
//			$("#addProvince").append("<select id='addCity'><option value='-1'>选择城市</option><select>");
			$("#addProvince").change(function(){
				var pId=$("#addProvince").val();
				if(pId>0){
					$("#addCity").empty();
					$("#addCity").append("<option class='b' value='-1'>选择城市</option>");
					$("#addArea").empty();
					$("#addArea").append("<option class='b' value='-1'>选择区县</option>");
					getCity(pId);
				}
				
			});
		}
	});
}
function getCity(pId){
	$.ajax({
		url : '/customer/GetCityByProvinceID.json',
		dataType : 'json',
		type : 'post',
		data : {
			ProvinceID:pId
		},
		success : function(data) {
			var city = [];
			var dataList = data.Data;
//			city.push("<option class='b' value='-1'>选择城市</option>");
			for(var index in dataList) {
				city.push("<option value='"+dataList[index].id+"'>"+dataList[index].name+"</option>");
			}
			$("#addCity").append(city);
		}
	});
}
$("#addCity").change(function(){
	var cId=$("#addCity").val();
	if(cId>0){
		$("#addArea").empty();
		$("#addArea").append("<option class='b' value='-1'>选择区县</option>");
		getArea(cId);
	}
});

function getArea(cId){
	$.ajax({
		url : '/customer/GetDistrictByCityID.json',
		dataType : 'json',
		type : 'post',
		data : {
			CityID:cId
		},
		success : function(data) {
			var area = [];
			var dataList = data.Data;
//			area.push("<option class='b' value='-1'>选择区县</option>");
			for(var index in dataList) {
				area.push("<option value='"+dataList[index].id+"'>"+dataList[index].name+"</option>");
			}
			$("#addArea").append(area);
			$("#addArea").change(function(){
				var aId=$("#addArea").val();
			});
		}
	});
}
$("#addSchoolTye").change(function(){
	var va=$("#addSchoolTye").val();
	$("#addSchoolStage input").prop("checked",false);
	if(va==1){
		$("#addSchoolStage input").eq(1).prop("checked",true);
		$("#stageValue").val("1");
	}
	if(va==2){
		$("#addSchoolStage input").eq(2).prop("checked",true);
		$("#addSchoolStage input").eq(3).prop("checked",true);
		$("#stageValue").val("2,3");
	}
	if(va==7){
		$("#addSchoolStage input").eq(0).prop("checked",true);
		$("#stageValue").val("0");
	}
	if(va==4||va==5||va==6){
		$("#addSchoolStage input").prop("checked",true);
		$("#stageValue").val("0,1,2,3");
	}
});
$("#addSchoolStage :checkbox").click(function(){
	var isc = "";
	$("#addSchoolStage :checkbox").each(function(){ //遍历table里的全部checkbox
       //获取所有checkbox的值
	if($(this).is(":checked")) //如果被选中
          isc += $(this).attr("avalue") + ","; //获取被选中的值
  	});
	if(isc.length > 0) //如果获取到
		isc = isc.substring(0, isc.length - 1); //把最后一个逗号去掉
	$("#stageValue").val(isc);
});
//校验学校信息
function checkSchoolInformation(){
	if($("#discription").val()!="" && !isChinese($("#discription").val())){
		return "简称只允许输入不超过10位的汉字";
	}
	addSchoolTye=$("#addSchoolTye").val();
	if(addSchoolTye<0){
		return "请选择客户类型";
	}
	var flag=false;
	$("#addSchoolStage :checkbox").each(function(){ //遍历table里的全部checkbox
	       //获取所有checkbox的值
	      if($(this).is(":checked")) //如果被选中
	          flag=true;
	});
	if(flag==false){
		return "请至少选择一个客户学段";
	}
	if($("#addProvince").val()<=0 || $("#addCity").val()<=0 || $("#addArea").val()<=0){
		return "请选择完备地址的信息";
	}
	if($("#address").val()=="" || $("#postCode").val()=="" ){
		return "请填写地址和邮编";
	}
	if(!isAddress($("#address").val())){
		return"请填写正确的地址";
	}
	if(!isPostCode($("#postCode").val())){
		return"请填写正确的6位邮编";
	}
	return "success";
}
//校验联系人信息
function checkCustomerInformation(){
	if($("#customerName").val()==""){
		return "请输入联系人姓名";
	}
	if(!isChinese($("#customerName").val())||$("#customerName").val().length<2){
		return "请输入2到10位汉字";
	}
	if($("#telephone").val()=="" && $("#mobile").val()==""){
		return "电话和手机请至少输入一个";
	}
	if($("#telephone").val()!="" &&!isTel($("#telephone").val()) ){
		return "请填写正确的电话号码，如：010-12345678";
	}
	if($("#mobile").val()!="" && !isMobile($("#mobile").val())){
		return "请填写正确的11位手机号码";
	}
	if($("#email").val()!="" && !isEmail($("#email").val())){
		return "请填写正确的邮箱";
	}
	if($("#txqq").val()!="" && !isQQ ($("#txqq").val())){
		return "请填写正确的QQ";
	}
	return "success";
}


