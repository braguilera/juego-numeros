import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import { MagicMotion } from 'react-magic-motion';

const Juego = () => {
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const navegacion = useNavigate();  
    const { azar, setAzar } = useContext(Contexto);

    const [misNumeros, setMisNumeros] = useState(Array(10).fill().map(() => Array(4).fill(null))); // Array de 10 filas y 4 columnas
    const [filaActual, setFilaActual] = useState(0);
    const [columnaActual, setColumnaActual] = useState(0);
    const [numerosActuales, setNumerosActuales] = useState([]);

    useEffect(() => {
        const nuevosNumeros = [];
        for (let i = 0; i < 4; i++) {
            nuevosNumeros.push(Math.floor(Math.random() * 9));
        }
        setAzar(nuevosNumeros);
    }, [setAzar]);

    const botonPulsado = (elemento) => {
        const numero = parseInt(elemento.target.innerHTML);
        const newMisNumeros = misNumeros.map((fila, indiceFila) => (
            indiceFila === filaActual
                ? fila.map((num, indiceColumna) => (indiceColumna === columnaActual ? numero : num))
                : fila
        ));
        setMisNumeros(newMisNumeros);

        if (columnaActual < 3) {
            setColumnaActual(columnaActual + 1);
        }
    };

    const borrarUltimo = () => {
        if (columnaActual > 0 || misNumeros[filaActual].some(num => num !== null)) {
            const nuevaColumnaActual = columnaActual > 0 ? columnaActual - 1 : columnaActual; // No retrocede a la columna anterior si está en la primera
            const nuevoMisNumeros = misNumeros.map((fila, indiceFila) => (
                indiceFila === filaActual
                    ? fila.map((num, indiceColumna) => (indiceColumna === nuevaColumnaActual ? null : num))
                    : fila
            ));
            setMisNumeros(nuevoMisNumeros);
            setColumnaActual(nuevaColumnaActual);
        }
    };

    const verificarNumerosAcertados= () =>{
        setFilaActual(filaActual + 1);
        setColumnaActual(0);
    }

    return (
        <>
        <MagicMotion>
            {azar}
            <button className='boton_jugar' onClick={() => navegacion(-1)}>Volver atrás</button>
        
            <div className='cuadricula'>
                {misNumeros.map((fila, indiceFila) => (
                    <div key={indiceFila} className='fila'>
                        {fila.map((num, indiceColumna) => (
                            <div key={indiceColumna} className='cuadro'>
                                {num !== null ? num : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className='botones'>
                <div className='botones_numeros'>
                    {numeros.map((num) => (
                        <button key={num} onClick={botonPulsado}>{num}</button>
                    ))}
                    <button onClick={borrarUltimo}>Borrar</button>
                </div>
                <button onClick={verificarNumerosAcertados}>Enviar</button>
            </div>
        </MagicMotion>
        </>
    );
};

export default Juego;
