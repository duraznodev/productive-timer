import React from "react";

export const Button = ({ icon, color, onClick, rounded }) => {
  return (
    <button
      className={`border-${color}-900 cursor-pointer  border-2 ${
        rounded ? "rounded-full p-3" : "rounded-xl py-2 px-5"
      } text-[2rem]`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
};
