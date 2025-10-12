
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "./context/AuthContext";


function Header() {

  //get the current location
  const location = useLocation();

  //check if the current location is /closed-prs
  const isClosedPRsRoute = location.pathname === "/closed-prs";

  //conditionally set the className for the logo
  const logoClassName = isClosedPRsRoute ? "logo animate-spin" : "logo";
  const {logout}=useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await logout();
    navigate("/login");
  } catch (err) {
    console.error(err);
  }
};


  return (
    <header className="flex flex-col items-center py-6">
      <Link to="/" aria-label="Go to Home Page">
        <img
          className={`${logoClassName}`} 
          src="/logo.png"
          alt="Project Dashboard Logo - Click to go to Home"
        />
      </Link>

      <div className="flex items-center justify-between w-full mt-12 px-8">
        <h1 className="text-2xl font-semibold text-center flex-1 pl-12">
          Pull Request Dashboard
        </h1>
        <button className="bg-cyan-600 text-white px-4 py-2 rounded-2xl hover:bg-cyan-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  )
}
export default Header;
