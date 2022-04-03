// import Temp from "./components/Temp";
import { react } from "@babel/types";
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import Web3 from "web3";
import { avaxDocumentAbi, avaxDocumentAddress, 
  binanceDocumentAbi, binanceDocumentAddress, 
  avaxDocumentStoreCreatorAddress, avaxDocumentStoreCreatorAbi,
  polygonDocumentAddress, polygonDocumentAbi } from '../../assets/ChainList'


function TestContract() {
  const web3 = useSelector((state) => state.appSlice.stateWeb3)
  const account = useSelector((state) => state.appSlice.account)
  const networkId = useSelector((state) => state.appSlice.networkId)
  // stateWeb3: new Web3(window.web3.currentProvider),
  // networkId: null,
  // account: null,

  const [avaxContract, setAvaxContract] = useState(null);
  const [avaxContractDetails, setAvaxContractDetails] = useState({ "owner": null });
  const [isOwnerCallLoading, setOwnerCallLoading] = useState(false);
  const [ownerCallLoaded, setOwnerCallLoaded] = useState(false)
  const [isIssueDocLoading, setIssueDocLoading] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState(null);

  async function setNewNetwork(){
    const networkid  = await web3.eth.net.getId(); 
    setCurrentNetwork(networkid);
  }

  async function loadBlockchainData() {
    // const network  = await web3.eth.net.getNetworkType();
    const newAccounts = await web3.eth.getAccounts();
    const networkId  = await web3.eth.net.getId(); 
    console.log("accounts: ", newAccounts)
    console.log("network: ",networkId)
    setCurrentNetwork(networkId)


    // by default its assumed to be avax network:
    var avaxContractnew = new web3.eth.Contract(avaxDocumentAbi, avaxDocumentAddress)
    if (networkId == 97){
    avaxContractnew = new web3.eth.Contract(binanceDocumentAbi, binanceDocumentAddress)
  }else if(networkId == 80001){
    avaxContractnew = new web3.eth.Contract(polygonDocumentAbi, polygonDocumentAddress )
  }
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
        console.log(receipt)
        console.log("============ Issue doc: receipt events: ", JSON.stringify(receipt.events), " ============")
        return receipt
      }).catch((err) => {
        reset()
      })
    reset()
  }

  async function createStore() {
    // Mock document content
    var avaxDocumentStoreContract = new web3.eth.Contract(avaxDocumentStoreCreatorAbi, avaxDocumentStoreCreatorAddress)
    const documentContent = Web3.utils.asciiToHex(3)
    const mockDocument = documentContent.padEnd(66, '0')
    console.log("============ Mock document content for issue: ", mockDocument, " ============")

    // Issuance of mock document
    await avaxDocumentStoreContract.methods.issue(mockDocument).send({ from: account })
      .once('receipt', (receipt) => {
        console.log(receipt)
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

  const handleCreateDocumentStore = () => {
    setIssueDocLoading(true)
    issueDoc()
  }

  const reset = () => {
    setIssueDocLoading(false)
    setOwnerCallLoaded(false)
    setAvaxContractDetails({ ...avaxContractDetails, "owner": null })
  }

  useEffect(() => {
    setNewNetwork()
    loadBlockchainData();

    console.log("============ AvaxContract loaded: " + avaxContract + " ============")
  }, [currentNetwork]);

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


        {/* <div className='mb-3'>
          <div className='card bg-dark h-100'>
            <div className='card-body'>
              <p>Create a new Document Store for authorised Personals who would like to openly share their documents, maybe with limited supply</p>
              <button type='button' className='btn btn-primary m-2'
                onClick={handleCreateDocumentStore}>Create new DocumentStore</button>
              
            </div>
          </div>
        </div> */}

        {/* <div className='mb-3'>
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
        </div> */}
      </div>
    </div>
  )
}

export default TestContract;
