import React from "react";
import styles from "./Timer.module.scss"
import { Mode, SettingsType } from "../../App";

interface TimerProps {
    currentMode: Mode;
    timeSettings: SettingsType;
}
export default function Timer ({currentMode, timeSettings}: TimerProps) {
    const currentModeKey = currentMode as unknown as keyof SettingsType;
    const time = timeSettings[currentModeKey];
    const [timeLeft, setTimeLeft] = React.useState(60 * time); 
    const [isStarted, setIsStarted] = React.useState(false);
    const [isPaused, setIsPaused] = React.useState(true);

    React.useEffect(() => {
        setIsStarted(false);
        setIsPaused(true);
        setTimeLeft(60*time);
    }, [currentMode, timeSettings])

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
    const progress = (timeLeft / (60 * time)) * 100;

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
                <button className={styles.btn} onClick={() => {
                    if (!isStarted)
                        setIsStarted(true);

                    setIsPaused((prev) => !prev)
                }}>
                    {isPaused ? (isStarted ? "RESUME" : "START") : "PAUSE"}
                </button>                
            </div>
        </div>
    )
}