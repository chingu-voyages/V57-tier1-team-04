import { NavLink } from "react-router-dom";

function NavTabs() {
  const baseStyle = "md:mx-1 md:px-4 md:py-2 md:text-base p-1 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-[#60B8DE] focus:ring-offset-2";
  const activeStyle = "bg-[#60B8DE] text-white";
  const inactiveStyle = "text-gray-700 hover:bg-gray-200";

  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/open-prs"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        Open PRs
      </NavLink>
      <NavLink
        to="/closed-prs"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
       Closed PRs
      </NavLink>
      <NavLink
        to="/contributors"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        Contributors
      </NavLink>
      <NavLink
        to="/about-us"
        className={({ isActive }) =>
                    `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
        }
      >
        About Us
      </NavLink>
    </nav>
  );
}

export default NavTabs;
