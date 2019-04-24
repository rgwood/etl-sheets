import '../styles/index.css'
import { useState, useEffect } from 'react';

var timerId: NodeJS.Timeout;

function Clock() {
    var [time, setTime] = useState(new Date(Date.now()));

    useEffect(() => {
        timerId = setInterval(() => setTime(new Date(Date.now())), 1000);
        return () => clearInterval(timerId);
    });
    return <div >
        {time.toTimeString()}
    </div>
}

export default Clock