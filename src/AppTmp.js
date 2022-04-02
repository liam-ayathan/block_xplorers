// import Temp from "./components/Temp";
import "./App.css";
import Details from "./features/details";
import ConnectWallet from "./features/connectWallet";
import ConnectChain from "./features/connectChain";
import TestContract from "./features/testContract";
import EventListeners from "./features/eventListeners";

function App() {
  return (
    <div className="d-flex align-items-center">
      <div className="container text-center">
        <Details></Details>
        <ConnectWallet></ConnectWallet>
        <ConnectChain></ConnectChain>
        <TestContract></TestContract>
        <EventListeners></EventListeners>
      </div>
    </div>
  )  
}

export default App;
