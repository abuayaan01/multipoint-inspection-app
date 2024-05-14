import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CgSelect } from "react-icons/cg";

function DynamicFields({ extra, setExtra, openEditor, deleteFields }) {
  const handleCheckboxChange = (index, option) => {
    const newExtra = [...extra];
    if (newExtra[index].value.includes(option)) {
      newExtra[index].value = newExtra[index].value.filter(
        (value) => value !== option
      );
    } else {
      newExtra[index].value = option;
    }
    setExtra(newExtra);
  };

  const handleTextChange = (index, newValue) => {
    const newExtra = [...extra];
    newExtra[index].value = newValue;
    setExtra(newExtra);
  };

  const handleDropdown = (index, value) => {
    const newExtra = [...extra];
    newExtra[index].value = value;
    setExtra(newExtra);
  };

  return (
    <div className="w-full">
      {extra?.map((fields, index) => {
        if (fields.type === "checkbox") {
          return (
            <div className="block w-full" key={index}>
              <div className="mx-4 border-b-[1px] border-slate-400 flex gap-2 items-center">
                <label
                  htmlFor={fields.label}
                  className="block py-2 font-bold text-xs text-slate-700"
                >
                  {fields.label}
                </label>{" "}
                <span className="edit" onClick={() => openEditor(index)}>
                  <FaRegEdit />
                </span>
                <span onClick={() => deleteFields(index)}>
                  <MdDelete className="hover:text-red-500 cursor-pointer" />
                  </span>
              </div>
              <div className="mx-4 flex gap-5 flex-wrap my-5">
                {fields.options.map((option, idx) => (
                  <div key={option} className="flex items-center gap-2">
                    <input
                      className="appearance-none checkboxColor cursor-pointer transition-all duration-200 ease-in-out hover:scale-150 w-4 h-4 checked:border-0 checked:rounded-full  checked:bg-orange-400 border-slate-500 border-[2px]"
                      type="checkbox"
                      id={fields.label + option}
                      checked={fields?.value?.includes(option)}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        handleCheckboxChange(
                          index,
                          isChecked
                            ? [...fields.value, option]
                            : fields.value.filter((value) => value !== option)
                        );
                      }}
                    />
                    <label
                      htmlFor={fields.label + option}
                      className="text-slate-600 px-3  cursor-pointer"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        } else if (fields.type === "select") {
          return (
            <div
              className="w-full py-3 max-w-full px-3 shrink-0 md:w-6/12 md:flex-0"
              key={index}
            >
              <div className="">
                <div className="flex mb-2 items-center gap-2">
                  <label
                    htmlFor={fields.label}
                    className="inline-block ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                  >
                    {fields.label}
                  </label>
                  <span className="edit" onClick={() => openEditor(index)}>
                    <FaRegEdit size={14} />
                  </span>
                  <span onClick={() => deleteFields(index)}>
                  <MdDelete />
                  </span>
                </div>
              </div>
              <div className="relative">
                <select
                  onChange={(e) => {
                    handleDropdown(index, e.target.value);
                  }}
                  value={fields.value}
                  className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
                >
                  {fields.options.map((option, idx) => (
                    <option
                      className="text-[#fa6500]! rounded-lg text-[white] bg-slate-900 focus:border-none focus:outline-none"
                      key={idx}
                    >
                      {option === "" ? "Select an option" : option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3">
                  <CgSelect />
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              className="w-full max-w-full px-3 shrink-0 md:w-12/12 md:flex-0"
              key={index}
            >
              <div className="py-3">
                <div className="flex mb-2 items-center gap-2">
                  <label
                    htmlFor={fields.label}
                    className="inline-block ml-1 font-bold text-xs text-slate-700 darktext-white/80"
                  >
                    {fields.label}
                  </label>
                  <span className="edit" onClick={() => openEditor(index)}>
                    <FaRegEdit size={14} />
                  </span>
                  <span onClick={() => deleteFields(index)}>
                  <MdDelete className="hover:text-red-500 cursor-pointer" />
                  </span>
                </div>
                <input
                  type={fields.type}
                  name={`extras.${fields.name}`}
                  value={fields.value}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                  className="focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-[#fffdf9]! bg-gray-50! bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
                />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default DynamicFields;
