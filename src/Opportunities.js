import "./styles/Opportunity.css";
// import LidoIcon from "./img/lido_symbol.svg";
// import AnkrIcon from "./img/ankr_symbol.svg";
// import AaveIcon from "./img/aave_symbol.svg";
import OppoIcon from "./img/opportunities.svg";
import StakeParkIcon from "./img/stakepark-square.png";

function Opportunities () {
    return(
        <div>
            <hr className="end-rule"/>
            <div className="oppo-accounts-div">
                <span className="oppo-header">
                    <img src={OppoIcon} className="oppo-icon"></img>
                    Staking Opportunities
                </span>
                {/* <p className="oppo-desc">
                    New staking opportunities
                </p> */}
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
                        <img src={StakeParkIcon} className="exchange-icon"></img>
                        StakePark's Staking Pool
                        </div>
                    </td>
                    <td></td>
                    <td>ETH</td>
                    <td></td>
                    <td>Varies</td>
                    <td></td>
                    <td>
                        <a href="https://app.stakewise.io/vault/0x9dda86923b79aa00a4033a10e035884227bd2cdd" target={"_blank"}>
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