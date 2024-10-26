import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import { MagicMotion } from 'react-magic-motion';
import Cajas from './Cajas';

const Juego = () => {
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const navegacion = useNavigate();
    const { azar, setAzar } = useContext(Contexto);
    const [miNumero, setMiNumero] = useState([]);

    useEffect(() => {
        const nuevosNumeros = [];
        for (let i = 0; i < 4; i++) {
            nuevosNumeros.push(Math.floor(Math.random() * 9));
        }
        setAzar(nuevosNumeros);
    }, []);

    const escribirNumero = (e) => {
        const nuevoNumero = e.target.innerHTML;
        if (miNumero.length < 4) {
            setMiNumero([...miNumero, nuevoNumero]);
        }
    };

    const borrarNumero = () => {
        if (miNumero.length > 0) {
            setMiNumero(miNumero.slice(0, -1));
        }
    };

    return (
        <>
            <MagicMotion>
                <div className='cajas_contenedor'>
                    {[...Array(10)].map((_, index) => (
                        <Cajas key={index} />
                    ))}
                </div>

                {miNumero.join('')}
                
                <div className='botones_numeros'>
                    {numeros.map((num) => (
                        <button key={num} onClick={escribirNumero}>{num}</button>
                    ))}
                    <button onClick={borrarNumero}>Borrar</button>
                </div>

                <button>Enviar</button>
            </MagicMotion>
        </>
    );
};

export default Juego;
