function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var url = decodeURI(window.location.search);
	var r = url.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	} else {
		return null;
	}
}


function getLocalTime(time) { 
	if(time==null || time=="null"){
		return "";
	}
	var a=time.indexOf("(");
	var b=time.indexOf(")");
	time=time.substring(a+1,b);
	var date = new Date(parseInt(time));
	var result = padNumber(date.getFullYear() , 2)+'-'+padNumber( (date.getMonth()+1),2)+'-'+ padNumber(date.getDate(),2) +' '
	+ padNumber(date.getHours(), 2) +':'+ padNumber(date.getMinutes() , 2) +':00';  
	return result;
}  

function padNumber(num, fill) {
    var len = ('' + num).length;
    return (Array(
        fill > len ? fill - len + 1 || 0 : 0
    ).join(0) + num);
}