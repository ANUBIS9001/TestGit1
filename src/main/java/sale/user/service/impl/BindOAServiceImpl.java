package sale.user.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sale.user.bean.User;
import sale.user.bean.WChatOA;
import sale.user.bean.WChatOAExample;
import sale.user.dao.UserMapper;
import sale.user.dao.WChatOAMapper;
import sale.user.service.BindOAService;

@Service
@Transactional
public class BindOAServiceImpl implements BindOAService {

	private Logger log=Logger.getLogger(BindOAServiceImpl.class);
	
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private WChatOAMapper wChatOAMapper;
	
	@Override
	public int bindOA(HttpServletRequest request, User user) {
		HttpSession session = request.getSession();
		//更新WChatOA表
		WChatOA wChatOA=(WChatOA)session.getAttribute("tempWChatOAData");
		WChatOA record=new WChatOA();
		byte useState=(byte) (wChatOA.getUseState()+1);
		WChatOAExample example=new WChatOAExample();
		example.createCriteria().andUseStateEqualTo(wChatOA.getUseState()).andCodeEqualTo(wChatOA.getCode());
		List<WChatOA> lockDatas = wChatOAMapper.selectByExampleWithLock(example);
		if(lockDatas.isEmpty()){
			return 0;
		}
		record.setUseState(useState);
		record.setValidateTime(new Date());
		int updateResult = wChatOAMapper.updateByExampleSelective(record, example);
		if(updateResult==0){
			return 0;
		}
		//更新用户表
		String openid=(String)session.getAttribute("openid");
		user.setOpenid(openid);
		user.setCreateTime(new Date());
		int insertResult = userMapper.insertSelective(user);
		log.info("userMapper.insertSelective影响条数："+insertResult);
		log.info("wChatOAMapper.updateByExampleSelective影响条数："+updateResult);
		return insertResult;
	}

}
