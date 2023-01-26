import { FiChevronDown, FiChevronUp } from "react-icons/fi";

export const TimeSelector = ({ length, text, onIncrement, onDecrement }) => {
  return (
    <div className="flex flex-col items-center text-xl">
      <span>{text}</span>
      <div className="flex items-center gap-2 text-2xl">
        <FiChevronDown className="cursor-pointer" onClick={onDecrement} />
        <span>{length}</span>
        <FiChevronUp className="cursor-pointer" onClick={onIncrement} />
      </div>
    </div>
  );
};
