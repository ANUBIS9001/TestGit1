package sale.utils;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

public class BrowserUtils {

	private static Logger log=Logger.getLogger(BrowserUtils.class);
	
	private BrowserUtils(){
	}
	
	/**
	 * 判断是否是微信浏览器访问的
	 * @param request
	 * @return
	 */
	public static boolean isWeChatBrowser(HttpServletRequest request){
		String userAgent=request.getHeader("user-agent").toLowerCase();
		log.info("访问地址："+request.getRequestURI());
		log.info("访问的浏览器类型:"+userAgent);
		return userAgent.indexOf("micromessenger") > -1;
	}
}
