import { Link } from "react-router-dom";
import "../App.css";
function Header() {
  return (
    <header>
      <Link to="/">
        <img src="../src/assets/logo.png" />
      </Link>
      <div className="main-title">
        <h1 className="text-blue-400 text-3xl font-bold underline">
          Merge Monitor
        </h1>
        <span>07:22 AM</span>
      </div>
    </header>
  );
}

export default Header;
