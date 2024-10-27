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
    const [desactivados, setDesactivados] = useState([]);

    useEffect(() => {
        generarNumeroAleatorio();
    }, [dificultad]);

    const generarNumeroAleatorio = () => {
        let nuevosNumeros;
    
        if (dificultad === 'repeticion') {
            // Generar los primeros tres dígitos de manera aleatoria
            nuevosNumeros = [
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10),
                Math.floor(Math.random() * 10)
            ];
            
            // Escoger uno de los tres dígitos generados y repetirlo en la cuarta posición
            const indiceAleatorio = Math.floor(Math.random() * 3);
            nuevosNumeros.push(nuevosNumeros[indiceAleatorio]);
            
            // Mezclar el array para que el dígito repetido no siempre quede en la última posición
            nuevosNumeros = nuevosNumeros.sort(() => Math.random() - 0.5);
    
        } else {
            // Generación sin repetición
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
        generarNumeroAleatorio();
        setDesactivados([]) // Regenera el número al reiniciar
    };

    const escribirNumero = (e) => {
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
        if (filaVictoria !== null) {
            return;
        }

        if (miNumero.length === 4) {
            let bien = 0;
            let regular = 0;
            let mal = 0;
            const contarNumeros = {};
        
            // Contar las ocurrencias de cada número en el número secreto (azar)
            azar.forEach((num) => {
                contarNumeros[num] = (contarNumeros[num] || 0) + 1;
            });
        
            // Paso 1: Contar los aciertos exactos (bien)
            miNumero.forEach((num, idx) => {
                const parsedNum = parseInt(num);
        
                if (parsedNum === azar[idx]) {
                    bien++;
                    contarNumeros[parsedNum]--; // Reducir la cuenta ya que este número está en la posición correcta
                }
            });
        
            // Paso 2: Contar los números en posición incorrecta (regular) y los incorrectos (mal)
            miNumero.forEach((num, idx) => {
                const parsedNum = parseInt(num);
        
                // Solo procesar si no es un acierto exacto
                if (parsedNum !== azar[idx]) {
                    if (azar.includes(parsedNum) && contarNumeros[parsedNum] > 0) {
                        regular++;
                        contarNumeros[parsedNum]--; // Reducir la cuenta ya que este número se ha usado como regular
                    } else {
                        mal++;
                    }
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
                {azar}
                    <aside className='juego_header'>
                        <button onClick={() => navegacion('/')}>Volver</button>
                        <div className='juego_header_titulos'>
                            <h1>¡Adivina el Número!</h1>
                            <small>Jugando en la dificultad con números {(dificultad === 'repeticion') ? 'repetidos' : 'sin repetir'}</small>
                        </div>
                        <DarkMode
                            isSeleccionado={isClaro}
                            cambio={()=>setIsClaro(!isClaro)}
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
                            {numeros.map(num => (
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

                    <div className={alertaDerrota ? 'alerta_derrota_activada' : 'alerta_derrota_desactivada'}>
                            <h1>¡Derrota!</h1>
                            <h2>Casi lo logras, el número secreto era: {numeroVictoria}</h2>
                    
                            <div className='inicio_dificultad'>
                            <button 
                                className={dificultad === 'repeticion' ? 'boton_jugar_activado' : 'boton_jugar'} 
                                onClick={() => seleccionarDificultad('repeticion')}>Con números repetidos</button>

                            <button 
                                className={dificultad === 'sinRepeticion' ? 'boton_jugar_activado' : 'boton_jugar'}  
                                onClick={() => seleccionarDificultad('sinRepeticion')}>Sin números repetidos</button>
                            </div>

                            <button className='boton_iniciar_partida' onClick={reiniciarJuego}>Volver a Jugar</button>
                    </div>

                    <div className={alertaVictoria ? 'alerta_victoria_activada' : 'alerta_victoria_desactivada'}>
                        <h1>¡Victoria!</h1>
                        <h2>
                            {filaVictoria === 0 
                                ? '¡Increíble! Adivinaste el número en el primer intento' 
                                : `Adivinaste el número en ${filaVictoria + 1} intentos`}
                        </h2>
                        <div className='inicio_dificultad'>
                            <button 
                                className={dificultad === 'repeticion' ? 'boton_jugar_activado' : 'boton_jugar'} 
                                onClick={() => seleccionarDificultad('repeticion')}>Con números repetidos</button>

                            <button 
                                className={dificultad === 'sinRepeticion' ? 'boton_jugar_activado' : 'boton_jugar'}  
                                onClick={() => seleccionarDificultad('sinRepeticion')}>Sin números repetidos</button>
                        </div>

                        <button className='boton_iniciar_partida' onClick={reiniciarJuego}>Volver a Jugar</button>
                    </div>
                </section>
            </MagicMotion>
        </>
    );
};

export default Juego;
