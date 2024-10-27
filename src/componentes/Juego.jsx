import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import { MagicMotion } from 'react-magic-motion';
import Cajas from './Cajas';

const Juego = () => {
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const navegacion = useNavigate();
    const { azar, setAzar, dificultad } = useContext(Contexto);
    const [miNumero, setMiNumero] = useState([]);
    const [filaActual, setFilaActual] = useState(0);
    const [resultados, setResultados] = useState([]);
    const [alertaDerrota, setAlertaDerrota] = useState(false);
    const [filaVictoria, setFilaVictoria] = useState(null); // Nueva variable para fila ganadora

    useEffect(() => {
        generarNumeroAleatorio();
    }, [dificultad]);

    const generarNumeroAleatorio = () => {
        let nuevosNumeros;
        if (dificultad === 'repeticion') {
            nuevosNumeros = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
        } else {
            const uniqueDigits = new Set();
            while (uniqueDigits.size < 4) {
                uniqueDigits.add(Math.floor(Math.random() * 10));
            }
            nuevosNumeros = Array.from(uniqueDigits);
        }
        setAzar(nuevosNumeros);
    };

    const escribirNumero = (e) => {
        // Evitar escribir números si ya se ha ganado
        if (filaVictoria !== null) {
            return;
        }

        if (miNumero.length < 4) {
            setMiNumero([...miNumero, e.target.innerHTML]);
        }
    };

    const borrarNumero = () => {
        if (miNumero.length > 0) {
            setMiNumero(miNumero.slice(0, -1));
        }
    };

    const enviarRespuesta = () => {
        // Si ya se ha ganado, no hacer nada
        if (filaVictoria !== null) {
            return;
        }

        if (miNumero.length === 4) {
            let bien = 0;
            let regular = 0;
            let mal = 0;
            const contarNumeros = {};

            azar.forEach((num) => {
                contarNumeros[num] = (contarNumeros[num] || 0) + 1;
            });

            miNumero.forEach((num, idx) => {
                const parsedNum = parseInt(num);

                if (parsedNum === azar[idx]) {
                    bien++;
                    contarNumeros[parsedNum]--;
                } else if (azar.includes(parsedNum) && contarNumeros[parsedNum] > 0) {
                    regular++;
                    contarNumeros[parsedNum]--;
                } else {
                    mal++;
                }
            });

            if (bien === 4) {
                setFilaVictoria(filaActual); // Guarda la fila ganadora
            }

            setResultados((prevResultados) => [
                ...prevResultados,
                { fila: filaActual, numero: miNumero, feedback: { bien, regular, mal } }
            ]);

            setFilaActual(filaActual + 1);
            setMiNumero([]);

            if (filaActual === 9 && bien !== 4) {
                setAlertaDerrota(true);
            }
        }
    };

    return (
        <>
            <MagicMotion>
                <section className='juego'>
                {azar}
                    <aside className='juego_header'>
                        <button onClick={() => navegacion(-1)}>Volver</button>
                        <div className='juego_header_titulos'>
                            <h1>¡Adivina el Número!</h1>
                            <small>Jugando en la dificultad con números {(dificultad === 'repeticion') ? 'repetidos' : 'sin repetir'}</small>
                        </div>    
                        <button>Dark mode</button>
                    </aside>

                    <div className='cajas_contenedor'>
                        {[...Array(10)].map((_, index) => (
                            <Cajas
                                key={index}
                                numeroUsuario={index === filaActual ? miNumero : resultados[index]?.numero || []} 
                                isAdivinado={index < filaActual}
                                feedback={resultados.find(r => r.fila === index)?.feedback || { bien: 0, regular: 0, mal: 0 }}
                                isVictoria={index === filaVictoria}
                            />
                        ))}
                    </div>

                    <div className='botones_numeros'>
                        <div className='botones_numeros_item'>
                            {numeros.map(num => (
                                <button key={num} onClick={escribirNumero}>{num}</button>
                            ))}
                            <button onClick={borrarNumero}>Borrar</button>
                        </div>
                        <button onClick={enviarRespuesta} className='boton_enviar_numero' disabled={filaVictoria !== null}>Enviar</button> {/* Deshabilitar si se ganó */}
                    </div>
                    
                    <div className={alertaDerrota ? 'alerta_derrota_activada' : 'alerta_derrota_desactivada'}>Perdiste</div>
                    
                    <div className={filaVictoria !== null ? 'alerta_victoria_activada' : 'alerta_victoria_desactivada'}>Ganaste</div>
                </section>
            </MagicMotion>
        </>
    );
};

export default Juego;
