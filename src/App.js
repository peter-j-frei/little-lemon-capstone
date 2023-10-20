import './App.css';
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
  <>
    <BrowserRouter>
      <Header/>
      <Main/>
      <Footer/>
    </BrowserRouter>
  </>

  );
}

export default App;
