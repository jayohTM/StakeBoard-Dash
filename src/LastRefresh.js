import Refresh from "./refresh.svg"
import { useState, useEffect } from "react";

function LastRefresh(props) {
    const [timeSinceGetData, setTimeSinceGetData] = useState(0);
    if (props.dataNew === 0) {
        setTimeSinceGetData(0);
    }
    useEffect(() => {
        //change to use date function so that a device can leave the page on mobile and devices and still have updated time
        let intervalId = setInterval(() => {
            setTimeSinceGetData((timeSinceGetData + 1));
            console.log("time" + timeSinceGetData);
        }, 1000)
        return () => clearInterval(intervalId);
    }, [timeSinceGetData]);
        

    return (
        <div className="update-modal">
            <p className="update-status">
                {/*move this to different component, pass datanew as prop, see if it improves performance and only refreshes that componenet */}
                <img src={Refresh} className="refresh-icon"></img>
                Updated {timeSinceGetData} seconds ago
            </p>
        </div>
    )
}
export default LastRefresh;