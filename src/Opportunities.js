import "./Opportunity.css";
import LidoIcon from "./img/lido_symbol.svg";
import AnkrIcon from "./img/ankr_symbol.svg";
import AaveIcon from "./img/aave_symbol.svg";
import OpenOceanIcon from "./img/openocean.png";
import OasisIcon from "./img/oasis_symbol.svg";
import EverStakeIcon from "./img/everstake.png";
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
                {/*
                <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={AnkrIcon} className="exchange-icon"></img>
                            Ankr
                        </div>
                    </td>
                    <td></td>
                    <td>ETH</td>
                    <td></td>
                    <td>3.8%</td>
                    <td></td>
                    <td>
                        <a href="https://www.ankr.com/staking/stake/ethereum/" target={"_blank"}>
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
                            Aave
                        </div>
                    </td>
                    <td></td>
                    <td>ETH</td>
                    <td></td>
                    <td>1.4%</td>
                    <td></td>
                    <td>
                        <a href="https://app.aave.com/" target={"_blank"}>
                            <button className="visit-button button-text">
                                Visit Site
                            </button>
                        </a>
                    </td>
                </tr> 
                <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={OpenOceanIcon} className="exchange-icon"></img>
                            OpenOcean
                        </div>
                    </td>
                    <td></td>
                    <td>ETH</td>
                    <td></td>
                    <td>3.8%</td>
                    <td></td>
                    <td>
                        <a href="https://app.openocean.finance/referral/H0oXe7ZwIf2bOM3OHfMFgMYl5SIk1mglB0EqS7KrXMArkpKbtwJxPmJSa4HWTCP9" target={"_blank"}>
                            <button className="visit-button button-text">
                                Visit Site
                            </button>
                        </a>
                    </td>
                </tr>
                <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={OasisIcon} className="exchange-icon"></img>
                            Oasis
                        </div>
                    </td>
                    <td></td>
                    <td>ETH</td>
                    <td></td>
                    <td>2.4%</td>
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
                            <img src={EverStakeIcon} className="exchange-icon"></img>
                            EverStake
                        </div>
                    </td>
                    <td></td>
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
                </tr>  */}
            </table>
            <hr className="end-rule"/>
        </div>
    )
}
export default Opportunities;