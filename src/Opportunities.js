import "./Opportunity.css";
import LidoIcon from "./lido_symbol.svg";
import AnkrIcon from "./ankr_symbol.svg";
import AaveIcon from "./aave_symbol.svg";
import OppoIcon from "./opportunities.svg";
function Opportunities () {
    return(
        <div>
            <hr className="end-rule"/>
            <div className="oppo-accounts-div">
                <span className="oppo-header">
                    <img src={OppoIcon} className="oppo-icon"></img>
                    Opportunities
                </span>
                <p className="oppo-desc">
                    New staking opportunities
                </p>
            </div>
            <table className="stakes-table">
                <tr>
                    <th></th>
                    <th></th>
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
                            Lido
                        </div>
                    </td>
                    <td></td>
                    <td>ETH</td>
                    <td></td>
                    <td>4.8%</td>
                    <td></td>
                    <td>
                        <a href="https://stake.lido.fi/?ref=0x7eF61746Afe06a04776Bd0BAe02Fe455625FEB6e" target={"_blank"}>
                            <button className="visit-button button-text">
                                Visit Site
                            </button>
                        </a>
                    </td>
                </tr>
                {/* <tr className="stakes-row">
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
                        <a href="https://oasis.app/?ref=0x7eF61746Afe06a04776Bd0BAe02Fe455625FEB6e" target={"_blank"}>
                            <button className="visit-button button-text">
                                Visit Site
                            </button>
                        </a>
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
                        <a href="https://stake.is/zQ" target={"_blank"}>
                            <button className="visit-button button-text">
                                Visit Site
                            </button>
                        </a>
                    </td>
                </tr> */}
            </table>
            <hr className="end-rule"/>
        </div>
    )
}
export default Opportunities;