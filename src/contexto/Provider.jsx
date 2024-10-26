import { useState } from "react";
import Contexto from "./Contexto"


const Provider = ({children}) => {
    const [azar,setAzar]=useState([]);


    return (
        <Contexto.Provider value={{azar,setAzar}}>
            {children}
        </Contexto.Provider>
    )
}

export default Provider
