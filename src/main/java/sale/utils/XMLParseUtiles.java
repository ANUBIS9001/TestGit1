package sale.utils;

import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.junit.Test;
import org.w3c.dom.Document;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

public class XMLParseUtiles {
	
	public  void parse(String protocolXML) {   
        
        try {   
             DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();   
             DocumentBuilder builder = factory.newDocumentBuilder();   
             Document document = builder.parse(new InputSource(new StringReader(protocolXML)));   
  
             NodeList nodeList = document.getElementsByTagName("EmpInfo");
             NamedNodeMap attributes = nodeList.item(0).getAttributes();
             Node node = attributes.getNamedItem("EmpCode");
             String value = node.getNodeValue();
             System.out.println(value);
         } catch (Exception e) {   
             e.printStackTrace();   
         }   
     }
	@Test
	public void test(){
		String str="<?xml version=\"1.0\" encoding=\"utf-8\"?><EmpInfo EmpCode=\"xy07487\" EmpName=\"李宁01\" DeptCode=\"00032205\" DeptName=\"技术总体部\" DeptManage=\"0\" DutyCode=\"124\" DutyName=\"java工程师\" LoginName=\"李宁01\" State=\"0\" FirstWeb=\"FirstWeb001\"></EmpInfo>";
		parse(str);
	}
}
