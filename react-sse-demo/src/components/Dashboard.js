import React, { useEffect, useState } from 'react'
import ReactSpeedometer from "react-d3-speedometer"


export const Dashboard = () => {

    const [listening1, setListening1] = useState(false);
    const [listening2, setListening2] = useState(false);
    const [listening3, setListening3] = useState(false);

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


    let eventMemory1 = undefined;
    let eventMemory2 = undefined;
    let eventMemory3 = undefined;



    useEffect(() => {
        if (!listening1) {
            eventMemory1 = new EventSource("https://localhost:8443/event/postgres/usage");
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
            }

            setListening1(true)
        }

        if (!listening2) {
            eventMemory2 = new EventSource("https://localhost:8443/event/time/usage");
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
            }

            setListening2(true)
        }

        if (!listening3) {
            eventMemory3 = new EventSource("https://localhost:8443/event/elastic/usage");
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
            }

            setListening3(true)
        }
      

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
