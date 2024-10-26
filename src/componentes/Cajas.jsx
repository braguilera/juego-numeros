import React, { useContext, useEffect, useState } from 'react';
import Contexto from '../contexto/Contexto';

const Cajas = () => {
    const [respuesta, setRespuesta] = useState([]);
    const { azar } = useContext(Contexto);

    useEffect(() => {
        if (azar) {
            setRespuesta(azar.toString().split(''));
        }
    }, [azar]);

    return (
        <div className='caja_contenedor'>
            {respuesta.map((num, index) => (
                num !== ',' && (
                    <div key={index} className='caja'>{num}</div>
                )
            ))}
        </div>
    );
}

export default Cajas;
