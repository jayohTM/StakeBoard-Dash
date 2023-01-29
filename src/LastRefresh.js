import Refresh from "./refresh.svg"
import { useState, useEffect } from "react";

function LastRefresh(props) {
    const [timeSinceGetData, setTimeSinceGetData] = useState(0);
    console.log("lastrefresh" + props.dataNew);
    useEffect(() => {
        if(props.dataNew) {
        //change to use date function so that a device can leave the page on mobile and still have updated time
            if (timeSinceGetData >= 0 && props.dataNew) {
                let intervalId = setInterval(() => {
                    setTimeSinceGetData(timeSinceGetData + 1);
                    console.log("time" + timeSinceGetData);
                }, 1000)
                return () => clearInterval(intervalId);
            }
        }
    }, [props.dataNew, timeSinceGetData]); 
        

    return (
        <div className="update-modal">
            <p className="update-status">
                {props.dataNew ? (
                    <>
                        <img src={Refresh} className="refresh-icon"></img>
                        Updated {timeSinceGetData} seconds ago
                    </>
                ) : (
                    <>
                        <img src={Refresh} className="refresh-icon"></img>
                        No wallet connected
                    </>
                )}
            </p>
        </div>
    )
}
export default LastRefresh;