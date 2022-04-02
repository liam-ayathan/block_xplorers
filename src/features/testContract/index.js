// import Temp from "./components/Temp";
import { react } from "@babel/types";
import { useState, useEffect } from 'react'
import Web3 from "web3";
import { avaxDocumentAbi, avaxDocumentAddress } from '../../assets/ChainList'


function TestContract() {
  const web3 = new Web3(Web3.givenProvider)
  const [account, setAccount] = useState(null);
  const [avaxContract, setAvaxContract] = useState(null);
  const [avaxContractDetails, setAvaxContractDetails] = useState({ "owner": null });
  // const [avaxContractGenerator, setAvaxContractGenerator] = useState(null);

  // Functions
  async function connectWallet() {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0])
    // setLoading(false)
  }

  async function loadBlockchainData() {
    // let web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    // window web3 detection added:
    const web3 = new Web3(window.web3.currentProvider);

    const accounts = await web3.eth.getAccounts()
    console.log("accounts: ", accounts)
    setAccount(accounts[0])
    // this.setState({ account: accounts[0] })
    // avaxDocumentAbi, avaxDocumentAddress
    await connectWallet();

    const avaxContractnew = new web3.eth.Contract(avaxDocumentAbi, avaxDocumentAddress)
    // const tokenContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS)
    // console.log("contract from avax loaded!!!: " + avaxContractnew.keys())
    console.log("contract from avax loaded!!!: " + avaxContractnew);
    console.log("contract from avax loaded!!!: " + Object.keys(avaxContractnew));
    console.log("avaxContractnew methods!!!: " + Object.keys(avaxContractnew.methods));
    // const avaxOwnercall = await avaxContractnew.methods.owner().call()
    // const avaxOwnercall = await avaxContractnew.methods.name().call()
    // console.log("avaxOwnercall!!!: " + Object.keys(avaxOwnercall) +  "vs different account i am in now: " + accounts);
    // console.log("contract from avax loaded!!!:" + JSON.stringify(avaxContractnew));






    // PUBLIC METHODS:
    // name():
    const avaxNamecall = await avaxContractnew.methods.name().call();
    console.log("avaxNamecall!!!:" + avaxNamecall);

    // PUBLIC METHODS:
    // owner():
    const avaxOwnercall = await avaxContractnew.methods.owner().call();
    console.log("avaxNamecall!!!:" + avaxOwnercall, " ====> ", accounts[0], " is it the same: ", accounts[0] == avaxOwnercall);

    // PUBLIC METHODS:
    // version():
    const avaxVersioncall = await avaxContractnew.methods.version().call();
    console.log("avaxNamecall!!!:" + avaxVersioncall);


    // console.log("0x7465737400000000000000000000000000000000000000000000000000000000")
    // console.log("length--> ", "0x7465737400000000000000000000000000000000000000000000000000000000".length)
    // console.log(Web3.utils.asciiToHex("foo"));
    // console.log(Web3.utils.asciiToHex("bar"));

    const documentContent = Web3.utils.asciiToHex("yayyyyy")
    const paddedDocumentContent = documentContent.padEnd(66, '0')
    // const documentContent2 = Web3.toAscii(3)
    console.log(paddedDocumentContent);




    setAvaxContract(avaxContractnew)


    // console.log("-------------------------------------avaxContractGeneratornew----------------------------------------");
    // // avaxDocumentStoreCreatorAddress, avaxDocumentStoreCreatorAbi
    // const avaxContractGeneratornew = new web3.eth.Contract(avaxDocumentStoreCreatorAbi, avaxDocumentStoreCreatorAddress)
    // // const tokenContract = new web3.eth.Contract(NFT_ABI, NFT_ADDRESS)
    // // console.log("contract from avax loaded!!!: " + avaxContractGeneratornew)
    // console.log("contract from avaxContractGeneratornew loaded!!!: " + Object.keys(avaxContractGeneratornew));
    // console.log("avaxContractGeneratornew methods!!!: " + Object.keys(avaxContractGeneratornew.methods));
    // const currentDocumentaddresses = await avaxContractGeneratornew.methods.DocumentStoreMultiple(1).call()
    // console.log("currentDocumentaddresses: " + currentDocumentaddresses +  "vs different account i am in now: " + accounts);
    // // console.log("contract from avax loaded!!!:" + JSON.stringify(avaxContractnew));
    // setAvaxContractGenerator(avaxContractGeneratornew)

  }


  async function ownerCall() {
    const avaxOwnercall = await avaxContract.methods.owner().call()
    console.log("newww avaxOwnercall!!!: " + avaxOwnercall + "vs different account i am in now: ");
    setAvaxContractDetails({ ...avaxContractDetails, "owner": avaxOwnercall })
    // return avaxOwnercall
  }

  async function issuedoc() {
    // issuing method :
    const documentContent = Web3.utils.asciiToHex(3)

    const paddedDocumentContent = documentContent.padEnd(66, '0')
    // const documentContent2 = Web3.toAscii(3)
    console.log(paddedDocumentContent);
    // console.log(documentContent2);
    // const avaxIssuecall = await avaxContractnew.methods.issue(paddedDocumentContent).send({"from": account});

    let tx3
    // market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})
    console.log("what address is being used: " + account)
    let avaxIssuecall = await avaxContract.methods.issue(paddedDocumentContent).send({ from: account })
      .once('receipt', (receipt) => {
        console.log("connect created!: receipt events: ", JSON.stringify(receipt.events))
        tx3 = receipt.events
        return receipt
      });
  }

  // Init
  useEffect(() => {
    loadBlockchainData();
    console.log("avaxContract loaded:" + avaxContract)
  }, [avaxContractDetails]);

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
                onClick={ownerCall}>Get Owner</button>
              <button type='button' className='btn btn-primary m-2'
                onClick={issuedoc}>Issue Document</button>
              {/* <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner</button>
              <button type='button' className='btn btn-primary m-2'
                onClick={ownerCall}>Get Owner</button>
              <button type='button' className='btn btn-primary m-2'
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

export default TestContract;
