package sale.workflow.service;

import java.util.Map;

import net.sf.json.JSONObject;

public interface CustomerService {

	/**
	 * 得到省列表的json对象
	 * @return
	 */
	public JSONObject GetProvince();

	/**
	 * 根据省id得到城市信息的json对象
	 * @param provinceID
	 * @return
	 */
	public JSONObject GetCityByProvinceID(int provinceID);

	/**
	 * 根据城市id得到区县信息的json对象
	 * @param provinceID
	 * @return
	 */
	public JSONObject GetDistrictByCityID(int provinceID);

	/**
	 * 将返回的学校列表数据进行统一处理
	 * @param result
	 * @return
	 */
	public String HandleResultSchoolList(String result);
	
	/**
	 * <p>Description:添加联系人</p>
	 * @param map
	 * @return
	 * @author:潘鹏鹏
	 * @date:2016-2016年5月9日-下午5:00:57
	 */
	public String addContact(Map<String, String> map);
	
	/**
	 * <p>Description:根据学校ID和sellerID获得联系人列表</p>
	 * @param ID
	 * @return
	 * @author:潘鹏鹏
	 * @param pageNo 
	 * @date:2016-2016年5月9日-下午5:01:04
	 */
	public String getContactBySchoolID(Map<String, Object> params);
	
	public JSONObject getSchoolProduct(String schoolId);
	
	public JSONObject getSellerById(String SellerId);
	
	public Map<String,Object> getSchoolEvent(String schoolId,Integer count,String empCode);
	
	/**
     * <p>Description:获取学校某个产品的订单协议详情</p>
     * @param params
     * @author:潘鹏鹏
     * @date:2016-2016年5月9日-下午7:23:02
     */
    public String getSalesOrderProtocol(Map<String, Object> params);
    
    /**
     * <p>Description:获取学校某个产品的订单快递详情</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月10日-上午10:28:47
     */
    public String getSalesOrderDelivery(Map<String, Object> params);
    
    /**
     * <p>Description:获取学校某个产品的订单发票详情</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月10日-上午11:34:46
     */
    public String getSalesOrderBill(Map<String, Object> params);

    /**
     * <p>Description:获取学校某个产品的订单到款信息详情</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月10日-下午1:50:21
     */
    public String getSalesOrderReceiveMoney(Map<String, Object> params);
    
    /**
     * <p>Description:获取订单资料详情</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月11日-上午9:53:50
     */
    public String getSalesOrderReference(Map<String, Object> params);
    
    /**
     * <p>Description:获取我的保留学校</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月11日-下午4:24:38
     */
    public String getMyHaveSchoolList(Map<String, Object> params);

    /**
     * <p>Description:获取我的代理学校</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月11日-下午4:45:11
     */
    public String getMyAgentSchool(Map<String, Object> params);
    
    /**
     * <p>Description:获取我的(使用，试用)学校列表</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月10日-下午7:29:08
     */
    public String getMyUseSchoolList(Map<String, Object> params);

    /**
     * <p>Description:获取我的联系学校</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月11日-下午4:45:38
     */
    public String getMyContactSchool(Map<String, Object> params);
    
    /**
     * <p>Description:获取我的保护学校</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月11日-下午4:46:03
     */
    public String getMyProtectSchool(Map<String, Object> params);

    /**
     * <p>Description:获取我的关注学校列表</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月11日-下午3:53:28
     */
    public String getMyAttentionSchool(Map<String, Object> params);
    
    /**
     * <p>Description:获取我的订单</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月12日-上午10:04:04
     */
    public String getMyOrders(Map<String, Object> params);

	public JSONObject getSchoolListByKeyWord(String keyWord,String fields);
	
	public JSONObject getSchoolInfromation(String schoolId);
	
    /**
     * <p>Description:我的一个月内要过期的使用校</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月12日-上午10:11:30
     */
    public String getMyOneMonthExpiredInUse(Map<String, Object> params);

    /**
     * <p>Description:我的五天内要过期的试用校</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月12日-上午10:13:35
     */
    public String getMyFiveDaysExpiredInTrial(Map<String, Object> params);

    /**
     * <p>Description:我的未全部到款的使用校</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月12日-上午10:15:34
     */
    public String getMyPartPayInUse(Map<String, Object> params);

    /**
     * <p>Description:我的协议寄出一个月未返回学校</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月12日-上午10:17:26
     */
    public String getMyNoBackProtocolPostOneMonth(Map<String, Object> params);
    
    /**
     * <p>Description:如果是已过期，根据学校ID、产品ID、sellerId查出状态（试用还是使用过期），以及订单编号</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月16日-下午1:53:23
     */
    public Map<String,Object> getExpiredType(Map<String,Object> params);
    
    /**
     * <p>Description:如果是已过期，根据学校ID、产品ID、sellerId查出对应的流程（协议、快递、协议反馈、发票、到款）的确认状态（已确认/未确认）</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月16日-下午1:51:50
     */
    public String  getProcessStatuses(Map<String,Object> params);

    /**
     * <p>Description:根据orderNum和sellerId获取各个流程状态</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月16日-下午4:28:35
     */
    public String getProcessStatusByOrderNumAndSellerId(Map<String, Object> params);

    /**
     * <p>Description:根据sellerId、schoolId和productId获取各个流程状态</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月16日-下午4:50:14
     */
    public String getProcessStatusByParams(Map<String, Object> params);

    /**
     * <p>Description:根据schoolID和productID获取订单详情的通用接口</p>
     * @param params
     * @return
     * @author:潘鹏鹏
     * @date:2016-2016年5月19日-下午8:46:49
     */
    public String getOrderDetails(Map<String, Object> params);
}
