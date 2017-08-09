package sale.user.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.commons.httpclient.NameValuePair;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sale.user.bean.User;
import sale.user.bean.WChatOA;
import sale.user.bean.WChatOAExample;
import sale.user.bean.WChatOAExample.Criteria;
import sale.user.service.BindOAService;
import sale.user.service.UserService;
import sale.user.service.WChatOAService;
import sale.utils.HttpUtils;
import sale.utils.PropertiesUtils;
import sale.utils.UserUtils;
import sale.utils.SendMessageUtils;

@Controller
public class WeChatUserController {

	private Logger log=Logger.getLogger(WeChatUserController.class);
	private static String OAActivationUrl=PropertiesUtils.getProperty("OAActivationUrl");
	
	@Autowired
	private WChatOAService wChatOAService;
	@Autowired
	private BindOAService bindOAService;
	@Autowired
	private UserService userService;
	
	/**
	 * 微信与OA绑定功能
	 * @param request
	 * @param user 收集的用户基本信息
	 * @param messageCode 短信验证码
	 * @return
	 */
	@RequestMapping("/weChatUserController/weChatBindOA")
	@ResponseBody
	public Map<String,String> weChatBindOA(HttpServletRequest request,User user,String messageCode){
		Map<String,String> map=new HashMap<>();
		HttpSession session = request.getSession();
		Object object = session.getAttribute("messageExpireTime");
		//仅供测试用111111
//		if(!"111111".equals(messageCode)){
			if(object==null||new Date((long)object).before(new Date())){
				map.put("status", "false");
				map.put("message", "验证码已过期，请重新获取！");
				return map;
			}
			String sessionMessageCode=(String)session.getAttribute("messageCode");
			if(!sessionMessageCode.equals(messageCode)){
				map.put("status", "false");
				map.put("message", "验证码错误！");
				return map;
			}
//		}
		Object tempObj = session.getAttribute("tempWChatOAData");
		if(tempObj==null){
			map.put("timeout", "timeout");
			map.put("message", "网页超时！");
			return map;
		}
		WChatOA wChatOA=(WChatOA)tempObj;
		user.setEmpCode(wChatOA.getEmpCode());
		String md5Password=wChatOA.getEncryPassword();
		// 与oa数据交互
		String strResult = activation(user, md5Password).trim();
		log.info("OA激活账户返回数据："+strResult);
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
            else if (strResult.equals("False.Register")){
            	map.put("message", "该二维码已被使用，请更换！");
            }else if(strResult.equals("False.Fail")){
            	map.put("message", "OA服务器执行失败！");
            }else{
            	map.put("message", "OA服务器异常！");
            }
            return map;
		}else{
			JSONArray jsonArray = JSONArray.fromObject(strResult);
			JSONObject jsonObject=(JSONObject)jsonArray.get(0);
			user.setLoginName(jsonObject.getString("LoginName"));
			user.setEmpCode(jsonObject.getString("EmpCode"));
			user.setEmpName(jsonObject.getString("EmpName"));
			user.setTelephone(jsonObject.getString("PubPhone"));
			user.setEmail(jsonObject.getString("AssistantMail"));
			session.setAttribute("currentUser", user);
		}
		int influence = bindOAService.bindOA(request, user);
		if(influence==0){
			map.put("used", "used");
			return map;
		}
		String content="学科网OA地址：http://oa.zxxk.com，账号："+user.getLoginName()+"，密码"+wChatOA.getPassword()+"【凤凰学易】";
		boolean sendMessageRes = SendMessageUtils.sendMessage(user.getTelephone(), content);
		if(!sendMessageRes){
			log.warn("激活OA账户发送短信失败！");
		}
		map.put("status", "true");
		return map;
	}
	
	/**
	 * 向OA提交数据，激活账户
	 * @param user 基本信息
	 * @param MD5Password md5加密后密码
	 * @return OA交互返回数据
	 */
	public String activation(User user,String md5Password){
		NameValuePair name=new NameValuePair("Name", user.getLoginName());
		NameValuePair phone=new NameValuePair("Phone", user.getTelephone());
		NameValuePair email=new NameValuePair("Email", user.getEmail());
		NameValuePair code=new NameValuePair("Code", user.getEmpCode());
		NameValuePair key=new NameValuePair("Key", md5Password);
		NameValuePair[] params=new NameValuePair[]{name,phone,email,code,key};
		return HttpUtils.httpPost(OAActivationUrl, params);
	}
	
	/**
	 * 发送短信验证码
	 * @param session
	 * @param mobile 手机号
	 * @return
	 */
	@RequestMapping("/weChatUserController/sendMessage")
	@ResponseBody
	public Map<String,String> sendMessage(HttpSession session,String mobile){
		Map<String,String> map=new HashMap<>();
		String messageCode=String.format("%06d", (int)(Math.random()*1000000));
		session.setAttribute("messageCode", messageCode);
		session.setAttribute("messageExpireTime", new Date().getTime()+600*1000);
		String content=messageCode+"（学科网微营销验证码，10分钟有效）【凤凰学易】";
		boolean result = SendMessageUtils.sendMessage(mobile, content);
		if(!result){
			map.put("status", "false");
		}
		return map;
	}
	
	/**
	 * 扫码绑定OA，跳转收取用户信息页面
	 * @param request
	 * @param response
	 * @param authcode 二维码激活码
	 * @throws IOException 
	 */
	@RequestMapping("/activeByAuthCode")
	public void activeByAuthCode(HttpServletRequest request,HttpServletResponse response,String authcode) throws IOException {
		User currentUser = UserUtils.getCurrentUser(request);
		if(currentUser!=null){
			response.sendRedirect("/pages/mine.html");
		}else{
			WChatOAExample wChatOAExample =new WChatOAExample();
			Criteria criteria = wChatOAExample.createCriteria();
			criteria.andCodeEqualTo(authcode);
			List<WChatOA> list = wChatOAService.selectByExample(wChatOAExample);
			if(list.isEmpty()){
				response.sendRedirect("/pages/error/errorParam.html");
			}else{
				WChatOA wChatOA = list.get(0);
				if(wChatOA.getUseState()==0||wChatOA.getUseState()==10){
					HttpSession session = request.getSession();
					session.setAttribute("tempWChatOAData", wChatOA);
					int len=authcode.length();
					String subCode = authcode.substring(len-5, len);
					response.sendRedirect("/pages/bind.html?subCode="+subCode);
				}else{
					response.sendRedirect("/pages/error/usedCode.html");
				}
			}
		}
	}
	
	/**
	 * 跳转绑定页面
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	@RequestMapping("/weChatUserController/selectBinding")
	public void selectBinding(HttpServletRequest request,HttpServletResponse response) throws IOException {
		User currentUser = UserUtils.getCurrentUser(request);
		if(currentUser==null){
			response.sendRedirect("/pages/selectBinding.html");
		}else{
			response.sendRedirect("/pages/mine.html");
		}
	}
	
	/**
	 * 清除用户session(仅测试用)
	 * @param session
	 * @return
	 */
	@RequestMapping("/weChatUserController/clearSession")
	@ResponseBody
	public String clearSession(HttpSession session){
		session.removeAttribute("currentUser");
		return "";
	}
}
