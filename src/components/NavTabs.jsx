import { NavLink } from "react-router-dom";

function NavTabs() {
  const baseStyle = "px-4 py-2 rounded-md";
  const activeStyle = "bg-blue-600 text-white";
  const inactiveStyle = "text-gray-700 hover:bg-gray-200";

  return (
    <nav>
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
    </nav>
  );
}

export default NavTabs;
