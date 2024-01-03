import React, { createContext } from 'react'


export let CounterContext=createContext();




export default function creatContextProvider(props) {






  return <>
        <CounterContext.Provider value={{}}>
            {props.children}
        </CounterContext.Provider>
  
  </>


    
  
}
