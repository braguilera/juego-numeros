import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';

const Juego = () => {
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const navegacion = useNavigate();  
    const { azar, setAzar } = useContext(Contexto);

    const [misNumeros, setMisNumeros] = useState(Array(10).fill(Array(4).fill(null))); // Array de 10 filas y 4 columnas
    const [currentRow, setCurrentRow] = useState(0);
    const [currentCol, setCurrentCol] = useState(0);

    useEffect(() => {
        const nuevosNumeros = [];
        for (let i = 0; i < 4; i++) {
            nuevosNumeros.push(Math.floor(Math.random() * 9));
        }
        setAzar(nuevosNumeros);
    }, [setAzar]);

    const botonPulsado = (elemento) => {
        const numero = parseInt(elemento.target.innerHTML);
        const newMisNumeros = misNumeros.map((fila, rowIndex) => (
            rowIndex === currentRow
                ? fila.map((num, colIndex) => (colIndex === currentCol ? numero : num))
                : fila
        ));
        setMisNumeros(newMisNumeros);

        // Avanzar a la siguiente posición
        if (currentCol < 3) {
            setCurrentCol(currentCol + 1);
        } else if (currentRow < 9) {
            setCurrentRow(currentRow + 1);
            setCurrentCol(0);
        }
    };

    return (
        <>
            <button className='boton_jugar' onClick={() => navegacion(-1)}>Volver atrás</button>
        
            <div className='cuadricula'>
                {misNumeros.map((fila, rowIndex) => (
                    <div key={rowIndex} className='fila'>
                        {fila.map((num, colIndex) => (
                            <div key={colIndex} className='cuadro'>
                                {num !== null ? num : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className='botones'>
                {numeros.map((num) => (
                    <button key={num} onClick={botonPulsado}>{num}</button>
                ))}
            </div>
        </>
    );
};

export default Juego;
