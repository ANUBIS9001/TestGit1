package sale.utils;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

import sale.user.bean.User;
import sale.user.bean.UserExample;
import sale.user.bean.UserExample.Criteria;
import sale.user.service.UserService;

public class UserUtils implements ApplicationContextAware{
	
	private static ApplicationContext context;
	
	/**
	 * 获取当前用户
	 * @param request
	 * @return
	 */
	public static User getCurrentUser(HttpServletRequest request){
		boolean weChatBrowser = BrowserUtils.isWeChatBrowser(request);
		if(weChatBrowser){
			return getWeChatBrowserUser(request);
		}
		return getOtherBrowserUser(request);
	}

	/**
	 * 获取通过微信浏览器访问的用户信息
	 * @param request
	 * @return
	 */
	private static User getWeChatBrowserUser(HttpServletRequest request){
		HttpSession session = request.getSession();
		Object obj = session.getAttribute("currentUser");
		if(obj==null){
			String openid=(String)session.getAttribute("openid");
			UserExample userExample=new UserExample();
			Criteria criteria = userExample.createCriteria();
			criteria.andOpenidEqualTo(openid).andStateEqualTo(new Byte("0"));
			UserService userService=context.getBean(UserService.class);
			List<User> users = userService.selectByExample(userExample);
			if(users.isEmpty()){
				return null;
			}
			User user = users.get(0);
			session.setAttribute("currentUser", user);
			return user;
		}
		return (User)obj;
	}
	
	/**
	 * 获取通过微信之外的浏览器访问的用户
	 * @param request
	 * @return
	 */
	private static User getOtherBrowserUser(HttpServletRequest request){
		HttpSession session = request.getSession();
		return (User)session.getAttribute("currentUser");
	}
	@Override
	public void setApplicationContext(ApplicationContext arg0)
			throws BeansException {
		context=arg0;
	}

}
