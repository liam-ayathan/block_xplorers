import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import UserInfo from "./components/UserInfo";
import Web3 from "web3";

function App() {
  const web3 = new Web3(Web3.givenProvider)
  const [account, setAccount] = useState(null);
  const [currentNetworkId, setNetworkId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  // Functions
  async function connectWallet() {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0])
    setLoading(false)
  }

  // Init
  useEffect(() => {
    if (isLoading) {
      connectWallet()
      web3.eth.net.getId().then((Response) => {
        setNetworkId(Response)
      })
    }
  }, [isLoading]);

  // Event Handlers
  window.ethereum.on('accountsChanged', () => {connectWallet()})
  window.ethereum.on('networkChanged', () => {
    web3.eth.net.getId().then((Response) => {
      setNetworkId(Response)
    })
  })
  
  const handleClick = () => setLoading(true);

  return (
    <div className="container text-center">
      <h1>BLOCK XPLORERS</h1>
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Loading…' : 'Connect Wallet'}
      </Button>
      <UserInfo account={account} currentNetworkId={currentNetworkId}/>
    </div>
  )
}

export default App;
