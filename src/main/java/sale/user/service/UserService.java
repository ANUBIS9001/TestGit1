package sale.user.service;

import java.util.List;

import sale.user.bean.User;
import sale.user.bean.UserExample;

public interface UserService {
	
	/**
	 * 获取用户信息
	 * @param example 查询参数
	 * @return 集合list
	 */
	public List<User> selectByExample(UserExample example);
	
	/**
	 * 添加有效数据
	 * @param record
	 * @return
	 */
	public int insertSelective(User record);

	/**
	 * 根据条件更新数据
	 * @param record 数据
	 * @param example 条件
	 * @return
	 */
	public int updateByExampleSelective(User record, UserExample example);
}
