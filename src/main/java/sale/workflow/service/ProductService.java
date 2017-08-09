package sale.workflow.service;

import java.util.List;

import sale.workflow.bean.Product;

public interface ProductService {
	/**
	 * @author hutairan
	 * @param productId
	 * @return
	 * @description 根据产品ID获取产品信息
	 */
	public Product getProductById(Long productId);
	
	void insert(Product product);
	
	void deleteAll();
	/**
	 * 将返回的产品列表信息进行处理
	 * @param result
	 * @return
	 */
//	public String HandleResultProductList(String result);
	
	/**
	 * 从旧销售系统取产品数据，并更新到t_product表中
	 * @author wangwei01
	 * @time 2016年5月10日 下午4:01:22
	 */
	void retrieveProduct();
	
	/**
	 * 得到所有产品列表
	 * @return
	 */
	List<Product> getAllProduct();
}
