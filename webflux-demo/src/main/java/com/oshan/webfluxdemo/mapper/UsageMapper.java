package com.oshan.webfluxdemo.mapper;

import com.oshan.webfluxdemo.model.Usage;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UsageMapper {

    @Select("<script>"
        + "select 'Postgres test' as hostname"
        + "     , _user+_sys as cpuUsage"
        + "     , trunc(_memoryused/100) as memoryUsage"
        + "     , to_char(to_timestamp(_ontunetime),'yyyy-mm-dd HH24:mi:ss') as date"
        + "     , '' as taskTime"
        + "  from realtimeperf"
        + "  where _ontunetime = (select max(_ontunetime) from realtimeperf)"
        + "</script>")
    List<Usage> getUsageData();

    @Select("<script>"
        + "select 'Timescale Test' as hostname"
        + "     , _user+_sys as cpuUsage"
        + "     , trunc(_memoryused/100) as memoryUsage"
        + "     , to_char(_ontunetime,'yyyy-mm-dd HH24:mi:ss') as date"
        + "     , '' as taskTime"
        + "  from realtimeperf_time"
        + "  where _ontunetime = (select max(_ontunetime) from realtimeperf_time)"
        + "</script>")
    List<Usage> getUsageTsData();

}
