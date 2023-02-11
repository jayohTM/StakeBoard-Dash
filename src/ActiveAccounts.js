import Active from "./img/active.svg"
import { useAccount } from "wagmi";

function ActiveAccounts (props) {
    const {isConnecting, isDisconnected, isConnected, isReconnecting} = useAccount();
    return (
        <div className="active-accounts-div">
            <span className="active-header">
                <img src={Active} className="active-icon"></img>
                Active
            </span>
            { props.accounts >= 0 && isConnected && !isConnecting && !isReconnecting? (
                <p className="active-desc">{props.accounts} active staking account(s)</p>
            ) : (
                null
            )}
            { isConnected && props.accounts == -1 ? (
                <p className="active-desc"></p>
            ) : (
                null
            )}
            { isDisconnected || isConnecting || isReconnecting ? (
                <p className="active-desc">No wallet connected</p>
            ) : (
                null
            )}
        </div>
    )
}
export default ActiveAccounts;