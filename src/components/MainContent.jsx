
import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import Footer from "../components/Footer";
import { useState } from "react";
import Theme from "../components/Theme";

function MainContent({ children }) {
const [curTheme, setCurTheme] = useState(false);

  return (
    <div 
    className={curTheme ? "dark-mode flex flex-col min-h-screen" : "flex flex-col min-h-screen"}
    aria-live="polite" //Added for subtle status updates like theme change
    >

      <Theme curTheme={curTheme} setCurTheme={setCurTheme} />
      <Header />
      <NavTabs />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MainContent;
