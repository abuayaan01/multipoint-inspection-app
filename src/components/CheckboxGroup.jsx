import React from "react";
// import { Stack, Checkbox, CheckboxGroup } from "@chakra-ui/react";

function CustomCheckboxGroup({ label, name, options, control }) {
  return (
    <>
      <label
        htmlFor={label}
        className="mx-4 border-b-[1px] border-slate-400 block py-2 font-bold text-xs text-slate-700"
      >
        {label}
      </label>{" "}
      <div className="mx-4 flex gap-5 flex-wrap my-6">
        {options.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <input
              className="appearance-none checkboxColor cursor-pointer transition-all duration-200 ease-in-out hover:scale-150 w-4 h-4 checked:border-0 checked:rounded-full  checked:bg-orange-400 border-slate-500 border-[2px]"
              type="checkbox"
              id={name + label + option}
              {...control.register(name)}
              value={option}
            />
            <label
              htmlFor={name + label + option}
              className="text-slate-600 px-3 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomCheckboxGroup;
