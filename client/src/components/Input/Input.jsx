import React from "react";

function Input({ width, height, value = "", setValue = () => {} }) {
  return (
    <div className="relative">
      <img
        src="/images/keyboard.png"
        alt=""
        className="absolute left-3 top-1/2 translate-y-[-50%] w-5 invert-30"
      />
      <input
        type="text"
        name=""
        id=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a code"
        className="border-[1px] border-gray-500 text-gray-700 outline-none hover:border-gray-700 rounded-2xl p-2 pl-12 font-semibold"
        style={{ height, width }}
      />
    </div>
  );
}

export default Input;
