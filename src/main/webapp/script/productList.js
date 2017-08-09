$(function() {
	GetSchoolListBySearch();
})

var pageNo=1;
var pageCount=0;

//分页加载客户列表
function GetSchoolListBySearch() {
	$('#loadinggif').show();
	
	$.ajax({
		url : '/product/GetAllProduct.json',
		dataType : 'json',
		type : 'post',
		data : {
		},
		success : function(data) {
			$('#loadinggif').hide();
			
//			pageCount = data.Data.PageCount;
//			
//			if(data.error!=null){
//				alert("对不起，数据出现错误，错误码："+data.error);
//				return;
//			}
//			
//			var str = '';
//			var dataList = data.Data.List;
//			for(var index in dataList) {
//				str +='<li><span class="col-xs-2">'+dataList[index].SchoolID+'</span><a href="" class="col-xs-10">'+dataList[index].SchoolName+'</a></li>'
//			}
//			$('#tbody').append(str);
		}, 
        error: function (XMLHttpRequest, textStatus, errorThrown) { 
            alert(errorThrown); 
        } 
	})
}
