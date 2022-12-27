import "./Stakes.css";
import eth from "./eth.svg"
import React, { useEffect, useState } from 'react';
function sendQuery() {
    const url = "https://public-api.defiyield.app/graphql/";
    const headers = {
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Connection": "keep-alive",
      "DNT": "1",
      "Origin": "https://public-api.defiyield.app",
      "X-Api-Key": "ca962a0d-2e55-4a66-93c7-90c62eb42210"
    };
    const data = {
      query: `query {
        assetBalances (
          chainId:1
          walletAddress:"0xd874387ebb001a6b0bea98072f8de05f8965e51e"
        ){
          total
          assets {
            asset {
              displayName
              chainId
              icon
            }
            price
            total
            balance
          }
        }
      }`
    };
  
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      compress: true
    });
  }

function Stakes() {  
    const [dataNew, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const response = await sendQuery();
                const data = await response.json();
                setData(data);
                console.log(data)
            } catch (error) {
                console.error(error);
                setData({ error: error.message });
            }
            }
            

        getData();
    }, []);

    return(
        <div>
        {dataNew ? (
            <table className="stakes-table">
                <tr>
                    <th></th>
                    <th>Status</th>
                    <th>Quantity</th>
                    <th>Estimated APY</th>
                    <th>Claimable</th>
                    <th></th>
                </tr>
                {dataNew.data.assetBalances.assets.map((item) => (
                    <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={item.asset.icon} className="exchange-icon"></img>
                            {item.asset.displayName}
                        </div>
                    </td>
                    <td>Staking</td>
                    <td>{Number(item.balance.toFixed(3))}</td>
                    <td>20%</td>
                    <td>{item.total}</td>
                    <td>
                        <div className="buttons-div">
                        <button className="claim-button button-text">Claim</button>
                        <button className="stake-button button-text">Unstake</button>
                        </div>
                    </td>
                    </tr>
                ))}
            </table>
        ) : (
            <div>Loading data...</div>
        )}
        </div>
    );
}
  

export default Stakes;