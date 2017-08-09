package sale.utils;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

public class WeChatUtils {
	
	private static Logger log=Logger.getLogger(WeChatUtils.class);
	
	private WeChatUtils(){
	}
	
	/**
	 * 使用户跳转到微信服务接口
	 * @param request
	 * @param response
	 * @throws IOException 
	 */
	public static void redirectToWeChat(HttpServletRequest request,HttpServletResponse response) throws IOException {
		//获取访问地址存入session，便于获取openid后请求转发
		String queryString = request.getQueryString();
		if(queryString==null){
			queryString="";
		}
		String requestURI = request.getRequestURI();
		HttpSession session = request.getSession();
		session.setAttribute("uriBeforeRedirect", requestURI);
		session.setAttribute("queryStringBeforeRedirect", queryString);
		log.info("session存入的url:"+requestURI+"?"+queryString);
		//引导用户请求重定向到微信服务器接口
		String appid = PropertiesUtils.getProperty("appid");
		String domain=PropertiesUtils.getProperty("domain");
		String callBackUrl = PropertiesUtils.getProperty("callBackUrl");
		String encodeURL = URLEncoder.encode("http://"+domain+callBackUrl, "UTF-8");
		String redirectURL="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+encodeURL+"&response_type=code&scope=snsapi_base#wechat_redirect";
		log.info("跳转微信服务器接口的url:"+redirectURL);
		response.sendRedirect(redirectURL);
	}

	/**
	 * 获取公众号基础access_token
	 * @return access_token 若异常则返回null
	 */
	public static String getAccessToken(){
		String accessToken = PropertiesUtils.getProperty("access_token");
		String tokenExpiresTime = PropertiesUtils.getProperty("token_expires_time");
		if(MyStringUtils.isEmpty(tokenExpiresTime)||new Date(Long.parseLong(tokenExpiresTime)).before(new Date())){
			String appid=PropertiesUtils.getProperty("appid");
			String secret=PropertiesUtils.getProperty("secret");
			String url="https://api.weixin.qq.com/cgi-bin/token";
			String params="grant_type=client_credential&appid="+appid+"&secret="+secret;
			String data = HttpUtils.httpGet(url, params);
			JSONObject jsonObject=JSONObject.fromObject(data);
			Object o=jsonObject.get("access_token");
			if(o==null){
				log.error("获取token失败，返回数据："+data);
				return null;
			}
			accessToken = (String)o;
			Long expireTime=new Date().getTime()+(Long.parseLong(jsonObject.getString("expires_in"))-60)*1000;
			PropertiesUtils.setProperty("access_token", accessToken);
			PropertiesUtils.setProperty("token_expires_time", expireTime.toString());
		}
		return accessToken;
	}
	
	/**
	 * 获取微信JS接口的临时票据
	 * @return jsapi_ticket 若异常返回null
	 */
	public static String getJsapiTicket(){
		String ticket = PropertiesUtils.getProperty("ticket");
		String ticketExpiresTime = PropertiesUtils.getProperty("ticket_expires_time");
		if(MyStringUtils.isEmpty(ticketExpiresTime)||new Date(Long.parseLong(ticketExpiresTime)).before(new Date())){
			String accessToken = getAccessToken(); 
			if(accessToken==null){
				return null;
			}
			String url="https://api.weixin.qq.com/cgi-bin/ticket/getticket";
			String params="access_token="+accessToken+"&type=jsapi";
			String data = HttpUtils.httpGet(url, params);
			JSONObject jsonObject=JSONObject.fromObject(data);
			Object o = jsonObject.get("ticket");
			if(o==null){
				log.error("获取ticket失败，返回数据："+data);
				return null;
			}
			ticket=(String)o;
			Long expireTime=new Date().getTime()+(Long.parseLong(jsonObject.getString("expires_in"))-60)*1000;
			PropertiesUtils.setProperty("ticket", ticket);
			PropertiesUtils.setProperty("ticket_expires_time", expireTime.toString());
		}
		return ticket;
	}
	
	/**
	 * 获取微信用户信息
	 * @param request
	 * @return 若失败返回null，成功返回json对象
	 */
	public static JSONObject getWeChatUserInfo(HttpServletRequest request){
		String url="https://api.weixin.qq.com/cgi-bin/user/info";
		String accessToken = getAccessToken();
		String openid=(String)request.getSession().getAttribute("openid");
		String params="access_token="+accessToken+"&openid="+openid+"&lang=zh_CN";
		String result = HttpUtils.httpGet(url, params);
		JSONObject object=JSONObject.fromObject(result);
		if(object.get("errcode")!=null){
			log.error("获取微信用户信息失败返回json："+result);
			return null;
		}
		return object;
	}
}
