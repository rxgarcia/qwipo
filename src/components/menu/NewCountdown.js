import "./NewCountdown.css";
// import { useState } from "react";
import Countdown from "react-countdown";

const NewCountdown = (props) => {
    // const [currTimeLeft, setCurrTimeLeft] = useState(props.timeLeft);

    // const handleTimeLeft = () => {
    //     setCurrTimeLeft((currTimeLeft) => {
    //         return currTimeLeft - 1;
    //     });
    //     console.log(currTimeLeft);
    // }

    return (
        <Countdown
            date={Date.now() + props.timeLeft * 1000}
            renderer={(rend) => {
                return (
                    <div className="new-countdown__slider">
                        <input
                            type="range"
                            value={rend.total}
                            min="0"
                            max={props.timeLeft * 1000}
                        />
                    </div>
                );
            }}
        />
    );
};

export default NewCountdown;
