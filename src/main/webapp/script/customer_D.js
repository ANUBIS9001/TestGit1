var schoolId=getUrlParam("schoolId");
var schoolName=getUrlParam("schoolName");
$(function(){
//	$("#schoolName a").attr("href","/pages/customerDetails.html?schoolId="+schoolId+'&schoolName='+schoolName);
	getSchoolInfromation();
});

function getSchoolInfromation(){
	$("#tbody").html("");
	if(schoolId==null || schoolId==""){
		return;
	}
	$.ajax({
		url:"/customer/getSchoolInfromation",
		dataType:'json',
		type:'POST',
		data:{
			schoolId:schoolId
		},
		success:function(data){
			var resultList=data.Data;
			if(data.Code=="200"){
				if(resultList==null || resultList==""){
					$("#tbody").append("<span>无数据</span>");
					return;
				}
				var Str="";
				
					var time=resultList.AddTime;
					var localTime=getLocalTime(time);
					var status=resultList.SchoolLevel;
					if(status.indexOf(",")>0){
						var st=status.split(",");
					}
					var schoolLevel="";
					if(st!=null){
						for(var j=0;j<st.length;j++){
							if(st[j]==""){
								break;
							}
							switch(parseInt(st[j]))
							{
							 case 0:schoolLevel +=" 普通学校"; break;
							 case 1: schoolLevel += " 县级重点"; break;
							 case 2: schoolLevel +=" 市级重点"; break;
			                 case 3: schoolLevel += " 省级重点"; break;
			                 case 4: schoolLevel += " 国家重点"; break;
			                 case 5: schoolLevel += " 百强名校"; break;
			                 case 6: schoolLevel += " 资源名校"; break;
			                 default: schoolLevel += "无"; break;
							}
						}
					}else{
						schoolLevel="无";
					}
					var address="";
					if(resultList.SchoolAddRess!=null && resultList.SchoolAddRess!="null"){
						address=resultList.SchoolAddRess;
					}
					var schoolMate="";
					if(resultList.SchoolRector!=null && resultList.SchoolRector!="null"){
						schoolMate=resultList.SchoolRector;
					}
					Str+='<p><label>学校名称:</label><span>'+schoolName+'</span></p>';
					Str+='<p><label>客户等级:</label><span>'+schoolLevel+'</span></p>';
					Str+='<p><label>学校地址:</label><span>'+address+'</span></p>';
					Str+='<p><label>学校校长:</label><span>'+schoolMate+'</span></p>';
					Str+='<p><label>添加时间:</label><span>'+localTime+'</span></p>';
				
				$("#tbody").append(Str);
				
			}else{
				alert("错误码"+resultList.Code+" ");
			}
		}
	});
}