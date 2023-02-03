import Active from "./active.svg"
import { useAccount } from "wagmi";
function ActiveAccounts (props) {
    const {address} = useAccount();
    return (
        <div className="active-accounts-div">
            <span className="active-header">
                <img src={Active} className="active-icon"></img>
                Active
            </span>
            { props.accounts >= 0 && address ? (
                <p>{props.accounts} active staking account(s)</p>
            ) : (
                <p>No wallet linked</p>
            )}
        </div>
    )
}
export default ActiveAccounts;