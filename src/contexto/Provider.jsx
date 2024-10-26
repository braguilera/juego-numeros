import { useEffect, useState } from "react";
import Contexto from "./Contexto"


const Provider = ({children}) => {
    const [azar,setAzar]=useState([]);
    const [dificultad, setDificultad] = useState('')

    useEffect(() => {
        // Verificamos si hay una dificultad guardada en localStorage
        const dificultadGuardada = localStorage.getItem('dificultad');
        if (dificultadGuardada) {
            setDificultad(dificultadGuardada);
        }
    }, []);


    return (
        <Contexto.Provider value={{azar,setAzar,dificultad,setDificultad}}>
            {children}
        </Contexto.Provider>
    )
}

export default Provider
