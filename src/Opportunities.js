import "./Opportunity.css";
import LidoIcon from "./lido_symbol.svg";
import AnkrIcon from "./ankr_symbol.svg";
import AaveIcon from "./aave_symbol.svg";
function Opportunities () {
    return(
        <div>
            <table className="stakes-table">
                <tr>
                    <th></th>
                    <th>Validator</th>
                    <th>Supported Coins</th>
                    <th></th>
                    <th>Estimated APY</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={LidoIcon} className="exchange-icon"></img>
                        </div>
                    </td>
                    <td>Lido</td>
                    <td>ETH</td>
                    <td></td>
                    <td>4.8%</td>
                    <td></td>
                    <td>
                        <button className="visit-button button-text">
                            Visit Site
                        </button>
                    </td>
                </tr>
                <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={AnkrIcon} className="exchange-icon"></img>
                        </div>
                    </td>
                    <td>Ankr</td>
                    <td>ETH</td>
                    <td></td>
                    <td>1.4%</td>
                    <td></td>
                    <td>
                        <button className="visit-button button-text">
                            Visit Site
                        </button>
                    </td>
                </tr>
                <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={AaveIcon} className="exchange-icon"></img>
                        </div>
                    </td>
                    <td>Aave</td>
                    <td>ETH</td>
                    <td></td>
                    <td>0.4%</td>
                    <td></td>
                    <td>
                        <button className="visit-button button-text">
                            Visit Site
                        </button>
                    </td>
                </tr>
            </table>
            <hr className="end-rule"/>
        </div>
    )
}
export default Opportunities;