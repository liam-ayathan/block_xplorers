import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateAccount, updateNetworkId } from '../appSlice'

const EventListeners = () => {
  const dispatch = useDispatch()
  const web3 = useSelector((state) => state.appSlice.stateWeb3)

  // Listens to network change
  window.ethereum.on('networkChanged', () => {
    web3.eth.net.getId().then((Response) => {
      dispatch(updateNetworkId(Response))
    })
  })

  // // Listens to account change
  // window.ethereum.on('accountsChanged', () => {
  //   web3.eth.requestAccounts().then((accounts) => {
  //     dispatch(updateAccount(accounts[0]))
  //   })
  // })

  return (
    <div>
    </div>
  )
}

export default EventListeners