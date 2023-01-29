import { useEffect, useState } from "react";

export const useTimer = ({ sessionLength, breakLength, audio }) => {
  const [actualCounter, setActualCounter] = useState("25:00");
  const [counterState, setCounterState] = useState("stop");
  const [counterType, setCounterType] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(sessionLength * 60);

  const setInitialCounter = () => {
    if (counterType === "focus") return sessionLength * 60;
    if (counterType === "break") return breakLength * 60;
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formatedMinutes =
      minutes % 60 > 9 || minutes == 60 ? minutes : "0" + minutes;
    const formatedSeconds =
      seconds % 60 > 9 ? seconds % 60 : "0" + (seconds % 60);
    return `${formatedMinutes}:${formatedSeconds}`;
  };

  const onBreak = () => {
    setCounterType("break");
    setSecondsLeft(setInitialCounter());
  };
  const onFocus = () => {
    setCounterType("focus");
    setSecondsLeft(setInitialCounter());
  };

  const onToggleCounterState = () => {
    if (counterType === "break") {
      onFocus();
      onReset();
    }
    if (counterType === "focus") {
      onBreak();
      onReset();
    }
  };

  const onStart = () => setCounterState("start");
  const onPause = () => setCounterState("stop");
  const onReset = () => setCounterState("reset");

  useEffect(() => {
    setSecondsLeft(setInitialCounter());
  }, [sessionLength, breakLength]);

  useEffect(() => setActualCounter(formatTime(secondsLeft)), [secondsLeft]);

  useEffect(() => {
    if (counterState == "reset") return setSecondsLeft(setInitialCounter());
    if (counterState == "start") {
      const interval = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
      if (secondsLeft < 0) {
        clearInterval(interval);
        audio.current.play();
        if (counterType == "break") return onFocus();
        if (counterType == "focus") return onBreak();
      }
      return () => clearInterval(interval);
    }
  }, [counterState, secondsLeft, counterType]);

  return {
    onPause,
    onReset,
    onStart,
    onToggleCounterState,
    actualCounter,
    counterState,
    counterType,
  };
};
