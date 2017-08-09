package sale.utils;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.FileSystems;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import net.sf.json.JSONObject;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;

/**
 * 二维码相关工具方法
 * @author wangwei01
 * @time 2016年5月7日 上午11:36:26
 */
public class QRCodeUtils {
	
	private static Integer WIDTH = Integer.valueOf(PropertiesUtils.getProperty("width_default"));
	private static Integer HEIGHT = Integer.valueOf(PropertiesUtils.getProperty("height_default"));
	/**
	 * 将字符串转成二维码
	 * @param content 待转换的字符串
	 * @return 二维码的字节输出流
	 * @author wangwei01
	 * @time 2016年5月7日 下午1:44:57
	 */
    public static ByteArrayOutputStream encode(String content) throws WriterException, IOException {
    	ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        String format = "png";
        Map<EncodeHintType, Object> hints = new HashMap<EncodeHintType, Object>();  
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");  
        BitMatrix bitMatrix = new MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, WIDTH, HEIGHT, hints);// 生成矩阵
        MatrixToImageWriter.writeToStream(bitMatrix, format, outputStream);
        System.out.println("输出成功"); 
        return outputStream;
    }
	
	public static void main(String[] args) {
		try {
			FileOutputStream fileOutputStream = new FileOutputStream("d:/qrcode.png");
			ByteArrayOutputStream byteArrayOutputStream = (ByteArrayOutputStream) encode("http://admin.shitibao.zxxk.com/");
			byteArrayOutputStream.writeTo(fileOutputStream);
			fileOutputStream.flush();
			fileOutputStream.close();
			byteArrayOutputStream.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (WriterException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
