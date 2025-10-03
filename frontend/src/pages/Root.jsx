
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Theme from '../components/Theme'
import { useState } from 'react'

const Root = () => {
  const handleClick=()=>{
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    window.location.href=`${backendUrl}/auth/github`
  }
  const [curTheme, setCurTheme] = useState(false);
  return (
    <div className={curTheme ? "dark-mode flex flex-col min-h-screen" : "flex flex-col min-h-screen"}>
        <Header/>
        <Theme curTheme={curTheme} setCurTheme={setCurTheme}/>
         <main className={`w-full flex items-center justify-center  py-16 ${curTheme ?"dark-mode":""}`}>
            <div className={`flex flex-col items-center p-8 rounded-2xl shadow-lg border-2 border-gray-700 animate-fade-in-down max-w-xl w-full`}>
              
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-600 mb-4 drop-shadow-sm text-center">
                Welcome to PR-HUB
              </h2>

              <p className="text-gray-600 text-center mb-8">
                Manage, review, and track your GitHub pull requests in one place.
              </p>

              <div className="flex flex-col md:flex-row gap-4 w-full justify-center">

                <Link className={`w-full flex items-center justify-center md:w-50 px-6 py-3 bg-cyan-500 font-semibold rounded-xl shadow-md hover:bg-cyan-600 hover:scale-105 active:scale-95 transition transform duration-300 ${curTheme ?" text-gray-900":" text-gray-200"}`}
                  to={"/home"}
                >
                  Continue as Guest
                </Link>

                <button className={` w-full md:w-50 px-6 py-3  font-semibold rounded-xl shadow-md hover:bg-gray-800 hover:scale-105 active:scale-95 transition transform duration-300 ${curTheme ?"bg-amber-400 text-gray-900":"bg-gray-900 text-gray-200"}`}
                  onClick={handleClick}
                >
                  Login with GitHub
                </button>
              </div>

              <div className="mt-8 text-sm text-gray-500 text-center">
                <p>🔒 We only request minimal permissions to access your pull requests.</p>
                <p>⚡ Fast, simple, and secure.</p>
              </div>
            </div>
          </main>
    </div>
  )
}

export default Root