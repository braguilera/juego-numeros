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
        <div className='cajas'>
            {respuesta.map((num, index) => (
                num !== ',' && (
                    <div key={index} className='caja_item'>{num}</div>
                )
            ))}
        </div>
    );
}

export default Cajas;
