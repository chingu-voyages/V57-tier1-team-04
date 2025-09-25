import {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import "../App.css";
function Header() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {hour: '2-digit', minute: '2-digit', hour12:true};
      setTime(now.toLocaleTimeString([], options));
    };

    updateClock(); //run once immediately
    const timer = setInterval(updateClock, 1000); //update every second
    return () => clearInterval(timer); //cleanup on unmount
  }, []);
  return (
    <header>
      <div className="header items-baseline">
                      <Link to="/">
        <img className="logo" src="../src/assets/logo.png" />
      </Link> 
        <h1 className="main-heading">Pull Request DashBoard</h1>
        <span>{time}</span>
        
      </div>
    </header>
  );
}

export default Header;
