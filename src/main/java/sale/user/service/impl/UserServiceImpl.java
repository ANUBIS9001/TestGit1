package sale.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sale.user.bean.User;
import sale.user.bean.UserExample;
import sale.user.dao.UserMapper;
import sale.user.service.UserService;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	public UserMapper userMapper;
	
	@Override
	public List<User> selectByExample(UserExample example) {
		return userMapper.selectByExample(example);
	}

	@Override
	public int insertSelective(User record) {
		return userMapper.insertSelective(record);
	}

	@Override
	public int updateByExampleSelective(User record, UserExample example) {
		return userMapper.updateByExampleSelective(record, example);
	}

}
