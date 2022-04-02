import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNetworkId } from '../appSlice'

const EventListeners = () => {
  const dispatch = useDispatch()
  const web3 = useSelector((state) => state.appSlice.stateWeb3)

  window.ethereum.on('networkChanged', () => {
    web3.eth.net.getId().then((Response) => {
      dispatch(updateNetworkId(Response))
    })
  })
  return (
    <div>

    </div>
  )
}

export default EventListeners