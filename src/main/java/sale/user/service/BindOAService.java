package sale.user.service;

import javax.servlet.http.HttpServletRequest;

import sale.user.bean.User;

public interface BindOAService {
	
	/**
	 * 绑定账户的数据层处理
	 * @param request
	 * @param user 用户信息
	 * @return
	 */
	public int bindOA(HttpServletRequest request,User user);

}
