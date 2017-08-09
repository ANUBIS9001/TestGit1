package sale.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class JsonUtils {
  private static final Logger log = LoggerFactory.getLogger(JsonUtils.class);

  public static List<Map<String, Object>> parseJSON2List(String jsonStr){
    JSONArray jsonArr = JSONArray.fromObject(jsonStr);
    List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
    Iterator<JSONObject> it = jsonArr.iterator();
    while(it.hasNext()){
      JSONObject json2 = it.next();
      list.add(parseJSON2Map(json2.toString()));
    }
    return list;
  }
  
   
  public static Map<String, Object> parseJSON2Map(String jsonStr){
    log.info("----解析json为map开始----jsonStr:"+jsonStr);
    Map<String, Object> map = new HashMap<String, Object>();
    //最外层解析
    JSONObject json = JSONObject.fromObject(jsonStr);
    for(Object k : json.keySet()){
      Object v = json.get(k); 
      //如果内层还是数组的话，继续解析
      if(v instanceof JSONArray){
        List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
        Iterator<JSONObject> it = ((JSONArray)v).iterator();
        while(it.hasNext()){
          JSONObject json2 = it.next();
          list.add(parseJSON2Map(json2.toString()));
        }
        map.put(k.toString(), list);
      } else {
        map.put(k.toString(), v);
      }
    }
    log.info("----解析json为map结束----map:"+map.toString());
    return map;
  }
  
}
