import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import NavTabs from "./components/NavTabs.jsx";
import MainContent from "./components/MainContent.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <>
      <Header />
      <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <MainContent activeTab={activeTab} />
      <Footer />
    </>
  );
}

export default App;
