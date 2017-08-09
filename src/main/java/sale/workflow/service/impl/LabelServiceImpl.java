package sale.workflow.service.impl;

import java.util.HashMap;
import java.util.Map;

import org.dom4j.DocumentException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.xkw.uc.api.util.ConfigUtils;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import sale.utils.HttpUtils;
import sale.utils.PropertiesUtils;
import sale.utils.XMLUtils;
import sale.workflow.common.Constants.COMMON;
import sale.workflow.common.ParamCommon;
import sale.workflow.service.LabelService;

@Service("labelService")
@Transactional
public class LabelServiceImpl implements LabelService{
	private static final Logger log = LoggerFactory.getLogger(LabelServiceImpl.class);

	@Override
	public String getLabelSections(){
		String labelapikey = PropertiesUtils.getProperty("labelapikey");
		String labelsecretkey = PropertiesUtils.getProperty("labelsecretkey");
		String labelapiurl = PropertiesUtils.getProperty("labelapiurl");
		//接口初始化
    	ConfigUtils.config(labelapikey, labelsecretkey, labelapiurl);
		
		//此处写通过url获取的，读取成功更新配置文件
    	String LabelStrByGet = "";
		try {
			Map<String,Object> paramap=new HashMap<String,Object>();
			ParamCommon.putCommonParam(paramap);	
			paramap.put("platformID", COMMON.PlatformID_WEIYINGXIAO);//平台ID，2代表微营销
			String result = "";
			String serviceUrl=PropertiesUtils.getProperty("serviceUrl");
			result = HttpUtils.httpPost(serviceUrl+"/Service.asmx/GetPlatformBindTags", paramap);
			
			result = XMLUtils.getRootText(result);
			
			JSONObject jO = JSONObject.fromObject(result);
			if(jO.get("Code").toString().equals("200")&& !"null".equals(JSONObject.fromObject(jO.get("Data")).get("List").toString()) ){
				JSONArray jA = (JSONArray) JSONObject.fromObject(jO.get("Data")).get("List");
				for(int i=0;i<jA.size();i++){
					LabelStrByGet += JSONObject.fromObject(jA.get(i)).get("SignName") + ",";
				}
				LabelStrByGet = LabelStrByGet.substring(0, LabelStrByGet.length()-1);
			}
		} catch (DocumentException e) {
			LabelStrByGet = "";
			log.error("从接口获取类别参数失败，错误："+e.getMessage());
			e.printStackTrace();
		}
		
		if(("").equals(LabelStrByGet)){
			//当读取失败才从配置文件读取
			LabelStrByGet=PropertiesUtils.getProperty("LabelSection");
		}else{
			//接口读取成功则更新配置（此处不需要更新文件，只需要更新内存中的配置）
			PropertiesUtils.setProperty("LabelSection", LabelStrByGet);
		}
		
		return LabelStrByGet;
	}
	
}
