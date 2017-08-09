package sale.workflow.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.dom4j.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sale.user.bean.User;
import sale.utils.MyStringUtils;
import sale.workflow.common.Constants;
import sale.workflow.common.ParamCommon;
import sale.workflow.service.CustomerService;
import sale.user.bean.User;
import sale.utils.HttpUtils;
import sale.utils.PropertiesUtils;
import sale.utils.UserUtils;
import sale.utils.XMLUtils;

@Controller
public class CustomerController {
  
    private static final Logger log = LoggerFactory.getLogger(CustomerController.class);
  
    @Autowired
    CustomerService customerService;
  
    /**
     * 前台获取省列表
     * @param request
     * @return
     */
	@RequestMapping(value = "/customer/GetProvince.json")
	@ResponseBody
	public String GetProvince(HttpServletRequest request) {
		String result = "";
		try
		{
			result = customerService.GetProvince().toString();
		}catch(Exception e){
			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
	
	/**
	 * 前台获取城市列表
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/customer/GetCityByProvinceID.json")
	@ResponseBody
	public String GetCityByProvinceID(HttpServletRequest request) {
		String result = "";
		try
		{
			String ProvinceID = request.getParameter("ProvinceID");
			result = customerService.GetCityByProvinceID(Integer.parseInt(ProvinceID)).toString();
		}catch(Exception e){
			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
	
	/**
	 * 前台获取区县列表
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/customer/GetDistrictByCityID.json")
	@ResponseBody
	public String GetDistrictByCityID(HttpServletRequest request) {
		String result = "";
		try
		{
			String CityID = request.getParameter("CityID");
			result = customerService.GetDistrictByCityID(Integer.parseInt(CityID)).toString();
		}catch(Exception e){
			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
  
	/**
	 * 客户列表的查询数据
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/customer/getSchoolListBySearch.json")
	@ResponseBody
	public String GetSchoolListBySearch(HttpServletRequest request) {
		String result = "";
		try
		{
			// 分配参数
			String sellerID = MyStringUtils.checkStringParam(request.getParameter("sellerID")); //业务员id
			String stages = MyStringUtils.checkStringParam(request.getParameter("stages")); //学段：1幼儿园2小学3初中4高中
			String schoolType = MyStringUtils.checkStringParam(request.getParameter("schoolType")); 
			String statusID = MyStringUtils.checkStringParam(request.getParameter("statusID")); //状态：状态：-1已过期 0未联系 1有联系 -2已关闭 2有意向 3待试用 4待使用 5已试用 6已使用 11被保护
			String contractType = MyStringUtils.checkStringParam(request.getParameter("contractType")); //协议类型：2新签1续签3续转新4协议新签
			String schoolLevel = MyStringUtils.checkStringParam(request.getParameter("schoolLevel")); //学校等级：0普通学校1县级重点2市级重点3省级重点4国家重点5百强名校6资源名校
			String isLock = MyStringUtils.checkStringParam(request.getParameter("isLock")); //是否锁定:0未锁定1锁定
			
			String productID = MyStringUtils.checkIntegerParam(request.getParameter("productID")); //产品ID
			String provinceID = MyStringUtils.checkIntegerParam(request.getParameter("provinceID")); 
			String cityID = MyStringUtils.checkIntegerParam(request.getParameter("cityID"));
			String districtID = MyStringUtils.checkIntegerParam(request.getParameter("districtID"));//区县id
			String pageSize = MyStringUtils.checkIntegerParam(request.getParameter("pageSize")); 
			String page = MyStringUtils.checkIntegerParam(request.getParameter("page")); 
			String canLink = MyStringUtils.checkIntegerParam(request.getParameter("canLink")); //1可以联系，0所有的
			
			String schoolID = MyStringUtils.checkIntegerParam(request.getParameter("schoolID"));
			String schoolName = MyStringUtils.checkStringParam(request.getParameter("schoolName"));
			String loginID = MyStringUtils.checkStringParam(request.getParameter("loginID"));
			
			Map<String,Object> paramap=new HashMap<String,Object>();
			
			ParamCommon.putCommonParam(paramap);			
			paramap.put("sellerID", sellerID);
			paramap.put("stages", stages);
			paramap.put("productID", productID);
			paramap.put("schoolType", schoolType);
			paramap.put("provinceID", provinceID);
			paramap.put("cityID", cityID);
			paramap.put("districtID", districtID);
			paramap.put("pageSize", pageSize);
			paramap.put("statusID", statusID);
			paramap.put("contractType", contractType);
			paramap.put("schoolLevel", schoolLevel);
			paramap.put("isLock", isLock);
			paramap.put("page", page);
			paramap.put("canLink", canLink);
			
			paramap.put("schoolID", schoolID);
			paramap.put("schoolName", schoolName);
			paramap.put("loginID", loginID);
			
			if(request.getMethod().equals("POST")) {
				String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
				result = HttpUtils.httpPost(serviceUrl+"/SchoolService.asmx/GetSchoolListBySearch", paramap);
				System.out.println(result);
				result = XMLUtils.getRootText(result);
			}else{
				log.error("不是POST请求");
				result = "error:not post";
				
				JSONObject resultError = new JSONObject();
				resultError.put("error", result);
				result = resultError.toString();
			}
			
//			result = customerService.HandleResultSchoolList(result);
		}catch(Exception e){
			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
	
  //根据学校ID获得联系人
  @RequestMapping(value="/customer/contacts.html",method=RequestMethod.GET, produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String contacts(HttpServletRequest req){
    String schoolID = req.getParameter("schoolID");
    String sellerID = req.getParameter("sellerID");
    String pageNo = req.getParameter("pageNo");
    //封装到map
    Map<String,Object> params = new HashMap<>();
    params.put("schoolID", schoolID);
    params.put("sellerID", sellerID);
    params.put("page", pageNo);
    params.put("pageSize", Constants.Contacts.Contacts_PAGE_SIZE);
    try {
      return customerService.getContactBySchoolID(params);
    } catch (Exception e) {
      log.error("获得该学校的联系人信息失败:"+e.getMessage());
      return "{\"state\":\"1\",\"message\":\"获得该学习的联系人信息失败\"}";
    }
  }
  
  //添加联系人
  @RequestMapping(value="/customer/addContact.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
  @ResponseBody
  public String addContact(HttpServletRequest req){
    //获得提交的信息
    String name = req.getParameter("name");
    String job  = req.getParameter("job");
    switch(job){
      case "1":job = "校长";break;
      case "2":job = "副校长";break;
      case "3":job = "主任";break;
      case "4":job = "副主任";break;
      case "5":job = "教师";break;
    }
    String tel = req.getParameter("tel");
    String mobilephone = req.getParameter("mobilephone");
    String email = req.getParameter("email");
    String qq = req.getParameter("qq");
    String schoolID = req.getParameter("schoolID");
    String sellerID = req.getParameter("sellerID");
    String sellerName = req.getParameter("sellerName");
    //去前后空格
    name = MyStringUtils.trimParam(name);
    job = MyStringUtils.trimParam(job);
    tel = MyStringUtils.trimParam(tel);
    mobilephone = MyStringUtils.trimParam(mobilephone);
    email = MyStringUtils.trimParam(email);
    qq = MyStringUtils.trimParam(qq);
    schoolID = MyStringUtils.trimParam(schoolID);
    sellerID = MyStringUtils.trimParam(sellerID);
    sellerName = MyStringUtils.trimParam(sellerName);
    //封装到map
    Map<String,String> params = new HashMap<>();
      params.put("name", name);
      params.put("job", job);
      params.put("tel", tel);
      params.put("mobilephone", mobilephone);
      params.put("email", email);
      params.put("qq", qq);
      params.put("schoolID", schoolID);
      params.put("sellerID", sellerID);
      params.put("sellerName", sellerName);
    //插入到数据库
    try{
      return customerService.addContact(params);
    }catch(Exception e){
      log.error("添加联系人失败:"+e.getMessage());
      return "{\"state\":\"1\",\"message\":\"添加联系人失败\"}";
    }
  }
  
    @RequestMapping("/customer/getSchoolProducts")
	@ResponseBody
	public String getSchoolProducts(HttpServletRequest request) {
		String schoolId = request.getParameter("schoolId");
		User user =UserUtils.getCurrentUser(request);
		String empCode=user.getEmpCode();
//		String empCode="xy02003";
		JSONObject result = customerService.getSchoolProduct(schoolId);
		result.put("userId",empCode);
		return result.toString();
	}
	
    
    @RequestMapping("/customer/getSellerById")
    @ResponseBody
    public String getSellerById(HttpServletRequest request){
    	User user=UserUtils.getCurrentUser(request);
    	String code=user.getEmpCode();
    	JSONObject result = customerService.getSellerById(code);
		return result.toString();
    	
    }
    
	@RequestMapping("/customer/getSchoolEvents")
	@ResponseBody
	public String getSchoolEvents(HttpServletRequest request){
		User user =UserUtils.getCurrentUser(request);
		String empCode=user.getEmpCode();
//		String empCode="xy02003";
		String schoolId=request.getParameter("schoolId");
		String tempcount =request.getParameter("count");
		Integer count=Integer.valueOf(tempcount);
		Map<String,Object> map=customerService.getSchoolEvent(schoolId, count,empCode);
		JSONObject result= new JSONObject();
		result.put("data", map);
		return result.toString();
	}
	
	//获取订单协议详情
	  @RequestMapping(value="/customer/salesOrderProtocol.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String salesOrderProtocol(HttpServletRequest req){
	    String orderNum = req.getParameter("orderNum");
        String sellerId = req.getParameter("sellerId");
        orderNum = MyStringUtils.trimParam(orderNum);
        sellerId = MyStringUtils.trimParam(sellerId);
        //封装到map
        Map<String,Object> params = new HashMap<>();
        params.put("orderNum", orderNum);
        params.put("sellerID", sellerId);
	     try{
	       return customerService.getSalesOrderProtocol(params);
	     }catch(Exception e){
	       log.error("获取订单协议失败:"+e.getMessage());
	       return "{\"state\":\"1\",\"message\":\"获取订单协议失败\"}";
	     }
	  }
	  //获取订单快递详情
	  @RequestMapping(value="/customer/salesOrderDelivery.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String salesOrderDelivery(HttpServletRequest req){
	    String orderNum = req.getParameter("orderNum");
        String sellerId = req.getParameter("sellerId");
        orderNum = MyStringUtils.trimParam(orderNum);
        sellerId = MyStringUtils.trimParam(sellerId);
        //封装到map
        Map<String,Object> params = new HashMap<>();
        params.put("orderNum", orderNum);
        params.put("sellerID", sellerId);
	     try{
	       return customerService.getSalesOrderDelivery(params);
	     }catch(Exception e){
	       log.error("获取订单快递失败:"+e.getMessage());
	       return "{\"state\":\"1\",\"message\":\"获取订单快递失败\"}";
	     }
	  }
	  //获取订单资料详情
	  @RequestMapping(value="/customer/salesOrderReference.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String salesOrderReference(HttpServletRequest req){
	    String orderNum = req.getParameter("orderNum");
        String sellerId = req.getParameter("sellerId");
        orderNum = MyStringUtils.trimParam(orderNum);
        sellerId = MyStringUtils.trimParam(sellerId);
        //封装到map
        Map<String,Object> params = new HashMap<>();
        params.put("orderNum", orderNum);
        params.put("sellerID", sellerId);
	    try{
	      return customerService.getSalesOrderReference(params);
	    }catch(Exception e){
	      log.error("获取订单资料失败:"+e.getMessage());
	      return "{\"state\":\"1\",\"message\":\"获取订单资料失败\"}";
	    }
	  }
	  //获取订单发票详情
	  @RequestMapping(value="/customer/salesOrderBill.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String salesOrderBill(HttpServletRequest req){
	    String orderNum = req.getParameter("orderNum");
        String sellerId = req.getParameter("sellerId");
        orderNum = MyStringUtils.trimParam(orderNum);
        sellerId = MyStringUtils.trimParam(sellerId);
        //封装到map
        Map<String,Object> params = new HashMap<>();
        params.put("orderNum", orderNum);
        params.put("sellerID", sellerId);
	    try{
	      return customerService.getSalesOrderBill(params);
	    }catch(Exception e){
	      log.error("获取订单发票失败:"+e.getMessage());
	      return "{\"state\":\"1\",\"message\":\"获取订单发票失败\"}";
	    }
	  }
	  //获取订单到款信息详情
	  @RequestMapping(value="/customer/salesOrderReceiveMoney.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String salesOrderReceiveMoney(HttpServletRequest req){
	    String orderNum = req.getParameter("orderNum");
	    String sellerId = req.getParameter("sellerId");
	    orderNum = MyStringUtils.trimParam(orderNum);
	    sellerId = MyStringUtils.trimParam(sellerId);
	    //封装到map
	    Map<String,Object> params = new HashMap<>();
	    params.put("orderNum", orderNum);
	    params.put("sellerID", sellerId);
	    try{
	      return customerService.getSalesOrderReceiveMoney(params);
	    }catch(Exception e){
	      log.error("获取订单到款信息失败:"+e.getMessage());
	      return "{\"state\":\"1\",\"message\":\"获取订单到款信息失败\"}";
	    }
	  }
	  //根据orderNum和sellerId获取各个流程状态
	  @RequestMapping(value="/seller/processStatusByOrderNumAndSellerId",produces="text/html;charset=UTF-8")
	  @ResponseBody
	  public String processStatusByOrderNumAndSellerId(HttpServletRequest req){
	    String orderNum = req.getParameter("orderNum");
        String sellerId = req.getParameter("sellerID");
        orderNum = MyStringUtils.trimParam(orderNum);
        sellerId = MyStringUtils.trimParam(sellerId);
        //封装到map
        Map<String,Object> params = new HashMap<>();
        params.put("orderNum", orderNum);
        params.put("sellerID", sellerId);
        try{
          return customerService.getProcessStatusByOrderNumAndSellerId(params);
        }catch(Exception e){
          log.error("获取流程状态信息失败:"+e.getMessage());
          return "{\"state\":\"1\",\"message\":\"获取流程状态信息失败\"}";
        }
	  }
	  //根据sellerId、schoolId和productId获取各个流程状态
	  @RequestMapping(value="/seller/processStatusByParams",produces="text/html;charset=UTF-8")
	  @ResponseBody
	  public String processStatusByParams(HttpServletRequest req){
	    Map<String,Object> params = getParamsMap(req);
	    params.put("status", "6");
	    try{
	      return customerService.getProcessStatusByParams(params);
	    }catch(Exception e){
	      log.error("获取流程状态信息失败:"+e.getMessage());
	      return "{\"state\":\"1\",\"message\":\"获取流程状态信息失败\"}";
	    }
	  }
	  //获取我的相关数据
	  @RequestMapping(value="/seller/myInfo.html",produces="text/html;charset=UTF-8")
	  @ResponseBody
	  public String myInfo(HttpServletRequest req){
	    User currentUser = UserUtils.getCurrentUser(req);
	    if(null == currentUser){
	      return "{\"state\":\"1\",\"message\":\"获取当前用户信息失败\"}";
	    }
	    String id = currentUser.getEmpCode();
	    String name = currentUser.getEmpName();
	    log.info("获取当前用户信息成功:id="+id+"&name="+name);
	    return "{\"state\":\"0\",\"message\":\"获取当前用户信息成功\",\"sellerID\":\""+id+"\",\"sellerName\":\""+name+"\"}";
	  }
	  //获取我的保留学校
	  @RequestMapping(value="/seller/myHaveSchool.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String myHaveSchool(HttpServletRequest req){
	    
	    Map<String,Object> params = getParamsMap(req);
	    String status = req.getParameter("status");
	    String schoolType = req.getParameter("schoolType");
	    String stages = req.getParameter("stages");
	    String schoolLevel = req.getParameter("schoolLevel");
	    params.put("status", status);
	    params.put("schoolType", schoolType);
	    params.put("stages", stages);
	    params.put("schoolLevel", schoolLevel);
	    try{
	      return customerService.getMyHaveSchoolList(params);
	    }catch(Exception e){
	      log.error("获取我的保留校失败:"+e.getMessage());
	      return "{\"state\":\"1\",\"message\":\"获取我的保留校失败\"}";
	    }
	  }
	  //获取我的代理学校
	  @RequestMapping(value="/seller/myAgentSchool.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String myAgentSchool(HttpServletRequest req){
	    Map<String,Object> params = getParamsMap(req);
	    try{
	      return customerService.getMyAgentSchool(params);
	    }catch(Exception e){
	      log.error("获取我的关注校失败:"+e.getMessage());
	      return "{\"state\":\"1\",\"message\":\"获取我的关注校失败\"}";
	    }
	  }
	//获取我的试用和使用
      @RequestMapping(value="/seller/useSchoolList.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
      @ResponseBody
      public String useSchoolList(HttpServletRequest req){
        String sellerID = req.getParameter("sellerID");
        String page = req.getParameter("pageNo");
        String productID = req.getParameter("productId");
        String stages = req.getParameter("stages");
        String schoolLevel = req.getParameter("schoolLevel");
        String useLevel = req.getParameter("useLevel");
        String provinceId = req.getParameter("provinceId");
        String cityId = req.getParameter("cityId");
        String districtId = req.getParameter("districtId");
        String schoolId = req.getParameter("schoolId");
        String schoolName = req.getParameter("schoolName");
        String schoolType = req.getParameter("schoolType");
        String status = req.getParameter("status");

        sellerID = MyStringUtils.trimParam(sellerID);
        page = MyStringUtils.trimParam(page);
        schoolId = MyStringUtils.trimParam(schoolId);
        schoolName = MyStringUtils.trimParam(schoolName);
        
        Map<String,Object> params = getParamsMap(req);
        params.put("status", status);
        params.put("schoolType", schoolType);
        params.put("stages", stages);
        params.put("schoolLevel", schoolLevel);
        params.put("useLevel", useLevel);
        
        params.put("provinceID", Integer.parseInt(provinceId));
        params.put("cityID", Integer.parseInt(cityId));
        params.put("districtID", Integer.parseInt(districtId));
        params.put("schoolID", Integer.parseInt(schoolId));
        params.put("schoolName", schoolName);
        params.put("productID", Integer.parseInt(productID));
        
        try{
          return customerService.getMyUseSchoolList(params);
        }catch(Exception e){
          if(status.equals("5")){
            log.error("获取我的试用校失败:"+e.getMessage());
            return "{\"state\":\"1\",\"message\":\"获取我的试用校失败\"}";
          }else{
            log.error("获取我的使用校失败:"+e.getMessage());
            return "{\"state\":\"1\",\"message\":\"获取我的使用校失败\"}";
          }
        }
      }
	  //获取我的联系学校
	  @RequestMapping(value="/seller/myContactSchool.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String myContactSchool(HttpServletRequest req){
	    String sellerID = req.getParameter("sellerID");
	    String page = req.getParameter("pageNo");
	    sellerID = MyStringUtils.trimParam(sellerID);
	    page = MyStringUtils.trimParam(page);
	    //封装到map
	    Map<String,Object> params = new HashMap<>();
	    params.put("sellerID", sellerID);
	    params.put("page", page);
	    params.put("pageSize", Constants.Mine.Mine_PAGE_SIZE);
	    try{
	      return customerService.getMyContactSchool(params);
	    }catch(Exception e){
	      log.error("获取我的联系校失败:"+e.getMessage());
	      return "{\"state\":\"1\",\"message\":\"获取我的联系校失败\"}";
	    }
	  }
	  //获取我的保护学校
	  @RequestMapping(value="/seller/myProtectSchool.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
	  @ResponseBody
	  public String myProtectSchool(HttpServletRequest req){
	    String sellerID = req.getParameter("sellerID");
	      String page = req.getParameter("pageNo");
	      String provinceId = req.getParameter("provinceId");
	      String cityId = req.getParameter("cityId");
	      String districtId = req.getParameter("districtId");
	      String schoolId = req.getParameter("schoolId");
	      String schoolName = req.getParameter("schoolName");
	      String customerType = req.getParameter("customerType");
	      sellerID = MyStringUtils.trimParam(sellerID);
	      page = MyStringUtils.trimParam(page);
	      provinceId = MyStringUtils.trimParam(provinceId);
	      cityId = MyStringUtils.trimParam(cityId);
	      districtId = MyStringUtils.trimParam(districtId);
	      schoolId = MyStringUtils.trimParam(schoolId);
	      schoolName = MyStringUtils.trimParam(schoolName);
	      customerType = MyStringUtils.trimParam(customerType);
	      String stages = req.getParameter("stages");
	      String schoolLevel = req.getParameter("schoolLevel");
	      //封装到map
	      Map<String,Object> params = new HashMap<>();
	      params.put("sellerID", sellerID);
	      params.put("page", page);
	      params.put("pageSize", Constants.Mine.Mine_PAGE_SIZE);
	      params.put("provinceID", provinceId);
	      params.put("cityID", cityId);
	      params.put("districtID", districtId);
	      params.put("schoolID", schoolId);
	      params.put("schoolName", schoolName);
	      
          params.put("stages", stages);
          params.put("schoolLevel", schoolLevel);
          params.put("schoolType", customerType);
	    try{
	      return customerService.getMyProtectSchool(params);
	    }catch(Exception e){
	      log.error("获取我的保护校失败:"+e.getMessage());
	      return "{\"state\":\"1\",\"message\":\"获取我的保护校失败\"}";
	    }
	  }
  	//获取我的关注学校
    @RequestMapping(value="/seller/myAttentionSchool.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String myAttentionSchool(HttpServletRequest req){
      Map<String,Object> params = getParamsMap(req);
      String status = req.getParameter("status");
      String schoolType = req.getParameter("schoolType");
      String stages = req.getParameter("stages");
      String schoolLevel = req.getParameter("schoolLevel");
      
      User seller = UserUtils.getCurrentUser(req);
      String sellerID = MyStringUtils.checkStringParam(seller.getEmpCode());
      params.put("sellerID", sellerID);
		
      params.put("status", status);
      params.put("schoolType", schoolType);
      params.put("stages", stages);
      params.put("schoolLevel", schoolLevel);
      try{
        return customerService.getMyAttentionSchool(params);
      }catch(Exception e){
        log.error("获取我的关注校失败:"+e.getMessage());
        return "{\"state\":\"1\",\"message\":\"获取我的关注校失败\"}";
      }
    } 
    //获取我的订单
    @RequestMapping(value="/seller/myOrders.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String myOrders(HttpServletRequest req){
      String sellerID = req.getParameter("sellerID");
      String page = req.getParameter("pageNo");
      String productID = req.getParameter("productId");
      String schoolType = req.getParameter("schoolType");
      String stages = req.getParameter("stages");
      String schoolLevel = req.getParameter("schoolLevel");
      String useLevel = req.getParameter("useLevel");
      String provinceId = req.getParameter("provinceId");
      String cityId = req.getParameter("cityId");
      String districtId = req.getParameter("districtId");
      String schoolId = req.getParameter("schoolId");
      String schoolName = req.getParameter("schoolName");
      
      sellerID = MyStringUtils.trimParam(sellerID);
      page = MyStringUtils.trimParam(page);
      schoolId = MyStringUtils.trimParam(schoolId);
      schoolName = MyStringUtils.trimParam(schoolName);
      
      //封装到map
      Map<String,Object> params = new HashMap<>();
      params.put("sellerID", sellerID);
      params.put("productID", Integer.parseInt(productID));
      params.put("page", page);
      params.put("pageSize", Constants.Mine.Mine_PAGE_SIZE);
      params.put("status", "");
      params.put("schoolType", schoolType);
      params.put("stages", stages);
      params.put("schoolLevel", schoolLevel);
      params.put("useLevel", useLevel);
      params.put("provinceID", Integer.parseInt(provinceId));
      params.put("cityID", Integer.parseInt(cityId));
      params.put("districtID", Integer.parseInt(districtId));
      params.put("schoolID", Integer.parseInt(schoolId));
      params.put("schoolName", schoolName);
      try{
        return customerService.getMyOrders(params);
      }catch(Exception e){
        log.error("获取我的订单失败:"+e.getMessage());
        return "{\"state\":\"1\",\"message\":\"获取我的订单失败\"}";
      }
    } 
    //我的一个月内要过期的使用校
    @RequestMapping(value="/seller/myOneMonthExpiredInUse.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String myOneMonthExpiredInUse(HttpServletRequest req){
      String sellerID = req.getParameter("sellerID");
      String productID = req.getParameter("productID");
      String status = req.getParameter("status");
      sellerID = MyStringUtils.trimParam(sellerID);
      productID = MyStringUtils.trimParam(productID);
      status = MyStringUtils.trimParam(status);
      String provinceId = req.getParameter("provinceId");
      String cityId = req.getParameter("cityId");
      String districtId = req.getParameter("districtId");
      String schoolId = req.getParameter("schoolId");
      String schoolName = req.getParameter("schoolName");
      String schoolType = req.getParameter("schoolType");
      String stages = req.getParameter("stages");
      String schoolLevel = req.getParameter("schoolLevel");
      //封装到map
      Map<String,Object> params = new HashMap<>();
      params.put("sellerID", sellerID);
      params.put("productID", productID);
      params.put("status", status);
      params.put("provinceID", provinceId);
      params.put("cityID", cityId);
      params.put("districtID", districtId);
      params.put("schoolID", schoolId);
      params.put("schoolName", schoolName);
      params.put("schoolType", schoolType);
      params.put("stages", stages);
      params.put("schoolLevel", schoolLevel);
      try{
        return customerService.getMyOneMonthExpiredInUse(params);
      }catch(Exception e){
        log.error("获取一个月内要过期的使用校失败:"+e.getMessage());
        return "{\"state\":\"1\",\"message\":\"获取一个月内要过期的使用校失败\"}";
      }
    } 
    //我的五天内要过期的试用校
    @RequestMapping(value="/seller/myFiveDaysExpiredInTrial.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String myFiveDaysExpiredInTrial(HttpServletRequest req){
      String sellerID = req.getParameter("sellerID");
      String productID = req.getParameter("productID");
      String status = req.getParameter("status");
      sellerID = MyStringUtils.trimParam(sellerID);
      productID = MyStringUtils.trimParam(productID);
      status = MyStringUtils.trimParam(status);
      String provinceId = req.getParameter("provinceId");
      String cityId = req.getParameter("cityId");
      String districtId = req.getParameter("districtId");
      String schoolId = req.getParameter("schoolId");
      String schoolName = req.getParameter("schoolName");
      String schoolType = req.getParameter("schoolType");
      String stages = req.getParameter("stages");
      String schoolLevel = req.getParameter("schoolLevel");
      //封装到map
      Map<String,Object> params = new HashMap<>();
      params.put("sellerID", sellerID);
      params.put("productID", productID);
      params.put("status", status);
      params.put("provinceID", provinceId);
      params.put("cityID", cityId);
      params.put("districtID", districtId);
      params.put("schoolID", schoolId);
      params.put("schoolName", schoolName);
      params.put("schoolType", schoolType);
      params.put("stages", stages);
      params.put("schoolLevel", schoolLevel);
      try{
        return customerService.getMyFiveDaysExpiredInTrial(params);
      }catch(Exception e){
        log.error("获取五天内要过期的试用校失败:"+e.getMessage());
        return "{\"state\":\"1\",\"message\":\"获取五天内要过期的试用校失败\"}";
      }
    } 
    //我的未全部到款的使用校
    @RequestMapping(value="/seller/myPartPayInUse.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String myPartPayInUse(HttpServletRequest req){
      String sellerID = req.getParameter("sellerID");
      String productID = req.getParameter("productID");
      sellerID = MyStringUtils.trimParam(sellerID);
      productID = MyStringUtils.trimParam(productID);
      String provinceId = req.getParameter("provinceId");
      String cityId = req.getParameter("cityId");
      String districtId = req.getParameter("districtId");
      String schoolId = req.getParameter("schoolId");
      String schoolName = req.getParameter("schoolName");
      String status = req.getParameter("status");
      String schoolType = req.getParameter("schoolType");
      String stages = req.getParameter("stages");
      String schoolLevel = req.getParameter("schoolLevel");
      //封装到map
      Map<String,Object> params = new HashMap<>();
      params.put("sellerID", sellerID);
      params.put("productID", productID);
      params.put("provinceID", provinceId);
      params.put("cityID", cityId);
      params.put("districtID", districtId);
      params.put("schoolID", schoolId);
      params.put("schoolName", schoolName);
      params.put("status", status);
      params.put("schoolType", schoolType);
      params.put("stages", stages);
      params.put("schoolLevel", schoolLevel);
      try{
        return customerService.getMyPartPayInUse(params);
      }catch(Exception e){
        log.error("获取未全部到款的使用校失败:"+e.getMessage());
        return "{\"state\":\"1\",\"message\":\"获取未全部到款的使用校失败\"}";
      }
    } 
    //我的协议寄出一个月未返回学校
    @RequestMapping(value="/seller/myNoBackProtocolPostOneMonth.html",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String myNoBackProtocolPostOneMonth(HttpServletRequest req){
      String sellerID = req.getParameter("sellerID");
      String productID = req.getParameter("productID");
      sellerID = MyStringUtils.trimParam(sellerID);
      productID = MyStringUtils.trimParam(productID);
      String provinceId = req.getParameter("provinceId");
      String cityId = req.getParameter("cityId");
      String districtId = req.getParameter("districtId");
      String schoolId = req.getParameter("schoolId");
      String schoolName = req.getParameter("schoolName");
      String status = req.getParameter("status");
      String schoolType = req.getParameter("schoolType");
      String stages = req.getParameter("stages");
      String schoolLevel = req.getParameter("schoolLevel");
      //封装到map
      Map<String,Object> params = new HashMap<>();
      params.put("sellerID", sellerID);
      params.put("productID", productID);
      params.put("provinceID", provinceId);
      params.put("cityID", cityId);
      params.put("districtID", districtId);
      params.put("schoolID", schoolId);
      params.put("schoolName", schoolName);
      params.put("status", status);
      params.put("schoolType", schoolType);
      params.put("stages", stages);
      params.put("schoolLevel", schoolLevel);
      try{
        return customerService.getMyNoBackProtocolPostOneMonth(params);
      }catch(Exception e){
        log.error("获取协议寄出一个月未返回学校失败:"+e.getMessage());
        return "{\"state\":\"1\",\"message\":\"获取协议寄出一个月未返回学校失败\"}";
      }
    } 
	
    @RequestMapping(value="/seller/processStatuses",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String processStatuses(HttpServletRequest req){
      String sellerID = req.getParameter("sellerID");
      String schoolID = req.getParameter("schoolID");
      String productID = req.getParameter("productID");
      sellerID = MyStringUtils.trimParam(sellerID);
      schoolID = MyStringUtils.trimParam(schoolID);
      productID = MyStringUtils.trimParam(productID);
      //封装到map
      Map<String,Object> params = new HashMap<>();
      params.put("sellerID", sellerID);
      params.put("schoolID", schoolID);
      params.put("productID", productID);
      params.put("OrderNum", "");
      try{
        return customerService.getProcessStatuses(params);
      }catch(Exception e){
        log.error("获取流程状态失败:"+e.getMessage());
        return "{\"state\":\"1\",\"message\":\"获取流程状态失败\"}";
      }
    }
    
    @RequestMapping(value="/customer/orderDetails",method=RequestMethod.POST, produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String orderDetails(HttpServletRequest req){
      String schoolID = req.getParameter("schoolID");
      String productID = req.getParameter("productID");
      schoolID = MyStringUtils.trimParam(schoolID);
      productID = MyStringUtils.trimParam(productID);
      //封装到map
      Map<String,Object> params = new HashMap<>();
      params.put("schoolID", schoolID);
      params.put("productID", productID);
      params.put("OrderNum", "");
      try{
        return customerService.getOrderDetails(params);
      }catch(Exception e){
        log.error("获取流程状态失败:"+e.getMessage());
        return "{\"state\":\"1\",\"message\":\"获取流程状态失败\"}";
      }
    }
	/**
	 * @author hutairan
	 * @param request
	 * @return
	 * @discription 客户列表页面
	 */
	
	@RequestMapping("/customer/getSchoolListBySearchAll")
	@ResponseBody
	public String getSchoolListBySearchAll(HttpServletRequest request){
		String result="";
		try {
			String stages = request.getParameter("stages").equals("null")? "": request.getParameter("stages"); //学段：1幼儿园2小学3初中4高中
			String schoolType = request.getParameter("schoolType").equals("null")? "": request.getParameter("schoolType");
			String schoolLevel = request.getParameter("schoolLevel").equals("null")? "": request.getParameter("schoolLevel");
			String schoolName = request.getParameter("schoolName").equals("null")? "": request.getParameter("schoolName");
			String schoolID = MyStringUtils.checkIntegerParam(request.getParameter("schoolID"));
			String provinceID = MyStringUtils.checkIntegerParam(request.getParameter("provinceID")); 
			String cityID = MyStringUtils.checkIntegerParam(request.getParameter("cityID"));
			String districtID = MyStringUtils.checkIntegerParam(request.getParameter("districtID"));//区县id
			String pageSize = MyStringUtils.checkIntegerParam(request.getParameter("pageSize")); 
			String page = MyStringUtils.checkIntegerParam(request.getParameter("page")); 
			
			Map<String,Object> paramap=new HashMap<String,Object>();
			
			ParamCommon.putCommonParam(paramap);			
			paramap.put("stages", stages);
			paramap.put("schoolType", schoolType);
			paramap.put("provinceID", provinceID);
			paramap.put("cityID", cityID);
			paramap.put("districtID", districtID);
			paramap.put("pageSize", pageSize);
			paramap.put("schoolLevel", schoolLevel);
			paramap.put("page", page);
			paramap.put("schoolID", schoolID);
			paramap.put("schoolName", schoolName);	
			
			if(request.getMethod().equals("POST")) {
				String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
				result = HttpUtils.httpPost(serviceUrl+"/SchoolService.asmx/GetSchoolListBySearchAll", paramap);
				System.out.println(result);
				result = XMLUtils.getRootText(result);
			}else{
				log.error("不是POST请求");
				result = "error:not post";
				JSONObject resultError = new JSONObject();
				resultError.put("error", result);
				result = resultError.toString();
			}
//			result = customerService.HandleResultSchoolList(result);
		}catch(Exception e){
			log.error("调用失败:"+e.getMessage());
			e.printStackTrace();	
			result = "error:exception";
			
			JSONObject resultError = new JSONObject();
			resultError.put("error", result);
			result = resultError.toString();
		}
		return result;
	}
	/**
	 * 
	 * @param request
	 * @return
	 * @discription 根据关键字获取学校列表
	 * @author hutairan
	 */
	@RequestMapping("/customer/getSchoolListByKeyWord")
	@ResponseBody
	public String getSchoolListByKeyWord(HttpServletRequest request){
		String keyWord = request.getParameter("keyWord");
		String fields = request.getParameter("fields");
		JSONObject result = customerService.getSchoolListByKeyWord(keyWord,fields);
		return result.toString();
	}
	
	@RequestMapping("/customer/getSchoolInfromation")
	@ResponseBody
	public String getSchoolInfromation(HttpServletRequest request){
		String schoolId=request.getParameter("schoolId");
		JSONObject result = customerService.getSchoolInfromation(schoolId);
		return result.toString();
	}
	

	private Map<String,Object>getParamsMap(HttpServletRequest req){
	  String sellerID = req.getParameter("sellerID");
      String page = req.getParameter("pageNo");
      String provinceId = req.getParameter("provinceId");
      String cityId = req.getParameter("cityId");
      String districtId = req.getParameter("districtId");
      String productId = req.getParameter("productId");
      String schoolId = req.getParameter("schoolId");
      String schoolName = req.getParameter("schoolName");
      sellerID = MyStringUtils.trimParam(sellerID);
      page = MyStringUtils.trimParam(page);
      provinceId = MyStringUtils.trimParam(provinceId);
      cityId = MyStringUtils.trimParam(cityId);
      districtId = MyStringUtils.trimParam(districtId);
      productId = MyStringUtils.trimParam(productId);
      schoolId = MyStringUtils.trimParam(schoolId);
      schoolName = MyStringUtils.trimParam(schoolName);
      //封装到map
      Map<String,Object> params = new HashMap<>();
      params.put("sellerID", sellerID);
      params.put("page", page);
      params.put("pageSize", Constants.Mine.Mine_PAGE_SIZE);
      params.put("provinceID", provinceId);
      params.put("cityID", cityId);
      params.put("districtID", districtId);
      params.put("productID", productId);
      params.put("schoolID", schoolId);
      params.put("schoolName", schoolName);
      return params;
	}

	
	@RequestMapping("/customer/checkSchoolName")
	@ResponseBody
	public String checkSchoolName(HttpServletRequest request){
		String schoolName=request.getParameter("schoolName");
		Map<String,Object> paramap=new HashMap<String,Object>();
		ParamCommon.putCommonParam(paramap);			
		paramap.put("schoolName", schoolName);
		String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
		String result = HttpUtils.httpPost(serviceUrl+"/SchoolService.asmx/IsExistSchoolName", paramap);
		System.out.println(result);
		try {
			result = XMLUtils.getRootText(result);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	@RequestMapping("/customer/addCustomer")
	@ResponseBody
	public String addCustomer(HttpServletRequest request){
		String schoolName = MyStringUtils.checkStringParam(request.getParameter("schoolName")); 
		String schoolShortName = MyStringUtils.checkStringParam(request.getParameter("schoolShortName"));
		String schoolLevel = MyStringUtils.checkStringParam(request.getParameter("schoolLevel")); 
		String schoolType = MyStringUtils.checkStringParam(request.getParameter("schoolType")); 
		String schoolStage = MyStringUtils.checkStringParam(request.getParameter("schoolStage")); 
		String provinceID = MyStringUtils.checkIntegerParam(request.getParameter("provinceId")); 
		String cityID = MyStringUtils.checkIntegerParam(request.getParameter("cityId"));
		String districtID = MyStringUtils.checkIntegerParam(request.getParameter("districtId"));//区县id
		String schoolAddRess = MyStringUtils.checkStringParam(request.getParameter("schoolAddRess"));
		String schoolZipCode = MyStringUtils.checkStringParam(request.getParameter("schoolZipCode"));
		String customer = MyStringUtils.checkStringParam(request.getParameter("customer"));
		String customerJob = MyStringUtils.checkStringParam(request.getParameter("customerJob"));
		String linkPhone = MyStringUtils.checkStringParam(request.getParameter("linkPhone"));
		String linkMobile = MyStringUtils.checkStringParam(request.getParameter("linkMobile"));
		String linkEmail = MyStringUtils.checkStringParam(request.getParameter("linkEmail"));
		String linkQQ = MyStringUtils.checkStringParam(request.getParameter("linkQQ"));
		
		User user=UserUtils.getCurrentUser(request);
		
		Map<String,Object> paramap=new HashMap<String,Object>();
		ParamCommon.putCommonParam(paramap);			
		paramap.put("SchoolName", schoolName);
		paramap.put("schoolShortName", schoolShortName);
		paramap.put("schoolLevel", schoolLevel);
		paramap.put("schoolType", schoolType);
		paramap.put("provinceID", provinceID);
		paramap.put("cityID", cityID);
		paramap.put("districtID", districtID);
		paramap.put("schoolAddRess", schoolAddRess);
		paramap.put("schoolZipCode", schoolZipCode);
		paramap.put("customer", customer);
		paramap.put("customerJob", customerJob);
		paramap.put("linkPhone", linkPhone);
		paramap.put("linkMobile", linkMobile);
		paramap.put("linkEmail", linkEmail);
		paramap.put("linkQQ", linkQQ);
		paramap.put("SellerID", user.getEmpCode());
		paramap.put("SellerName", user.getEmpName());
//		paramap.put("SellerID", "xy02003");
//		paramap.put("SellerName", "兰景林");
		paramap.put("isNurserySchool", 0);
		paramap.put("isGradeSchool", 0);
		paramap.put("isMiddleSchool", 0);
		paramap.put("isHighSchool", 0);
		if(schoolStage!=null && schoolStage!="null"){
			String[] stageValues=schoolStage.split(",");
			for(String a:stageValues){
				if(a!=null&&a!=""){
					switch (Integer.parseInt(a)) {
					case 0:
						paramap.put("isNurserySchool", 1);
						break;
					case 1:
						paramap.put("isGradeSchool", 1);
						break;
					case 2:
						paramap.put("isMiddleSchool", 1);
						break;
					case 3:
						paramap.put("isHighSchool", 1);
						break;
					default:
						break;
					}
				}
			}
		}
		
		System.out.println(paramap);
		
		String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
		String result = HttpUtils.httpPost(serviceUrl+"/SchoolService.asmx/AddSchoolInfo", paramap);
		System.out.println(result);
		try {
			result = XMLUtils.getRootText(result);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
		return result;
		
		
	}

	/**
	 * 点击微信服务号上的“我的订单”按钮时，由此方法处理
	 * @author wangwei01
	 * @time 2016年5月20日 下午4:20:10
	 */
	@RequestMapping("/customer/goToMySchools")
	public String goToMySchools(HttpServletRequest request) {
		User user = UserUtils.getCurrentUser(request);
		String name = "";
		try {
			name = URLEncoder.encode("我的订单","utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String redirectUrl = "/pages/mySchools.html?sellerID="+user.getEmpCode()+"&mySwitch=8&mySwitchType="+name+"&source=wechat";
		log.info("gotoMyschools 重定向到我的订单页面 :"+user.getEmpCode()+", "+redirectUrl);
		return "redirect:"+redirectUrl;
	}
	
}
