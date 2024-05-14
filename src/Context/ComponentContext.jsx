import { createContext, useContext, useState } from "react";
import React from 'react'

const ComponentContext = createContext();

export function ComponentProvider({children}) {
  const [currentComponentName, setCurrentComponentName] = useState('');
  const [updatedProfileImage, setUpdatedProfileImage] = useState("");

  return (
    <ComponentContext.Provider value={{currentComponentName,setCurrentComponentName,updatedProfileImage, setUpdatedProfileImage}}>
        {children}
    </ComponentContext.Provider>
  )
}

export function useComponent() {
    return useContext(ComponentContext);
}

