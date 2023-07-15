import Refresh from "./img/refresh.svg"
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

function LastRefresh(props) {
    const {isConnected} = useAccount();
    const [timeSinceGetData, setTimeSinceGetData] = useState(0);
    console.log("lastrefresh" + props.dataNew);
    useEffect(() => {
        if(props.dataNew && isConnected) {
        //change to use date function so that a device can leave the page on mobile and still have updated time
            if (timeSinceGetData >= 0 && props.dataNew && isConnected) {
                let intervalId = setInterval(() => {
                    setTimeSinceGetData(timeSinceGetData + 1);
                    console.log("time" + timeSinceGetData);
                }, 1000)
                return () => clearInterval(intervalId);
            }else{
                setTimeSinceGetData(0);
            }
        }
    }, [props.dataNew, timeSinceGetData]); 
        

    return (
        <div className="update-modal">
            <p className="update-status">
                {props.dataNew && timeSinceGetData !== 0 && isConnected ? (
                    <>
                        <img src={Refresh} className="refresh-icon"></img>
                        Updated {timeSinceGetData} seconds ago
                    </>
                ) : (
                    <>
                        <img src={Refresh} className="refresh-icon"></img>
                        No recent updates
                    </>
                )}
            </p>
        </div>
    )
}
export default LastRefresh;