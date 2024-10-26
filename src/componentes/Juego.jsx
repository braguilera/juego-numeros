import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import { MagicMotion } from 'react-magic-motion';
import Cajas from './Cajas';

const Juego = () => {
    const numeros=[0,1,2,3,4,5,6,7,8,9]
    const navegacion = useNavigate();  
    const { azar, setAzar } = useContext(Contexto);


    useEffect(() => {
        const nuevosNumeros = [];
        for (let i = 0; i < 4; i++) {
            nuevosNumeros.push(Math.floor(Math.random() * 9));
        }
        setAzar(nuevosNumeros);
    }, []);

    return (
        <>
        <MagicMotion>
            <Cajas/>
            <div className='botones_numeros'>
                {numeros.map((num) => (
                    <button key={num}>{num}</button>
                ))}
                <button >Borrar</button>
            </div>
            <button >Enviar</button>

        </MagicMotion>
        </>
    );
};

export default Juego;
