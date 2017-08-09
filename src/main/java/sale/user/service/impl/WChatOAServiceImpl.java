package sale.user.service.impl;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sale.user.bean.WChatOA;
import sale.user.bean.WChatOAExample;
import sale.user.dao.WChatOAMapper;
import sale.user.service.WChatOAService;

@Service
@Transactional
public class WChatOAServiceImpl implements WChatOAService {

	@Autowired
	private WChatOAMapper wChatOAMapper;
	
	@Override
	public List<WChatOA> selectByExample(WChatOAExample example) {
		return wChatOAMapper.selectByExample(example);
	}

	@Override
	public int updateByExampleSelective(@Param("record") WChatOA record,
			@Param("example") WChatOAExample example) {
		return wChatOAMapper.updateByExampleSelective(record, example);
	}

}
