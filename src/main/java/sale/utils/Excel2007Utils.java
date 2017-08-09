package sale.utils;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * excel2007相关工具类方法
 * @author wangwei01
 * @time 2016年5月7日 上午11:39:07
 */
public class Excel2007Utils {

	private final static Logger log = Logger.getLogger(Excel2007Utils.class);
	/**
	 * 获取整个workbook中的数据,以list的形式返回
	 * @param workbook 待读取的workbook
	 * @author wangwei01
	 * @time 2016年5月7日 下午1:54:05
	 */
	public static List<List<String>> readAll(XSSFWorkbook workbook) {
		List<List<String>> list = new ArrayList<List<String>>();
		for(int i=0; i<workbook.getNumberOfSheets(); i++) {
			XSSFSheet sheet = workbook.getSheetAt(i);
			System.out.println(sheet.getLastRowNum());
			for(int j=0; j<=sheet.getLastRowNum(); j++) {
				XSSFRow row = sheet.getRow(j);
				List<String> rowList = new ArrayList<String>();
				if(row == null)
					continue;
				log.info("cell number : "+j+"  "+row.getLastCellNum());
				for(int k=0; k<row.getLastCellNum(); k++) {
					log.info("toString : "+row.getCell(k).toString());
					rowList.add(row.getCell(k).toString());
				}
				list.add(rowList);
			}
		}
		return list;
	}
	
	@SuppressWarnings("finally")
	public static List<List<String>> readAll(String path) {
		List<List<String>> result = null;
		XSSFWorkbook workbook = null;
		try {
			workbook = new XSSFWorkbook(new File(path));
			result = readAll(workbook);
		} catch (InvalidFormatException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} 
		return result;
	}
	
	public static void main(String[] args) {
		try {
			XSSFWorkbook workbook = new XSSFWorkbook(new File("C:\\Users\\Administrator\\Desktop\\试题消重明细统计报表.xlsx"));
			List<List<String>> list = readAll(workbook);
			for(List<String> row : list) {
				for(String cell : row) {
					System.out.print(cell+", ");
				}
				System.out.println();
			}
		} catch (InvalidFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
