import React from 'react';

const Button = ({ text, onClick, type = "submit" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700 transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default Button;