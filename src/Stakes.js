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
                        rewarded {
                            apr
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
                        rewarded{
                            apr
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
                rewarded {
                    apr
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
                    rewarded{
                        apr
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
            rewarded {
                apr
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
    const [timeSinceGetData, setTimeSinceGetData] = useState(0);
    const updateData = props.updateData;
    const accountCount = props.accountCount;
    useEffect(() => {
        //change to use date function so that a device can leave the page on mobile and devices and still have updated time
        let intervalId = setInterval(() => {
            setTimeSinceGetData((timeSinceGetData + 1));
            console.log("time" + timeSinceGetData);
            updateData(timeSinceGetData);
        }, 1000)
        return () => clearInterval(intervalId);
    }, [timeSinceGetData]);
    
    async function getData() {
        try {
            const data = await sendQuery();
            //const data = await response.json();
            const filteredElements = data.filter((data) => data.total !== 0);
            setData(filteredElements);
            accountCount(filteredElements.length)
            if (dataNew) {
                setTimeSinceGetData(0);
            }
            console.log(filteredElements);
        } catch (error) {
            console.error(error);
            setData({ error: error.message });
        }
    }
    //Gets updated API data when page refreshes
    useEffect(() => {
        if(dataNew == null) {
            getData();
        }
    }, []); 
    return(
        <div>
        {/*Checks if the data variable is true (if it has been called), only shows table if the variable exists(checks for loading data)*/}
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
                        <td>{(item.chains[0].positions[0].rewarded[0].apr * 100).toFixed(1)}%</td>
                        <td></td>
                    </tr>
                ))}
            </table>
        ) : (
            <div>{/*Will be a wallet connect screen later, currently wallet loads instantly (will check for loading using walletaddress and datanew)*/}Loading data...</div>
        )}
        {dataNew && dataNew.length === 0 ? (
            <div>An error as occurred :(</div>
        ):(
            null
        )}
        </div>
    );
}
  

export default Stakes;