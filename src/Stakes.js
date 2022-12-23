import "./Stakes.css";
import eth from "./eth.svg"

function Stakes() {
    return(
        <div>
            <table className="stakes-table">
                <tr>
                    <th></th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Estimated APY</th>
                    <th>Claimable</th>
                    <th></th>
                </tr>
                <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={eth} className="exchange-icon"></img>
                            Ether
                        </div>
                    </td>
                    <td>Staking</td>
                    <td>5.11</td>
                    <td>20%</td>
                    <td>0</td>
                    <td>
                        <div className="buttons-div">
                            <button className="claim-button button-text">Claim</button>
                            <button className="stake-button button-text">Unstake</button>
                        </div>
                    </td>
                </tr>
                <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={eth} className="exchange-icon"></img>
                            Ether
                        </div>
                    </td>
                    <td>Staking</td>
                    <td>5.11</td>
                    <td>20%</td>
                    <td>2.3</td>
                    <td>
                        <div className="buttons-div">
                            <button className="claim-button button-text">Claim</button>
                            <button className="stake-button button-text">Unstake</button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );

}

export default Stakes;