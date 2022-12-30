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
      query: `query	{
        protocols (
          chainIds:1
        ) {
          name
          slug
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
function requestAPI(protocolName) {
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
        protocolBalance (
          balances: {
            chainIds:1
            walletAddress:"0x3C60b54bE40f5F29Bec94EBBfcf3e469222680a2"
            protocolName:"${protocolName}"
          }
        ){
          protocol {
            slug
          }
          total
          chains {
            positions {
              feature
              supplied {
                apr
                amount
                value
                token {
                  name
                  icon
                  symbol
                }
              }
            }
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
async function checkAddressProtocols() {
    const protocolBalanceList = new Array();
    const protocolData = await sendQuery();
    const protocolList = await protocolData.json();
    console.log("length" + protocolList.data.protocols.length);
    for (let i = 0; i < protocolList.data.protocols.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        console.log(protocolList.data.protocols[i].slug);
        const addressProtocolBalance = await requestAPI(protocolList.data.protocols[i].slug);
        const addressProtocolBalanceList = await addressProtocolBalance.json();
        console.log(addressProtocolBalanceList);
        if (addressProtocolBalanceList.data !== null){
            if (addressProtocolBalanceList.data.protocolBalance[0].total !== 0) {
                protocolBalanceList.push(addressProtocolBalanceList);
            }
        }
    }
    console.log(protocolBalanceList)
    const jsonBalanceList = JSON.stringify(protocolBalanceList);
    return jsonBalanceList;
}

function Stakes() {  
    const [dataNew, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            try {
                const data = await checkAddressProtocols();
                //const data = await response.json();
                setData(data);
                console.log(data);
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