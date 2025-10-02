
import { Link } from "react-router-dom";
import "../App.css";
function Header() {

  return (
    <header>
      <Link to
      ="/"
      aria-label="Go to Home Page"
      >
        <img 
        className="logo hover:animate-spin" 
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
