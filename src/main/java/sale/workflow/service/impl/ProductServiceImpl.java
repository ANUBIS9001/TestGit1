package sale.workflow.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.dom4j.DocumentException;
import org.springframework.stereotype.Service;

import sale.utils.HttpUtils;
import sale.utils.PropertiesUtils;
import sale.utils.XMLUtils;
import sale.workflow.bean.Product;
import sale.workflow.common.ParamCommon;
import sale.workflow.dao.ProductDao;
import sale.workflow.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	
	private final static Logger log = Logger.getLogger(ProductServiceImpl.class);

	@Resource
	private ProductDao productdao;
	
	@Override
	public List<Product> getAllProduct() {
		return productdao.getAllProduct();
	}
	
	@Override
	public Product getProductById(Long productId) {
		
		return productdao.getProductById(productId);
	}

	@Override
	public void insert(Product product) {
		productdao.insert(product);
	}

	@Override
	public void deleteAll() {
		productdao.deleteAll();
	}
	
	/**
	 * 对产品列表进行分组的处理
	 * @param result
	 * @return
	 */
//	@Override
//	public String HandleResultProductList(String result){
//		
//		JSONObject resultObject = JSONObject.fromObject(result);
//		if(!resultObject.get("Code").toString().equals("200")){
//			JSONObject resultError = new JSONObject();
//			if(result.equals("error")){
//				resultError.put("error", "error:posterror");
//			}else{
//				resultError.put("error", resultObject.get("Code"));
//			}
//			return resultError.toString();
//		}
//		
//		JSONArray listArray = resultObject.getJSONArray("Data");
//		
////		ProductServiceImpl.sort(listArray, "ProductTypeName", true);
//		
//		JSONArray resultArray = new JSONArray();		
//		JSONArray schoolArray = new JSONArray();
//		
//		String ProductTypeName = "";
//		JSONObject typeObject = new JSONObject();
//		for(int i=0;i<listArray.size();i++){
//			if(!ProductTypeName.equals(((JSONObject)listArray.get(i)).get("ProductTypeName").toString())){
//				if(!ProductTypeName.equals("")){
//					typeObject.element("schoolArray",schoolArray);
//					resultArray.add(typeObject);
//				}
//				
//				typeObject = new JSONObject();
//				ProductTypeName = ((JSONObject)listArray.get(i)).get("ProductTypeName").toString();				
//				typeObject.element("ProductTypeName",ProductTypeName);
//				
//				if(i==listArray.size()-1){
//					typeObject.element("schoolArray",schoolArray);
//				}
//			}
//			
//			JSONObject schoolObject = new JSONObject();
//			schoolObject.element("ProductName", ((JSONObject)listArray.get(i)).get("ProductName").toString());
//			schoolObject.element("ProductID", ((JSONObject)listArray.get(i)).get("ProductID").toString());
//			schoolArray.add(schoolObject);
//		}
//		
//		return resultArray.toString();		
//	}

//	/**
//	 * 
//	 * @param ja json数组
//	 * @param field 要排序的key
//	 * @param isAsc 是否升序
//	 */
//	@SuppressWarnings("unchecked")
//	private static void sort(JSONArray ja, final String field, boolean isAsc) {
//		Collections.sort(ja, new Comparator<JSONObject>() {
//			@Override
//			public int compare(JSONObject o1, JSONObject o2) {
//				Object f1 = o1.get(field);
//				Object f2 = o2.get(field);
//				if (f1 instanceof Number && f2 instanceof Number) {
//					return ((Number) f1).intValue() - ((Number) f2).intValue();
//				} else {
//					return f1.toString().compareTo(f2.toString());
//				}
//			}
//		});
//		if (!isAsc) {
//			Collections.reverse(ja);
//		}
//	}
	@Override
	public void retrieveProduct() {
		Map<String, Object> map = new HashMap<String, Object>();
		ParamCommon.putCommonParam(map);
		String json = null;
		try {
			json = XMLUtils.getRootText(HttpUtils.httpPost(PropertiesUtils.getProperty("serviceUrl")+"/ProductService.asmx/GetAllProduct", map));
			JSONObject object = JSONObject.fromObject(json);
			if((Integer)object.get("Code") == 200) {
				JSONArray dataList = JSONArray.fromObject(object.get("Data"));
				productdao.deleteAll();
				for(int i=0; i<dataList.size(); i++) {
					JSONObject productObj = dataList.getJSONObject(i);
//					Long productId = Long.valueOf(productObj.getInt("ProductID"));
//					Product product = productdao.getProductById(productId);
//					if(product == null) {
					log.info("向数据库中添加id为"+productObj.getInt("ProductID")+", 名为"+productObj.getString("ProductName")+"的产品");
					Product product = new Product();
					product.setId(Long.valueOf(productObj.getInt("ProductID")));
					product.setName((String)productObj.getString("ProductName"));
					productdao.insert(product);
//					}
//					else {
//						log.info("数据库中已存在id为"+productObj.getInt("ProductID")+", 名为"+productObj.getString("ProductName")+"的产品，无需添加");
//					}
				}
			}
			System.out.println(json);
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		Map<String, Object> map = new HashMap<String, Object>();
		ParamCommon.putCommonParam(map);
		String response = HttpUtils.httpPost(PropertiesUtils.getProperty("serviceUrl")+"/ProductService.asmx/GetAllProduct", map);
		try {
			System.out.println(XMLUtils.getRootText(response));
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
