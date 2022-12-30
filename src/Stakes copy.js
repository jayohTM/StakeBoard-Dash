import "./Stakes.css";
import eth from "./eth.svg"
import React, { useEffect, useState } from 'react';
const { Alchemy, Network } = require("alchemy-sdk");

function Stakes() {  
    const config = {
      apiKey: "7NgQfM01vhHpxIHzQAUYx9XkIrWADPWg",
      network: Network.ETH_MAINNET,
    };
    const alchemy = new Alchemy(config);
    
    const main = async () => {
      // Wallet address
      const address = "0x3C60b54bE40f5F29Bec94EBBfcf3e469222680a2";
    
      // Get token balances
      const balances = await alchemy.core.getTokenBalances(address);

      // Remove tokens with zero balance
      const nonZeroBalances = balances.tokenBalances.filter((token) => {
        return token.tokenBalance !== "0";
      });
    
      console.log(`Token balances of ${address} \n`);
    
      // Counter for SNo of final output
      let i = 1;
    
      // Loop through all tokens with non-zero balance
      for (let token of nonZeroBalances) {
        // Get balance of token
        let balance = token.tokenBalance;
    
        // Get metadata of token
        const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);
    
        // Compute token balance in human-readable format
        balance = balance / Math.pow(10, metadata.decimals);
        balance = balance.toFixed(4);
    
        // Print name, balance, and symbol of token
        console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
      }
    };
    
    main();

    return(
        <div>
        
            <table className="stakes-table">
                <tr>
                    <th></th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Estimated APY</th>
                    <th>Claimable</th>
                    <th></th>
                </tr>
                
                    <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={eth} className="exchange-icon"></img>
                           
                        </div>
                    </td>
                    <td>Staking</td>
                    <td></td>
                    <td>20%</td>
                    <td></td>
                    <td>
                        <div className="buttons-div">
                        <button className="claim-button button-text">Claim</button>
                        <button className="stake-button button-text">Unstake</button>
                        </div>
                    </td>
                    </tr>
            </table>
        
            <div>Loading data...</div>
        
        </div>
    );
}
  

export default Stakes;