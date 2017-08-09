package sale.utils;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

/**
 * xml处理的相关工具方法
 * @author wangwei01
 * @time 2016年5月9日 上午9:17:21
 */
public class XMLUtils {

	/**
	 * 解析xml
	 * @param 带解析的xml字符串
	 * @author wangwei01
	 * @throws DocumentException 
	 * @time 2016年5月9日 上午9:17:38
	 */
	public static String getRootText(String xml) throws DocumentException {
		Document document = DocumentHelper.parseText(xml);
		Element root = document.getRootElement();
		return root.getTextTrim();
	}
	
	public static void main(String[] args) {
		
		 //定义要解析的XML字符串
		   String resultStr = "<?xml version=\"1.0\" encoding=\"GBK\"?><message>"
		     + "<body>"
		     + "<ticketNotify>"
		     + "<ticket id=\"6000012007051000000231\" dealTime=\"20070510165423\" status=\"0000\" message=\"成功,系统处理正常\"/>"
		     + "<ticket id=\"6000012007051000000232\" dealTime=\"20070510165424\" status=\"2012\" message=\"禁止倍投\"/>"
		     + "</ticketNotify>" + "</body></message>";
		
		try {
			 Document document = null;
			   //将字符串转换为
			//   document = reader.read(new ByteArrayInputStream(transMessage
//			     .getBytes("GBK")));
			   
			   document = DocumentHelper.parseText(resultStr);
			   // 得到xml的根节点(message)
			   Element root = document.getRootElement();
			   
			   System.out.println(root.getTextTrim());
			
//			resultStr = XmlUtils.getRootText(resultStr);
		} catch (DocumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		System.out.println("******************\n\n");
		
	}
	
}
