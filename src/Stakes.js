import "./Stakes.css";
import { useEffect, useState } from 'react';
import protocolList from "./Protocols.json";
import { useAccount } from "wagmi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
const {address} = useAccount;
console.log(address)
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
      "X-Api-Key": "58a2d695-c6ab-429e-8054-819f05d9a62"
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
    const updateData = props.updateData;
    const accountCount = props.accountCount;
    
    async function getData() {
        try {
            const data = await sendQuery();
            //const data = await response.json();
            const filteredElements = data.filter((data) => data.total !== 0);
            new Promise(resolve => {
                setData(filteredElements);
                resolve();
            }).then(() => updateData(true));
            accountCount(filteredElements.length);
            console.log(filteredElements);
            /*if (dataNew) {
                updateData(0);
            }*/
        } catch (error) {
            console.error(error);
            setData({ error: error.message });
        }
    }
    //Gets updated API data when page refreshes
    useEffect(() => {
        if(dataNew == null && {address}) {
            getData();
        }
    }, []); 
    return(
        <div>
        {/*Checks if the data variable is true (if it has been called), only shows table if the variable exists(checks for loading data)*/}
        {dataNew && {address} ? (
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
            null
        )}
        { !{address} ? (
            <div>Connect a Wallet</div>
        ) : (
            null
        )}
        { dataNew == null && {address} ? (
            <SkeletonTheme height={"8vh"}>
                <Skeleton count={4} style={{marginBottom: "1vh" }}/>
            </SkeletonTheme>
        ) : (
            null
        )}
        {dataNew && dataNew.length === 0 ? (
            <div>You have no active stakes :(</div>
        ):(
            null
        )}
        </div>
    );
}
  

export default Stakes;