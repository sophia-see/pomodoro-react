import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Timer from './components/Timer/Timer';
import Settings from './components/Settings/Settings';

export enum Mode {
  pomodoro = "pomodoro",
  short_break = "short break",
  long_break = "long break",
}
function App() {
  const [currentMode, setCurrentMode] = React.useState(Mode.pomodoro);

  return (
    <>
      <Header currentMode={currentMode} setCurrentMode={setCurrentMode}/>
      <Timer />
      <Settings />
    </>
  )
}

export default App
