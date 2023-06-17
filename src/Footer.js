import "./styles/Footer.css"
//import StakeIcon from "./stakeordie-icon"
function Footer () {
    return (
        <div className="messages-div">
            <div className="new-here oppo-heading">
                <h4>New here?</h4>   
                <p className="message-desc">
                <a href="https://docs.stakepark.xyz/" target="_blank"><strong>Read our docs</strong></a>, <a href="https://www.stakepark.xyz" target="_blank">learn how to stake</a> or <a href="https://linktr.ee/stakepark" target="_blank">check our socials</a>.
                </p>         
            </div>
            <div className="coming-soon oppo-heading">
                <h4>Issues?</h4>
                <p className="message-desc">
                    <a href="https://feedback.stakepark.xyz" target="_blank">Report bugs and request features</a>! 
                </p>
            </div>
        </div>
    )
}
export default Footer;