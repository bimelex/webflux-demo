import { TextArea } from 'devextreme-react';
import React, { useEffect, useState } from 'react'
import ReactSpeedometer from "react-d3-speedometer"


export const Dashboard = () => {

    // const [cpuUsagePs, setcpuUsagePs] = useState(0);
    // const [memoryUsagePs, setmemoryUsagePs] = useState(0);
    // const [currentDatePs, setcurrentDatePs] = useState(0);
    // const [taskTimePs, settaskTimePs] = useState(0);

    // const [cpuUsageTs, setcpuUsageTs] = useState(0);
    // const [memoryUsageTs, setmemoryUsageTs] = useState(0);
    // const [currentDateTs, setcurrentDateTs] = useState(0);
    // const [taskTimeTs, settaskTimeTs] = useState(0);

    
    const [agentData, setAgentData] = useState(0);
    const [realTimeData, setRealTimeData] = useState(0);

    let realTimeInterval;
    let agentInfoInterval;
    


    let eventMemory1 = undefined;
    let eventMemory2 = undefined;
    

  
    useEffect(() => {
        function realTimeReconnect ()  {
            realTimeEvent();
        }
    
        function agentInfoReconnect () {
            agentInfoEvent();
        }
    
       
        const realTimeEvent = () => {
            
            eventMemory1 = new EventSource("https://127.0.0.1:8443/event/realtime/data");
            if(eventMemory1.readyState !== eventMemory1.CLOSED) { 
                clearInterval(realTimeInterval);
            }

            eventMemory1.onmessage = (event) => {
                
                setRealTimeData(event.data);
                console.log("EventSource 1");
                //    setData(event.data);
                // const usagePs = JSON.parse(event.data);
                // setmemoryUsagePs(usagePs.memoryUsage)
                // setcpuUsagePs(usagePs.cpuUsage)
                // setcurrentDatePs(usagePs.date)
                // settaskTimePs(usagePs.taskTime)
            }
            eventMemory1.onerror = (err) => {
                console.error("EventSource Ps failed:", err);
                eventMemory1.close();
                // realTimeInterval = setInterval(() => {
                //     if(err.target.readyState === err.target.CLOSED) {
                //         realTimeReconnect();
                //     }
                // }, 1000)
                
            }

        }
    
        const agentInfoEvent = () => {
    
            eventMemory2 = new EventSource("https://127.0.0.1:8443/event/agentinfo/data");
            
            if(eventMemory2.readyState !== eventMemory2.CLOSED) {
                clearInterval(agentInfoInterval);
            }

            eventMemory2.onmessage = (event) => {
                
                //    setData(event.data);
                setAgentData(event.data)
                console.log("EventSource 22");
                // const usageTs = JSON.parse(event.data);
                
            }
            eventMemory2.onerror = (err) => {
                console.error("EventSource Ts failed:", err);
                eventMemory2.close();
                // agentInfoInterval = setInterval(() => {
                //     if(err.target.readyState === err.target.CLOSED) {
                //         agentInfoReconnect();
                //     } 
                // },1000)
    
            }
    
        }
    
       

        realTimeEvent();
        agentInfoEvent();

       
        return () => {
            eventMemory1.close();
            eventMemory2.close();
            console.log("event closed")
        }

    }, [])

  
    return (
        <div style={{ "marginTop": "20px", "textAlign": "center", "height": "100%", "width": "100%" }}>
            <h3>Real Time Data Dashboard </h3>
            <textarea value={realTimeData} style={{"fontSize":"12px", "height":"600px", "width": "90%","resize":"none"}}></textarea>
            {/* <h5>조회 소요시간 : {taskTimePs}<br/>Ontune Time : {currentDatePs}</h5> */}
            {/* <div style={{ "display": "inline-flex" }}>
                <div style={{"marginRight":"50px"}}>
                    <ReactSpeedometer
                        maxValue={100}
                        value={cpuUsagePs}
                        valueFormat={"d"}
                        customSegmentStops={[0, 25, 50, 75, 100]}
                        segmentColors={["#FFACAA", "#D46D6A", "#801815", "#550200"]}
                        currentValueText={"CPU Usage: ${value} %"}
                        textColor={"white"}
                    />
                </div>

                <div style={{"marginLeft":"50px"}}>
                    <ReactSpeedometer
                        maxValue={100}
                        value={memoryUsagePs}
                        valueFormat={"d"}
                        customSegmentStops={[0, 25, 50, 75, 100]}
                        segmentColors={["#FFD3AA", "#D49E6A", "#804915", "#552900"]}
                        currentValueText={"Memory Usage: ${value} %"}
                        textColor={"white"}
                    />
                </div>
            </div> */}
            <div>
                <div style={{"margin":"50px"}}>
                    <h3>AgentInfo Data</h3>
                    <textarea value={agentData} style={{"fontSize":"12px", "height":"200px", "width": "90%","resize":"none"}}></textarea>
                    {/* <h5>조회 소요시간 : {taskTimeTs}<br/>Ontune Time : {currentDateTs}</h5>
                    <div style={{ "display": "inline-flex" }}>
                        <div style={{"marginRight":"50px"}}>
                            <ReactSpeedometer
                                maxValue={100}
                                value={cpuUsageTs}
                                valueFormat={"d"}
                                customSegmentStops={[0, 25, 50, 75, 100]}
                                segmentColors={["#CCEB9D", "#9DC462", "#4F7514", "#2F4E00"]}
                                currentValueText={"CPU Usage: ${value} %"}
                                textColor={"white"}
                            />
                        </div>

                        <div style={{"marginLeft":"50px"}}>
                            <ReactSpeedometer
                                maxValue={100}
                                value={memoryUsageTs}
                                valueFormat={"d"}
                                customSegmentStops={[0, 25, 50, 75, 100]}
                                segmentColors={["#FFFFAA", "#D4D46A", "#808015", "#555500"]}
                                currentValueText={"Memory Usage: ${value} %"}
                                textColor={"white"}
                            />
                        </div>
                    </div> */}
                </div>
                </div>

        </div>
        
    )
}
