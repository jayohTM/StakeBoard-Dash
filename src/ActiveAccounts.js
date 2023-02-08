import Active from "./active.svg"

function ActiveAccounts (props) {
    return (
        <div className="active-accounts-div">
            <span className="active-header">
                <img src={Active} className="active-icon"></img>
                Active
            </span>
            { props.accounts >= 0 ? (
                <p className="active-desc">{props.accounts} active staking account(s)</p>
            ) : (
                <p>No wallet linked</p>
            )}
        </div>
    )
}
export default ActiveAccounts;