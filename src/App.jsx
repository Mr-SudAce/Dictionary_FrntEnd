import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroPage from "./components/content/HeroPage.jsx";
import WordsDetail from "./components/content/WordsDetail.jsx";
// import Words from "./components/content/Words.jsx";
import Navbar from "./components/header/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import AboutUs from './components/content/AboutUs.jsx';
import "./main.css";

// pull push


// pulled

function App() {

  const base_url = "http://127.0.0.1:8000"

  const dictionary_url = "https://api.dictionaryapi.dev/api/v2/entries/en"


  return (
    <BrowserRouter>
      <div className="container-fluid p-0" style={{
        backgroundColor: 'var(--main_bg)'
      }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroPage base_url={base_url} dictionary_url={dictionary_url} />} />
          <Route path="/word/detail/:id" element={<WordsDetail dictionary_url={dictionary_url} />} />
          {/* <Route path="/word" element={<Words dictionary_url={dictionary_url} />} /> */}
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer base_url={base_url} />
      </div>
    </BrowserRouter >
  );
}

export default App;
