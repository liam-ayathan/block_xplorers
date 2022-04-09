import React from 'react'
import { useSelector } from 'react-redux';
import { metamaskChainList, chainIdList } from "../../assets/ChainList";

const ConnectChain = () => {
  const currentNetworkId = useSelector((state) => state.appSlice.networkId)

  const changeNetwork = async (networkName) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{ ...metamaskChainList[networkName] }]
      });
      // window.location.reload(false);
    } catch (err) {
      console.log(err.message)
    }
  };

  function renderValidNetwork(currentNetworkId) {
    console.log(currentNetworkId)

    if (!(currentNetworkId in chainIdList)) {
      return (
        <p className="desc text-danger"> Please select a network from the list below.</p>
      )
    }
  }

  function isChainDisabled(currentNetworkId, chainAlias) {
    return `0x${Number(currentNetworkId).toString(16)}` === metamaskChainList[chainAlias]["chainId"]
  }

  return (

    <div>
      <div className='container my-3 p-3 section_area'>

        <div className="m-3 p-3 section_area">
          <h2 className="desc">Step 2: Select a side-chain.</h2>
        </div>

        <div>
          <p className='desc'>Use the buttons to switch to one of the side-chain testnets that we have deployed your contracts on.</p>
          {renderValidNetwork(currentNetworkId)}
        </div>
        {
          Object.keys(metamaskChainList).map((chainAlias) => (
            <div key={chainAlias} className='mb-3'>
              <div className='card bg-dark h-100'>
                <div className='card-body'>
                  <p>{metamaskChainList[chainAlias]['chainName']}</p>
                  <button type='button' className={isChainDisabled(currentNetworkId, chainAlias) ? 'btn btn-success' : 'btn btn-primary'} 
                  onClick={() => changeNetwork(chainAlias)} 
                  disabled={isChainDisabled(currentNetworkId, chainAlias)}>
                    {isChainDisabled(currentNetworkId, chainAlias) ? 'Currently connected to' : 'Switch to'} {chainAlias.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default ConnectChain