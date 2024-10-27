// Inicio.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import { MagicMotion } from 'react-magic-motion';
import { DarkMode } from './DarkMode';


const Inicio = () => {
    const navegacion = useNavigate();
    const { dificultad, setDificultad, isClaro, setIsClaro } = useContext(Contexto);

    const seleccionarDificultad = (dificultadSeleccionada) => {
        localStorage.setItem('dificultad', dificultadSeleccionada);
        setDificultad(dificultadSeleccionada); 
    };

    return (
        <>
        <MagicMotion>
        <section className='inicio' data-theme={isClaro ? "light" : "dark"}>

            <DarkMode
                isSeleccionado={isClaro}
                cambio={()=>setIsClaro(!isClaro)}
            />
            <h1>¡Bienvenido a Adivina el Número!</h1>
            <h2>Pon a prueba tus habilidades para descubrir el número oculto.</h2>
            <h3>Selecciona la dificultad</h3>

            <div className='inicio_dificultad'>
                <button 
                className={((dificultad==='repeticion') 
                ? 'boton_jugar_activado' 
                : 'boton_jugar')} 
                onClick={() => seleccionarDificultad('repeticion')}>Con números repetidos</button>

                <button 
                className={((dificultad==='sinRepeticion') 
                ? 'boton_jugar_activado' 
                : 'boton_jugar')}  
                onClick={() => seleccionarDificultad('sinRepeticion')}>Sin números repetidos</button>
            </div>

            <button className='boton_iniciar_partida' onClick={()=>navegacion("/juego")}>Empezar a Jugar</button>

            <button className='boton_como_jugar' onClick={()=>navegacion('/comoJugar')}>¿Cómo jugar?</button>

        </section>
        </MagicMotion>
        </>
    );
};

export default Inicio;
