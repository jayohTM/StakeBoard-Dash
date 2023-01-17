import { RainbowKitProvider, ConnectButton, darkTheme } from "@rainbow-me/rainbowkit";
import "./Dash.css";
import Active from "./active.svg"
import Refresh from "./refresh.svg"
import { useState } from "react";
import Stakes from "./Stakes";
import { useAccount } from "wagmi";
function Dash() {
    const [dataNew, setData] = useState(null);
    const [accounts, setAccounts] = useState(null);
    // callback function to update the value of dataNew in the parent component
    const updateData = (newData) => {
        setData(newData);
    }
    const accountCount = (updatedCount) => {
        setAccounts(updatedCount)
    }
    const {address} = useAccount();
    console.log("address"+address);
    return(
        <div className='background'>
            <nav>
                <img className='logo' src='https://www.figma.com/file/QVd6xwMEtNYwTpHcYZBo2S/image/5cdfada92e1bfdea9dbc6f108a49a9d7f55a7625?fuid=1187932539258633732'></img>
                <div className="button-container">
                    <ConnectButton chainStatus={"none"} />
                </div>
            </nav>
            <div className="dashboard">
                <div className="inner-dash">
                    <div className="dash-header">
                        <div className="active-accounts-div">
                            <span className="active-header">
                                <img src={Active} className="active-icon"></img>
                                Active
                            </span>
                            { accounts ? (
                                <p>{accounts} active staking account(s)</p>
                            ) : (
                                <p>No wallet linked</p>
                            )}
                        </div>
                        <div className="update-modal">
                            <p className="update-status">
                                {/*move this to different component, pass datanew as prop, see if it improves performance and only refreshes that componenet */}
                                <img src={Refresh} className="refresh-icon"></img>
                                Updated {dataNew} seconds ago
                            </p>
                        </div>
                    </div>
                    <div className="dash-stakes">
                        <Stakes updateData={updateData} accountCount={accountCount}/>
                    </div>
                </div>  
            </div>
        </div>
    )
}
export default Dash;