//用来保存回退
var historyGoBack=[];
var historyName=[];

function checkChangeCookie(){
	SetCookie("historyGoBack",historyGoBack);
	SetCookie("historyName",historyName);
}

function updateCheckChange(){
	historyGoBack = getCookie("historyGoBack");
	
	if(null==historyGoBack){
		historyGoBack=[];
	}else{
		historyGoBack = historyGoBack.split(",");
	}
	
	//历史保存的回退名称
	historyName = getCookie("historyName");
	
	if(null==historyName){
		historyName=[];
	}else{
		historyName = historyName.split(",");
	}
}

/* 
功能：保存cookies函数  
参数：name，cookie名字；value，值 
*/  
function SetCookie(name,value){  
    var Days = 30*12;   //cookie 将被保存一年  
    var exp  = new Date();  //获得当前时间  
    exp.setTime(exp.getTime() + Days*24*60*60*1000);  //换成毫秒  
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();  
}   
/* 
功能：获取cookies函数  
参数：name，cookie名字 
*/  
function getCookie(name){  
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));  
    if(arr != null){  
     return unescape(arr[2]);   
    }else{  
     return null;  
    }  
}   
/* 
功能：删除cookies函数  
参数：name，cookie名字 
*/  
function delCookie(name){  
    var exp = new Date();  //当前时间  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();  
} 

//用来想cookie压入url参数
function PushBackUrl(urlvalue,namevalue){
	urlvalue = urlvalue.replace(",","，");
	updateCheckChange();
	historyGoBack.push(urlvalue);
	historyName.push(namevalue);
	checkChangeCookie();
}

//用来回退的方法
function GoBack(){
	updateCheckChange();
	
//	var show="";
//	for (x in historyGoBack)
//	{
//	    show+=historyGoBack[x]+"    ";
//	}
//	alert(show);
	
	var backUrl=historyGoBack.pop();
	historyName.pop();
//	alert(backUrl);
	checkChangeCookie();
	window.location.href=backUrl;
}

//在回退到上一页的时候用来回显回退标签
function GetBackLabel(){
//	updateCheckChange();
//	var backLabel=historyName.pop();
//	checkChangeCookie();
//	
//	return backLabel;
	
	updateCheckChange();	
	return historyName[historyName.length-1];
}