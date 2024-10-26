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
    const [filaActual, setFilaActual] = useState(0);
    const [resultados, setResultados] = useState([]);
    const [alerta, setAlerta] = useState(false)

    useEffect(() => {
        const nuevosNumeros = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9));
        setAzar(nuevosNumeros);
    }, []);

    const escribirNumero = (e) => {
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
        if (miNumero.length === 4) {
            let bien = 0;
            let regular = 0;
            let mal = 0;
            const contarNumeros = {};
    
            // Contar ocurrencias en `azar`
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
    
            (bien === 4) && (navegacion("/victoria"));
    
            // Aquí guardamos miNumero junto con el feedback
            setResultados((prevResultados) => [
                ...prevResultados,
                { fila: filaActual, numero: miNumero, feedback: { bien, regular, mal } }
            ]);
            
            setFilaActual(filaActual + 1);
            setMiNumero([]);
            
            // Verificar si se ha perdido
            if (filaActual === 2) {
                setAlerta(true);
                setTimeout(() => {
                    setAlerta(false);
                    navegacion("/derrota");
                }, 2000);
            }
        }
    };
    

    return (
        <>
            <MagicMotion>
                {azar}
                <div className='cajas_contenedor'>
                    {[...Array(3)].map((_, index) => (
                        <Cajas
                            key={index}
                            numeroUsuario={index === filaActual ? miNumero : resultados[index]?.numero || []} // Mostrar miNumero si es la fila actual
                            isAdivinado={index < filaActual}
                            feedback={resultados.find(r => r.fila === index)?.feedback || { bien: 0, regular: 0, mal: 0 }}
                        />
                    ))}
                </div>
                <div className='botones_numeros'>
                    {numeros.map(num => (
                        <button key={num} onClick={escribirNumero}>{num}</button>
                    ))}
                    <button onClick={borrarNumero}>Borrar</button>
                </div>
                <button onClick={enviarRespuesta}>Enviar</button>
                <div className={alerta ? 'alerta_derrota_activada' : 'alerta_derrota_desactivada'}> Perdiste </div>
            </MagicMotion>
        </>
    );
    
};

export default Juego;
