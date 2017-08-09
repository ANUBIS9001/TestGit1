package sale.intercepter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import sale.user.bean.User;
import sale.utils.BrowserUtils;
import sale.utils.UserUtils;

public class MyMVCIntercepterHandler2 extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		User currentUser = UserUtils.getCurrentUser(request);
		if(currentUser==null){
			boolean weChatBrowser = BrowserUtils.isWeChatBrowser(request);
			if(weChatBrowser){
				response.sendRedirect("/pages/selectBinding.html");
			}else{
				//response.sendRedirect("/pages/error/notWeChat.html");
				if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){ //如果是ajax请求响应头会有，x-requested-with  
	                response.setHeader("sessionstatus", "timeout");//在响应头设置session状态  
	            }else{
	            	response.sendRedirect("/pages/login.html");
	            }
			}
			return false;
		}
		return true;
	}
	

}
