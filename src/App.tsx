import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Timer from './components/Timer/Timer';
import Settings from './components/Settings/Settings';

export enum Mode {
  pomodoro = "pomodoro" as any,
  short_break = "short break" as any,
  long_break = "long break" as any,
}

export type SettingsType = {
  pomodoro: number;
  short_break: number;
  long_break: number;
}

const defaultSettings = {
  pomodoro: 25,
  short_break: 5,
  long_break: 15
}

export enum FontType {
  SANS = "sans",
  SERIF = "serif",
  MONO = "mono"
};

export enum ColorType {
  RED = "red",
  BLUE = "blue",
  PURPLE = "purple"
}

const ColorValues = {
  red: "0, 91%, 71%",
  blue: "182, 91%, 71%",
  purple: "284, 89%, 74%"
}

const FontValues = {
  sans: `"Kumbh Sans", sans-serif`,
  serif: `"Roboto Slab", serif`,
  mono: `"Space Mono", monospace`,
}

function App() {
  const [currentMode, setCurrentMode] = React.useState(Mode.pomodoro);
  const [timeSettings, setTimeSettings] = React.useState<SettingsType>(defaultSettings);
  const [fontSettings, setFontSettings] = React.useState<FontType>(FontType.SANS);
  const [colorSettings, setColorSettings] = React.useState<ColorType>(ColorType.RED);

  React.useEffect(() => {
    const isMono = fontSettings == FontType.MONO;
    const isSans = fontSettings == FontType.SANS;

    const timerWeight = isMono ? "regular" : "bold";
    const timerSpace = isMono ? "-10px" : isSans ? "-4px" : "0px";
    
    document.documentElement.style.setProperty('--primary-font', FontValues[fontSettings]);
    document.documentElement.style.setProperty('--primary-color', ColorValues[colorSettings]);

    document.documentElement.style.setProperty('--timer-weight', timerWeight);
    document.documentElement.style.setProperty('--timer-space', timerSpace);
  }, [fontSettings, colorSettings])

  return (
    <>
      <Header currentMode={currentMode} setCurrentMode={setCurrentMode}/>
      <Timer currentMode={currentMode} timeSettings={timeSettings}/>
      <Settings 
        timeSettings={timeSettings} 
        setTimeSettings={setTimeSettings}
        fontSettings={fontSettings} 
        setFontSettings={setFontSettings}
        colorSettings={colorSettings} 
        setColorSettings={setColorSettings}
      />
    </>
  )
}

export default App
