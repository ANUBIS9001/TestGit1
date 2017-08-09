package sale.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;

/**
 * 获取properties中的属性
 * @author wangwei01
 * @time 2016年5月7日 上午11:54:35
 */
public class PropertiesUtils {
	
	private static Properties prop = new Properties();

	static {
		try {
			InputStream in = PropertiesUtils.class.getResourceAsStream("/config/config.properties");
			prop.load(in);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static String getProperty(String key) {
		return prop.getProperty(key);
	}
	
	public static void setProperty(String key, String value) {
		prop.setProperty(key, value);
	}
}
