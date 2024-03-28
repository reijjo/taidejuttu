import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Homepage from "../pages/Homepage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [muokkaaOpen, setMuokkaaOpen] = useState(false);

  return (
    <Router>
      <main>
        <Navbar
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setMuokkaaOpen={setMuokkaaOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                muokkaaOpen={muokkaaOpen}
                setMuokkaaOpen={setMuokkaaOpen}
              />
            }
          />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
