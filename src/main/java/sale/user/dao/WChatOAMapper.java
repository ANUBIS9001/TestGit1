package sale.user.dao;

import java.util.List;
import org.apache.ibatis.annotations.Param;
import sale.user.bean.WChatOA;
import sale.user.bean.WChatOAExample;

public interface WChatOAMapper {
    int countByExample(WChatOAExample example);

    int deleteByExample(WChatOAExample example);

    int deleteByPrimaryKey(Long id);

    int insert(WChatOA record);

    int insertSelective(WChatOA record);

    List<WChatOA> selectByExample(WChatOAExample example);
    
    /**
     * 加行锁
     * @param example 条件参数
     * @return
     */
    List<WChatOA> selectByExampleWithLock(WChatOAExample example);

    WChatOA selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") WChatOA record, @Param("example") WChatOAExample example);

    int updateByExample(@Param("record") WChatOA record, @Param("example") WChatOAExample example);

    int updateByPrimaryKeySelective(WChatOA record);

    int updateByPrimaryKey(WChatOA record);
}