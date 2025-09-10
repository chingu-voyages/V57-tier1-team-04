import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Link to="/">
        <img src="../src/assets/logo.png" />
      </Link>
      <div className="main-title">
        <h1>Merge Monitor</h1>
        <span>07:22 AM</span>
      </div>
    </header>
  );
}

export default Header;
