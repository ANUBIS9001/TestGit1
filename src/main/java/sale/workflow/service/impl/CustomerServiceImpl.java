package sale.workflow.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.dom4j.DocumentException;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sale.user.bean.User;
import sale.utils.HttpUtils;
import sale.utils.JsonUtils;
import sale.utils.PropertiesUtils;
import sale.utils.UserUtils;
import sale.workflow.bean.Product;
import sale.workflow.common.Constants;
import sale.workflow.common.ParamCommon;
import sale.workflow.dao.ProductDao;
import sale.workflow.service.CustomerService;

import sale.utils.XMLUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;


@Service("customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService{
  
  private static final Logger log = LoggerFactory.getLogger(CustomerServiceImpl.class);
	
  	@Resource
  	ProductDao productDao;
	
  	@Override
	public JSONObject GetProvince(){
		try
		{
			Map<String,Object> paramap=new HashMap<String,Object>();		
			ParamCommon.putCommonParam(paramap);	
			
			String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
			String result = HttpUtils.httpPost(serviceUrl+"/AreaService.asmx/GetProvince", paramap);
			System.out.println(result);
			result = XMLUtils.getRootText(result);
			
			JSONObject resultProvince = JSONObject.fromObject(result);
			
			if(!resultProvince.get("Code").toString().equals("200")){
				throw new RuntimeException("获取省信息失败，错误:"+resultProvince.get("Code").toString());
			}
			
			return resultProvince;
		}catch(Exception e){
			log.error("获取省信息失败，错误:"+e.getMessage());
			e.printStackTrace();
			throw new RuntimeException("获取省信息失败，错误:"+e.getMessage());
		}
	} 
	
	@Override
	public JSONObject GetCityByProvinceID(int provinceID){
		try
		{
			Map<String,Object> paramap=new HashMap<String,Object>();		
			ParamCommon.putCommonParam(paramap);
			paramap.put("provinceID", provinceID);
			
			String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
			String result = HttpUtils.httpPost(serviceUrl+"/AreaService.asmx/GetCityByProvinceID", paramap);
			System.out.println(result);
			result = XMLUtils.getRootText(result);
			
			JSONObject resultCity = JSONObject.fromObject(result);
			
			if(!resultCity.get("Code").toString().equals("200")){
				throw new RuntimeException("获取城市信息失败，错误:"+resultCity.get("Code").toString()+" provinceID："+provinceID);
			}
			
			return resultCity;
		}catch(Exception e){
			log.error("获取城市信息失败，错误:"+e.getMessage()+" provinceID："+provinceID);
			e.printStackTrace();
			throw new RuntimeException("获取城市信息失败，错误:"+e.getMessage()+" provinceID："+provinceID);
		}
	} 
	
	@Override
	public JSONObject GetDistrictByCityID(int cityID){
		try
		{
			Map<String,Object> paramap=new HashMap<String,Object>();		
			ParamCommon.putCommonParam(paramap);
			paramap.put("cityID", cityID);
			
			String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
			String result = HttpUtils.httpPost(serviceUrl+"/AreaService.asmx/GetDistrictByCityID", paramap);
			System.out.println(result);
			result = XMLUtils.getRootText(result);
			
			JSONObject resultDistrict = JSONObject.fromObject(result);
			
			if(!resultDistrict.get("Code").toString().equals("200")){
				throw new RuntimeException("获取区县信息失败，错误:"+resultDistrict.get("Code").toString()+" cityID："+cityID);
			}
			
			return resultDistrict;
		}catch(Exception e){
			log.error("获取区县信息失败，错误:"+e.getMessage()+" cityID："+cityID);
			e.printStackTrace();
			throw new RuntimeException("获取区县信息失败，错误:"+e.getMessage()+" cityID："+cityID);
		}
	} 
	
	@Override
	public String HandleResultSchoolList(String result){
		try
		{
		
			JSONObject resultObject = JSONObject.fromObject(result);
			if(!resultObject.get("Code").toString().equals("200")){
				JSONObject resultError = new JSONObject();
				resultError.put("error", resultObject.get("Message"));
				return resultError.toString();
			}
			JSONObject listObject = resultObject.getJSONObject("Data");
			JSONArray listArray = listObject.getJSONArray("List");
			
			JSONObject myObject=null;
			//先获取省列表
			JSONArray provinceObject = JSONArray.fromObject(GetProvince().get("Data"));
			
			for(int i=0;i<listArray.size();i++){
				String nameStr = "";
				
				//为了后面的处理此处不能新建对象
				myObject = (JSONObject) listArray.get(i);
				
				if(!JSONObject.fromObject(provinceObject.get(0)).isNullObject())
				{
					//通过省的号码得到省的名字
					for (int pNo = 0; pNo < provinceObject.size(); pNo++) {
						JSONObject province = JSONObject.fromObject(provinceObject.get(pNo));
						if (myObject.get("ProvinceID").toString().equals(province.get("id").toString())) {
							nameStr+=province.get("name");
							break;
						}
					}
				}
								
				int provinceID = Integer.parseInt(myObject.get("ProvinceID").toString());
				try 
				{
					JSONArray cityObject = JSONArray.fromObject(GetCityByProvinceID(provinceID).get("Data"));
					if (!JSONObject.fromObject(cityObject.get(0)).isNullObject()) {

						// 根据市的号码从对应的呃城市列表得到名字
						for (int cNo = 0; cNo < cityObject.size(); cNo++) {
							JSONObject city = JSONObject.fromObject(cityObject.get(cNo));
							if (myObject.get("CityID").toString().equals(city.get("id").toString())) {
								if (nameStr.equals("")) {
									nameStr += city.get("name");
								} else {
									nameStr += "." + city.get("name");
								}
								break;
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				int CityID = Integer.parseInt(myObject.get("CityID").toString());
				try 
				{
					JSONArray districtObject = JSONArray.fromObject(GetDistrictByCityID(CityID).get("Data"));
					if (!JSONObject.fromObject(districtObject.get(0)).isNullObject()) {
						// 根据区县号码从对应的区县列表得到名字
						for (int dNo = 0; dNo < districtObject.size(); dNo++) {
							JSONObject district = JSONObject.fromObject(districtObject.get(dNo));
							if (myObject.get("DistrictID").toString().equals(district.get("id").toString())) {
								if (nameStr.equals("")) {
									nameStr += district.get("name");
								} else {
									nameStr += "." + district.get("name");
								}
								break;
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				
				myObject.element("FullSchoolName", "【"+nameStr+"】 "+myObject.get("SchoolName"));
			}
			
			return resultObject.toString();
		}catch(Exception e){
			log.error("处理加载的学校列表异常，错误:"+e.getMessage());
			e.printStackTrace();
			throw new RuntimeException("处理加载的学校列表异常，错误:"+e.getMessage());
		}
	}

  @Override
  public String addContact(Map<String, String> map) {
    //参数封装
    Map<String,Object> params = new HashMap<>();
    params.put("customer", map.get("name"));
    params.put("customerJob",map.get("job"));
    params.put("linkPhone",map.get("tel"));
    params.put("linkMobile",map.get("mobilephone"));
    params.put("linkEmail",map.get("email"));
    params.put("linkQQ",map.get("qq"));
    params.put("schoolId",map.get("schoolID"));
    params.put("sellerId",map.get("sellerID"));
    params.put("sellerName",map.get("sellerName"));
    params.put("remark","测试");
    ParamCommon.putCommonParam(params);
    //添加联系人到数据库
    String ip = PropertiesUtils.getProperty("serviceUrl");
    String url = ip+"/SchoolLinkService.asmx/AddCustomer";
    log.info("----添加联系人到数据库开始----url:"+url+"参数:"+params.toString());
    Map<String, Object> apiMap = getApiResult(url,params);
    log.info("----添加联系人到数据库结束----结果:"+apiMap.toString());
    if(null == apiMap || apiMap.size()==0){
      log.error("接口返回数据为空或者解析json失败");
      return "{\"state\":\"1\",\"message\":\"添加联系人失败\"}";
    }
    String code = String.valueOf(apiMap.get("Code"));
    String message = String.valueOf(apiMap.get("Message"));
    if(code.equals("200")){
      log.info("添加联系人成功");
      return "{\"state\":\"0\",\"message\":\"添加联系人成功\"}";
    }
    log.error("添加联系人失败:"+message);
    return "{\"state\":\"1\",\"message\":\""+message+"\"}";
  }

  @Override
  public String getContactBySchoolID(Map<String, Object> params) {
    ParamCommon.putCommonParam(params);
    //请求接口
    String ip = PropertiesUtils.getProperty("serviceUrl");
    String url = ip+"/SchoolLinkService.asmx/SchoolLinkList";
    log.info("----获取学校联系人开始----url:"+url+"参数:"+params.toString());
    Map<String, Object> map = getApiResult(url,params);
    log.info("----获取学校联系人结束----结果:"+map.toString());
    if(null == map || map.size()==0){
      log.error("接口返回数据为空或者解析json失败");
      return "{\"state\":\"1\",\"message\":\"获取联系人信息失败\"}";
    }
    String code = String.valueOf(map.get("Code"));
    String message = String.valueOf(map.get("Message"));
    Object data = map.get("Data");
    String contact = null;
    String pageCount = null;
    String dataString = data+"";
    if(code.equals("200") ){
      if(data != null && !"null".equals(dataString)){
        String obj = ((Map)data).get("List")+"";
        if("null".equals(obj) || null==obj){
          log.info("{\"state\":\"0\",\"message\":\"暂无联系人\",\"contact\":\"null\"}");
          return "{\"state\":\"0\",\"message\":\"暂无联系人\",\"contact\":\"null\"}";
        }
        List<Map<String,Object>> list = (List)((Map)data).get("List");
        contact = JSONArray.fromObject(list).toString();
        pageCount = ((Map)data).get("PageCount")+"";
        log.info("获取联系人信息成功{contact:"+contact+"pageCount:"+pageCount+"}");
        return "{\"state\":\"0\",\"message\":\"获取联系人信息成功\",\"contact\":"+contact+",\"pageCount\":"+pageCount+"}";
      }else{
        log.info("获取联系人信息成功:"+message);
        return "{\"state\":\"0\",\"message\":\""+message+"\",\"contact\":\"null\",\"pageCount\":"+pageCount+"}";
      }
    }else{
      log.error("获取联系人信息失败:"+message);
      return "{\"state\":\"1\",\"message\":\"获取联系人信息失败\",\"contact\":"+contact+",\"pageCount\":"+pageCount+"}";
    }
    
  }
  /**
	 * @author hutairan
	 * @param schoolId
	 * @date 2016年5月9日 
	 * @description  获取学校绑定的产品
	 */
	@Override
	public JSONObject getSchoolProduct(String schoolId) {
		//请求URL地址 访问接口得到学校对应的产品
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("schoolID", schoolId);
		ParamCommon.putCommonParam(param);
		String serviceUrl = PropertiesUtils.getProperty("serviceUrl");
		String result = HttpUtils.httpGet(serviceUrl + "/OrderListService.asmx/ProductStatusList", param);
		System.out.println(result);
		try {
			result= XMLUtils.getRootText(result);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		//String转化成 map
		JSONObject json = JSONObject.fromObject(result);
		return json;
	}
	
	
	/**
	 * 根据sellerId查找用户信息
	 */
	public JSONObject getSellerById(String sellerId){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("sellerID", sellerId);
		ParamCommon.putCommonParam(param);
		String serviceUrl = PropertiesUtils.getProperty("serviceUrl");
		String result = HttpUtils.httpGet(serviceUrl + "/SellerService.asmx/GetSellerByID", param);
		System.out.println(result);
		try {
			result= XMLUtils.getRootText(result);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		//String转化成 map
		JSONObject json = JSONObject.fromObject(result);
		return json;
	}
	
	/**
	 * @author hutairan
	 * @param schoolId
	 * @date 2016年5月9日 
	 * @description  获取学校事件
	 */
	@Override
	public Map<String, Object> getSchoolEvent(String schoolId,Integer count,String empCode) {
		//当产品Id为0时候会调出所有的事件 
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("schoolID", schoolId);
		param.put("productID", 0);
		param.put("sellerID", empCode);
		ParamCommon.putCommonParam(param);
		
		String serviceUrl = PropertiesUtils.getProperty("serviceUrl");
		String result = HttpUtils.httpGet(serviceUrl+"/SchoolExtensionService.asmx/GetEventByID", param);
		try {
			result= XMLUtils.getRootText(result);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		//String转化成 map
		JSONObject json = JSONObject.fromObject(result);
		Map<String,Object> map = (Map<String,Object>)json;
		List<Map<String, Object>> product = new ArrayList<Map<String, Object>>();
		Map<String,Object> temp=(Map<String,Object>)map.get("Data");
		List<Map<String,Object>> data =new ArrayList<>();
		if(!(map.get("Data").toString()).equals("null")){
			data=(List<Map<String, Object>>) temp.get("List");
		}
		Integer code=(Integer)map.get("Code");
		//获取产品ID和名字
		if(code==200&&data!=null){
			for(int i=count;i<count+3&&i<data.size();i++){
				Long producID=Long.valueOf((Integer) data.get(i).get("ProductID"));
				Product p=productDao.getProductById(producID);
				if(p!=null&& producID!=0){
					data.get(i).put("productName", p.getName());
				}else{
					data.get(i).put("productName", "");
				}
				product.add(data.get(i));
			}
		}
		System.out.println(product);
		//获得返回结果
		Map<String, Object> resultmap = new HashMap<String, Object>();
		resultmap.put("resultsize", data.size());
		resultmap.put("code", code);
		resultmap.put("product", product);
		return resultmap;
	}
	
	@Override
	  public String getSalesOrderProtocol(Map<String, Object> params) {
	      Map<String, Object> myParams = putCommonParam(params);
	      if( null == myParams){
	        log.error("获取orderNum和sellerId失败");
	        return "{\"state\":\"1\",\"message\":\"获取订单协议失败\"}";
	      }
	      //获得联系人
//	      Map<String, Object> orderContact = getSalesOrderContact(myParams);
//	      if(orderContact==null){
//	        return "{\"state\":\"1\",\"message\":\"获取联系人失败\"}";
//	      }
//	      String state = String.valueOf(orderContact.get("state"));
//	      if("1".equals(state)){
//	        return "{\"state\":\"1\",\"message\":\"获取订单协议失败,"+String.valueOf(orderContact.get("msg"))+"\"}";
//	      }
//	      String LinkMan  = (String)orderContact.get("LinkMan");
//	      String LinkMobile = (String)orderContact.get("LinkMobile");
	      //发送请求
	      String ip = PropertiesUtils.getProperty("serviceUrl");
	      String urlProtocol = ip+"/OrderListService.asmx/ContractList";
	      log.info("----获得订单协议开始----url:"+urlProtocol+"参数:"+myParams.toString());
	      Map<String, Object> mapProtocol = getApiResult(urlProtocol,myParams);
	      log.info("----获得订单协议结束----结果:"+mapProtocol.toString());
	      if(null == mapProtocol || mapProtocol.size()==0){
	        log.error("接口返回数据为空或者解析json失败");
	        return "{\"state\":\"1\",\"message\":\"获取订单协议失败\",\"orderProcess\":\"null\"}";
	      }
	      //数据处理
	      String codeProtocol = String.valueOf(mapProtocol.get("Code"));
	      String message = String.valueOf(mapProtocol.get("Message"));
	      Object dataProtocol = mapProtocol.get("Data");
	      String dataProtocolString = dataProtocol+"";
	      if(codeProtocol.equals("200")){
	        if(dataProtocol != null && !"null".equals(dataProtocolString)){
	          String obj = ((Map)dataProtocol).get("List")+"";
              if("null".equals(obj) || null==obj){
                log.info("{\"state\":\"0\",\"message\":\"获取订单协议成功\",\"orderProcess\":\"null\"}");
                return "{\"state\":\"0\",\"message\":\"获取订单协议成功\",\"orderProcess\":\"null\"}";
              }
              Map<String,Object> resultProtocol = (Map)((List)((Map)dataProtocol).get("List")).get(0);
              String orderProtocol = JSONArray.fromObject(resultProtocol).toString();
              log.info("{\"state\":\"0\",\"message\":\"获取订单协议成功\",\"orderProcess\":"+orderProtocol+"}");
              return "{\"state\":\"0\",\"message\":\"获取订单协议成功\",\"orderProcess\":"+orderProtocol+"}";
	        }else{
	          log.info("{\"state\":\"0\",\"message\":\"获取订单协议成功\",\"orderProcess\":\"null\"}");
	          return "{\"state\":\"0\",\"message\":\"获取订单协议成功\",\"orderProcess\":\"null\"}";
	        }
	      }else{
	        log.error("获取订单协议失败:"+message);
	        return "{\"state\":\"1\",\"message\":"+message+",\"orderProcess\":\"null\"}";
	      }
	  }
	   
	  private Map<String,Object> putCommonParam(Map<String, Object> params){
//	    Map<String,Object> map = new HashMap<String,Object>();
//	    map.put("orderNum", "20131203085821710");
//	    map.put("sellerId", "xy02117");
	    ParamCommon.putCommonParam(params);
	    return params;
	  }

	  @Override
	  public String getSalesOrderDelivery(Map<String, Object> params) {
	    Map<String, Object> myParams = putCommonParam(params);
	    if( null == myParams){
	      log.error("获取orderNum和sellerId失败");
	      return "{\"state\":\"1\",\"message\":\"获取订单快递失败\"}";
	    }
	    //发送请求
        String ip = PropertiesUtils.getProperty("serviceUrl");
	    String urlDelivery = ip+"/OrderListService.asmx/DeliveryList";
	    log.info("----从数据库获得订单快递开始----url:"+urlDelivery+"参数:"+myParams.toString());
	    Map<String, Object> mapDelivery = getApiResult(urlDelivery,myParams);
	    log.info("----从数据库获得订单快递结束----结果:"+mapDelivery.toString());
	    if(null == mapDelivery || mapDelivery.size()==0){
	      log.error("接口返回数据为空或者解析json失败");
	      return "{\"state\":\"1\",\"message\":\"获取订单快递失败\"}";
	    }
	    //数据处理
	    String codeDelivery = String.valueOf(mapDelivery.get("Code"));
	    String message = String.valueOf(mapDelivery.get("Message"));
	    Object dataDelivery = mapDelivery.get("Data");
	    String dataDeliveryString = dataDelivery+"";
        if(codeDelivery.equals("200")){
          if(dataDelivery != null && !"null".equals(dataDeliveryString)){
            String obj = ((Map)dataDelivery).get("List")+"";
            if("null".equals(obj) || null==obj){
              log.info("{\"state\":\"0\",\"message\":\"获取订单快递成功\",\"orderProcess\":\"null\"}");
              return "{\"state\":\"0\",\"message\":\"获取订单快递成功\",\"orderProcess\":\"null\"}";
            }
            Map<String,Object> resultDelivery = (Map)((List)((Map)dataDelivery).get("List")).get(0);
            String orderDelivery = JSONArray.fromObject(resultDelivery).toString();
            log.info("{\"state\":\"0\",\"message\":\"获取订单快递成功\",\"orderProcess\":"+orderDelivery+"}");
            return "{\"state\":\"0\",\"message\":\"获取订单快递成功\",\"orderProcess\":"+orderDelivery+"}";
          }else{
            log.info("{\"state\":\"0\",\"message\":\"获取订单快递成功\",\"orderProcess\":\"null\"}");
            return "{\"state\":\"0\",\"message\":\"获取订单快递成功\",\"orderProcess\":\"null\"}";
          }
        }else{
          log.error("获取订单快递失败:"+message);
          return "{\"state\":\"1\",\"message\":"+message+"}";
        }
	  }
	  
	  private Map<String,Object> getApiResult(String url,Map<String,Object> params){
	    String jsonApiResult = HttpUtils.httpPost(url, params);
	    log.info("----从xml截取json字符串开始----jsonApiResult:"+jsonApiResult);
	    if("null".equals(jsonApiResult) || null == jsonApiResult){
	      return null;
	    }
	    try {
	      jsonApiResult = XMLUtils.getRootText(jsonApiResult);
	    } catch (DocumentException e) {
	      log.error("从xml截取json字符串失败，失败信息是："+e.getMessage());
	    }
	    log.info("----从xml截取json字符串结束----结果:"+jsonApiResult);
	    return JsonUtils.parseJSON2Map(jsonApiResult);
	  }

	  @Override
	  public String getSalesOrderBill(Map<String, Object> params) {
	    Map<String, Object> myParams = putCommonParam(params);
	    if( null == myParams){
	      log.error("获取orderNum和sellerId失败");
	      return "{\"state\":\"1\",\"message\":\"获取订单发票失败\"}";
	    }
        //发送请求
        String ip = PropertiesUtils.getProperty("serviceUrl");
	    String urlDelivery = ip+"/OrderListService.asmx/BillList";
	    log.info("----从数据库获取订单发票开始----url:"+urlDelivery+"参数:"+myParams.toString());
	    Map<String, Object> mapBill = getApiResult(urlDelivery,myParams);
	    log.info("----从数据库获取订单发票结束----结果:"+mapBill.toString());
	    if(null == mapBill || mapBill.size()==0){
	      log.error("接口返回数据为空或者解析json失败");
	      return "{\"state\":\"1\",\"message\":\"获取订单发票失败\"}";
	    }
	    //数据处理
	    String codeBill = String.valueOf(mapBill.get("Code"));
	    String message = String.valueOf(mapBill.get("Message"));
	    Object dataBill = mapBill.get("Data");
	    String dataBillString = dataBill+"";
        if(codeBill.equals("200")){
          if(dataBill != null && !"null".equals(dataBillString)){
            String obj = ((Map)dataBill).get("List")+"";
            if("null".equals(obj) || null==obj){
              log.info("{\"state\":\"0\",\"message\":\"获取订单发票成功\",\"orderProcess\":\"null\"}");
              return "{\"state\":\"0\",\"message\":\"获取订单发票成功\",\"orderProcess\":\"null\"}";
            }
            Map<String,Object> resultBill = (Map)((List)((Map)dataBill).get("List")).get(0);
            String orderBill = JSONArray.fromObject(resultBill).toString();
            log.info("{\"state\":\"0\",\"message\":\"获取订单发票成功\",\"orderProcess\":"+orderBill+"}");
            return "{\"state\":\"0\",\"message\":\"获取订单发票成功\",\"orderProcess\":"+orderBill+"}";
          }else{
            log.info("{\"state\":\"0\",\"message\":\"获取订单发票成功\",\"orderProcess\":\"null\"}");
            return "{\"state\":\"0\",\"message\":\"获取订单发票成功\",\"orderProcess\":\"null\"}";
          }
        }else{
          log.error("获取订单发票失败:"+message);
          return "{\"state\":\"1\",\"message\":"+message+"}";
        }
	  }

	  @Override
	  public String getSalesOrderReceiveMoney(Map<String, Object> params) {
	    Map<String, Object> myParams = putCommonParam(params);
	    if( null == myParams){
	      log.error("获取orderNum和sellerId失败");
	      return "{\"state\":\"1\",\"message\":\"获取订单到款信息失败\"}";
	    }
	    //发送请求
        String ip = PropertiesUtils.getProperty("serviceUrl");
	    String urlReceiveMoney = ip+"/OrderListService.asmx/ReceiveMoneyList";
	    log.info("----从数据库获取订单到款信息开始----url:"+urlReceiveMoney+"参数:"+myParams.toString());
	    Map<String, Object> mapReceiveMoney = getApiResult(urlReceiveMoney,myParams);
	    log.info("----从数据库获取订单到款信息结束----结果:"+mapReceiveMoney.toString());
	    if(null == mapReceiveMoney || mapReceiveMoney.size()==0){
	      log.error("接口返回数据为空或者解析json失败");
	      return "{\"state\":\"1\",\"message\":\"获取订单到款信息失败\"}";
	    }
	    //数据处理
	    String codeReceiveMoney = String.valueOf(mapReceiveMoney.get("Code"));
	    String message = String.valueOf(mapReceiveMoney.get("Message"));
	    Object dataReceiveMoney = mapReceiveMoney.get("Data");
	    String dataReceiveMoneyString = dataReceiveMoney+"";
        if(codeReceiveMoney.equals("200")){
          if(dataReceiveMoney != null && !"null".equals(dataReceiveMoneyString)){
            String obj = ((Map)dataReceiveMoney).get("List")+"";
            if("null".equals(obj) || null==obj){
              log.info("{\"state\":\"0\",\"message\":\"获取订单到款信息成功\",\"orderProcess\":\"null\"}");
              return "{\"state\":\"0\",\"message\":\"获取订单到款信息成功\",\"orderProcess\":\"null\"}";
            }
            Map<String,Object> resultReceiveMoney = (Map)((List)((Map)dataReceiveMoney).get("List")).get(0);
            String orderReceiveMoney = JSONArray.fromObject(resultReceiveMoney).toString();
            log.info("{\"state\":\"0\",\"message\":\"获取订单到款信息成功\",\"orderProcess\":"+orderReceiveMoney+"}");
            return "{\"state\":\"0\",\"message\":\"获取订单到款信息成功\",\"orderProcess\":"+orderReceiveMoney+"}";
          }else{
            log.info("{\"state\":\"0\",\"message\":\"获取订单到款信息成功\",\"orderProcess\":\"null\"}");
            return "{\"state\":\"0\",\"message\":\"获取订单到款信息成功\",\"orderProcess\":\"null\"}";
          }
        }else{
          log.error("获取订单到款信息失败:"+message);
          return "{\"state\":\"1\",\"message\":"+message+"}";
        }
	  }
	  
	  private Map<String,Object> getSalesOrderContact(Map<String,Object> params){
	        Map<String, Object> myParams = putCommonParam(params);
	        Map<String,Object> mapOrderContact = new HashMap<>();
	        if( null == myParams){
	          log.error("获取orderNum和sellerId失败");
	          return null;
	        }
	        //发送请求
	        String ip = PropertiesUtils.getProperty("serviceUrl");
	        String urlSalesOrderList = ip+"/OrderListService.asmx/SalesOrderList";
	        log.info("----从数据库获取订单联系人开始----url:"+urlSalesOrderList+"参数:"+params.toString());
	        Map<String, Object> mapSalesOrderList = getApiResult(urlSalesOrderList,params);
	        log.info("----从数据库获取订单联系人结束----结果:"+mapSalesOrderList.toString());
	        if(null == mapSalesOrderList || mapSalesOrderList.size()==0){
	          log.error("接口返回数据为空或者解析json失败");
	          return null;
	        }
	        //数据处理
	        String codeSalesOrderList = String.valueOf(mapSalesOrderList.get("Code"));
	        String message = String.valueOf(mapSalesOrderList.get("Message"));
	        Object dataSalesOrderList= mapSalesOrderList.get("Data");
	        String dataSalesOrderListString= dataSalesOrderList+"";
	        if(codeSalesOrderList.equals("200") && dataSalesOrderList != null && !"null".equals(dataSalesOrderListString)){
	          String obj = ((Map)dataSalesOrderList).get("List")+"";
	          if("null".equals(obj) || null==obj){
	            log.info("返回json中的List为null");
	            return null;
	          }
	          log.info("----从返回的json中的Data取出联系人开始----");
	          List<Map<String,Object>> listSalesOrderList = (List)((Map)dataSalesOrderList).get("List");
	          mapOrderContact.put("LinkMan", listSalesOrderList.get(0).get("LinkMan"));
	          mapOrderContact.put("LinkMobile", listSalesOrderList.get(0).get("LinkPhone"));
	          log.info("----从返回的json中的Data取出联系人结束----map:"+mapOrderContact.toString());
	          return mapOrderContact;
	        }
	        log.error("获得联系人失败："+message);
	        mapOrderContact.put("state", 1);
	        mapOrderContact.put("msg", message);
	        return mapOrderContact;
	  }
	  
	  @Override
	    public String getSalesOrderReference(Map<String, Object> params) {
	      Map<String, Object> myParams = putCommonParam(params);
	      if( null == myParams){
	        log.error("获取orderNum和sellerId失败");
	        return "{\"state\":\"1\",\"message\":\"获取订单资料失败\"}";
	      }
	      //发送请求
	      String ip = PropertiesUtils.getProperty("serviceUrl");
	      String urlReference = ip+"/OrderListService.asmx/SoftSchoolList";
	      log.info("----从数据库中获取订单资料开始----url:"+urlReference+"参数:"+myParams.toString());
	      Map<String, Object> mapReference = getApiResult(urlReference,myParams);
	      log.info("----从数据库中获取订单资料结束----结果:"+mapReference.toString());
	      if(null == mapReference || mapReference.size()==0){
	        log.error("接口返回数据为空或者解析json失败");
	        return "{\"state\":\"1\",\"message\":\"获取订单资料失败\"}";
	      }
	      //数据处理
	      String codeReference = String.valueOf(mapReference.get("Code"));
	      String message = String.valueOf(mapReference.get("Message"));
	      Object dataReference = mapReference.get("Data");
	      String dataReferenceString = dataReference+"";
	      if(codeReference.equals("200")){
	        if(dataReference != null && !"null".equals(dataReferenceString)){
	          String obj = ((Map)dataReference).get("List")+"";
	          if("null".equals(obj) || null==obj){
	            log.info("{\"state\":\"0\",\"message\":\"获取订单资料成功\",\"orderProcess\":\"null\"}");
	            return "{\"state\":\"0\",\"message\":\"获取订单资料成功\",\"orderProcess\":\"null\"}";
	          }
	          Map<String,Object> resultReference = (Map)((List)((Map)dataReference).get("List")).get(0);
	          String orderReference = JSONArray.fromObject(resultReference).toString();
	          log.info("{\"state\":\"0\",\"message\":\"获取订单资料成功\",\"orderProcess\":"+orderReference+"}");
	          return "{\"state\":\"0\",\"message\":\"获取订单资料成功\",\"orderProcess\":"+orderReference+"}";
	        }else{
	          log.info("{\"state\":\"0\",\"message\":\"获取订单资料成功\",\"orderProcess\":\"null\"}");
	          return "{\"state\":\"0\",\"message\":\"获取订单资料成功\",\"orderProcess\":\"null\"}";
	        }
	      }else{
	        log.error("获取订单资料失败:"+message);
	        return "{\"state\":\"1\",\"message\":"+message+"}";
	      }
	    }
	  
	  @Override
	    public String getMyHaveSchoolList(Map<String, Object> params) {
	      ParamCommon.putCommonParam(params);
	      //发送请求
	      String ip = PropertiesUtils.getProperty("serviceUrl");
	      String urlHaveSchoolList = ip+"/SchoolService.asmx/HaveSchoolList";
	      log.info("----从数据库获取我的保留开始----url:"+urlHaveSchoolList+"参数:"+params.toString());
	      Map<String, Object> mapHaveSchoolList = getApiResult(urlHaveSchoolList,params);
	      log.info("----从数据库获取我的保留结束----结果:"+mapHaveSchoolList.toString());
	      if(null == mapHaveSchoolList || mapHaveSchoolList.size()==0){
	        log.error("接口返回数据为空或者解析json失败");
	        return "{\"state\":\"1\",\"message\":\"获取保留校失败\"}";
	      }
	      //数据处理
	      String codeHaveSchoolList = String.valueOf(mapHaveSchoolList.get("Code"));
	      String message = String.valueOf(mapHaveSchoolList.get("Message"));
	      Object dataHaveSchoolList= mapHaveSchoolList.get("Data");
	      String dataHaveSchoolListString = dataHaveSchoolList+"";
	      String pageCount = null;
	      String rowCount  = null;
	      if(codeHaveSchoolList.equals("200")){
	        if(dataHaveSchoolList != null && !"null".equals(dataHaveSchoolListString)){
	          String obj = ((Map)dataHaveSchoolList).get("List")+"";
	          if("null".equals(obj) || null==obj){
	            log.info("{\"state\":\"0\",\"message\":\"您暂无保留校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
	            return "{\"state\":\"0\",\"message\":\"您暂无保留校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
	          }
	          List<Map<String,Object>> listHaveSchoolList = (List)((Map)dataHaveSchoolList).get("List");
	          insertProductNames(listHaveSchoolList);
	          String useHaveSchoolList = JSONArray.fromObject(listHaveSchoolList).toString();
	          pageCount = ((Map)dataHaveSchoolList).get("PageCount")+"";
	          rowCount = ((Map)dataHaveSchoolList).get("RowCount")+"";
	          log.info("{\"state\":\"0\",\"message\":\"获取保留校成功\",\"schoolList\":"+useHaveSchoolList+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
	          return "{\"state\":\"0\",\"message\":\"获取保留校成功\",\"schoolList\":"+useHaveSchoolList+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\",\"backSwitch\":\"1\""+"}";
	        }else{
	          log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
	          return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
	        }
	      }else{
	        log.error("获取保留校失败:"+message);
	        return "{\"state\":\"1\",\"message\":\""+message+"\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
	      }
	    }

	    @Override
	    public String getMyAgentSchool(Map<String, Object> params) {
	      ParamCommon.putCommonParam(params);
	      //发送请求
	      String ip = PropertiesUtils.getProperty("serviceUrl");
	      String urlAgentSchool = ip+"/SchoolService.asmx/GetAgentSchoolById";
	      log.info("----从数据库获取我的代理开始----url:"+urlAgentSchool+"参数:"+params.toString());
	      Map<String, Object> mapAgentSchool = getApiResult(urlAgentSchool,params);
	      log.info("----从数据库获取我的代理结束----结果:"+mapAgentSchool.toString());
	      if(null == mapAgentSchool || mapAgentSchool.size()==0){
	        log.error("接口返回数据为空或者解析json失败");
	        return "{\"state\":\"1\",\"message\":\"获取学校信息失败\"}";
	      }
	      //数据处理
	      String codeAgentSchool = String.valueOf(mapAgentSchool.get("Code"));
	      String message = String.valueOf(mapAgentSchool.get("Message"));
	      Object dataAgentSchool= mapAgentSchool.get("Data");
	      String dataAgentSchoolString = dataAgentSchool+"";
	      String pageCount = null;
	      if(codeAgentSchool.equals("200")){
	        if(dataAgentSchool != null && !"null".equals(dataAgentSchoolString)){
	          String obj = ((Map)dataAgentSchool).get("List")+"";
	          if("null".equals(obj) || null==obj){
	            log.info("{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":\"null\",\"pageCount\":"+pageCount+"}");
	            return "{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":\"null\",\"pageCount\":"+pageCount+"}";
	          }
	          List<Map<String,Object>> listAgentSchool = (List)((Map)dataAgentSchool).get("List");
	          insertProductNames(listAgentSchool);
	          String useAgentSchool = JSONArray.fromObject(listAgentSchool).toString();
	          pageCount = ((Map)dataAgentSchool).get("PageCount")+"";
	          log.info("{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":"+useAgentSchool+",\"pageCount\":"+pageCount+"}");
	          return "{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":"+useAgentSchool+",\"pageCount\":"+pageCount+",\"backSwitch\":\"1\""+"}";
	        }else{
	          log.info("{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":\"null\",\"pageCount\":"+pageCount+"}");
	          return "{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":\"null\",\"pageCount\":"+pageCount+"}";
	        }
	      }else{
	        log.error("获取学校信息失败:"+message);
	        return "{\"state\":\"1\",\"message\":"+message+",\"pageCount\":"+pageCount+"}";
	      }
	    }

	  public String getMyUseSchoolList(Map<String,Object> params){
	    ParamCommon.putCommonParam(params);
	    //发送请求
        String ip = PropertiesUtils.getProperty("serviceUrl");
        String urlUseSchoolList = ip+"/OrderListService.asmx/MyOrderList";
        log.info("----从数据库中获取我的使用(试用)开始----url:"+urlUseSchoolList+"参数:"+params.toString());
        Map<String, Object> mapUseSchoolList = getApiResult(urlUseSchoolList,params);
        log.info("----从数据库中获取我的使用(试用)结束----结果:"+mapUseSchoolList.toString());
        if(null == mapUseSchoolList || mapUseSchoolList.size()==0){
          log.error("接口返回数据为空或者解析json失败");
          if(String.valueOf(params.get("status")).equals("5")){
            return "{\"state\":\"1\",\"message\":\"获取试用校失败\"}";
          }else{
            return "{\"state\":\"1\",\"message\":\"获取使用校失败\"}";
          }
        }
        //数据处理
        String codeUseSchoolList = String.valueOf(mapUseSchoolList.get("Code"));
        String message = String.valueOf(mapUseSchoolList.get("Message"));
        Object dataUseSchoolList= mapUseSchoolList.get("Data");
        String dataUseSchoolListString = dataUseSchoolList+"";
        String pageCount = "";
        String rowCount = "";
        if(codeUseSchoolList.equals("200")){
          if(dataUseSchoolList != null && !"null".equals(dataUseSchoolListString)){
            String obj = ((Map)dataUseSchoolList).get("List")+"";
            if("null".equals(obj) || null==obj){
              if(String.valueOf(params.get("status")).equals("5")){
                log.info("{\"state\":\"0\",\"message\":\"您暂无试用校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
                return "{\"state\":\"0\",\"message\":\"您暂无试用校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
              }else{
                log.info("{\"state\":\"0\",\"message\":\"您暂无使用校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
                return "{\"state\":\"0\",\"message\":\"您暂无使用校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
              }
            }
            List<Map<String,Object>> listUseSchoolList = (List)((Map)dataUseSchoolList).get("List");
            insertProductNames(listUseSchoolList);
            String useSchoolList = JSONArray.fromObject(listUseSchoolList).toString();
            pageCount = ((Map)dataUseSchoolList).get("PageCount")+"";
            rowCount = ((Map)dataUseSchoolList).get("RowCount")+"";
            if(String.valueOf(params.get("status")).equals("5")){
              log.info("{\"state\":\"0\",\"message\":\"获取试用校成功\",\"schoolList\":"+useSchoolList+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
              return "{\"state\":\"0\",\"message\":\"获取试用校成功\",\"schoolList\":"+useSchoolList+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\",\"backSwitch\":\"1\""+"}";
            }else{
              log.info("{\"state\":\"0\",\"message\":\"获取使用校成功\",\"schoolList\":"+useSchoolList+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
              return "{\"state\":\"0\",\"message\":\"获取使用校成功\",\"schoolList\":"+useSchoolList+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\",\"backSwitch\":\"1\""+"}";
            }
          }else{
            log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
            return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
          }
        }else{
          if(String.valueOf(params.get("status")).equals("5")){
            log.error("获取试用校失败:"+message);
            return "{\"state\":\"1\",\"message\":\""+message+"\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
          }else{
            log.error("获取使用校失败:"+message);
            return "{\"state\":\"1\",\"message\":\""+message+"\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
          }
        }
	  }
	  
    @Override
    public String getMyContactSchool(Map<String, Object> params) {
      ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String urlContactSchoolList = ip+"/SchoolService.asmx/CreatorContactSchoolList";
      log.info("----从数据库获取我的联系开始----url:"+urlContactSchoolList+"参数:"+params.toString());
      Map<String, Object> mapContactSchoolList = getApiResult(urlContactSchoolList,params);
      log.info("----从数据库获取我的联系结束----结果:"+mapContactSchoolList.toString());
      if(null == mapContactSchoolList || mapContactSchoolList.size()==0){
        log.error("接口返回数据为空或者解析json失败");
        return "{\"state\":\"1\",\"message\":\"获取学校信息失败\"}";
      }
      //数据处理
      String codeContactSchoolList = String.valueOf(mapContactSchoolList.get("Code"));
      String message = String.valueOf(mapContactSchoolList.get("Message"));
      Object dataContactSchoolList= mapContactSchoolList.get("Data");
      String dataContactSchoolListString = dataContactSchoolList+"";
      String pageCount = null;
      if(codeContactSchoolList.equals("200")){
        if(dataContactSchoolList != null && !"null".equals(dataContactSchoolListString)){
          String obj = ((Map)dataContactSchoolList).get("List")+"";
          if("null".equals(obj) || null==obj){
            log.info("{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":\"null\",\"pageCount\":"+pageCount+"}");
            return "{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":\"null\",\"pageCount\":"+pageCount+"}";
          }
          List<Map<String,Object>> listContactSchoolList = (List)((Map)dataContactSchoolList).get("List");
          insertProductNames(listContactSchoolList);
          String useContactSchoolList = JSONArray.fromObject(listContactSchoolList).toString();
          pageCount = ((Map)dataContactSchoolList).get("PageCount")+"";
          log.info("{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":"+useContactSchoolList+",\"pageCount\":"+pageCount+"}");
          return "{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":"+useContactSchoolList+",\"pageCount\":"+pageCount+",\"backSwitch\":\"1\""+"}";
        }else{
          log.info("{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":\"null\",\"pageCount\":"+pageCount+"}");
          return "{\"state\":\"0\",\"message\":\"获取学校信息成功\",\"schoolList\":\"null\",\"pageCount\":"+pageCount+"}";
        }
      }else{
        log.error("获取学校信息失败:"+message);
        return "{\"state\":\"1\",\"message\":"+message+",\"pageCount\":"+pageCount+"}";
      }
    }

    @Override
    public String getMyProtectSchool(Map<String, Object> params) {
      ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String urlProtectSchoolList = ip+"/SchoolService.asmx/CreatorProtectSchoolList";
      log.info("----从数据库中获取我的保护开始----url:"+urlProtectSchoolList+"参数:"+params.toString());
      Map<String, Object> mapProtectSchoolList = getApiResult(urlProtectSchoolList,params);
      log.info("----从数据库中获取我的保护结束----结果:"+mapProtectSchoolList.toString());
      if(null == mapProtectSchoolList || mapProtectSchoolList.size()==0){
        log.error("接口返回数据为空或者解析json失败");
        return "{\"state\":\"1\",\"message\":\"获取保护校失败\"}";
      }
      //数据处理
      String codeProtectSchoolList = String.valueOf(mapProtectSchoolList.get("Code"));
      String message = String.valueOf(mapProtectSchoolList.get("Message"));
      Object dataProtectSchoolList= mapProtectSchoolList.get("Data");
      String dataProtectSchoolListString = dataProtectSchoolList+"";
      String pageCount = "";
      String rowCount = "";
      if(codeProtectSchoolList.equals("200")){
        if(dataProtectSchoolList != null && !"null".equals(dataProtectSchoolListString)){
          String obj = ((Map)dataProtectSchoolList).get("List")+"";
          if("null".equals(obj) || null==obj){
            log.info("{\"state\":\"0\",\"message\":\"您暂无保护校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
            return "{\"state\":\"0\",\"message\":\"您暂无保护校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
          }
          List<Map<String,Object>> listProtectSchoolList = (List)((Map)dataProtectSchoolList).get("List");
          String useProtectSchoolList = JSONArray.fromObject(listProtectSchoolList).toString();
          pageCount = ((Map)dataProtectSchoolList).get("PageCount")+"";
          rowCount = ((Map)dataProtectSchoolList).get("RowCount")+"";
          log.info("{\"state\":\"0\",\"message\":\"获取保护校成功\",\"schoolList\":"+useProtectSchoolList+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
          return "{\"state\":\"0\",\"message\":\"获取保护校成功\",\"schoolList\":"+useProtectSchoolList+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\",\"backSwitch\":\"2\""+"}";
        }else{
          log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
          return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
        }
      }else{
        log.error("获取保护校失败:"+message);
        return "{\"state\":\"1\",\"message\":\""+message+"\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
      }
    }
    
    @Override
    public String getMyAttentionSchool(Map<String, Object> params) {
      ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String urlMyAttentionSchool = ip+"/OrderListService.asmx/MyAttentionSchool";
      log.info("----从数据库获取我的关注开始----url:"+urlMyAttentionSchool+"参数:"+params.toString());
      Map<String, Object> mapMyAttentionSchool = getApiResult(urlMyAttentionSchool,params);
      log.info("----从数据库获取我的关注结束----结果:"+mapMyAttentionSchool.toString());
      if(null == mapMyAttentionSchool || mapMyAttentionSchool.size()==0){
        log.error("接口返回数据为空或者解析json失败");
        return "{\"state\":\"1\",\"message\":\"获取关注校失败\"}";
      }
      //数据处理
      String codeMyAttentionSchool = String.valueOf(mapMyAttentionSchool.get("Code"));
      String message = String.valueOf(mapMyAttentionSchool.get("Message"));
      Object dataMyAttentionSchool= mapMyAttentionSchool.get("Data");
      String dataMyAttentionSchoolString = dataMyAttentionSchool+"";
      String pageCount = "";
      String rowCount = "";
      if(codeMyAttentionSchool.equals("200")){
        if(dataMyAttentionSchool != null && !"null".equals(dataMyAttentionSchoolString)){
          String obj = ((Map)dataMyAttentionSchool).get("List")+"";
          if("null".equals(obj) || null==obj){
            log.info("{\"state\":\"0\",\"message\":\"您暂无关注校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
            return "{\"state\":\"0\",\"message\":\"您暂无关注校\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
          }
          List<Map<String,Object>> listMyAttentionSchool = (List)((Map)dataMyAttentionSchool).get("List");
          insertProductNames(listMyAttentionSchool);
          String useMyAttentionSchool = JSONArray.fromObject(listMyAttentionSchool).toString();
          pageCount = ((Map)dataMyAttentionSchool).get("PageCount")+"";
          rowCount = ((Map)dataMyAttentionSchool).get("RowCount")+"";
          log.info("{\"state\":\"0\",\"message\":\"获取关注校成功\",\"schoolList\":"+useMyAttentionSchool+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
          return "{\"state\":\"0\",\"message\":\"获取关注校成功\",\"schoolList\":"+useMyAttentionSchool+",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\",\"backSwitch\":\"1\""+"}";
        }else{
          log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
          return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
        }
      }else{
        log.error("获取关注校失败:"+message);
        return "{\"state\":\"1\",\"message\":\""+message+"\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
      }
    }
    
    @Override
    public String getMyOrders(Map<String, Object> params) {
      ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String myOrders = ip+"/OrderListService.asmx/MyOrderList";
      log.info("----从数据库中获取我的订单开始----url:"+myOrders+"参数:"+params.toString());
      Map<String, Object> mapMyOrders = getApiResult(myOrders,params);
      log.info("----从数据库中获取我的订单结束----结果:"+mapMyOrders.toString());
      if(null == mapMyOrders || mapMyOrders.size()==0){
        log.error("接口返回数据为空或者解析json失败");
        return "{\"state\":\"1\",\"message\":\"获取订单失败\"}";
      }
      //数据处理
      String codeMyOrders = String.valueOf(mapMyOrders.get("Code"));
      String message = String.valueOf(mapMyOrders.get("Message"));
      Object dataMyOrders= mapMyOrders.get("Data");
      String dataMyOrdersString = dataMyOrders+"";
      String pageCount = "";
      String rowCount = "";
      if(codeMyOrders.equals("200")){
        if(dataMyOrders != null && !"null".equals(dataMyOrdersString)){
          String obj = ((Map)dataMyOrders).get("List")+"";
          if("null".equals(obj) || null==obj){
            log.info("{\"state\":\"0\",\"message\":\"您暂无订单\",\"schoolList\":\"null\",\"backSwitch\":\"1\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
            return "{\"state\":\"0\",\"message\":\"您暂无订单\",\"schoolList\":\"null\",\"backSwitch\":\"1\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
          }
          List<Map<String,Object>> listMyOrders = (List)((Map)dataMyOrders).get("List");
          insertProductNames(listMyOrders);
          String useMyOrders = JSONArray.fromObject(listMyOrders).toString();
          pageCount = ((Map)dataMyOrders).get("PageCount")+"";
          rowCount = ((Map)dataMyOrders).get("RowCount")+"";
          log.info("{\"state\":\"0\",\"message\":\"获取订单成功\",\"schoolList\":"+useMyOrders+",\"backSwitch\":\"1\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
          return "{\"state\":\"0\",\"message\":\"获取订单成功\",\"schoolList\":"+useMyOrders+",\"backSwitch\":\"1\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
        }else{
          log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"backSwitch\":\"1\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}");
          return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\",\"backSwitch\":\"1\",\"pageCount\":\""+pageCount+"\",\"rowCount\":\""+rowCount+"\"}";
        }
      }else{
        log.error("获取订单失败:"+message);
        return "{\"state\":\"1\",\"message\":\""+message+"\",\"backSwitch\":\"1\""+"}";
      }
    }

    @Override
    public String getMyOneMonthExpiredInUse(Map<String, Object> params) {
      ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String urlOneMonthExpiredInUse = ip+"/OrderListService.asmx/UseOverdueList";
      log.info("----从数据库中获取一个月内要过期的使用校开始----url:"+urlOneMonthExpiredInUse+"参数:"+params.toString());
      Map<String, Object> mapOneMonthExpiredInUse = getApiResult(urlOneMonthExpiredInUse,params);
      log.info("----从数据库中获取一个月内要过期的使用校结束----结果:"+mapOneMonthExpiredInUse.toString());
      if(null == mapOneMonthExpiredInUse || mapOneMonthExpiredInUse.size()==0){
        log.error("接口返回数据为空或者解析json失败");
        return "{\"state\":\"1\",\"message\":\"获取一个月内要过期的使用校失败\"}";
      }
      //数据处理
      String codeOneMonthExpiredInUse = String.valueOf(mapOneMonthExpiredInUse.get("Code"));
      String message = String.valueOf(mapOneMonthExpiredInUse.get("Message"));
      Object dataOneMonthExpiredInUse= mapOneMonthExpiredInUse.get("Data");
      String dataOneMonthExpiredInUseString = dataOneMonthExpiredInUse+"";
      if(codeOneMonthExpiredInUse.equals("200")){
        if(dataOneMonthExpiredInUse != null && !"null".equals(dataOneMonthExpiredInUseString)){
          String obj = ((Map)dataOneMonthExpiredInUse).get("List")+"";
          if("null".equals(obj) || null==obj){
            log.info("{\"state\":\"0\",\"message\":\"您暂无一个月内要过期的使用校\",\"schoolList\":\"null\"}");
            return "{\"state\":\"0\",\"message\":\"您暂无一个月内要过期的使用校\",\"schoolList\":\"null\"}";
          }
          List<Map<String,Object>> listOneMonthExpiredInUse = (List)((Map)dataOneMonthExpiredInUse).get("List");
          insertProductNames(listOneMonthExpiredInUse);
          String useOneMonthExpiredInUse = JSONArray.fromObject(listOneMonthExpiredInUse).toString();
          log.info("{\"state\":\"0\",\"message\":\"获取一个月内要过期的使用校成功\",\"schoolList\":"+useOneMonthExpiredInUse+"}");
          return "{\"state\":\"0\",\"message\":\"获取一个月内要过期的使用校成功\",\"schoolList\":"+useOneMonthExpiredInUse+",\"backSwitch\":\"3\""+"}";
        }else{
          log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\"}");
          return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\"}";
        }
      }else{
        log.error("获取一个月内要过期的使用校失败:"+message);
        return "{\"state\":\"1\",\"message\":\""+message+"\"}";
      }
    }

    @Override
    public String getMyFiveDaysExpiredInTrial(Map<String, Object> params) {
      ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String urlFiveDaysExpiredInTrial = ip+"/OrderListService.asmx/UseOverdueList";
      log.info("----从数据库中获取五天内要过期的试用校开始----url:"+urlFiveDaysExpiredInTrial+"参数:"+params.toString());
      Map<String, Object> mapFiveDaysExpiredInTrial = getApiResult(urlFiveDaysExpiredInTrial,params);
      log.info("----从数据库中获取五天内要过期的试用校结束----结果:"+mapFiveDaysExpiredInTrial.toString());
      if(null == mapFiveDaysExpiredInTrial || mapFiveDaysExpiredInTrial.size()==0){
        log.error("接口返回数据为空或者解析json失败");
        return "{\"state\":\"1\",\"message\":\"获取五天内要过期的试用校失败\"}";
      }
      //数据处理
      String codeFiveDaysExpiredInTrial = String.valueOf(mapFiveDaysExpiredInTrial.get("Code"));
      String message = String.valueOf(mapFiveDaysExpiredInTrial.get("Message"));
      Object dataFiveDaysExpiredInTrial= mapFiveDaysExpiredInTrial.get("Data");
      String dataFiveDaysExpiredInTrialString = dataFiveDaysExpiredInTrial+"";
      if(codeFiveDaysExpiredInTrial.equals("200")){
        if(dataFiveDaysExpiredInTrial != null && !"null".equals(dataFiveDaysExpiredInTrialString)){
          String obj = ((Map)dataFiveDaysExpiredInTrial).get("List")+"";
          if("null".equals(obj) || null==obj){
            log.info("{\"state\":\"0\",\"message\":\"您暂无五天内要过期的试用校\",\"schoolList\":\"null\"}");
            return "{\"state\":\"0\",\"message\":\"您暂无五天内要过期的试用校\",\"schoolList\":\"null\"}";
          }
          List<Map<String,Object>> listFiveDaysExpiredInTrial = (List)((Map)dataFiveDaysExpiredInTrial).get("List");
          insertProductNames(listFiveDaysExpiredInTrial);
          String useFiveDaysExpiredInTrial = JSONArray.fromObject(listFiveDaysExpiredInTrial).toString();
          log.info("{\"state\":\"0\",\"message\":\"获取五天内要过期的试用校成功\",\"schoolList\":"+useFiveDaysExpiredInTrial+"}");
          return "{\"state\":\"0\",\"message\":\"获取五天内要过期的试用校成功\",\"schoolList\":"+useFiveDaysExpiredInTrial+",\"backSwitch\":\"3\""+"}";
        }else{
          log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\"}");
          return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\"}";
        }
      }else{
        log.error("获取五天内要过期的试用校失败:"+message);
        return "{\"state\":\"1\",\"message\":\""+message+"\"}";
      }
    }

    @Override
    public String getMyPartPayInUse(Map<String, Object> params) {
      ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String urlPartPayInUse = ip+"/SchoolService.asmx/NotSellMoneyList";
      log.info("----从数据库中获取未全部到款的使用校开始----url:"+urlPartPayInUse+"参数:"+params.toString());
      Map<String, Object> mapPartPayInUse = getApiResult(urlPartPayInUse,params);
      log.info("----从数据库中获取未全部到款的使用校结束----结果:"+mapPartPayInUse.toString());
      if(null == mapPartPayInUse || mapPartPayInUse.size()==0){
        log.error("接口返回数据为空或者解析json失败");
        return "{\"state\":\"1\",\"message\":\"获取未全部到款的使用校失败\"}";
      }
      //数据处理
      String codePartPayInUse = String.valueOf(mapPartPayInUse.get("Code"));
      String message = String.valueOf(mapPartPayInUse.get("Message"));
      Object dataPartPayInUse= mapPartPayInUse.get("Data");
      String dataPartPayInUseString = dataPartPayInUse+"";
      if(codePartPayInUse.equals("200")){
        if(dataPartPayInUse != null && !"null".equals(dataPartPayInUseString)){
          String obj = ((Map)dataPartPayInUse).get("List")+"";
          if("null".equals(obj) || null==obj){
            log.info("{\"state\":\"0\",\"message\":\"您暂无未全部到款的使用校\",\"schoolList\":\"null\"}");
            return "{\"state\":\"0\",\"message\":\"您暂无未全部到款的使用校\",\"schoolList\":\"null\"}";
          }
          List<Map<String,Object>> listPartPayInUse = (List)((Map)dataPartPayInUse).get("List");
          insertProductNames(listPartPayInUse);
          String usePartPayInUse = JSONArray.fromObject(listPartPayInUse).toString();
          log.info("{\"state\":\"0\",\"message\":\"获取未全部到款的使用校成功\",\"schoolList\":"+usePartPayInUse+"}");
          return "{\"state\":\"0\",\"message\":\"获取未全部到款的使用校成功\",\"schoolList\":"+usePartPayInUse+",\"backSwitch\":\"3\""+"}";
        }else{
          log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\"}");
          return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\"}";
        }
      }else{
        log.error("获取未全部到款的使用校失败:"+message);
        return "{\"state\":\"1\",\"message\":\""+message+"\"}";
      }
    }

    @Override
    public String getMyNoBackProtocolPostOneMonth(Map<String, Object> params) {
      ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String urlNoBackProtocolPostOneMonth = ip+"/OrderListService.asmx/NotContractList";
      log.info("----从数据库中获取协议寄出一个月未返回开始----url:"+urlNoBackProtocolPostOneMonth+"参数:"+params.toString());
      Map<String, Object> mapNoBackProtocolPostOneMonth = getApiResult(urlNoBackProtocolPostOneMonth,params);
      log.info("----从数据库中获取协议寄出一个月未返回结束----结果:"+mapNoBackProtocolPostOneMonth.toString());
      if(null == mapNoBackProtocolPostOneMonth || mapNoBackProtocolPostOneMonth.size()==0){
        log.error("接口返回数据为空或者解析json失败");
        return "{\"state\":\"1\",\"message\":\"获取协议寄出一个月未返回失败\"}";
      }
      //数据处理
      String codeNoBackProtocolPostOneMonth = String.valueOf(mapNoBackProtocolPostOneMonth.get("Code"));
      String message = String.valueOf(mapNoBackProtocolPostOneMonth.get("Message"));
      Object dataNoBackProtocolPostOneMonth= mapNoBackProtocolPostOneMonth.get("Data");
      String dataNoBackProtocolPostOneMonthString = dataNoBackProtocolPostOneMonth+"";
      if(codeNoBackProtocolPostOneMonth.equals("200")){
        if(dataNoBackProtocolPostOneMonth != null && !"null".equals(dataNoBackProtocolPostOneMonthString)){
          String obj = ((Map)dataNoBackProtocolPostOneMonth).get("List")+"";
          if("null".equals(obj) || null==obj){
            log.info("{\"state\":\"0\",\"message\":\"您暂无协议寄出一个月未返回校\",\"schoolList\":\"null\"}");
            return "{\"state\":\"0\",\"message\":\"您暂无协议寄出一个月未返回校\",\"schoolList\":\"null\"}";
          }
          List<Map<String,Object>> listNoBackProtocolPostOneMonth = (List)((Map)dataNoBackProtocolPostOneMonth).get("List");
          insertProductNames(listNoBackProtocolPostOneMonth);
          String useNoBackProtocolPostOneMonth = JSONArray.fromObject(listNoBackProtocolPostOneMonth).toString();
          log.info("{\"state\":\"0\",\"message\":\"获取协议寄出一个月未返回成功\",\"schoolList\":"+useNoBackProtocolPostOneMonth+"}");
          return "{\"state\":\"0\",\"message\":\"获取协议寄出一个月未返回成功\",\"schoolList\":"+useNoBackProtocolPostOneMonth+",\"backSwitch\":\"3\""+"}";
        }else{
          log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\"}");
          return "{\"state\":\"0\",\"message\":\""+message+"\",\"schoolList\":\"null\"}";
        }
      }else{
        log.error("获取协议寄出一个月未返回失败:"+message);
        return "{\"state\":\"1\",\"message\":\""+message+"\"}";
      }
    }
    
  //向返回数据中添加产品名称
    private void insertProductNames(List<Map<String,Object>> list){
      Set<Long> ids = new HashSet<>();
      if(list ==null) return;
      //取出id转成list集合
      for(int i=0;i<list.size();i++){
        if(list.get(i)==null) continue;
        Long id = Long.parseLong(String.valueOf(list.get(i).get("ProductID")));
        ids.add(id);
      }
      if(ids.isEmpty()) return;
      List<Long> idsList = new ArrayList<>();
      Iterator<Long> it = ids.iterator();
      while(it.hasNext()){
        Long id  = it.next();
        idsList.add(id);
      }
      //查出产品名称集合
      List<Product> products = productDao.getProductsByIds(idsList);
      //向返回数据list中添加产品名称
      for(int i=0;i<list.size();i++){
        if(list.get(i)==null) continue;
        Map<String,Object> map = list.get(i);
        Long id = Long.parseLong(String.valueOf(map.get("ProductID")));
        if(id==null) continue;
        for(int j=0;j<products.size();j++){
          Product p = products.get(j);
          if(id.equals(p.getId())){
            map.put("ProductName", p.getName());
            break;
          }
        }
      }
    }
	public JSONObject getSchoolListByKeyWord(String keyWord,String fields){
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("keyWord", keyWord);
		param.put("fields", fields);
		ParamCommon.putCommonParam(param);
		String serviceUrl = PropertiesUtils.getProperty("serviceUrl");
		String result = HttpUtils.httpPost(serviceUrl + "/SchoolService.asmx/GetSchoolListByKeyWord", param);
		System.out.println(result);
		try {
			result= XMLUtils.getRootText(result);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
//		result = HandleResultSchoolList(result);
		//String转化成 map
		JSONObject json = JSONObject.fromObject(result);
		return json;
	}

	@Override
	public JSONObject getSchoolInfromation(String schoolId) {
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("schoolID", schoolId);
		ParamCommon.putCommonParam(param);
		String serviceUrl = PropertiesUtils.getProperty("serviceUrl");
		String result = HttpUtils.httpPost(serviceUrl + "/SchoolService.asmx/GetSchoolByID", param);
		System.out.println(result);
		try {
			result= XMLUtils.getRootText(result);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		//String转化成 map
		JSONObject json = JSONObject.fromObject(result);
		return json;
	}
	
	public Map<String,Object> getExpiredType(Map<String,Object> params){
	  ParamCommon.putCommonParam(params);
      //发送请求
      String ip = PropertiesUtils.getProperty("serviceUrl");
      String expiredType = ip+"/SchoolExtensionService.asmx/GetOrderByID ";
      log.info("----从数据库中查询过期类型开始----url:"+expiredType+"参数:"+params.toString());
      Map<String, Object> mapExpiredType = getApiResult(expiredType,params);
      log.info("----从数据库中查询过期类型结束----结果:"+mapExpiredType.toString());
      return mapExpiredType;
	}
	
	public String  getProcessStatuses(Map<String,Object> params){
	  //如果是已过期，根据学校ID、产品ID、sellerId查出状态（试用还是使用过期），以及订单编号
	  Map<String, Object> expiredTypeMap = getExpiredType(params);
	  //如果是使用过期，根据订单编号、sellerId查出流程里的各个状态
	  if(expiredTypeMap ==null || expiredTypeMap.size()==0){
	    log.info("从数据库中查询过期类型结果为空");
	    return "{\"state\":\"3\",\"message\":\"获取流程状态失败\",\"beginTime\":\"\",\"endTime\":\"\"}";
	  }
	  String beginTime = "";
	  String endTime = "";
	  String codeExpiredType = String.valueOf(expiredTypeMap.get("Code"));
      String message = String.valueOf(expiredTypeMap.get("Message"));
	  Object dataExpiredType= expiredTypeMap.get("Data");
      String dataExpiredTypeString = dataExpiredType+"";
      if(codeExpiredType.equals("200")){
        if(dataExpiredType != null && !"null".equals(dataExpiredTypeString)){
          String obj = ((Map)dataExpiredType).get("List")+"";
          if(!"null".equals(obj) && null!=obj){
            List<Map<String,Object>> listExpiredType = (List)((Map)dataExpiredType).get("List");
            beginTime = String.valueOf(listExpiredType.get(0).get("BeginTime"));
            endTime = String.valueOf(listExpiredType.get(0).get("EndTime"));
          }
        }else{
          return "{\"state\":\"2\",\"message\":\""+message+"\",\"beginTime\":\"\",\"endTime\":\"\"}";
        }
      }
	  if(!"1".equals(String.valueOf(expiredTypeMap.get("UseType")))){//不是使用过期(试用过期)
	    log.info("{\"state\":\"3\",\"message\":\"该过期是试用过期\",\"useExpired\":\"1\",\"useExpiredMessage\":\"试用过期没有流程信息\",\"beginTime\":\""+beginTime+"\",\"endTime\":\""+endTime+"\"}");
	    return "{\"state\":\"3\",\"message\":\"该过期是试用过期\",\"useExpired\":\"1\",\"useExpiredMessage\":\"试用过期没有流程信息\",\"beginTime\":\""+beginTime+"\",\"endTime\":\""+endTime+"\"}";
	  }
	  String orderNum = String.valueOf(expiredTypeMap.get("OrderNum"));
	  String sellerId = String.valueOf(params.get("sellerID"));
	  Map<String,Object> orderNumAndSellerId = new HashMap<String,Object>();
	  orderNumAndSellerId.put("orderNum", orderNum);
	  orderNumAndSellerId.put("sellerID",sellerId);
	  String processStatusString =  getProcessStatusByOrderNumAndSellerId(orderNumAndSellerId);
	  Map<String,Object> processStatusMap = JsonUtils.parseJSON2Map(processStatusString);
	  String protocolStatus = String.valueOf(processStatusMap.get("protocolStatus"));
	  String deliveryStatus = String.valueOf(processStatusMap.get("deliveryStatus"));
	  String protocolBackStatus = String.valueOf(processStatusMap.get("protocolBackStatus"));
	  String billStatus = String.valueOf(processStatusMap.get("billStatus"));
	  String receiveMoneyStatus = String.valueOf(processStatusMap.get("receiveMoneyStatus"));
	  return "{\"state\":\"0\",\"message\":\"获取流程状态成功\",\"protocolStatus\":\""+protocolStatus+"\",\"deliveryStatus\":\""+deliveryStatus+"\",\"protocolBackStatus\":\""+protocolBackStatus+"\",\"billStatus\":\""+billStatus+"\",\"receiveMoneyStatus\":\""+receiveMoneyStatus+"\",\"beginTime\":\""+beginTime+"\",\"endTime\":\""+endTime+"\"}";
	}
	
	private String getSelfStatus(String selfJson){
	  Map<String,Object> selfMap = JsonUtils.parseJSON2Map(selfJson);
	  if("1".equals(String.valueOf(selfMap.get("state")))){
	    return "";
	  }
	  Object orderProcessList = selfMap.get("orderProcess");
	  String selfStatus = "";
      if(!"null".equals(String.valueOf(orderProcessList))){
        Object orderProcess = ((List)orderProcessList).get(0);
        if(null!= orderProcess && !"null".equals(String.valueOf(orderProcess))){
          Object handler = ((Map)(orderProcess)).get("Handler");
          if(null !=handler && !"null".equals(String.valueOf(handler))){
            selfStatus = "1";//已确认
          }else{
            selfStatus ="0";//未确认
          }
        }
      }
      return selfStatus;
	}
	
	private String getBackStatus(String backJson){
      Map<String,Object> selfMap = JsonUtils.parseJSON2Map(backJson);
      if("1".equals(String.valueOf(selfMap.get("state")))){
        return "";
      }
      Object orderProcessList = selfMap.get("orderProcess");
      String backStatus = "";
      if(!"null".equals(String.valueOf(orderProcessList))){
        Object orderProcess = ((List)orderProcessList).get(0);
        if(null!= orderProcess && !"null".equals(String.valueOf(orderProcess))){
          Object handler = ((Map)(orderProcess)).get("BackHandler");
          if(null !=handler && !"null".equals(String.valueOf(handler))){
            backStatus = "1";//已确认
          }else{
            backStatus ="0";//未确认
          }
        }
      }
      return backStatus;
    }

  @Override
  public String getProcessStatusByOrderNumAndSellerId(Map<String, Object> params) {
    //协议
    String protocol = getSalesOrderProtocol(params);
    String protocolStatus = getSelfStatus(protocol);
    if("null".equals(protocolStatus)){
      protocolStatus = "";
    }
    //快递
    String delivery = getSalesOrderDelivery(params);
    String deliveryStatus = getSelfStatus(delivery);
    if("null".equals(deliveryStatus)){
      deliveryStatus = "";
    }
    //协议反馈
    String protocolBack = getSalesOrderProtocol(params);
    String protocolBackStatus = getBackStatus(protocolBack);
    if("null".equals(protocolBackStatus)){
      protocolBackStatus = "";
    }
    //发票
    String bill = getSalesOrderBill(params);
    String billStatus = getSelfStatus(bill);
    if("null".equals(billStatus)){
      billStatus = "";
    }
    //到款
    String receiveMoney = getSalesOrderReceiveMoney(params);
    String receiveMoneyStatus = getSelfStatus(receiveMoney);
    if("null".equals(receiveMoneyStatus)){
      receiveMoneyStatus = "";
    }
    log.info("根据orderNum和sellerId获取各个流程状态结束:{\"state\":\"0\",\"message\":\"获取流程状态成功\",\"protocolStatus\":\""+protocolStatus+"\",\"deliveryStatus\":\""+deliveryStatus+"\",\"protocolBackStatus\":\""+protocolBackStatus+"\",\"billStatus\":\""+billStatus+"\",\"receiveMoneyStatus\":\""+receiveMoneyStatus+"\"}");
    return "{\"state\":\"0\",\"message\":\"获取流程状态成功\",\"protocolStatus\":\""+protocolStatus+"\",\"deliveryStatus\":\""+deliveryStatus+"\",\"protocolBackStatus\":\""+protocolBackStatus+"\",\"billStatus\":\""+billStatus+"\",\"receiveMoneyStatus\":\""+receiveMoneyStatus+"\"}";
  }

  @Override
  public String getProcessStatusByParams(Map<String, Object> params) {
    // 查订单号
    String json = getMyUseSchoolList(params);
    Map<String,Object> map = JsonUtils.parseJSON2Map(json);
    Object schoolList = map.get("schoolList");
    String orderNum = "";
    if(!"null".equals(String.valueOf(schoolList))){
      Object school = ((List)schoolList).get(0);
      if(null!= school && !"null".equals(String.valueOf(school))){
        Object obj = ((Map)(school)).get("OrderNum");
        if(null !=obj && !"null".equals(String.valueOf(obj))){
          orderNum =  String.valueOf(obj);
        }
      }
     }
    if(orderNum==""){
      return "{\"state\":\"1\",\"message\":\"获取流程状态失败\"}";
    }
    //根据订单号查询流程状态
    Map<String,Object> orderNumAndSellerId = new HashMap<String,Object>();
    orderNumAndSellerId.put("orderNum", orderNum);
    orderNumAndSellerId.put("sellerID",String.valueOf(params.get("sellerID")));
    return getProcessStatusByOrderNumAndSellerId(orderNumAndSellerId);
  }

  @Override
  public String getOrderDetails(Map<String, Object> params) {
    // TODO Auto-generated method stub
    ParamCommon.putCommonParam(params);
    //发送请求
    String ip = PropertiesUtils.getProperty("serviceUrl");
    String url = ip+"/SchoolExtensionService.asmx/GetOrder";
    log.info("----从数据库中获取订单详情开始----url:"+url+"参数:"+params.toString());
    Map<String, Object> map = getApiResult(url,params);
    log.info("----从数据库中获取订单详情结束----结果:"+map.toString());
    if(null == map || map.size()==0){
      log.error("接口返回数据为空或者解析json失败");
      return "{\"state\":\"1\",\"message\":\"获取订单详情失败\"}";
    }
    //数据处理
    String code = String.valueOf(map.get("Code"));
    String message = String.valueOf(map.get("Message"));
    Object data= map.get("Data");
    String dataString = data+"";
    if(code.equals("200")){
      if(data != null && !"null".equals(dataString)){
        String obj = ((Map)data).get("List")+"";
        if("null".equals(obj) || null==obj){
          log.info("{\"state\":\"0\",\"message\":\"订单列表为空\",\"orderDetails\":\"null\"}");
          return "{\"state\":\"0\",\"message\":\"订单列表为空\",\"orderDetails\":\"null\"}";
        }
        List<Map<String,Object>> list = (List)((Map)data).get("List");
        String orderDetails = JSONArray.fromObject(list).toString();
        log.info("{\"state\":\"0\",\"message\":\"获取订单详情成功\",\"orderDetails\":"+orderDetails+"}");
        return "{\"state\":\"0\",\"message\":\"获取订单详情成功\",\"orderDetails\":"+orderDetails+"}";
      }else{
        log.info("{\"state\":\"0\",\"message\":\""+message+"\",\"orderDetails\":\"null\"}");
        return "{\"state\":\"0\",\"message\":\""+message+"\",\"orderDetails\":\"null\"}";
      }
    }else{
      log.error("获取订单详情失败:"+message);
      return "{\"state\":\"1\",\"message\":\""+message+"\"}";
    }
  }
}
