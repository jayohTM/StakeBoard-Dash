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
      "X-Api-Key": "58a2d695-c6ab-429e-8054-819f05d9a62a"
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

function Stakes(props) {  
    const [dataNew, setData] = useState(null);
    
    useEffect(() => {
        async function getData() {
            try {
                const data = await sendQuery();
                //const data = await response.json();
                const filteredElements = data.filter((data) => data.total !== 0);
                setData(filteredElements);
                const updateData = props.updateData;
                updateData(filteredElements);
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
                    <th></th>
                </tr>
                {dataNew.map((item) => (
                    <tr className="stakes-row">
                        <td>
                            <div className="exchange-tile">
                                <img src={`https://defiyield-icons.s3.eu-central-1.amazonaws.com/integrations/protocols/${item.protocol.slug.toLowerCase()}.webp`} className="exchange-icon"></img>
                                {item.protocol.slug}
                            </div>
                        </td>
                        <td>Staking</td>
                        <td>{Number(item.chains[0].positions[0].supplied[0].amount.toFixed(3))}</td>
                        <td>{item.chains[0].positions[0].supplied[0].apr}</td>
                        <td></td>
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