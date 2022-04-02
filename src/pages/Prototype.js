import React from 'react'
import ConnectWallet from '../features/connectWallet'
import ConnectChain from '../features/connectChain'
import TestContract from '../features/testContract'
import EventListeners from '../features/eventListeners'

const Prototype = () => {
  return (
    <div className="d-flex align-items-center">
      <div className="container text-center">
        <ConnectWallet />
        <ConnectChain />
        <TestContract />
        <EventListeners />
      </div>
    </div>
  )
}

export default Prototype