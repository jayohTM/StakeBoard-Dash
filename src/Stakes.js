import "./Stakes.css";
import eth from "./eth.svg"
import React, { useEffect, useState } from 'react';
import protocolList from "./Protocols.json";
async function sendQuery() {
    const protocolBalanceList = new Array();
    const protocolsData = protocolList;
    console.log(protocolsData.data.protocols.length);
    let queryAddress = `query {`;
    for (let i = 0; i < protocolsData.data.protocols.length; i++) {
        if ((i % 3 === 0 && i !== 0) || i === protocolsData.data.protocols.length-1) {
            if (i === protocolsData.data.protocols.length) {
                queryAddress = queryAddress + `
        ${slug}: protocolBalance (
            balances: {
                chainIds:1
                walletAddress:"0x3C60b54bE40f5F29Bec94EBBfcf3e469222680a2"
                protocolName:"${slug}"
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
            }
            queryAddress = queryAddress + `     \n}`;
            console.log(queryAddress);
            const protocolData = await requestAPI(queryAddress);
            const protocolList = await protocolData.json();
            console.log(protocolList)
            if( protocolList.data !== null){
                for (const key in protocolList.data) {
                    for (const obj of protocolList.data[key]) {
                        protocolBalanceList.push(obj);
                    }
                }
            }
            console.log(protocolBalanceList);
            queryAddress = `query {`;
            const slug = protocolsData.data.protocols[i].slug;
            console.log(slug);
            if (i === protocolsData.data.protocols.length) {
                queryAddress = queryAddress + `
        ${slug}: protocolBalance (
            balances: {
                chainIds:1
                walletAddress:"0x3C60b54bE40f5F29Bec94EBBfcf3e469222680a2"
                protocolName:"${slug}"
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
            } else {
                queryAddress = queryAddress + `
        ${slug}: protocolBalance (
            balances: {
                chainIds:1
                walletAddress:"0x3C60b54bE40f5F29Bec94EBBfcf3e469222680a2"
                protocolName:"${slug}"
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
            }`;
            }
        }
        const slug = protocolsData.data.protocols[i].slug;
        console.log(slug);
        if (i === protocolsData.data.protocols.length) {
            queryAddress = queryAddress + `
    ${slug}: protocolBalance (
        balances: {
            chainIds:1
            walletAddress:"0x3C60b54bE40f5F29Bec94EBBfcf3e469222680a2"
            protocolName:"${slug}"
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
    }`;
        } else {
            queryAddress = queryAddress + `
    ${slug}: protocolBalance (
        balances: {
            chainIds:1
            walletAddress:"0x3C60b54bE40f5F29Bec94EBBfcf3e469222680a2"
            protocolName:"${slug}"
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
        }`;
        };
    };
    //After for loop ends
    //const jsonBalanceList = JSON.stringify(protocolBalanceList);
    //console.log(jsonBalanceList);
    return protocolBalanceList;
}
function requestAPI(query) {
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
      query: `${query}`
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
                const data = await sendQuery();
                //const data = await response.json();
                const filteredElements = data.filter((data) => data.total !== 0);
                setData(filteredElements);
                console.log(filteredElements);
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
                {dataNew.map((item) => (
                    <tr className="stakes-row">
                    <td>
                        <div className="exchange-tile">
                            <img src={item.chains[0].positions[0].supplied[0].token.icon} className="exchange-icon"></img>
                            {item.chains[0].positions[0].supplied[0].token.name}
                        </div>
                    </td>
                    <td>Staking</td>
                    <td>{Number(item.chains[0].positions[0].supplied[0].amount.toFixed(3))}</td>
                    <td>{item.chains[0].positions[0].supplied[0].apr}</td>
                    <td>0</td>
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
        {dataNew && dataNew.length === 0 ? (
            <div>test</div>
        ):(
            null
        )}
        </div>
    );
}
  

export default Stakes;