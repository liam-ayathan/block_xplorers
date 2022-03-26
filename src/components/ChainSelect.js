import React from 'react'
import { useState, useEffect } from 'react';
import { metamaskChainList } from "./chainList";






const ChainSelect = ({ currentNetworkId }) => {

  const changeNetwork = async ( networkName ) => {
    try {
      if (!window.ethereum) throw new Error("No crypto wallet found");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{...metamaskChainList[networkName]}]
      });
    } catch (err) {
      console.log(err.message)
    }
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
  };

  useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);


  return (
    <div className='row'>
      {
        Object.keys(metamaskChainList).map((chainAlias) => (
            <div key={chainAlias} className='col  mb-3'>
              <div className='card bg-dark h-100'>
                <div className='card-header h-50'>{metamaskChainList[chainAlias]['chainName']}</div>
                <div className='card-body'>
                  <button type='button' className='btn btn-primary' onClick={() => changeNetwork(chainAlias)} disabled={`0x${Number(currentNetworkId).toString(16)}` === metamaskChainList[chainAlias]["chainId"]}>Switch to {chainAlias.toUpperCase()}</button>
                </div>
              </div>
            </div>
        ))
      }


    </div>
  )
}

export default ChainSelect