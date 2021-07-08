import "../../styles/NewCountdown.css";
// import { useState } from "react";
import Countdown from "react-countdown";

const NewCountdown = (props) => {


    const handleDoNothing = () => {
        
    }

    const handleCompletion = (event) => { // kinda confused on what to do??
        console.log(event);
        // props.onDone(props.postKey);
        return 1;
    }

    return (
        <Countdown
            onComplete={handleCompletion}
            date={Date.now() + props.timeLeft * 1000}
            renderer={(rend) => {
                return (
                    <div className="new-countdown__slider">
                        <input
                            type="range"
                            value={rend.total}
                            min="0"
                            max={props.timeLeft * 1000}
                            onChange={handleDoNothing}
                        />
                    </div>
                );
            }}
        />
    );
};

export default NewCountdown;
