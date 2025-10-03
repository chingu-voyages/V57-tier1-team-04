
import { Link, useLocation } from "react-router-dom";
import "../App.css";
function Header() {

  //get the current location
  const location = useLocation();

  //check if the current location is /closed-prs
  const isClosedPRsRoute = location.pathname === "/closed-prs";

  //conditionally set the className for the logo
  const logoClassName = isClosedPRsRoute ? "logo animate-spin" : "logo";

  return (
    <header>
      <Link to
      ="/"
      aria-label="Go to Home Page"
      >
        <img 
        className={logoClassName}
        src="../src/assets/logo.png" 
        alt="Project Dashboard Logo - Click to go to Home" />
      </Link> 
      <div className="header-content items-baseline">
        <h1 className="main-heading">Pull Request DashBoard</h1>

      </div>
    </header>
  );
}

export default Header;
