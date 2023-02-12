import { ConnectButton } from "@rainbow-me/rainbowkit";
import LastRefresh from "./LastRefresh";
import ActiveAccounts from "./ActiveAccounts";
import "./Dash.css";
import { useState } from "react";
import Stakes from "./Stakes";
import Opportunities from "./Opportunities";
import Footer from "./Footer";
import Logo from "./img/stakeboard-logo-header.png";

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

    return(
        <div className='background'>
            <nav>
                <img className='logo' src={Logo}></img>
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
                    <div className="dash-oppo">
                        <Opportunities />
                    </div>
                    <Footer/>
                </div>  
            </div>
        </div>
    )
}
export default Dash;