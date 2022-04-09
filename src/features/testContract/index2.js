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
  const prevaccount = useSelector((state) => state.appSlice.account)
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
  const [currentContractAddress, setCurrentContractAddress] = useState(null);
  const [newDoc, setNewDoc] = useState("");
  const [bulkDoc, setBulkDoc] = useState("");
  const [transferAddress, setTransferAddress] = useState("");

  const [account, setAccount] = useState(prevaccount);
  // setAccount(prevaccount)

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
    setAccount(newAccounts[0])
    // console.log("prev account: ", prevaccount)
    // setAccount(prevaccount)


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

  async function issueDoc(input) {
    // Mock document content
    if (input == undefined){
      // return "Undefined input"
      input = "Random input"
    }
    const documentContent = Web3.utils.asciiToHex(input)
    const mockDocument = documentContent.padEnd(66, '0')
    // Web3.utils.asciiToHex(input).padEnd(66, '0')
    console.log("============ Mock document content for issue: ", mockDocument, " ============")


    // avaxContract.methods.isIssued(mockDocument)
    const isIssuedCheck = await avaxContract.methods.isIssued(mockDocument).call()
    console.log("============ has item been issued before: ", isIssuedCheck, " ============")
    // setAvaxContractDetails({ ...avaxContractDetails, "owner": avaxOwnercall })


    // Issuance of mock document

    if (!isIssuedCheck){
    console.log("troubleshoot account: ", account)
    console.log("troubleshoot avaxContract: ", avaxContract)
    await avaxContract.methods.issue(mockDocument).send({ from: account })
      .once('receipt', (receipt) => {
        console.log(receipt)
        console.log("============ Issue doc: receipt events: ", JSON.stringify(receipt.events), " ============")
        return receipt
      }).catch((err) => {
        reset()
      })
    }else{
        
        const getIssuedBlock = await avaxContract.methods.getIssuedBlock(mockDocument).call()
        console.log(`As item been issued before, cannot issue again: "${input}" was issued at block ${getIssuedBlock}`)
        const isIssuedBefore = await avaxContract.methods.isIssuedBefore(mockDocument, getIssuedBlock).call()
        // const jIsIssuedBefore = JSON.stringify(isIssuedBefore)
        // const jIsIssuedBefore = Object.getPrototypeOf(isIssuedBefore);
        console.log(isIssuedBefore)
        console.log(`Has "${input}" been issued before: ${isIssuedBefore}`)
        const isRevoked = await avaxContract.methods.isRevoked(mockDocument).call()
        console.log(`Has "${input}" been revoked: ${isRevoked}`)
        const isRevokedBefore = await avaxContract.methods.isRevokedBefore(mockDocument, getIssuedBlock).call()
        console.log(`Has "${input}" been revoked before: ${isRevokedBefore}`)
      }
    reset()

    return "incomplete"
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

  const handleIssueDoc = async () => {
    setIssueDocLoading(true)
    const result = await issueDoc()
    console.log("completed: ", result)
  }

  // const handleMultipleIssue = async ()=> {
    // transfer to this: 0x49a98Eef44Ad32D83B00A4448417F7ac1d0eFe25
    async function handleTransferOwnership(event){
      event.preventDefault();
      const formattedAddress = Web3.utils.asciiToHex(transferAddress).padEnd(66, '0')
      await avaxContract.methods.transferOwnership(transferAddress).send({ from: account })
      .once('receipt', (receipt) => {
        console.log(receipt)
        console.log("============ TransferOwnership doc: receipt events: ", JSON.stringify(receipt.events), " ============")
        return receipt
      }).catch((err) => {
        reset()
      })

    }

  async function handleMultipleIssue(event){
      event.preventDefault();
    const input = bulkDoc;
    console.log("bulkDoc: ", bulkDoc)
    const items = bulkDoc.split(",");
    const mappedArray = items.map(item => Web3.utils.asciiToHex(item).padEnd(66, '0'));
    console.log("mappedArray: ", mappedArray)
    await avaxContract.methods.bulkIssue(mappedArray).send({ from: account })
        .once('receipt', (receipt) => {
          console.log(receipt)
          console.log("============ BulkIssue doc: receipt events: ", JSON.stringify(receipt.events), " ============")
          return receipt
        }).catch((err) => {
          reset()
        })
  }

  const handleRevoke = async ()=> {
    const input = newDoc;
    // Mock document content
    if (input == undefined){
      input = "Random input"
    }
    const documentContent = Web3.utils.asciiToHex(input)
    const mockDocument = documentContent.padEnd(66, '0')
    console.log("============ Mock document content for issue: ", mockDocument, " ============")
    // avaxContract.methods.isIssued(mockDocument)
    const isIssuedCheck = await avaxContract.methods.isIssued(mockDocument).call()
    console.log("============ has item been issued before: ", isIssuedCheck, " ============")
    // Issuance of mock document
    if (isIssuedCheck){
      console.log("troubleshoot account: ", account)
      console.log("troubleshoot avaxContract: ", avaxContract)

      const getIssuedBlock = await avaxContract.methods.getIssuedBlock(mockDocument).call()

      const isRevoked = await avaxContract.methods.isRevoked(mockDocument).call()
      if (!isRevoked){
        await avaxContract.methods.revoke(mockDocument).send({ from: account })
        .once('receipt', (receipt) => {
          console.log(receipt)
          console.log("============ Revoke doc: receipt events: ", JSON.stringify(receipt.events), " ============")
          return receipt
        }).catch((err) => {
          reset()
        })
      }else{
        console.log(`Has "${input}" been revoked: ${isRevoked} and thus cannot be revoked again`)
        const isRevokedBefore = await avaxContract.methods.isRevokedBefore(mockDocument, getIssuedBlock).call()
        console.log(`Has "${input}" been revoked before: ${isRevokedBefore}`)
      }
      }else{
          
        console.log("it has not been issued and thus cannot be revoked")
        }
      reset()
      return "incomplete"
  }

  const handleBulkRevoke = async ()=> {
    const input = bulkDoc;
    // Mock document content
    if (input == undefined){
      // input = "Random input"
      console.log("bulkDoc invalid")
      return "incomplete"
    }

    console.log("bulkDoc to revoke: ", bulkDoc)
    const items = bulkDoc.split(",");
    const mappedArray = items.map(item => Web3.utils.asciiToHex(item).padEnd(66, '0'));
    console.log("mappedArray to revoke: ", mappedArray)
    await avaxContract.methods.bulkRevoke(mappedArray).send({ from: account })
        .once('receipt', (receipt) => {
          console.log(receipt)
          console.log("============ BulkRevoke doc: receipt events: ", JSON.stringify(receipt.events), " ============")
          return receipt
        }).catch((err) => {
          reset()
        })

      reset()
      return "incomplete"
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

  function setNewAddress(){

  }

  async function handlenewDocContent(event){
    // setNewDoc(event.target.value)
    event.preventDefault();
    alert(`Submitting Name ${newDoc}`)
    await issueDoc(newDoc)
  }


  return (
    <div>
      <div className="container my-3 p-3 section_area">

        <div className='m-3 p-3 section_area'>
          <h2 className="desc">Step 3: Test your contract.</h2>
        </div>

        <div>
          <p className="desc">Use the buttons below to interact with some of the methods in the TradeTrust "document store" contract.</p>
        </div>

        <div>
          <p className="desc">Add this content: </p>
          
        </div>

        <div className='mb-3'>
          <div className='card bg-dark h-100'>
            <div className='card-body'>
              <p>Contract Methods</p>
              <button type='button' className='btn btn-primary m-2'
                onClick={handleOwnerCall}>Get Owner</button>
              <button type='button' className='btn btn-primary m-2'
                onClick={handleIssueDoc}>Issue Document</button>

            <form onSubmit={handlenewDocContent}>
              <label>
              Issue document with this content:
              <input type="text" value={newDoc} onChange={e => setNewDoc(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
            </form>
            <button type='button' className='btn btn-primary m-2'
                onClick={handleRevoke}>Revoke Document</button>


              <form onSubmit={handleMultipleIssue}>
              <label>
              Issue document with this content (comma separated for different documents):
              <input type="text" value={bulkDoc} onChange={e => setBulkDoc(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
            </form>
            <button type='button' className='btn btn-primary m-2'
                onClick={handleBulkRevoke}>Revoke Bulk Documents</button>

          <form onSubmit={handleTransferOwnership}>
              <label>
              TransferOwnership to: 
              <input type="text" value={transferAddress} onChange={e => setTransferAddress(e.target.value)} />
            </label>
            <input type="submit" value="Submit" />
            </form>

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
