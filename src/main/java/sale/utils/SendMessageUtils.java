package sale.utils;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.log4j.Logger;

/**
 * 短信发送工具类
 * @author Administrator
 *
 */
public class SendMessageUtils {
	
	private static String sendMessageUrl = PropertiesUtils.getProperty("sendMessageUrl");
	private static String productID="42";
	private static String key="454asd*d2LP";
	private static Logger log=Logger.getLogger(SendMessageUtils.class);
	
	private SendMessageUtils(){
	}
	
	/**
	 * 发送短信
	 * @param mobile 手机号
	 * @param content 发送内容
	 * @return
	 */
	public static boolean sendMessage(String mobile,String content){
		String sign=DigestUtils.md5Hex(productID+mobile+key);
		NameValuePair pnv=new NameValuePair("ProductID", productID);
		NameValuePair mnv=new NameValuePair("Mobile", mobile);
		NameValuePair cnv=new NameValuePair("Content", content);
		NameValuePair snv=new NameValuePair("Sign", sign);
		NameValuePair[] params=new NameValuePair[]{pnv,mnv,cnv,snv};
		String result = HttpUtils.httpPost(sendMessageUrl, params).trim();
		if(!"0000".equals(result)){
			log.info("短信发送失败返回结果："+result);
			return false;
		}
		return true;
	}
}
