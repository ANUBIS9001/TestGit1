package sale.utils;

import java.security.MessageDigest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sale.workflow.common.ParamCommon;

public class MD5 {
    private static final Logger log = LoggerFactory.getLogger(MD5.class);
	public final static String getMD5(String s) {
	    log.info("--md5加密开始--");
		char hexDigits[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
				'a', 'b', 'c', 'd', 'e', 'f' };
		try {
			byte[] strTemp = s.getBytes();
			MessageDigest mdTemp = MessageDigest.getInstance("MD5");
			mdTemp.update(strTemp);
			byte[] md = mdTemp.digest();
			int j = md.length;
			char str[] = new char[j * 2];
			int k = 0;
			for (int i = 0; i < j; i++) {
				byte byte0 = md[i];
				str[k++] = hexDigits[byte0 >>> 4 & 0xf];
				str[k++] = hexDigits[byte0 & 0xf];
			}
			log.info("--md5加密结束--");
			return new String(str);
		} catch (Exception e) {
		    log.error("--md5加密异常--:"+e.getMessage());
			return null;
		}
	}

	public static void main(String[] args) {
		System.out.println(getMD5("sales6147a2ac14ce2f96d883b4f99e7751b09"));
	}
}