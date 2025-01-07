import React from "react";
import styles from "./Timer.module.scss"

export default function Timer () {
    const tempTime = 18;
    const [timeLeft, setTimeLeft] = React.useState(60 * tempTime); 
    const [isPaused, setIsPaused] = React.useState(false);

    React.useEffect(() => {
        if (!isPaused && timeLeft > 0) {
            const interval = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [isPaused, timeLeft]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };
    const progress = (timeLeft / (60 * tempTime)) * 100;

    return (
        <div className={styles.container}>
            <svg className={styles.circle_container} viewBox="0 0 100 100">
                <circle className={styles.background_circle} cx="50" cy="50" r="45" />
                <circle
                    className={styles.progress_circle}
                    cx="50"
                    cy="50"
                    r="45"
                    strokeDasharray="283" // Circumference of the circle (2 * π * radius)
                    strokeDashoffset={(283 * (100 - progress)) / 100}
                />
            </svg>
            <div className={styles.content}>
                <div className={styles.timer}>{formatTime(timeLeft)}</div>
                <button className={styles.btn} onClick={() => setIsPaused((prev) => !prev)}>
                    {isPaused ? "RESUME" : "PAUSE"}
                </button>                
            </div>
        </div>
    )
}