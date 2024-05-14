import React from 'react'

function Textarea({label,name,register}) {
  return (
    <div className='w-full px-3'>
        <label htmlFor={name} className="inline-block mb-2 ml-1 font-bold text-xs text-slate-700 darktext-white/80">
          {label}
        </label>{" "}
        <textarea
          name={name}
          id={name}
          className="w-full mb-2 border-b-2 focus:shadow-primary-outline darkbg-slate-850 darktext-white text-sm leading-5.6 ease block appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 outline-none transition-all placeholder:text-gray-500 focus:border-orange-300 focus:outline-none"
          rows="4"
          {...register(name)}
        ></textarea>
      </div>
  )
}

export default Textarea