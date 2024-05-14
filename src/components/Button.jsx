import React from "react";

function Button({onClickFunc,btnText,btnBg,btnBgHover}) {
  return (
    <>
      <button
        onClick={onClickFunc}
        className={`w-full sm:w-[400px] mt-10 bg-${btnBg} py-4 rounded text-slate-50 my-3 flex items-center justify-center  cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[${btnBgHover}] before:to-[#00C5E7)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded hover:before:left-0`}
      >{btnText}</button>
    </>
  );
}

export default Button;
