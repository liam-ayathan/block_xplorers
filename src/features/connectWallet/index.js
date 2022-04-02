import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateAccount, updateNetworkId } from '../appSlice';

const ConnectWallet = () => {
  const web3 = useSelector((state) => state.appSlice.stateWeb3)
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false);
  const [isConnected, updateConnected] = useState(false);

  async function connectWallet() {
    const accounts = await web3.eth.requestAccounts()
    const networkId = await web3.eth.net.getId()
    dispatch(updateAccount(accounts[0]))
    dispatch(updateNetworkId(networkId))
    setLoading(false)
    updateConnected(true)
  }
  
  const handleClick = () => {
    setLoading(true)
  };

  useEffect(() => {
    if (isLoading) {
      connectWallet()
    }
  });
  
  return (
    <div>
      <div className="container my-3 p-3 section_area">
        <div className="m-3 p-3 section_area">
          <h2 className="desc">Step 1: Connect to your wallet.</h2>
        </div>

        <div>
          <p className='desc'>To access the contracts, we require access to your metamask accounts. Use the button below to connect to your wallet.</p>
        </div>

        <div className="m-3">
          <button type='button' className={            
            isLoading ? 'btn btn-danger' : 
            isConnected ? 'btn btn-success' :
            'btn btn-primary text-black'
          }
            disabled={isLoading | isConnected}
            onClick={!isLoading ? handleClick : null}>
            {
              isLoading ? "Loading…" :
                isConnected ? "Wallet Connected" :
                  "Connect Wallet"
            }
          </button>
      </div>
        {
          isLoading ? <p className="desc text-danger"> Please log in to your metamask account through the browser extension.</p> : null
        }
      </div>

    </div>
  )
}

export default ConnectWallet