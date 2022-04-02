// import Temp from "./components/Temp";
import { react } from "@babel/types";
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import Web3 from "web3";
import { avaxDocumentAbi, avaxDocumentAddress } from '../../assets/ChainList'


function TestContract() {
  const web3 = useSelector((state) => state.appSlice.stateWeb3)
  const account = useSelector((state) => state.appSlice.account)

  const [avaxContract, setAvaxContract] = useState(null);
  const [avaxContractDetails, setAvaxContractDetails] = useState({ "owner": null });
  const [isOwnerCallLoading, setOwnerCallLoading] = useState(false);
  const [ownerCallLoaded, setOwnerCallLoaded] = useState(false)
  const [isIssueDocLoading, setIssueDocLoading] = useState(false);

  async function loadBlockchainData() {
    const avaxContractnew = new web3.eth.Contract(avaxDocumentAbi, avaxDocumentAddress)
    console.log("============ Avax contract loaded (methods): " + Object.keys(avaxContractnew.methods) + " ============");

    // PUBLIC METHODS:
    // name():
    // const avaxNamecall = await avaxContractnew.methods.name().call();
    // console.log("avaxNamecall!!!:" + avaxNamecall);

    // PUBLIC METHODS:
    // owner():
    // const avaxOwnercall = await avaxContractnew.methods.owner().call();
    // console.log("avaxNamecall!!!:" + avaxOwnercall, " ====> ", account, " is it the same: ", account == avaxOwnercall);

    // PUBLIC METHODS:
    // version():
    // const avaxVersioncall = await avaxContractnew.methods.version().call();
    // console.log("avaxNamecall!!!:" + avaxVersioncall);

    setAvaxContract(avaxContractnew)
  }


  async function ownerCall() {
    const avaxOwnercall = await avaxContract.methods.owner().call()
    console.log("============ Owner call: ", avaxOwnercall, " ============")
    setAvaxContractDetails({ ...avaxContractDetails, "owner": avaxOwnercall })
    setOwnerCallLoading(false)
    setOwnerCallLoaded(true)
  }

  async function issueDoc() {
    // Mock document content
    const documentContent = Web3.utils.asciiToHex(3)
    const mockDocument = documentContent.padEnd(66, '0')
    console.log("============ Mock document content for issue: ", mockDocument, " ============")

    // Issuance of mock document
    await avaxContract.methods.issue(mockDocument).send({ from: account })
      .once('receipt', (receipt) => {
        console.log("============ Issue doc: receipt events: ", JSON.stringify(receipt.events), " ============")
        return receipt
      }).catch((err) => {
        reset()
      })
    reset()
  }

  const handleOwnerCall = () => {
    setOwnerCallLoading(true)
    ownerCall()
  }

  const handleIssueDoc = () => {
    setIssueDocLoading(true)
    issueDoc()
  }

  const reset = () => {
    setIssueDocLoading(false)
    setOwnerCallLoaded(false)
    setAvaxContractDetails({ ...avaxContractDetails, "owner": null })
  }

  useEffect(() => {
    loadBlockchainData();
    console.log("============ AvaxContract loaded: " + avaxContract + " ============")
  }, []);

  useEffect(() => {

  })


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
            <div className='card-body'>
              <p>Contract Methods</p>
              <button type='button' className='btn btn-primary m-2'
                onClick={handleOwnerCall}>Get Owner</button>
              <button type='button' className='btn btn-primary m-2'
                onClick={handleIssueDoc}>Issue Document</button>
            </div>
          </div>
        </div>

        <div className='mb-3'>
          <p className="desc">These are the ouputs from the respective methods!</p>
        </div>

        <div className='mb-3'>
          <div className='card bg-dark h-100'>

            <div className="card-body">
              <p>Response</p>
              <p className={
                  isOwnerCallLoading ? 'p-3 m-3 bg-danger border border-primary rounded text-wrap' :
                  ownerCallLoaded | isIssueDocLoading ? 'p-3 m-3 bg-success text-white border border-primary rounded text-wrap' :
                  'p-3 m-3 border border-primary rounded text-wrap'
                }>
                {
                  isIssueDocLoading ? "Check your metamask extension for an issuance notification." :
                  avaxContractDetails.owner !== null ? "Contract owner: " + avaxContractDetails.owner :
                  isOwnerCallLoading ? "Retrieving response..." :
                  "Click one of the methods for a response!"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestContract;
