import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import statusContext from '../context/gameStatus/statusContext'


const Timer = () => {
    const clock_icon = <FontAwesomeIcon  icon={faClock} />
    const [ minutes, setMinutes ] = useState(0);
    const [seconds, setSeconds ] =  useState(0);

    const scontext = useContext(statusContext)
    const { victory, defeat } = scontext

    useEffect(()=>{
        let myInterval = setInterval(() => {
                if (seconds >= 0) {
                    setSeconds(seconds + 1);
                }
                if (seconds === 59) {
                    setMinutes(minutes + 1);
                    setSeconds(0);
                } 
            }, 1000)
            return ()=> {
                clearInterval(myInterval);
              };
        });

    useEffect(() => {
        if(victory || defeat){
            setMinutes(0)
            setSeconds(0)
        }
    }, [victory, defeat])

    return (
      <div className="grid-2" style={{display:"flex"}}>
        {!victory && !defeat
        ? <div>{ minutes === 59 && seconds === 59
            ? <h3> 59:59 </h3>
            : <h3> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h3> 
        }</div> 
        : <div><h3>0:00</h3></div> }
        <span>{clock_icon}</span>
      </div>
    )
}

export default Timer