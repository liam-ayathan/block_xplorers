// import Temp from "./components/Temp";
import { react } from "@babel/types";
import "./App.css";
import { useState, useEffect } from 'react'
import Web3 from "web3";
import { avaxDocumentAbi, avaxDocumentAddress } from './components/chainlist'


function App() {
  const web3 = new Web3(Web3.givenProvider)
  const [account, setAccount] = useState(null);
  const [currentNetworkId, setNetworkId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [avaxContract, setAvaxContract] = useState(null);
  const [avaxContractGenerator, setAvaxContractGenerator] = useState(null);
  const [avaxContractDetails, setAvaxContractDetails] = useState({"owner": null});

  // Functions
  async function connectWallet() {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0])
    setLoading(false)
  }

  async function loadBlockchainData() {
    // let web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    // window web3 detection added:
    const web3 = new Web3(window.web3.currentProvider);

    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    setAccount(accounts[0])
    // this.setState({ account: accounts[0] })
    // avaxDocumentAbi, avaxDocumentAddress

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
    console.log("avaxNamecall!!!:" + avaxOwnercall, " ====> ", accounts[0], " is it the same: ", accounts[0] ==  avaxOwnercall);

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


  async function ownerCall(){
    const avaxOwnercall = await avaxContract.methods.owner().call()
    console.log("newww avaxOwnercall!!!: " + avaxOwnercall +  "vs different account i am in now: ");
    setAvaxContractDetails({...avaxContractDetails, "owner": avaxOwnercall})
    // return avaxOwnercall
  }


  async function issuedoc(){

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
        let avaxIssuecall = await avaxContract.methods.issue(documentContent).send({ from: account })
        .once('receipt', (receipt) => {
          console.log("connect created!: receipt events: ", JSON.stringify(receipt.events))
          tx3 = receipt.events
          return receipt
     });
    
     
  }

  // Init
  useEffect(() => {
    if (isLoading) {
      connectWallet()
      web3.eth.net.getId().then((Response) => {
        setNetworkId(Response)
      })
    }
    loadBlockchainData();
    console.log("avaxContract loaded:" +avaxContract)
  }, [isLoading]);

  // Event Handlers
  window.ethereum.on('accountsChanged', () => { connectWallet() })
  window.ethereum.on('networkChanged', () => {
    web3.eth.net.getId().then((Response) => {
      setNetworkId(Response)
    })
  })

  const handleClick = () => setLoading(true);

  return (
    <div className="d-flex align-items-center">
      <div className="container text-center">
        <div className="container m-3 p-3">
          <h1>BLOCK XPLORERS</h1>
        </div>


        <div className="container m-3 p-3 section_area">
          <h2 className="desc">Step 1: Select a side-chain.</h2>
          <p className="desc">Lorem</p>
        </div>



        <div className="container m-3 p-3 section_area">
          <h2 className="desc">Step 2: Deploy your contract.</h2>
          <p className="desc">Lorem</p>
          <div 
          // key={chainAlias} 
          className='col mb-3'>
              <div className='card bg-dark h-100' style={{display: "flex", justifyContent: "left", alignItems: "center", flexDirection:"row"}}>
                <div className='card-header h-50' >Methods:</div>
                <div className='card-body' style={{display: "flex", justifyContent: "left", alignItems: "center", flexDirection:"column"}}>
                  <button type='button' className='btn btn-primary' 
                  onClick={ownerCall} 
                    >Get Owner </button>
                    <button type='button' className='btn btn-primary' 
                  onClick={issuedoc} 
                    >Issue Document!</button>
                    <button type='button' className='btn btn-primary' 
                  // onClick={} 
                    >Switch to </button>
                </div>

                <div className='card-header h-50'>Response</div>
                <div className='card-body' style={{display: "flex", justifyContent: "left", alignItems: "center", flexDirection:"column"}}>
                  {/* <button type='button' className='btn btn-primary' 
                  // onClick={} 
                    >{avaxContractDetails.owner} </button> */}
                    <p>{avaxContractDetails.owner}</p>
                    <button type='button' className='btn btn-primary' 
                  // onClick={} 
                    >Method</button>
                    <button type='button' className='btn btn-primary' 
                  // onClick={} 
                    >Switch to </button>
                </div>



              </div>
            </div>
        </div>
        <div className="container m-3 p-3 section_area">
          <p>lorem</p>
        </div>
      </div>
    </div>
  )  
}

export default App;
