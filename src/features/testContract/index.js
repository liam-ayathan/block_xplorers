import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { avaxDocumentAbi, avaxDocumentAddress, avaxDocumentStoreCreatorAddress, avaxDocumentStoreCreatorAbi } from "../../assets/ChainList"


const TestContract = () => {
  const web3 = useSelector((state) => state.appSlice.stateWeb3)
  const [avaxContract, setAvaxContract] = useState(null);
  const [avaxContractDetails, setAvaxContractDetails] = useState({ "owner": null });
  // const [avaxContractGenerator, setAvaxContractGenerator] = useState(null);

  async function loadBlockchainData() {
    const accounts = await web3.eth.getAccounts()
    const avaxContractnew = new web3.eth.Contract(avaxDocumentAbi, avaxDocumentAddress)
    console.log("======================")
    console.log(await avaxContractnew.methods)
    console.log("======================")

    console.log("contract from avax loaded!!!: " + Object.keys(avaxContractnew));
    console.log("avaxContractnew methods!!!: " + Object.keys(avaxContractnew.methods));
    // Assumption is there is a problem with the ABI (https://ethereum.stackexchange.com/questions/64823/contract-methods-calls-return-empty-array)
    // Hard code address first

    // 1 method to try to show the difference
    const avaxOwnercall = await Object.keys(avaxContractnew.methods.owner().call())
    console.log("avaxOwnercall!!!: " + (avaxOwnercall) + "vs different account i am in now: " + accounts);
    setAvaxContract(avaxContractnew)
  }

  async function ownerCall() {
    const avaxOwnercall = await avaxContract.methods.owner.call()
    console.log("contract keys: " + Object.keys(avaxOwnercall));
    console.log("=================================")
    console.log("newww avaxOwnercall!!!: " + avaxOwnercall.methods.owner.call() + "vs different account i am in now: ");
    setAvaxContractDetails({ ...avaxContractDetails, "owner": avaxOwnercall })
    // return avaxOwnercall
  }

  useEffect(() => {
    loadBlockchainData()
    console.log("avaxContract loaded:" + avaxContract)
  }, []);

  return (
    <div>
      <div className="container my-3 p-3 section_area">

        <div className='m-3 p-3 section_area'>
          <h2 className="desc">Step 3: Test your contract.</h2>
        </div>

        <div>
          <p className="desc">Use the buttons below to interact with some of the methods in the TradeTrust "document store" contract.</p>
        </div>

        <div className='mb-3'>
          <div className='card bg-dark h-100'>
            <div className='card-header h-50' >Methods</div>
            <div className='card-body'>
              <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner </button>
              <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner </button>
              <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner </button>
              <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner </button>
              {/* <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner </button>
              <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner </button>
              <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner </button>
              <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner </button> */}
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <p className="desc">These are the ouputs from the respective methods!</p>
        </div>

        <div className='mb-3'>
          <div className='card bg-dark h-100'>

            <div className='card-header h-50'>Response</div>
            <div className='card-body m-3 border border-primary rounded text-wrap' style={{ display: "flex", justifyContent: "left", alignItems: "center", flexDirection: "column" }}>
              {JSON.stringify(avaxContractDetails)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestContract