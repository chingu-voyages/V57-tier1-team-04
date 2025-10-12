
import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import Footer from "../components/Footer";
import FloatingChatButton from "../components/FloatingChatButton";
import { useState } from "react";
import Theme from "../components/Theme";
import { Outlet } from "react-router-dom";

function MainContent() {
const [curTheme, setCurTheme] = useState(false);

  return (
    <div className={curTheme ? "dark-mode flex flex-col min-h-screen" : "flex flex-col min-h-screen"}>
      <Theme curTheme={curTheme} setCurTheme={setCurTheme} />
      <Header />
      <NavTabs />
      <main><Outlet/></main>
      <FloatingChatButton />
      {/* <Chatbot /> */}
      <Footer />
    </div>
  );
}

export default MainContent;
