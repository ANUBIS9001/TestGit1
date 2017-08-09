var myHistory=0;
function JudgeHistory(){
if (document.all.isHistoryPage.value == "false") {
	document.all.isHistoryPage.value = "true";
} else {
	myHistory=1;
}
}

var schoolID=getUrlParam("schoolID");
var schoolName=getUrlParam("schoolName");

function JumpUrl(){
	var source=getUrlParam("source");
	if(source=="customerDetails"&&0==myHistory){
		PushBackUrl("/pages/customerDetails.html?schoolId="+schoolID+"&schoolName="+schoolName,"");
	}else {
		//没有条件的是回退的
	}
}

$(".text-center a").click(function(){
	GoBack();
});

$("#completeButton").click(function(){
	GoBack();
});

var mySellerId=null;
var firstLoad=true;

$(function() {
	//后退功能
	JudgeHistory();
	JumpUrl();
	
	$("#showSchoolName").html(schoolName);
	GetSellerInfo();
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
			mySellerId = data.sellerId;
			GetLabelSections();
		}
	});
}

function InitLabelClick(){
	//前台选中和移除标签的样式
	$("#label-list a").click(function() {
		
		//组织绑定标签的代码
		if(false==firstLoad){
			BindTag($(this).attr("data-id"));
		}
		
		$(this).addClass("a1");
		var index_a = $(this).index();
		var index_div = $(this).parent().index();
		if(!$("a[key_a$='"+index_a+"'][key_div$='"+index_div+"']").length>0){
			$(".add").append($(this).clone().attr("key_a",index_a).attr("key_div",index_div)).children().addClass("a1").unbind().click(function() {
				$(this).append("<b>×</b>").removeClass("a1").addClass("a2").click(function() {
					
					//组织解绑
					if(false==firstLoad){
						UnbindTag($(this).attr("data-id"));
					}
					
					$(this).remove();
					var i=$(this).attr("key_div");
					var j=$(this).attr("key_a");
					$("#label-list div").eq(i-1).children("a").eq(j-1).removeClass();
				});
			});
		}
		
	})
}

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
				//先查询出可以选择的所有标签
				QueryTagLibBySign(data.labelSections);
			}else{
				$.alert("没有获取到需要查询的类别标签！");
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
			schoolID : schoolID,
			labelSections : labelSections,
		},
		success:function(data){
			if(null==data){
				$.alert("加载组织绑定标签失败！");
			}else{
				if(data.code==0){
					var dataList = data.data; 
					for(var index in dataList){
						$("a[data-id='"+dataList[index].id+"']").click();
					}
				}else{
					$.alert("加载组织绑定标签失败！");
				}
			}
			firstLoad=false;
		}
	});
}

//按照类别显示所有可显示的标签
function QueryTagLibBySign(labelSections){
	$.ajax({
		url:"/label/QueryTagLibBySign.json",
		dataType:'json',
		type:'POST',
		data:{
			schoolID : schoolID,
			labelSections : labelSections,
		},
		success:function(data){
			if(null==data){
				$.alert("根据分类标识查询标签失败！");
			}else{
				if(data.data!=null){
					var appendStr = "";
					var dataList=data.data;
					for(var indexTagLib in dataList){
						if(dataList[indexTagLib].tagLib!=null){
						
							appendStr += "<div><span>"+dataList[indexTagLib].tagLib.name+"</span>";
							
							tagList=dataList[indexTagLib].tag;
							if(tagList!=null){
								for(var indexTag in tagList){
									appendStr+="<a href='#' data-id='"+tagList[indexTag].id+"'>"+tagList[indexTag].name+"</a>"
								}
							}
								
							appendStr+="</div>";
						
						}
					}
					$("#label-list").append(appendStr);
				}
			}
			InitLabelClick();
			QueryTagByOrgid(labelSections);
		}
	});
}

//绑定操作
function BindTag(tagid){
	$.ajax({
		url:"/label/BindTag.json",
		dataType:'json',
		type:'POST',
		data:{
			schoolID : schoolID,
			tagid : tagid,
			sellerId : mySellerId
		},
		success:function(data){
			if(null==data){
				$.alert("绑定标签失败！");
			}else{
				if(data.code!=0){
					$.alert(data.message);
				}
			}
		}
	});
}

//解绑操作
function UnbindTag(tagid){
	$.ajax({
		url:"/label/UnbindTag.json",
		dataType:'json',
		type:'POST',
		data:{
			schoolID : schoolID,
			tagid : tagid,
			sellerId : mySellerId
		},
		success:function(data){
			if(null==data){
				$.alert("解绑标签失败！");
			}else{
				if(data.code!=0){
					$.alert(data.message);
				}
			}
		}
	});
}
