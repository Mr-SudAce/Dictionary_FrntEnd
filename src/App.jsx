import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroPage from "./components/content/HeroPage.jsx";
import WordsDetail from "./components/content/WordsDetail.jsx";
// import Words from "./components/content/Words.jsx";
import Navbar from "./components/header/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import AboutUs from './components/content/AboutUs.jsx';
import "./main.css";

function App()  {
  return (
    <BrowserRouter>
      <div className="container-fluid p-0" style={{
        backgroundColor: 'var(--main_bg)'
      }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/word/detail/:id" element={<WordsDetail />} />
          {/* <Route path="/word" element={<Words />} /> */}
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter >
  );
}

export default App;
