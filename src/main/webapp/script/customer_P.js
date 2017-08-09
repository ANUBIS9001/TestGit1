var schoolId=getUrlParam("schoolId");
var schoolName=getUrlParam("schoolName");


$(function(){
	var c=schoolName.indexOf("（");
	if(c!=-1){
		schoolName=schoolName.substring(0,c);
	}
	$("#schoolName ").html('<a href="/pages/customer_D.html?schoolId='+schoolId+'&schoolName='+schoolName+'" >'+'<span class="col-xs-10">'+schoolName+'</span><span class="pull-right text-center col-xs-1 glyphicon glyphicon-chevron-right"></span></a>');
//	$(".text-center a").attr("href","/pages/customerDetails.html?schoolId="+schoolId+'&schoolName='+schoolName);
	getSchoolProduct(schoolId);
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
				for(var i=0;i<product.length;i++){
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
					var flag=true;
					var sellerId=product[i].SellerID;
					if(userId==sellerId){
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
						Str+='<a href="productInformation.html?productId='+product[i].ProductID+'&productName='+product[i].ProductName+'&schoolId='+schoolId+'&schoolName='+schoolName+'&source=customer_P&ifLock='+product[i].IsLocked+'&Status='+status+'" style="color:grey" onclick="return false" class="col-xs-7 ">'+product[i].ProductName;
						Str+=tempStates+'</a>';
					}else{
						Str+='<a href="productInformation.html?productId='+product[i].ProductID+'&productName='+product[i].ProductName+'&schoolId='+schoolId+'&schoolName='+schoolName+'&source=customer_P&ifLock='+product[i].IsLocked+'&Status='+status+'" class="col-xs-7 ">'+product[i].ProductName;
						Str+=tempStates+'</a>';
					}
					Str+='<span class="col-xs-2 ">'+status1+'</span><span class="col-xs-3 col-sm-3">'+seller+'</span>';
					Str+='</li>'
				}
				$("#product").append(Str);
			}else{
				alert("错误码"+resultList.Code+" ");
			}
		},
		
	});
}