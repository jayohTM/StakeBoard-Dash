import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./Dash.css";
import { useState } from "react";
import Stakes from "./Stakes";

function Dash() {
    const [dataNew, setData] = useState(null);

    // callback function to update the value of dataNew in the parent component
    const updateData = (newData) => {
        setData(newData);
    }
    return(
        <div className='background'>
            <nav>
                <img className='logo' src='https://www.figma.com/file/QVd6xwMEtNYwTpHcYZBo2S/image/5cdfada92e1bfdea9dbc6f108a49a9d7f55a7625?fuid=1187932539258633732'></img>
                <div className="button-container">
                    <ConnectButton />
                </div>
            </nav>
            <div className="dashboard">
                <div className="inner-dash">
                    <div className="dash-header">
                        <div>
                            <span className="active-header">Active</span>
                            { dataNew ? (
                                <p>{dataNew.length} active  staking account(s)</p>
                            ) : (
                                <p>No wallet linked</p>
                            )}
                        </div>
                        <div className="update-modal">
                            <p className="update-status">Updated 15 seconds ago</p>
                            <button className="update-button">
                            </button>
                        </div>
                    </div>
                    <div className="dash-stakes">
                        <Stakes updateData={updateData}/>
                    </div>
                </div>  
            </div>
        </div>
    )
}
export default Dash;