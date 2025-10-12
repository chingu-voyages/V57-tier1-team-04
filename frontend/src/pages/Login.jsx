import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";
import { useEffect } from "react";
import { getCurrentUser } from "../api/authApi";

const Login = () => {
  const { loginAsGuest, loginAsGithub,auth } = useAuth();
  const navigate=useNavigate()

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate("/")
  };

  useEffect(() => {
    if (auth?.userType) {
      navigate("/", { replace: true }); // or "/dashboard"
    }
  }, [auth, navigate]);

  const handleGithubLogin = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    window.location.href = `${backendUrl}/auth/github`;
  };

  useEffect(() => {
    const fetchGithubUser = async () => {
      try {
        const data = await getCurrentUser();
        if (data.userType === "github") {
          loginAsGithub(data);
        }
      } catch (err) {
        console.log("No GitHub session found", err);
      }
    };
    fetchGithubUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to PR-HUB</h1>
      <div className="flex gap-4">
        <button
          onClick={handleGuestLogin}
          className="px-6 py-2 bg-cyan-500 text-white rounded-lg"
        >
          Continue as Guest
        </button>
        <button
          onClick={handleGithubLogin}
          className="px-6 py-2 bg-gray-900 text-white rounded-lg"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Login;
