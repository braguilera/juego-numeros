import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {

    const navegacion = useNavigate();
    return (
    <>
    <section className='error'>
        <h1>Error: Esta página no existe!</h1>
        <button className='volver_inicio' onClick={() => navegacion('/')}>Volver al inicio</button>
    </section>
    </>
    )
}

export default Error
