package com.oshan.webfluxdemo.mapper;

import com.oshan.webfluxdemo.model.AgentInfoDTO;
import com.oshan.webfluxdemo.model.RealTimePerfDTO;
import com.oshan.webfluxdemo.model.Usage;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UsageMapper {

    @Select("<script>"
        + "select agent_id as agentId\n"
        + ", agent_name as agentName\n"
        + ", to_char(ontune_time,'yyyy-mm-dd hh24:mi:ss') as ontuneTime\n"
        + ", _user as _user\n"
        + ", _sys as _sys\n"
        + ", _idle as _idle\n"
        + ", _processor_count as _processorCount\n"
        + ", _run_queue as _runQueue\n"
        + ", _block_queue as _blockQueue\n"
        + ", _wait_queue as _waitQueue\n"
        + ", _p_queue as _pQueue\n"
        + ", _pcrate_user as _pcrateUser\n"
        + ", _pcrate_sys as _pcrateSys\n"
        + ", _memory_size as _memorySize\n"
        + ", _memory_used as _memoryUsed\n"
        + ", _memory_pinned as _memoryPinned\n"
        + ", _memory_sys as _memorySys\n"
        + ", _memory_user as _memoryUser\n"
        + ", _memory_cache as _memoryCache\n"
        + ", _avm as _avm\n"
        + ", _paging_space_in as _pagingSpaceIn\n"
        + ", _paging_space_out as _pagingSpaceOut\n"
        + ", _file_system_in as _fileSystemIn\n"
        + ", _file_system_out as _fileSystemOut\n"
        + ", _memory_scan as _memoryScan\n"
        + ", _memory_freed as _memoryFreed\n"
        + ", _swap_size as _swapSize\n"
        + ", _swap_used as _swapUsed\n"
        + ", _swap_active as _swapActive\n"
        + ", _fork as _fork\n"
        + ", _exec as _exec\n"
        + ", _interupt as _interupt\n"
        + ", _system_call as _systemCall\n"
        + ", _context_switch as _contextSwitch\n"
        + ", _semaphore as _semaphore\n"
        + ", _msg as _msg\n"
        + ", _disk_read_write as _diskReadWrite\n"
        + ", _disk_iops as _diskIops\n"
        + ", _network_read_write as _networkReadWrite\n"
        + ", _network_iops as _networkIops\n"
        + ", _top_command_id as _topCommandId\n"
        + ", _top_command_count as _topCommandCount\n"
        + ", _top_user_id as _topUserId\n"
        + ", _top_cpu as _topCpu\n"
        + ", _top_disk_id as _topDiskId\n"
        + ", _top_vg_id as _topVgId\n"
        + ", _top_busy as _topBusy\n"
        + ", _max_pid as _maxPid\n"
        + ", _thread_count as _threadCount\n"
        + ", _pid_count as _pidCount\n"
        + ", _linux_buffer as _linuxBuffer\n"
        + ", _linux_cached as _linuxCached\n"
        + ", _linux_srec as _linuxSrec\n"
        + ", _mem_used_mb as _memUsedMb\n"
        + ", _irq as _irq\n"
        + ", _soft_irq as _softIrq\n"
        + ", _swap_used_mb as _swapUsedMb\n"
        + ", _dusm as _dusm\n"
        + ", to_char(create_date,'yyyy-mm-dd hh24:mi:ss') as createDate"
        + "  from real_time_perf"
        + "  where ontune_time = (select max(ontune_time) from real_time_perf)"
        + "</script>")
    List<RealTimePerfDTO> getRealTimeData();

    @Select("<script>"
        + "select agent_name as agentName"
        + ", connect_yn as connectYn"
        + "  from agent_info"
        + "</script>")
    List<AgentInfoDTO> getAgentInfoData();

}
