// import Temp from "./components/Temp";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from "./features/details";
import Home from "./pages/Home";
import Prototype from "./pages/Prototype";

function App() {
  return (

<BrowserRouter>
  <Details/>
  <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/prototype" element={<Prototype/>}/>
  </Routes>

</BrowserRouter> 
  )  
}

export default App;
