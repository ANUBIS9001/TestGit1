package sale.user.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import sale.user.bean.User;
import sale.user.bean.UserExample;
import sale.user.bean.WChatOA;
import sale.user.bean.WChatOAExample;
import sale.user.service.UserService;
import sale.user.service.WChatOAService;
import sale.utils.MyStringUtils;
import sale.utils.PropertiesUtils;
import sale.utils.SendMessageUtils;

@Controller
@RequestMapping("/notifyWYX")
public class NotifyWYX {

	private Logger log=Logger.getLogger(NotifyWYX.class);
	
	@Autowired
	private UserService userService;
	@Autowired
	private WChatOAService wChatOAService;
	
	@RequestMapping("/userStateChange")
	@ResponseBody
	public Map<String,String> userStateChange(String empCode,String userState){
		Map<String,String> map=new HashMap<>();
		try{
			if(MyStringUtils.isEmpty(empCode)||MyStringUtils.isEmpty(userState)){
				map.put("state", "false");
				return map;
			}
			User user=new User();
			user.setState(new Byte(userState));
			user.setUpdateTime(new Date());
			UserExample userExample=new UserExample();
			userExample.createCriteria().andEmpCodeEqualTo(empCode);
			int affectedRows = userService.updateByExampleSelective(user, userExample);
			if(!empCode.startsWith("xy")&&affectedRows==0){
				WChatOA wChatOA=new WChatOA();
				wChatOA.setUseState(new Byte("1"));
				WChatOAExample wChatOAExample=new WChatOAExample();
				wChatOAExample.createCriteria().andEmpCodeEqualTo(empCode);
				wChatOAService.updateByExampleSelective(wChatOA, wChatOAExample);
			}
		}catch(Exception e){
			String mobile = PropertiesUtils.getProperty("notifyWYX.userStateChange.errorMobile");
			String content="OA账户离职异常，empCode:"+empCode+",userState:"+userState+"。请及时解决！【微营销·开发】";
			SendMessageUtils.sendMessage(mobile, content);
			log.error("OA账户离职异常，empCode:"+empCode+",userState:"+userState, e);
		}
		map.put("state", "true");
		return map;
	}
}
