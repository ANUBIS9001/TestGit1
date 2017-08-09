package sale.user.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import sale.user.bean.WChatOA;
import sale.user.bean.WChatOAExample;

public interface WChatOAService {

	/**
	 * 根据条件查询数据
	 * @param example 条件
	 * @return
	 */
	public List<WChatOA> selectByExample(WChatOAExample example);
	
	/**
	 * 根据条件更新有效数据
	 * @param record 数据
	 * @param example 条件
	 * @return
	 */
	public int updateByExampleSelective(@Param("record") WChatOA record, @Param("example") WChatOAExample example);
}
