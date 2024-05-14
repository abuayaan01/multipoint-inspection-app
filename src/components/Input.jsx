import React, { forwardRef } from "react";

const Input = ({ label, name, size, placeholder, register, required, ...rest }) => {
  return (
    <>
      {/* <label className="text-slate-600">{label}</label> <br />
      <input className="w-full px-1 focus:outline-none focus:border-slate-400 rounded my-[2px] mb-3 border-b-2 border-slate-300" {...register(name, { required })} {...rest} /> <br /> */}
      <div className={`w-full max-w-full px-3 shrink-0 ${size == 'sm' ? 'md:w-6/12' : 'md:w-12/12' }  md:flex-0`}>
        <div className="mb-4">
          <label
            htmlFor={label}
            className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
          >
            {label}
          </label>
          <input
            type="text"
            name={name}
            {...register(name, { required })} 
            {...rest}
            className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
          />
        </div>
      </div>
    </>
  );
};

export default Input;
