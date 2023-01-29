import { useEffect, useReducer, useRef, useState } from "react";
import Audio from "./assets/finish-audio.mp3";
import {
  FiBriefcase,
  FiCoffee,
  FiPause,
  FiPlay,
  FiRefreshCcw,
} from "react-icons/fi";
import { Button, ButtonsBox, TimerTitle, TimeSelector } from "./components";
import { useTimer } from "./hooks";

const colors = {
  focus: "slate",
  break: "orange",
};

function timeReducer(state, { type, payload }) {
  switch (type) {
    case "increment":
      if (state[[payload + "Length"]] >= 60) return state;
      return {
        ...state,
        [payload + "Length"]: state[payload + "Length"] + 1,
      };
    case "decrement":
      if (state[[payload + "Length"]] <= 1) return state;
      return { ...state, [payload + "Length"]: state[payload + "Length"] - 1 };
    default:
      throw new Error(`The action ${type} doesn't exist`);
  }
}
const initialState = {
  sessionLength: 25,
  breakLength: 5,
};

function TimerApp() {
  const audio = useRef(null);
  const [color, setColor] = useState("focus");
  const [{ sessionLength, breakLength }, timeDispatch] = useReducer(
    timeReducer,
    initialState
  );
  const {
    actualCounter,
    counterState,
    counterType,
    onPause,
    onReset,
    onStart,
    onToggleCounterState,
  } = useTimer({
    sessionLength,
    breakLength,
    audio,
  });

  useEffect(() => {
    setColor(counterType);
  }, [counterType]);
  return (
    <div
      className={`flex h-screen select-none items-center justify-center bg-${colors[color]}-100 `}
    >
      <div
        className={`container flex h-5/6 w-5/6 flex-col text-${colors[color]}-900`}
      >
        <div className="grid h-full grid-rows-5">
          <TimerTitle title="Productive Timer" />
          <div className="row-start-3 flex items-center justify-center gap-4 font-medium">
            {counterState !== "start" && (
              <TimeSelector
                text="Break Length"
                length={breakLength}
                onIncrement={() =>
                  timeDispatch({ type: "increment", payload: "break" })
                }
                onDecrement={() =>
                  timeDispatch({ type: "decrement", payload: "break" })
                }
              />
            )}
            <span className="font-sans text-6xl font-bold sm:text-9xl sm:font-medium">
              {actualCounter}
            </span>
            {counterState !== "start" && (
              <TimeSelector
                text="Focus Length"
                length={sessionLength}
                onIncrement={() =>
                  timeDispatch({ type: "increment", payload: "session" })
                }
                onDecrement={() =>
                  timeDispatch({ type: "decrement", payload: "session" })
                }
              />
            )}
          </div>
          <div className="row-start-4 flex -translate-y-5 items-start justify-center sm:-translate-y-0">
            <ButtonsBox>
              <Button
                icon={<FiRefreshCcw />}
                color={colors[color]}
                onClick={onReset}
              />
              <Button
                icon={counterType === "focus" ? <FiBriefcase /> : <FiCoffee />}
                color={colors[color]}
                onClick={onToggleCounterState}
                rounded
              />
              <Button
                color={colors[color]}
                icon={counterState != "start" ? <FiPlay /> : <FiPause />}
                onClick={counterState != "start" ? onStart : onPause}
              />
            </ButtonsBox>
          </div>
        </div>
      </div>
      <audio ref={audio} src={Audio}></audio>
    </div>
  );
}

export default TimerApp;
