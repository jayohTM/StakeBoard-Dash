import { ConnectButton } from "@rainbow-me/rainbowkit";
import LastRefresh from "./LastRefresh";
import ActiveAccounts from "./ActiveAccounts";
import "./Dash.css";
import { useState } from "react";
import Stakes from "./Stakes";
import { useAccount } from "wagmi";
function Dash() {
    const [dataNew, setData] = useState(null);
    const [accounts, setAccounts] = useState(null);
    // callback function to update the value of dataNew in the parent component
    const updateData = (newData) => {
        console.log("dashlog " + newData);
        setData(newData);
    }
    const accountCount = (updatedCount) => {
        setAccounts(updatedCount)
        console.log("updatedcount " + updatedCount);
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
                        <ActiveAccounts accounts={accounts} />
                        <LastRefresh dataNew={dataNew} counter={0} />
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