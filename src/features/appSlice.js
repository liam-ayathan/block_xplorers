import { createSlice } from '@reduxjs/toolkit'
import Web3 from 'web3'

const initialState = {
  stateWeb3: new Web3(Web3.givenProvider),
  networkId: null,
  account: null,
}

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    updateWeb3: (state, action) => {
      state.web3 = action.payload
    },
    updateNetworkId: (state, action) => {
      state.networkId = action.payload
    },
    updateAccount: (state, action) => {
      state.account = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateWeb3, updateNetworkId, updateAccount } = appSlice.actions

export default appSlice.reducer