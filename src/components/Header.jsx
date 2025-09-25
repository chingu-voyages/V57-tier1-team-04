
import { Link } from "react-router-dom";
import "../App.css";
function Header() {

  return (
    <header>
      <Link to="/">
        <img className="logo" src="../src/assets/logo.png" />
      </Link> 
      <div className="header-content items-baseline">
        <h1 className="main-heading">Pull Request DashBoard</h1>

      </div>
    </header>
  );
}

export default Header;
