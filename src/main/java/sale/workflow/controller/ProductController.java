package sale.workflow.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import sale.user.bean.User;
import sale.utils.HttpUtils;
import sale.utils.MyStringUtils;
import sale.utils.PropertiesUtils;
import sale.utils.UserUtils;
import sale.utils.XMLUtils;
import sale.workflow.bean.Product;
import sale.workflow.common.ParamCommon;
import sale.workflow.service.ProductService;

@Controller
public class ProductController {
//	private static final Logger log = LoggerFactory.getLogger(ProductController.class);

	@Resource
	ProductService productService;
	
	/**
	 * 产品列表页面数据
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/product/GetAllProduct.json")
	@ResponseBody
	public String GetSchoolListBySearch(HttpServletRequest request) {
		String result = "";
		try
		{
			//以访问接口的方式取得产品列表，这部分代码留作以后备用
//			Map<String,Object> paramap=new HashMap<String,Object>();
//			ParamCommon.putCommonParam(paramap);			
//			if(request.getMethod().equals("POST")) {
//				String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
//				result = HttpUtils.httpPost(serviceUrl+"/ProductService.asmx/GetAllProduct", paramap);
//				System.out.println(result);
//				result = XMLUtils.getRootText(result);
//			}else{
//				log.error("不是POST请求");
//				result = "error:not post";
//				
//				JSONObject resultError = new JSONObject();
//				resultError.put("error", result);
//				result = resultError.toString();
//			}
//			JSONObject resultObject = JSONObject.fromObject(result);
//			if(!resultObject.get("Code").toString().equals("200")){
//				JSONObject resultError = new JSONObject();
//				resultError.put("error", resultObject.get("Code"));
//				return resultError.toString();
//			}
//			result = productService.HandleResultProductList(result);
			
			//通过读取数据库得到产品列表
			List<Product> productList = productService.getAllProduct();
			if (null != productList && productList.size() > 0) {
				JSONArray resultObject = JSONArray.fromObject(productList);
				result = resultObject.toString();
			}else{
//				log.error("产品列表查不到数据！");
				JSONObject resultError = new JSONObject();
				resultError.put("error", "产品列表查不到数据！");
				result = resultError.toString();
			}
		}catch(Exception e){
//			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		
		return result;
	}
	
	/**
	 * 用来得到当前登陆人的信息
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/product/GetSellerInfo.json")
	@ResponseBody
	public String GetSellerInfo(HttpServletRequest request) {
		try
		{
			User seller = UserUtils.getCurrentUser(request);
			JSONObject resultObject = new JSONObject();
			resultObject.put("sellerId", seller.getEmpCode());
			resultObject.put("sellerName", seller.getEmpName());
			
			//测试用
			//resultObject.put("sellerId", "xy02885");
			//resultObject.put("sellerName", "郑迪龙");
			
			return resultObject.toString();
		}catch(Exception e){
//			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			String result = "无法取得当前登录人信息！";
			
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
			return result;
		}
	}
	
	/**
	 * 产品详情页的数据
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/product/GetSchoolLinkById.json")
	@ResponseBody
	public String GetSchoolLinkById(HttpServletRequest request) {
		String result = "";
		try
		{
			// 分配参数
			String schoolId = MyStringUtils.checkIntegerParam(request.getParameter("schoolId")); 
			String productId = MyStringUtils.checkIntegerParam(request.getParameter("productId"));
			String sellerId = MyStringUtils.checkIntegerParam(request.getParameter("sellerId"));
			
			Map<String,Object> paramap=new HashMap<String,Object>();
			
			ParamCommon.putCommonParam(paramap);			
			paramap.put("schoolID", schoolId);
			paramap.put("productID", productId);
			paramap.put("sellerID", sellerId);
			
			if(request.getMethod().equals("POST")) {
				String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
				result = HttpUtils.httpPost(serviceUrl+"/SchoolExtensionService.asmx/GetSchoolLinkByID", paramap);
				System.out.println(result);
				result = XMLUtils.getRootText(result);
			}else{
//				log.error("不是POST请求");
				result = "error:not post";
				
				JSONObject resultError = new JSONObject();
				resultError.put("error", result);
				result = resultError.toString();
			}
			
			JSONObject resultObject = JSONObject.fromObject(result);
			if(!resultObject.get("Code").toString().equals("200")){
				JSONObject resultError = new JSONObject();
				resultError.put("error", resultObject.get("Message"));
				if(resultObject.get("Code").toString().equals("401")){ //无权操作他人所属校，此处未做非空判断，因为如果为空会按照异常处理。
					resultError.put("denied", "denied");
				}				
				return resultError.toString();
			}
		}catch(Exception e){
//			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
	
	protected static String servicePost(String apiUrl, String name, NameValuePair... params) throws IOException {
	    String re;
	    String key = name + "@" + Arrays.toString(params);
	 
	
	    long startTime = System.currentTimeMillis();
	    try {
			HttpPost request = new HttpPost(apiUrl);
			List<NameValuePair> param = new ArrayList<>();
			Collections.addAll(param, params);
			((HttpResponse) request).setEntity(new UrlEncodedFormEntity(param));
			CloseableHttpResponse resp = HttpClients.createDefault().execute(request);
			re = EntityUtils.toString(resp.getEntity(), "UTF-8");
			return re;
	    } finally {
	      System.out.println("productParam service: {} ({}) ,use times:{}"+ name+ Arrays.toString(params)+
	          (System.currentTimeMillis() - startTime));
	    }
	
	 }	
	
	@SuppressWarnings("deprecation")
	public static void main(String[] args) throws Exception {  
        DefaultHttpClient httpclient = new DefaultHttpClient();  
        HttpPost httpPost = new HttpPost("http://10.1.22.52:8080/userInterface");  
        List<NameValuePair> nvps = new ArrayList<NameValuePair>();  
//        nvps.add(new BasicNameValuePair("username", "vip"));  
//        nvps.add(new BasicNameValuePair("password", "secret")); 
        
        nvps.add(new BasicNameValuePair("schoolId", "2348"));
	    nvps.add(new BasicNameValuePair("userId", "28732172"));	    
	    nvps.add(new BasicNameValuePair("signature", "0793e7f54377404d0ba2419a1aacda80"));
        
        httpPost.setEntity(new UrlEncodedFormEntity(nvps));  
        httpclient.execute(httpPost);  
        httpclient.getConnectionManager().shutdown();  
    }  
	
//	public static void main(String[] args) throws Exception {  
//        HttpClient httpclient = new HttpClient();  
//        PostMethod httpPost =new PostMethod("******/abc");  
//        NameValuePair[] param = { new NameValuePair("username", "vip")};  
//        httpPost.setRequestBody(param);   
//        httpclient.executeMethod(httpPost);  
//    }  
	
//	public static void main(String[] args) {  
//		
//		List<NameValuePair> nvp = new ArrayList<>();
//		
//		nvps.add(new BasicNameValuePair("schoolId", "2348"));
//	    nvps.add(new BasicNameValuePair("userId", "28732172"));	    
//	    nvps.add(new BasicNameValuePair("signature", "0793e7f54377404d0ba2419a1aacda80"));
//
//	    
//		String result;
//		try {
//			result = servicePost("http://10.1.22.52:8080/userInterface","test", nvp.toArray(new NameValuePair[nvp.size()]));
//
//			System.out.println(result);
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}
	
	/**
	 * 洽谈情况的录入
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/product/AddSchoolLink.json")
	@ResponseBody
	public String AddSchoolLink(HttpServletRequest request) {
		String result = "";
		try
		{
			// 分配参数
			String SchoolId = MyStringUtils.checkIntegerParam(request.getParameter("SchoolId")); 
			String productId = MyStringUtils.checkIntegerParam(request.getParameter("productId"));
			String CustomerId = MyStringUtils.checkIntegerParam(request.getParameter("CustomerId")); 
			
			String SchoolName = MyStringUtils.checkStringParam(request.getParameter("SchoolName")); 
			String LinkResult = MyStringUtils.checkStringParam(request.getParameter("LinkResult")); 
			String Remark = MyStringUtils.checkStringParam(request.getParameter("Remark")); 
			String SellerID = MyStringUtils.checkStringParam(request.getParameter("SellerID"));
			String SellerName = MyStringUtils.checkStringParam(request.getParameter("SellerName"));
			
			//无意向:1 有意向:2 回访:5
			if(LinkResult.equals("contacted")){
				LinkResult = "2";
			}else if(LinkResult.equals("noIntention")){
				LinkResult = "1";
			}else if(LinkResult.equals("revisit")){
				LinkResult = "5";
			}
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String LinkTime = sdf.format(new Date());
			
			Map<String,Object> paramap=new HashMap<String,Object>();
			
			ParamCommon.putCommonParam(paramap);			
			paramap.put("SchoolId", SchoolId);
			paramap.put("productId", productId);
			paramap.put("CustomerId", CustomerId);
			paramap.put("SchoolName", SchoolName);
			paramap.put("LinkResult", LinkResult);
			paramap.put("Remark", Remark);
			paramap.put("SellerID", SellerID);
			paramap.put("SellerName", SellerName);
			paramap.put("LinkTime", LinkTime);
			
			if(request.getMethod().equals("POST")) {
				String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
				result = HttpUtils.httpPost(serviceUrl+"/SchoolExtensionService.asmx/AddSchoolLink", paramap);
				System.out.println(result);
				result = XMLUtils.getRootText(result);
			}else{
//				log.error("不是POST请求");
				result = "error:not post";
				
				JSONObject resultError = new JSONObject();
				resultError.put("error", result);
				result = resultError.toString();
			}
			
			JSONObject resultObject = JSONObject.fromObject(result);
			if(!resultObject.get("Code").toString().equals("200")){
				JSONObject resultError = new JSONObject();
				resultError.put("error", resultObject.get("Message"));
				return resultError.toString();
			}
		}catch(Exception e){
//			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
	
	//关注信息的获得
	@RequestMapping(value = "/product/MyAttentionSchool.json")
	@ResponseBody
	public String MyAttentionSchool(HttpServletRequest request) {
		String result = "";
		try
		{
			// 分配参数
			String schoolId = MyStringUtils.checkIntegerParam(request.getParameter("schoolId")); 
			String productId = MyStringUtils.checkIntegerParam(request.getParameter("productId"));
			String sellerId = MyStringUtils.checkIntegerParam(request.getParameter("sellerId"));
			String schoolName = MyStringUtils.checkStringParam(request.getParameter("schoolName"));
			
			String status = MyStringUtils.checkStringParam(request.getParameter("status"));
			String schoolType = MyStringUtils.checkStringParam(request.getParameter("schoolType")); 
			String stages = MyStringUtils.checkStringParam(request.getParameter("stages"));
			String schoolLevel = MyStringUtils.checkStringParam(request.getParameter("schoolLevel"));
			String useLevel = MyStringUtils.checkStringParam(request.getParameter("useLevel"));
			
			Map<String,Object> paramap=new HashMap<String,Object>();
			
			ParamCommon.putCommonParam(paramap);			
			paramap.put("schoolID", schoolId);
			paramap.put("productID", productId);
			paramap.put("sellerID", sellerId);
			
			//新增参数
			paramap.put("status", status);
			paramap.put("schoolType", schoolType);
			paramap.put("stages", stages);
			paramap.put("schoolLevel", schoolLevel);
			paramap.put("useLevel", useLevel);
			
			paramap.put("schoolName", schoolName);
			paramap.put("provinceId", "0");
			paramap.put("cityId", "0");
			paramap.put("districtId", "0");
			paramap.put("pageSize", "1");
			paramap.put("page", "1");
			
			if(request.getMethod().equals("POST")) {
				String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
				result = HttpUtils.httpPost(serviceUrl+"/OrderListService.asmx/MyAttentionSchool", paramap);
				System.out.println(result);
				result = XMLUtils.getRootText(result);
			}else{
//				log.error("不是POST请求");
				result = "error:not post";
				
				JSONObject resultError = new JSONObject();
				resultError.put("error", result);
				result = resultError.toString();
			}
			
			JSONObject resultObject = JSONObject.fromObject(result);
			if(!resultObject.get("Code").toString().equals("200")){
				JSONObject resultError = new JSONObject();
				resultError.put("error", resultObject.get("Message"));
				if(resultObject.get("Code").toString().equals("401")){ //无权操作他人所属校，此处未做非空判断，因为如果为空会按照异常处理。
					resultError.put("denied", "denied");
				}				
				return resultError.toString();
			}
		}catch(Exception e){
//			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
	
	//关注状态的修改
	@RequestMapping(value = "/product/ModifyAttention.json")
	@ResponseBody
	public String ModifyAttention(HttpServletRequest request) {
		String result = "";
		try
		{
			// 分配参数
			String schoolId = MyStringUtils.checkIntegerParam(request.getParameter("schoolId")); 
			String productId = MyStringUtils.checkIntegerParam(request.getParameter("productId"));
			String sellerId = MyStringUtils.checkIntegerParam(request.getParameter("sellerId"));
			
			String type = MyStringUtils.checkStringParam(request.getParameter("type"));
			
			Map<String,Object> paramap=new HashMap<String,Object>();
			
			ParamCommon.putCommonParam(paramap);			
			paramap.put("schoolID", schoolId);
			paramap.put("productID", productId);
			paramap.put("sellerID", sellerId);
			paramap.put("type", type);
			
			if(request.getMethod().equals("POST")) {
				String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
				result = HttpUtils.httpPost(serviceUrl+"/OrderListService.asmx/ModifyAttention", paramap);
				System.out.println(result);
				result = XMLUtils.getRootText(result);
			}else{
//				log.error("不是POST请求");
				result = "error:not post";
				
				JSONObject resultError = new JSONObject();
				resultError.put("error", result);
				result = resultError.toString();
			}
			
			JSONObject resultObject = JSONObject.fromObject(result);
			if(!resultObject.get("Code").toString().equals("200")){
				JSONObject resultError = new JSONObject();
				resultError.put("error", resultObject.get("Message"));
				if(resultObject.get("Code").toString().equals("401")){ //无权操作他人所属校，此处未做非空判断，因为如果为空会按照异常处理。
					resultError.put("denied", "denied");
				}				
				return resultError.toString();
			}
		}catch(Exception e){
//			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
}
