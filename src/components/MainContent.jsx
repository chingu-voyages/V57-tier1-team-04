
import Header from "../components/Header";
import NavTabs from "../components/NavTabs";
import Time from "../components/Time";
import Footer from "../components/Footer";
import { useState } from "react";


function MainLayout({ children }) {
const [curTheme, setCurTheme] = useState(false);

  return (
    <div className={curTheme ? "dark-mode flex flex-col min-h-screen" : "flex flex-col min-h-screen"}>
      <Theme curTheme={curTheme} setCurTheme={setCurTheme} />
      <Header />
      <NavTabs />
      <Time/>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Theme ({curTheme, setCurTheme}) {
  function changeTheme() {
    setCurTheme(!curTheme);
  }
  return (
    <div>
      <button className="mode-btn" onClick={changeTheme}>
      {curTheme ? "🌕" : "🌑"}
      </button>
    </div>
  )
}

export default MainLayout;
