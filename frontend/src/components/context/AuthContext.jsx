import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,       // { name, avatar }
    userType: null,   // "guest" | "github" | null
    loading: true,
  });


  useEffect(() => {
    const fetchGithubUser = async () => {
      try {
        const data = await getCurrentUser(); // uses JWT cookie
        if (data.userType === "github") {
          loginAsGithub(data);
        } else {
          setAuth({ user: null, userType: null, loading: false });
        }
      } catch (err) {
        setAuth({ user: null, userType: null, loading: false });
        console.log("No GitHub session found", err);
      }
    };
    fetchGithubUser();
  }, []);

  // Guest login
  const loginAsGuest = () => {
    setAuth({
      user: { name: "Guest", avatar: "/guest.png" },
      userType: "guest",
      loading: false,
    });
  };

  // GitHub login after fetch from backend
  const loginAsGithub = (userData) => {
    setAuth({
      user: {
        name: userData.name || userData.login,
        avatar: userData.avatar_url,
      },
      userType: "github",
      loading: false,
    });
  };

  // Logout
  const logout = async () => {
    await logoutUser(); // hits backend logout
    setAuth({ user: null, userType: null, loading: false });
  };


  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logout, loginAsGuest, loginAsGithub }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
