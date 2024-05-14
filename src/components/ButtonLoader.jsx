import React from "react";

function ButtonLoader({size}) {
  return (
    <>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="w-2 h-4 rounded-full bg-slate-100 animate-bounce [animation-delay:.0s] [animation-duration:.5s]"></div>
        <div className="w-2 h-6 rounded-full bg-slate-100 animate-bounce [animation-delay:.2s] [animation-duration:.5s]"></div>
        <div className="w-2 h-4 rounded-full bg-slate-100 animate-bounce [animation-delay:.0s] [animation-duration:.5s]"></div>
      </div>
    </>
  );
}

export default ButtonLoader;
