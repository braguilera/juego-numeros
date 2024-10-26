import React from 'react'
import { useNavigate } from 'react-router-dom'

const ComoJugar = () => {
    const navegacion = useNavigate();

    return (
    <>
        Carrousel de imagenes para ver como jugar
        <button onClick={()=>navegacion(-1)}>Volver</button>
    </>
    )
}

export default ComoJugar
