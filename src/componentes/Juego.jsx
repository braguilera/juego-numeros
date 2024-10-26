import React from 'react'
import { useNavigate } from 'react-router-dom'

const Juego = () => {
    const navegacion=useNavigate();        
    return (
        <>
            <button className='boton_jugar' onClick={()=>navegacion(-1)}>Volver atrás</button>
        </>
    )
}

export default Juego
