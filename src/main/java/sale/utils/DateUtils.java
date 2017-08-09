package sale.utils;

import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class DateUtils {
  
  public static String getDayOfMonth(){
    Calendar calendar = Calendar.getInstance(TimeZone.getDefault(),Locale.CHINESE);
    calendar.setTime(new Date());
    return String.valueOf(calendar.get(Calendar.DAY_OF_MONTH));
  }
}
