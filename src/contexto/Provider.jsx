import { useEffect, useState } from "react";
import Contexto from "./Contexto"


const Provider = ({children}) => {
    const [azar,setAzar]=useState([]);
    const [dificultad, setDificultad] = useState('')
    const [isClaro, setIsClaro] = useState(false);

    useEffect(() => {
        const dificultadGuardada = localStorage.getItem('dificultad');
        if (dificultadGuardada) {
            setDificultad(dificultadGuardada);
        }
    }, []);


    return (
        <Contexto.Provider value={{azar,setAzar,dificultad,setDificultad, isClaro, setIsClaro}}>
            {children}
        </Contexto.Provider>
    )
}

export default Provider
