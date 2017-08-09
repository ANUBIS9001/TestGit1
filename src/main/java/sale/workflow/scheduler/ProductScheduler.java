package sale.workflow.scheduler;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import sale.workflow.service.ProductService;

@Component("productScheduler")
public class ProductScheduler {
	
	private final static Logger log = Logger.getLogger(ProductScheduler.class);
	
	@Resource
	private ProductService productService;

	/**
	 * 定时任务：每天0点整从旧销售系统取数据，并更新到t_product
	 * @author wangwei01
	 * @time 2016年5月10日 下午4:03:17
	 */
	@Scheduled(cron = "0 0 0 * * *")
	public void updateProduct() {
		log.info("更新t_product表");
		productService.retrieveProduct();
		log.info("更新t_product表成功");
	}
}
