
import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import Footer from "../components/Footer";
import FloatingChatButton from "../components/FloatingChatButton";
import { useState } from "react";
import Theme from "../components/Theme";

function MainContent({ children }) {
const [curTheme, setCurTheme] = useState(false);

  return (
    <div className={curTheme ? "dark-mode flex flex-col min-h-screen" : "flex flex-col min-h-screen"}>
      <Theme curTheme={curTheme} setCurTheme={setCurTheme} />
      <Header />
      <NavTabs />
      <main>{children}</main>
      <FloatingChatButton />
      {/* <Chatbot /> */}
      <Footer />
    </div>
  );
}

export default MainContent;
