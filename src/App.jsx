import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
// Pages
import Home from "./pages/Home";
import OpenPRs from "./pages/OpenPRs";
import ClosedPRs from "./pages/ClosedPRs";
import Contributors from "./pages/Contributors";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/open-prs" element={<OpenPRs />} />
          <Route path="/closed-prs" element={<ClosedPRs />} />
          <Route path="/contributors" element={<Contributors />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;
