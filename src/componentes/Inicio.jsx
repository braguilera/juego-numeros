import React from 'react'
import { useNavigate } from 'react-router-dom'

const Inicio = () => {
    const navegacion=useNavigate();


    return (
        <>
            <h1>Bienvenido</h1>
            <button className='boton_jugar' onClick={()=>navegacion("/juego")}>Empezar a jugar</button>
        </>
    )
}

export default Inicio
