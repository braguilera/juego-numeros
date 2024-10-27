import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from '../contexto/Contexto';
import { MagicMotion } from 'react-magic-motion';
import Cajas from './Cajas';
import { DarkMode } from './DarkMode';

const Juego = () => {
    const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const navegacion = useNavigate();
    const { azar, setAzar, dificultad, setDificultad, isClaro, setIsClaro } = useContext(Contexto);
    const [miNumero, setMiNumero] = useState([]);
    const [filaActual, setFilaActual] = useState(0);
    const [resultados, setResultados] = useState([]);
    const [alertaDerrota, setAlertaDerrota] = useState(false);
    const [alertaVictoria, setAlertaVictoria] = useState(false);
    const [filaVictoria, setFilaVictoria] = useState(null);
    const [numeroVictoria, setNumeroVictoria] = useState();
    const [desactivados, setDesactivados] = useState([]); // Nuevo estado para los números desactivados

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

    const seleccionarDificultad = (dificultadSeleccionada) => {
        localStorage.setItem('dificultad', dificultadSeleccionada);
        setDificultad(dificultadSeleccionada);
    };

    const reiniciarJuego = () => {
        setMiNumero([]);
        setFilaActual(0);
        setResultados([]);
        setAlertaDerrota(false);
        setAlertaVictoria(false);
        setFilaVictoria(null);
        setDesactivados([]); // Reinicia los números desactivados
        generarNumeroAleatorio(); // Regenera el número al reiniciar
    };

    const escribirNumero = (e) => {
        if (filaVictoria !== null || desactivados.includes(Number(e.target.innerHTML))) {
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
                setFilaVictoria(filaActual);
                setTimeout(() => {
                    setAlertaVictoria(true)
                }, 1500);
            }

            setResultados((prevResultados) => [
                ...prevResultados,
                { fila: filaActual, numero: miNumero, feedback: { bien, regular, mal } }
            ]);

            setFilaActual(filaActual + 1);
            setMiNumero([]);

            if (filaActual === 9 && bien !== 4) {
                setAlertaDerrota(true);
                setNumeroVictoria(azar)
            }
        }
    };

    // Maneja el clic derecho para alternar el estado de desactivación de un número
    const toggleDesactivado = (e, num) => {
        e.preventDefault();
        setDesactivados((prev) =>
            prev.includes(num) ? prev.filter((n) => n !== num) : [...prev, num]
        );
    };

    return (
        <>
            <MagicMotion>
                <section className='juego' data-theme={isClaro ? "light" : "dark"}>
                    <aside className='juego_header'>
                        <button onClick={() => navegacion('/')}>Volver</button>
                        <div className='juego_header_titulos'>
                            <h1>¡Adivina el Número!</h1>
                            <small>Jugando en la dificultad con números {(dificultad === 'repeticion') ? 'repetidos' : 'sin repetir'}</small>
                        </div>
                        <DarkMode
                            isSeleccionado={isClaro}
                            cambio={() => setIsClaro(!isClaro)}
                        />
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
                            {numeros.map((num) => (
                                <button
                                    key={num}
                                    onClick={escribirNumero}
                                    onContextMenu={(e) => toggleDesactivado(e, num)}
                                    className={desactivados.includes(num) ? 'numero_desactivado' : ''}
                                    disabled={desactivados.includes(num)}
                                >
                                    {num}
                                </button>
                            ))}
                            <button onClick={borrarNumero}>Borrar</button>
                        </div>
                        <button onClick={enviarRespuesta} className='boton_enviar_numero' disabled={filaVictoria !== null}>Enviar</button>
                    </div>
                </section>
            </MagicMotion>
        </>
    );
};

export default Juego;
