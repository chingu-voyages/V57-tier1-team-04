import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Wrappers
import MainContent from "./components/MainContent";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import OpenPRs from "./pages/OpenPRs";
import ClosedPRs from "./pages/ClosedPRs";
import Contributors from "./pages/Contributors";
import NotFoundPage from "./pages/NotFoundPage";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route element={<MainContent/>}>
              <Route path="/" element={<Home />} />
              <Route path="/open-prs" element={<OpenPRs />} />
              <Route path="/closed-prs" element={<ClosedPRs />} />
              <Route path="/contributors" element={<Contributors />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
