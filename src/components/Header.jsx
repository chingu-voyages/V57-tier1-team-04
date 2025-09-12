import { Link } from "react-router-dom";
import "../App.css";
function Header() {
  return (
    <header>
      <Link to="/">
        <img className="logo" src="../src/assets/logo.png" />
      </Link>
      <div className="header">
        <h1 className="main-heading">Merge Monitor</h1>
        <span>07:23 AM</span>
      </div>
    </header>
  );
}

export default Header;
