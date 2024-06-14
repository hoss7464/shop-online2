import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./Core-Ui/ScrollToTop";
import Home from "./Pages/Home/Home";
import Contacts from "./Pages/Contacts/Contacts";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
