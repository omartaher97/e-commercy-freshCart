import React, { createContext, useState } from 'react'



export let userContext=createContext();



export default function UserContextProvider(props) {
    const [userToken, setuserToken] = useState(null)
  return <>
<userContext.Provider value={{userToken,setuserToken}}>
    {props.children}
</userContext.Provider>
  
  </>}
