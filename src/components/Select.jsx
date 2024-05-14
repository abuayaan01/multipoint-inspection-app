import React from "react";
import { CgSelect } from "react-icons/cg";


function Select({ label, field, options }) {
  return (
    <>
      <div className="w-full mb-4 max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
        <label
          htmlFor={label}
          className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80"
        >
          {label}
        </label>
        <div className="relative">
          <select
            className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
            {...field}
          >
            {options.map((option) => (
              <option
                className="text-[#fa6500]! rounded-lg text-[white] bg-slate-900 focus:border-none focus:outline-none"
                key={option}
                value={option}
              >
                {option == "" ? "Select an option" : option}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-3">
            <CgSelect />
          </div>
        </div>
      </div>
    </>
  );
}

export default Select;
