import '../styles/index.css'
import { useState, useEffect } from 'react';
import moment from 'moment';

var timerId: NodeJS.Timeout;

function Clock() {
    var [time, setTime] = useState(moment.now());

    useEffect(() => {
        timerId = setInterval(() => setTime(moment.now()), 1000);
        return () => clearInterval(timerId);
    });
    return <span className="text-sm">
        {`Now: ${moment(time).utc().format('YYYY-MM-DD HH:mm:ss')} (UTC)`}
    </span>
}

export default Clock