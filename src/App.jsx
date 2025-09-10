import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";

// Pages
import Home from "./pages/Home";
import OpenPRs from "./pages/OpenPRs";
import ClosedPRs from "./pages/ClosedPRs";
import Contributors from "./pages/Contributors";

function App() {
  return (
    <Router>
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/open-prs" element={<OpenPRs />} />
          <Route path="/closed-prs" element={<ClosedPRs />} />
          <Route path="/contributors" element={<Contributors />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
