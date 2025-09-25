import {useEffect, useState} from 'react';


function Time(){
        const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12:true};
      setTime(now.toLocaleTimeString([], options));
    };

    updateClock(); //run once immediately
    const timer = setInterval(updateClock, 1000); //update every second
    return () => clearInterval(timer); //cleanup on unmount
  }, []);
              

              return (
<span className="time">{time}</span>
)
}

export default Time;


