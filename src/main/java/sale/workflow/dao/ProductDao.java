package sale.workflow.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import sale.workflow.bean.Product;

public interface ProductDao {
	Product getProductById(Long productId);
	 
	void insert(Product product);

	void deleteAll();
	
	List<Product> getAllProduct();
	
	/**
	 * <p>Description:根据id集获取产品信息集</p>
	 * @param ids
	 * @return
	 * @author:潘鹏鹏
	 * @date:2016-2016年5月12日-下午4:24:38
	 */
	List<Product> getProductsByIds(@Param("ids")List<Long> ids);
}
