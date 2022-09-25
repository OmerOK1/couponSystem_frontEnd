import moment from "moment";
import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {

    let timerId: any;
    const [time, setTime] = useState(new Date());

    
    useEffect(() => {
        timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => { clearInterval(timerId); };
    }, []);

    return (
        <div className="Clock">
            <h2>{moment(time).format("hh:mm:ss")}</h2>
        </div>
    );
}

export default Clock;
