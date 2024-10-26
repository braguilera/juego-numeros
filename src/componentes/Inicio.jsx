// Inicio.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import { MagicMotion } from 'react-magic-motion';

const Inicio = () => {
    const navegacion = useNavigate();
    const { dificultad, setDificultad } = useContext(Contexto);

    const seleccionarDificultad = (dificultadSeleccionada) => {
        localStorage.setItem('dificultad', dificultadSeleccionada);
        setDificultad(dificultadSeleccionada); 
    };

    return (
        <>
        <MagicMotion>
            <h1>Bienvenido</h1>
            <h2>Selecciona la dificultad:</h2>

            <div className='inicio_dificultad'>
                <button 
                className={((dificultad==='repeticion') 
                ? 'boton_jugar_activado' 
                : 'boton_jugar')} 
                onClick={() => seleccionarDificultad('repeticion')}>Con Repetición</button>

                <button 
                className={((dificultad==='sinRepeticion') 
                ? 'boton_jugar_activado' 
                : 'boton_jugar')}  
                onClick={() => seleccionarDificultad('sinRepeticion')}>Sin Repetición</button>
            </div>

            <button className='boton_jugar' onClick={()=>navegacion("/juego")}>jugar</button>
        </MagicMotion>
        </>
    );
};

export default Inicio;
