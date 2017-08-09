package sale.utils;

import org.apache.commons.lang.StringUtils;

public class MyStringUtils {

  public static String trimParam(String param){
    if(StringUtils.isNotBlank(param)){
        return param.trim();
    }else{
      return param;
    }
  }
  
  	/**
  	 * str非空
  	 * @param str
  	 * @return
  	 */
  	public static boolean isNotEmpty(String str){
		return str!=null&&!"".equals(str);
	}
  	
  	/**
  	 * str为空
  	 * @param str
  	 * @return
  	 */
	public static boolean isEmpty(String str){
		return str==null||"".equals(str);
	}
  
  /**
   * 设置参数默认值的方法，注意这里不是用来检验空值的，不要随便修改
   * @param param
   * @return
   */
  public static String checkIntegerParam(String param){
	  return param==null || param.equals("") || param.equals("null") ? "0":param;
  }
  
  /**
   * 设置参数默认值的方法，注意这里不是用来检验空值的，不要随便修改
   * @param param
   * @return
   */
  public static String checkStringParam(String param){
	  return param!=null&&param.equals("")?null:param;
  }
  
}
