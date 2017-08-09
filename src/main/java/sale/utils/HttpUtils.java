package sale.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.httpclient.DefaultHttpMethodRetryHandler;
import org.apache.commons.httpclient.Header;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpException;
import org.apache.commons.httpclient.HttpStatus;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.log4j.Logger;
import org.junit.Test;

import com.fasterxml.jackson.core.format.InputAccessor;

public class HttpUtils {

//	private final static Logger log = Logger.getLogger(HttpUtils.class);

	public static String httpGet(String url, String params) {
//		log.info("发送get请求,url为" + url + " , 参数为" + params);
		long start = System.currentTimeMillis();
		HttpClient httpClient = new HttpClient();
		// 创建GET方法的实例
		GetMethod getMethod = new GetMethod(url + "?" + params);
		// 使用系统提供的默认的恢复策略
		getMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());
		try {
			// 执行getMethod
			int statusCode = httpClient.executeMethod(getMethod);
			if (statusCode != HttpStatus.SC_OK) {
				System.err.println("Method failed: " + getMethod.getStatusLine());
			}
			// 读取内容
//			byte[] responseBody = getMethod.getResponseBody();
			InputStream inputStream = getMethod.getResponseBodyAsStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(inputStream,"utf-8"));
			String tempbf = "";
			StringBuffer html = new StringBuffer(100);
			while ((tempbf = br.readLine()) != null) {
			    html.append(tempbf +"\n");
			}
//			log.info("post应答内容 ： "+html.toString());
			// 处理内容
			// 记录http请求获到应答所用的时间
			long end = System.currentTimeMillis();
			long time = end-start;
			long hour = time/(3600*1000);
			long minute = time%(3600*1000)/(60*1000);
			long second = time%(3600*1000)%(60*1000)/1000;
			long millisecond = time%(3600*1000)%(60*1000)%1000;
//			log.info(url+" get请求用时 ："+hour+"小时， "+minute+"分钟， "+second+"."+millisecond+"秒");
			return html.toString();
		} catch (HttpException e) {
			// 发生致命的异常，可能是协议不对或者返回的内容有问题
			System.out.println("Please check your provided http address!");
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			// 发生网络异常
			e.printStackTrace();
			return null;
		} finally {
			// 释放连接
			getMethod.releaseConnection();
		}
	}

	public static String httpPost(String url, NameValuePair[] params) {
		String log_param = "";
		for(NameValuePair nameValuePair : params) {
			log_param += nameValuePair.getName()+":"+nameValuePair.getValue()+", ";
		}
//		log.info("发送post请求，url为" + url+", 参数为 : "+log_param);
		long start = System.currentTimeMillis();
		HttpClient httpClient = new HttpClient();
		PostMethod postMethod = new PostMethod(url);
		// 将表单的值放入postMethod中
		postMethod.getParams().setParameter(HttpMethodParams.RETRY_HANDLER, new DefaultHttpMethodRetryHandler());
		postMethod.setRequestHeader("Content-type", PostMethod.FORM_URL_ENCODED_CONTENT_TYPE + "; charset=UTF-8");
		postMethod.setRequestBody(params);
		// 执行postMethod
		try {
			int statusCode = httpClient.executeMethod(postMethod);
			// HttpClient对于要求接受后继服务的请求，象POST和PUT等不能自动处理转发
			// 301或者302
			if (statusCode == HttpStatus.SC_MOVED_PERMANENTLY || statusCode == HttpStatus.SC_MOVED_TEMPORARILY) {
				// 从头中取出转向的地址
				Header locationHeader = postMethod.getResponseHeader("location");
				String location = null;
				if (locationHeader != null) {
					location = locationHeader.getValue();
					System.out.println("The page was redirected to:" + location);
				} else {
					System.err.println("Location field value is null.");
				}
				return null;
			}
			// 读取内容
//			byte[] responseBody = postMethod.getResponseBody();
			InputStream inputStream = postMethod.getResponseBodyAsStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(inputStream,"utf-8"));
			String tempbf = "";
			StringBuffer html = new StringBuffer(100);
			while ((tempbf = br.readLine()) != null) {
			    html.append(tempbf +"\n");
			}
//			log.info("post应答内容 ： "+html.toString());
			// 处理内容
			// 记录http请求获到应答所用的时间
			long end = System.currentTimeMillis();
			long time = end-start;
			long hour = time/(3600*1000);
			long minute = time%(3600*1000)/(60*1000);
			long second = time%(3600*1000)%(60*1000)/1000;
			long millisecond = time%(3600*1000)%(60*1000)%1000;
//			log.info(url+" post请求用时 ："+hour+"小时， "+minute+"分钟， "+second+"."+millisecond+"秒");
			return html.toString();
		} catch (HttpException e) {
			// 发生致命的异常，可能是协议不对或者返回的内容有问题
			System.out.println("Please check your provided http address!");
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			// 发生网络异常
			e.printStackTrace();
			return null;
		} finally {
			// 释放连接
			postMethod.releaseConnection();
		}
	}

	public static String httpGet(String url, Map<String, Object> map) {
		// 参数转换
		String params = "";
		for (Map.Entry<String, Object> entry : map.entrySet()) {
		  if (null != entry.getValue()) {
			params = params + entry.getKey() + "=" + entry.getValue().toString() + "&";
		  } else {
		    params = params + entry.getKey() + "=" + ""+ "&";
          }
		}
		if (!map.isEmpty()) {
			params = params.substring(0, params.length() - 1);
		}
		// 发送请求
		return httpGet(url, params);
	}

	public static String httpPost(String url, Map<String, Object> map) {
		// 参数转换
		List<NameValuePair> list = new ArrayList<>();
		NameValuePair[] params = null;
		for (Map.Entry<String, Object> entry : map.entrySet()) {
			if (null != entry.getValue()) {
				list.add(new NameValuePair(entry.getKey(), entry.getValue().toString()));
			} else {
				list.add(new NameValuePair(entry.getKey(), null));
			}
		}
		params = list.toArray(new NameValuePair[list.size()]);
		// 发送请求
		return httpPost(url, params);
	}

	@Test
	public void test() {
		Map<String, Object> map = new HashMap<>();
		map.put("name", "zhangsan");
		map.put("age", 17);

		String response = httpPost("http://admin.shitibao.zxxk.com", map);
		System.out.println(response);
	}

}
