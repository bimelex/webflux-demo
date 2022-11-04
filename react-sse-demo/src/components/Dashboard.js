import React, { useEffect, useState } from 'react'
import ReactSpeedometer from "react-d3-speedometer"


export const Dashboard = () => {

    const [cpuUsagePs, setcpuUsagePs] = useState(0);
    const [memoryUsagePs, setmemoryUsagePs] = useState(0);
    const [currentDatePs, setcurrentDatePs] = useState(0);
    const [taskTimePs, settaskTimePs] = useState(0);

    const [cpuUsageTs, setcpuUsageTs] = useState(0);
    const [memoryUsageTs, setmemoryUsageTs] = useState(0);
    const [currentDateTs, setcurrentDateTs] = useState(0);
    const [taskTimeTs, settaskTimeTs] = useState(0);

    const [cpuUsageEs, setcpuUsageEs] = useState(0);
    const [memoryUsageEs, setmemoryUsageEs] = useState(0);
    const [currentDateEs, setcurrentDateEs] = useState(0);
    const [taskTimeEs, settaskTimeEs] = useState(0);

    const [data, setData] = useState(0);

    let postgreInterval;
    let tsdbInterval;
    let elasticInterval;


    let eventMemory1 = undefined;
    let eventMemory2 = undefined;
    let eventMemory3 = undefined;

  
    useEffect(() => {
        function postgreReconnect ()  {
            postgreEvent();
        }
    
        function tsdbReconnect () {
            tsdbEvent();
        }
    
        function elasticReconnect () {
            elascitEvent();
        }
    

        const postgreEvent = () => {

            eventMemory1 = new EventSource("https://localhost:8443/event/postgres/usage");
            if(eventMemory1.readyState !== eventMemory1.CLOSED) {
                clearInterval(postgreInterval);
            }

            eventMemory1.onmessage = (event) => {
                //    setData(event.data);
                    const usagePs = JSON.parse(event.data);
                    setmemoryUsagePs(usagePs.memoryUsage)
                    setcpuUsagePs(usagePs.cpuUsage)
                    setcurrentDatePs(usagePs.date)
                    settaskTimePs(usagePs.taskTime)
            }
            eventMemory1.onerror = (err) => {
                console.error("EventSource Ps failed:", err);
                eventMemory1.close();
                postgreInterval = setInterval(() => {
                    if(err.target.readyState === err.target.CLOSED) {
                        postgreReconnect();
                    }
                }, 1000)
                
            }

        }
    
        const tsdbEvent = () => {
    
            eventMemory2 = new EventSource("https://localhost:8443/event/time/usage");
            
            if(eventMemory2.readyState !== eventMemory2.CLOSED) {
                clearInterval(tsdbInterval);
            }

            eventMemory2.onmessage = (event) => {
                //    setData(event.data);
                    const usageTs = JSON.parse(event.data);
                    setmemoryUsageTs(usageTs.memoryUsage)
                    setcpuUsageTs(usageTs.cpuUsage)
                    setcurrentDateTs(usageTs.date)
                    settaskTimeTs(usageTs.taskTime)
            }
            eventMemory2.onerror = (err) => {
                console.error("EventSource Ts failed:", err);
                eventMemory2.close();
                tsdbInterval = setInterval(() => {
                    if(err.target.readyState === err.target.CLOSED) {
                        tsdbReconnect();
                    } 
                },1000)
    
            }
    
        }
    
        const elascitEvent = () => {
    
            eventMemory3 = new EventSource("https://localhost:8443/event/elastic/usage");
            if(eventMemory3.readyState !== eventMemory3.CLOSED) {
                clearInterval(elasticInterval);
            }
            eventMemory3.onmessage = (event) => {
                //    setData(event.data);
                    const usageEs = JSON.parse(event.data);
                    setmemoryUsageEs(usageEs.memoryUsage)
                    setcpuUsageEs(usageEs.cpuUsage)
                    setcurrentDateEs(usageEs.date)
                    settaskTimeEs(usageEs.taskTime)
                }
                eventMemory3.onerror = (err) => {
                    console.error("EventSource Es failed:", err);
                    eventMemory3.close();
                    elasticInterval = setInterval(() => {
                        if(err.target.readyState === err.target.CLOSED) {
                            elasticReconnect();
                            
                        } 
                    },1000)
                   
                }
        }

        postgreEvent();
        tsdbEvent();
        elascitEvent();
       
        return () => {
            eventMemory1.close();
            eventMemory2.close();
            eventMemory3.close();
            console.log("event closed")
        }

    }, [])

  
    return (
        <div style={{ "marginTop": "20px", "textAlign": "center", "height": "100%" }}>
            <h3>Postagres Dashboard </h3>
            <h5>조회 소요시간 : {taskTimePs}<br/>Ontune Time : {currentDatePs}</h5>
            <div style={{ "display": "inline-flex" }}>
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
            </div>
            <div>
                <div style={{"float": "left", "margin":"100px"}}>
                    <h3>TimeScale Dashboard</h3>
                    <h5>조회 소요시간 : {taskTimeTs}<br/>Ontune Time : {currentDateTs}</h5>
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
                    </div>
                </div>

                <div style={{"float":"right", "margin":"100px"}}>
                    <h3>Elastic Dashboard</h3>
                    <h5>조회 소요시간 : {taskTimeEs}<br/>Ontune Time : {currentDateEs}</h5>
                    <div style={{ "display": "inline-flex" }}>
                        <div style={{"marginRight":"50px"}}>
                            <ReactSpeedometer
                                maxValue={100}
                                value={cpuUsageEs}
                                valueFormat={"d"}
                                customSegmentStops={[0, 25, 50, 75, 100]}
                                segmentColors={["#7788AA", "#4E648E", "#152B55", "#061639"]}
                                currentValueText={"CPU Usage: ${value} %"}
                                textColor={"white"}
                            />
                        </div>

                        <div style={{"marginLeft":"50px"}}>
                            <ReactSpeedometer
                                maxValue={100}
                                value={memoryUsageEs}
                                valueFormat={"d"}
                                customSegmentStops={[0, 25, 50, 75, 100]}
                                segmentColors={["#C4C1CC", "#9791A7", "#5A5077", "#41375F"]}
                                currentValueText={"Memory Usage: ${value} %"}
                                textColor={"white"}
                            />
                        </div>
                    </div>
                </div>
                </div>

        </div>
        
    )
}
