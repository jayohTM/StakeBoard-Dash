import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./Dash.css";
import Stakes from "./Stakes";

function Dash() {
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
                            <p>2 active  staking account(s)</p>
                        </div>
                        <div className="update-modal">
                            <p className="update-status">Updated 15 seconds ago</p>
                            <button className="update-button">
                            </button>
                        </div>
                    </div>
                    <div className="dash-stakes">
                        <Stakes/>
                    </div>
                </div>  
            </div>
        </div>
    )
}
export default Dash