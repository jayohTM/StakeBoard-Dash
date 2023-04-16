import "./styles/Opportunity.css";
// import LidoIcon from "./img/lido_symbol.svg";
// import AnkrIcon from "./img/ankr_symbol.svg";
// import AaveIcon from "./img/aave_symbol.svg";
// import OpenOceanIcon from "./img/openocean.png";
import OasisIcon from "./img/oasis_symbol.svg";
// import EverStakeIcon from "./img/everstake.png";
import OppoIcon from "./img/opportunities.svg";

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
                <tbody>
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
                        <img src={OasisIcon} className="exchange-icon"></img>
                        Oasis
                        </div>
                    </td>
                    <td></td>
                    <td>Multiple</td>
                    <td></td>
                    <td>Varies</td>
                    <td></td>
                    <td>
                        <a href="https://oasis.app/?ref=0x7eF61746Afe06a04776Bd0BAe02Fe455625FEB6e" target={"_blank"}>
                        <button className="visit-button button-text">
                            Visit Site
                        </button>
                        </a>
                    </td>
                    </tr>
                    {/* Other table rows go here */}
                </tbody>
            </table>
            <hr className="end-rule"/>
        </div>
    )
}
export default Opportunities;