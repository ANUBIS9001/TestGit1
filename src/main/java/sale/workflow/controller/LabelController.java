package sale.workflow.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.xkw.uc.api.CommonService;
import cn.xkw.uc.api.response.TagInfoOut;
import cn.xkw.uc.api.response.TagResult;
import cn.xkw.uc.common.response.DataResponse;
import cn.xkw.uc.common.response.ListResponse;
import net.sf.json.JSONObject;
import sale.utils.MyStringUtils;
import sale.workflow.service.LabelService;

@Controller
public class LabelController {
	private static final Logger log = LoggerFactory.getLogger(LabelController.class);
	  
    @Autowired
    LabelService labelService;
    
    @RequestMapping(value = "/label/GetLabelSections.json")
	@ResponseBody
	public String GetLabelSections(HttpServletRequest request) {
    	String labelSections = labelService.getLabelSections(); 
    	JSONObject LabelSectionJson = new JSONObject();
    	LabelSectionJson.put("labelSections", labelSections);
		return LabelSectionJson.toString();
    }
    
    
    @RequestMapping(value = "/label/QueryTagByOrgid.json")
	@ResponseBody
	public ListResponse<TagInfoOut> QueryTagByOrgid(HttpServletRequest request,HttpServletResponse response) {
    	ListResponse<TagInfoOut> Tags = null;
    	try
    	{
	    	Integer orgId = Integer.valueOf(MyStringUtils.checkIntegerParam(request.getParameter("schoolID"))); 
	    	String sign = MyStringUtils.checkStringParam(request.getParameter("labelSections")); 
	    	
	    	Tags = CommonService.queryTagByOrgid(orgId, sign);
    	}catch(Exception e){
    		log.error("QueryTagByOrgid异常："+e.getMessage());
    		e.printStackTrace();
    	}
		return Tags;
    }
    
    @RequestMapping(value = "/label/QueryTagLibBySign.json")
   	@ResponseBody
   	public ListResponse<TagResult> QueryTagLibBySign(HttpServletRequest request) {
    	ListResponse<TagResult> TagLibs = null;
    	try
    	{
    		String sign = MyStringUtils.checkStringParam(request.getParameter("labelSections")); 
       	
    		TagLibs = CommonService.queryTagLibBySign(sign);
    	}catch(Exception e){
    		log.error("QueryTagLibBySign异常："+e.getMessage());
    		e.printStackTrace();
    	}
   		return TagLibs;
    }
    
    @RequestMapping(value = "/label/BindTag.json")
   	@ResponseBody
   	public DataResponse<Boolean> BindTag(HttpServletRequest request) {
    	DataResponse<Boolean> bindResult = null;
    	try
    	{
	    	Integer orgId = Integer.valueOf(MyStringUtils.checkIntegerParam(request.getParameter("schoolID"))); 
	    	Integer tagid = Integer.valueOf(MyStringUtils.checkStringParam(request.getParameter("tagid"))); 
	    	String sellerId = MyStringUtils.checkStringParam(request.getParameter("sellerId")); 
	    	
	    	bindResult = CommonService.bindOrganizationTag(orgId, tagid, sellerId);
    	}catch(Exception e){
    		log.error("BindTag异常："+e.getMessage());
    		e.printStackTrace();
    	}
   		return bindResult;
    }
    
    @RequestMapping(value = "/label/UnbindTag.json")
   	@ResponseBody
   	public DataResponse<Boolean> UnbindTag(HttpServletRequest request) {
    	DataResponse<Boolean> bindResult = null;
    	try
    	{
	    	Integer orgId = Integer.valueOf(MyStringUtils.checkIntegerParam(request.getParameter("schoolID"))); 
	    	Integer tagid = Integer.valueOf(MyStringUtils.checkStringParam(request.getParameter("tagid"))); 
	    	String sellerId = MyStringUtils.checkStringParam(request.getParameter("sellerId")); 
	    	
	    	bindResult = CommonService.unBindOrganizationTag(orgId, tagid, sellerId);
    	}catch(Exception e){
    		log.error("UnbindTag异常："+e.getMessage());
    		e.printStackTrace();
    	}
   		return bindResult;
    }
}
