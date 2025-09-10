import Home from "../pages/Home.jsx";
import OpenPRs from "../pages/OpenPRs.jsx";
import ClosedPRs from "../pages/ClosedPRs.jsx";
import Contributors from "../pages/Contributors.jsx";

function MainContent({ activeTab }) {
  switch (activeTab) {
    case "home":
      return <Home />;
    case "open-prs":
      return <OpenPRs />;
    case "closed-prs":
      return <ClosedPRs />;
    case "contributors":
      return <Contributors />;
    default:
      return <Home />;
  }
}

export default MainContent;
