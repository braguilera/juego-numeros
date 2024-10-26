import React from 'react'
import { useNavigate } from 'react-router-dom'

const Derrota = () => {
    const navegacion = useNavigate();

    return (
        <div>
            Derrota
            <button onClick={()=>navegacion("/")} >Volver a jugar</button>
        </div>
    )
}

export default Derrota
