import "./Footer.css"
//import StakeIcon from "./stakeordie-icon"
function Footer () {
    return (
        <div className="messages-div">
            <div className="new-here oppo-heading">
                <h4>New Here?</h4>   
                <p className="message-desc">
                    Learn how to stake, check out our guides and peep our socials.
                </p>         
            </div>
            <div className="coming-soon oppo-heading">
                <h4>Coming soon...</h4>
                <p className="message-desc">
                    Social features? More protocols? Liquid Staking Death co-branded campaign?
                    <br/><br/>
                    Who knows... but you’ll hear about it on 
                    Twitter first.
                </p>
            </div>
        </div>
    )
}
export default Footer;