package sale.workflow.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sale.utils.JsonUtils;
import sale.utils.MD5;
import sale.utils.PropertiesUtils;

public class ParamCommon {
    private static final Logger log = LoggerFactory.getLogger(ParamCommon.class);
	public static void putCommonParam(Map<String, Object> paramap) {
	    log.info("----添加必填的调用接口公用请求参数开始(dataType,name,key)----");
		paramap.put("dataType", "json");
		paramap.put("name", PropertiesUtils.getProperty("serviceName"));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
		int thisDay = Integer.parseInt(sdf.format(new Date()).substring(6, 8));
		String md5 = MD5.getMD5(PropertiesUtils.getProperty("serviceName")+PropertiesUtils.getProperty("serviceCode")+ thisDay);
		paramap.put("key", md5);
		log.info("----添加必填的调用接口公用请求参数结束(dataType,name,key)----");
	}

}
