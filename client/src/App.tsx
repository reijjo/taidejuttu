import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Homepage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
