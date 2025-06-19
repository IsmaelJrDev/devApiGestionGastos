import React from 'react';

const InputForm = ({ type, placeHolder, isRequired, value, evt }) => {
  return (
    <input
      onChange={evt}
      value={value}
      type={type}
      placeholder={placeHolder}
      required={isRequired}
      className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
  );
};

export default InputForm;