package sale.user.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sale.utils.HttpUtils;
import sale.utils.MyStringUtils;
import sale.utils.PropertiesUtils;
import sale.utils.WeChatUtils;

@Controller
@RequestMapping("/weChatController")
public class WeChatController {
	
	private Logger log=Logger.getLogger(WeChatController.class);
	
	/**
	 * 微信回调函数，用于获取code，通过code获取openid
	 * @param request
	 * @param response
	 * @param code
	 * @throws IOException
	 */
	@RequestMapping("/callBack")
	public void callBack(HttpServletRequest request,HttpServletResponse response,String code) throws IOException{
		try{
			//判断是否请求成功
			if(MyStringUtils.isEmpty(code)){
				log.error("微信拒绝授权");
				response.sendRedirect("/pages/error/commonError.html");
			}
			//根据用户授权code，获得openid
			String appid = PropertiesUtils.getProperty("appid");
			String secret = PropertiesUtils.getProperty("secret");
			String params="appid="+appid+"&secret="+secret+"&code="+code+"&grant_type=authorization_code";
			String httpURL="https://api.weixin.qq.com/sns/oauth2/access_token";
			String data = HttpUtils.httpGet(httpURL, params);
			JSONObject jsonObject = JSONObject.fromObject(data);
			Object o=jsonObject.get("openid");
			if(o==null){
				log.error("token错误返回json："+data);
				response.sendRedirect("/pages/error/commonError.html");
			}
			String openid = (String)o;
			log.info("token返回json："+data);
			HttpSession session = request.getSession();
			session.setAttribute("openid", openid);
			log.info("获取的用户openid:"+openid);
			//请求转发之前访问的地址
			String uriBeforeRedirect = (String)session.getAttribute("uriBeforeRedirect");
			String queryStringBeforeRedirect = (String)session.getAttribute("queryStringBeforeRedirect");
			String url=uriBeforeRedirect;
			if(MyStringUtils.isNotEmpty(queryStringBeforeRedirect)){
				url=uriBeforeRedirect+"?"+queryStringBeforeRedirect;
			}
			log.info("session取出的url:"+url);
			response.sendRedirect(url);
		}catch(Exception e){
			log.error("非主线代码错误", e);
			response.sendRedirect("/pages/error/commonError.html");
		}
	}
	
	/**
	 * 用于微信Token验证
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/check")
	@ResponseBody
	public String getData(HttpServletRequest request) {
		return request.getParameter("echostr");
	}

	/**
	 * 获取微信JS-SDK签名
	 * @param html html页面的相对根目录地址
	 * @return json
	 */
	@RequestMapping("/getSignature")
	@ResponseBody
	public Map<String,String> getSignature(String url){
		Map<String,String> map=new HashMap<>();
		String noncestr=UUID.randomUUID().toString();
		String timestamp=String.valueOf(new Date().getTime()/1000);
		String ticket = WeChatUtils.getJsapiTicket();
		if(ticket==null){
			map.put("message", "调用微信失败，请稍后再试！");
			return map;
		}
		map.put("noncestr", noncestr);
		map.put("timestamp", timestamp);
		String str="jsapi_ticket="+ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;
		String signature=DigestUtils.shaHex(str);
		map.put("signature", signature);
		String appid = PropertiesUtils.getProperty("appid");
		map.put("appid", appid);
		return map;
	}
}
