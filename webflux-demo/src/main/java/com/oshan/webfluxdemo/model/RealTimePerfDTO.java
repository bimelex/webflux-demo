package com.oshan.webfluxdemo.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class RealTimePerfDTO {

    private Integer agentId;
    private String agentName;
    private String ontuneTime;
    private Integer _user;
    private Integer _sys;
    private Integer _idle;
    private Integer _processorCount;
    private Integer _runQueue;
    private Integer _blockQueue;
    private Integer _waitQueue;
    private Integer _pQueue;
    private Integer _pcrateUser;
    private Integer _pcrateSys;
    private Integer _memorySize;
    private Integer _memoryUsed;
    private Integer _memoryPinned;
    private Integer _memorySys;
    private Integer _memoryUser;
    private Integer _memoryCache;
    private Integer _avm;
    private Integer _pagingSpaceIn;
    private Integer _pagingSpaceOut;
    private Integer _fileSystemIn;
    private Integer _fileSystemOut;
    private Integer _memoryScan;
    private Integer _memoryFreed;
    private Integer _swapSize;
    private Integer _swapUsed;
    private Integer _swapActive;
    private Integer _fork;
    private Integer _exec;
    private Integer _interupt;
    private Integer _systemCall;
    private Integer _contextSwitch;
    private Integer _semaphore;
    private Integer _msg;
    private Integer _diskReadWrite;
    private Integer _diskIops;
    private Integer _networkReadWrite;
    private Integer _networkIops;
    private Integer _topCommandId;
    private Integer _topCommandCount;
    private Integer _topUserId;
    private Integer _topCpu;
    private Integer _topDiskId;
    private Integer _topVgId;
    private Integer _topBusy;
    private Integer _maxPid;
    private Integer _threadCount;
    private Integer _pidCount;
    private Integer _linuxBuffer;
    private Integer _linuxCached;
    private Integer _linuxSrec;
    private Integer _memUsedMb;
    private Integer _irq;
    private Integer _softIrq;
    private Integer _swapUsedMb;
    private Integer _dusm;
    private String createDate;


}
