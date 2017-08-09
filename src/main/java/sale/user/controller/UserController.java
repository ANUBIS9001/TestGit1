package sale.user.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sale.user.bean.User;
import sale.user.bean.UserExample;
import sale.user.service.UserService;
import sale.utils.BrowserUtils;
import sale.utils.HttpUtils;
import sale.utils.MyStringUtils;
import sale.utils.PropertiesUtils;
import sale.utils.UserUtils;

@Controller
@RequestMapping("/userController")
public class UserController {
	
	private static final String REQUESTURL=PropertiesUtils.getProperty("OALoginUrl");
	private Logger log=Logger.getLogger(UserController.class);
	private static Map<String,String> ignoreNames=new HashMap<>();
	static{
		ignoreNames.put("李亚琼","xy02079");
		ignoreNames.put("杜巧莲","xy02002");
		ignoreNames.put("卜欠欠","xy02333");
		ignoreNames.put("贾境","xy01010");
		ignoreNames.put("穆晓薇","xy01009");
		ignoreNames.put("兰景林","xy02003");
		ignoreNames.put("郭庆彦", "xy02813");
		ignoreNames.put("王玲玲", "xy02779");
		ignoreNames.put("顾月珠", "xy02317");
		ignoreNames.put("章安亮", "xy02510");
	}
	@Autowired
	private UserService userService;
	
	/**
	 * 用户通过用户名登录
	 * @param userName
	 * @param passWord
	 * @return
	 */
	@RequestMapping("/login")
	@ResponseBody
	public Map<String,String> login(HttpServletRequest request,String userName,String passWord){
		Map<String,String> map=new HashMap<>();
		if(MyStringUtils.isEmpty(userName)||MyStringUtils.isEmpty(passWord)){
			map.put("status", "false");
			map.put("message", "用户名或密码为空");
			return map;
		}
		HttpSession session = request.getSession();
		if(ignoreNames.containsKey(userName)){
			User user=new User();
			user.setLoginName(userName);
			user.setEmpCode(ignoreNames.get(userName));
			user.setEmpName(userName);
			Object openObj = session.getAttribute("openid");
			if(openObj!=null){
				user.setOpenid((String)openObj);
				user.setCreateTime(new Date());
				userService.insertSelective(user);
			}
			session.setAttribute("currentUser", user);
			map.put("status", "true");
			return map;
		}
		NameValuePair nv1=new NameValuePair("Name", userName);
		NameValuePair nv2=new NameValuePair("Key", DigestUtils.md5Hex(passWord));
		NameValuePair[] nvs={nv1,nv2};
		String strResult=HttpUtils.httpPost(REQUESTURL, nvs).trim();
		if(strResult==null){
			map.put("status", "false");
			map.put("message", "OA服务器未响应");
			return map;
		}
		if (strResult.indexOf("False")>=0){
			map.put("status", "false");
            if (strResult.equals("False.Empty")){
				map.put("message", "登录名或密码传入为空！");
            }
            else if (strResult.equals("False.NoFind")){
            	map.put("message", "登录名输入有误！");
            }
            else if (strResult.equals("False.KeyError")){
            	map.put("message", "密码输入有误！");
            }
            else if (strResult.equals("False.Quit")){
            	map.put("message", "该账户非在职状态，限制登录！");
            }
            else if (strResult.equals("False.Repeat")){
            	map.put("message", "账户重复，请联系人事处理！");
            }
            return map;
		}
		JSONArray jsonArray = JSONArray.fromObject(strResult);
		JSONObject jsonObject=(JSONObject)jsonArray.get(0);
		User user=new User();
		user.setLoginName(userName);
		user.setEmpCode(jsonObject.getString("EmpCode"));
		user.setEmpName(jsonObject.getString("EmpName"));
		Object openObj = session.getAttribute("openid");
		if(openObj!=null){
			user.setOpenid((String)openObj);
			user.setCreateTime(new Date());
			userService.insertSelective(user);
		}
		session.setAttribute("currentUser", user);
		map.put("status", "true");
		log.info("OA用户名登录返回数据："+strResult);
		return map;
	}
	
	/**
	 * 获取当前用户，用于ajax判断是否是历史记录
	 * @param request
	 * @return
	 */
	@RequestMapping("/getCurrentUser")
	@ResponseBody
	public Map<String,String> getCurrentUser(HttpServletRequest request){
		Map<String,String> map=new HashMap<>();
		User currentUser = UserUtils.getCurrentUser(request);
		if(currentUser!=null){
			map.put("status", "true");
		}
		return map;
	}
	
	/**
	 * 微信解绑，非微信注销
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/logout")
	public void logout(HttpServletRequest request,HttpServletResponse response) throws IOException{
		HttpSession session = request.getSession();
		boolean weChatBrowser = BrowserUtils.isWeChatBrowser(request);
		if(weChatBrowser){
			String openid=(String)session.getAttribute("openid");
			User record=new User();
			record.setState(new Byte("1"));
			record.setUpdateTime(new Date());
			UserExample example=new UserExample();
			example.createCriteria().andOpenidEqualTo(openid).andStateEqualTo(new Byte("0"));
			int influnceRows = userService.updateByExampleSelective(record, example);
			if(influnceRows==1){
				response.sendRedirect("/pages/selectBinding.html");
			}else if(influnceRows==0){
				response.sendRedirect("/pages/error/commonError.html");
			}else{
				log.error("注销时错误，存在一个微信绑定多个OA账户的情况，影响行数："+influnceRows+"，openid为："+openid);
				response.sendRedirect("/pages/selectBinding.html");
			}
		}else{
			response.sendRedirect("/pages/login.html");
		}
		session.removeAttribute("currentUser");
	}
}
