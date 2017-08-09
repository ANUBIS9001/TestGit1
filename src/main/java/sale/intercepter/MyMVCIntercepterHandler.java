package sale.intercepter;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import sale.utils.BrowserUtils;
import sale.utils.WeChatUtils;

public class MyMVCIntercepterHandler extends HandlerInterceptorAdapter {
	
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		boolean isWeChatBrowser = BrowserUtils.isWeChatBrowser(request);
		if(isWeChatBrowser){
			return weChatPreHandle(request, response);
		}
		return true;
	}
	
	/**
	 * 微信拦截处理
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public boolean weChatPreHandle(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		HttpSession session = request.getSession();
		Object attribute = session.getAttribute("openid");
		if(attribute==null){
			if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){ //如果是ajax请求响应头会有，x-requested-with  
                response.setHeader("sessionstatus", "timeout");//在响应头设置session状态  
            }else{
				try {
					WeChatUtils.redirectToWeChat(request, response);
				} catch (IOException e) {
					e.printStackTrace();
					response.sendRedirect("/pages/error/commonError.html");
				}
            }
			return false;
		}
		if(request.getRequestURI().equals("/activeByAuthCode")){
			JSONObject userInfo = WeChatUtils.getWeChatUserInfo(request);
			if(userInfo==null){
				response.sendRedirect("/pages/error/commonError.html");
				return false;
			}
			if(userInfo.getString("subscribe").equals("0")){
				response.sendRedirect("/pages/error/focus.html");
				return false;
			}
		}
		return true;
	}
	
	/**
	 * 非微信浏览器访问，拦截器处理，直接判断session用户信息
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	/*public boolean otherPreHandle(HttpServletRequest request,
			HttpServletResponse response) throws Exception{
		if(request.getRequestURI().equals("/userController/getCurrentUser")){
			return true;
		}
		HttpSession session = request.getSession();
		Object object = session.getAttribute("currentUser");
		if(object==null){
			if (request.getHeader("x-requested-with") != null && request.getHeader("x-requested-with").equalsIgnoreCase("XMLHttpRequest")){ //如果是ajax请求响应头会有，x-requested-with  
                response.setHeader("sessionstatus", "timeout");//在响应头设置session状态  
            }else{
            	response.sendRedirect("/pages/login.html");
            }
			return false;
		}
		return true;
	}*/

}
