//判断姓名是否是4个汉字以内的中文
function isName(str){
	var result=str.match(/^[\u4e00-\u9fa5 ]{2,4}$/);
	if(result==null) return false;
	return true;
}
// 判断输入是否是有效的电子邮件
function isEmail(str){
	var result=str.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
	if(result==null) return false;
	return true;
}
//匹配国内电话号码(0511-4405222 或 021-87888822)
function isTel(str){
	var result=str.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
	if(result==null) return false;
	return true;
}
//手机号码验证
function isMobile(str){
	var result = str.match(/^1[3|4|5|7|8]\d{9}$/);
	if(result==null) return false;
	return true;
}
//匹配腾讯QQ号
function isQQ(str){
	var result=str.match(/[1-9][0-9]{4,15}/);
	if(result==null) return false;
	return true;
}
//学校名称只允许出现汉字、字母、数字和中文输入模式下的小括号（）
function isSchoolName(str){
	var result = str.match(/^[a-zA-Z0-9\u4e00-\u9fa5\（\）]*$/);
	if(result==null) return false;
	return true;
}
function isChinese(str){
//	var guize='/^[\u4e00-\u9fa5]{'+begin+','+end+'}$/';
	var result=str.match(/^[\u4e00-\u9fa5]{0,10}$/);
	if(result==null) return false;
	return true;
}
function isPostCode(str){
	var result=str.match(/^[1-9]\d{5}$/);
	if(result==null) return false;
	return true;
}
function isAddress(str){
	var result=str.match(/^[a-zA-Z0-9\u4e00-\u9fa5\-]{0,50}$/);
	if(result==null) return false;
	return true;
}

//验证是否是数字
function ifNumByReg(str){  
    var reg = new RegExp("^[0-9]*$");  
    if(!reg.test(str)){  
    	return false;
    }  
    if(!/^[0-9]*$/.test(str)){  
    	return false;
    } 
    return true;
}  