import React, { useContext } from 'react';
import Contexto from '../contexto/Contexto';
import { MagicMotion } from 'react-magic-motion';

const Cajas = ({ numeroUsuario, isAdivinado, feedback, isVictoria }) => {
    const { azar } = useContext(Contexto);

    const estilo = {
        backgroundColor: isAdivinado ? '#efefef' : '#232323',
        color: isAdivinado ? '#232323' : '#efefef',
        border: isAdivinado ? '3px solid #efefef' : '3px solid #2e2e2e'
    }

    return (
        <>
        <MagicMotion>
            <div className='caja_fila'>
                <div className='cajas'>
                    {new Array(4).fill(0).map((_, index) => (
                        <div
                            key={index}
                            className='caja_item'
                            style={isVictoria ? {
                            backgroundColor: 'green',
                            color: '#efefef',
                            border: '3px solid green'
                            }
                            : estilo }
                        >
                            {numeroUsuario[index]}
                        </div>
                    ))}
                </div>

                <div className='feedback'>
                    <div style={{ backgroundColor: 'green', fontWeight: 'bold' }}>{feedback.bien}</div>
                    <div style={{ backgroundColor: 'orange', fontWeight: 'bold' }}>{feedback.regular}</div>
                    <div style={{ backgroundColor: 'red', fontWeight: 'bold' }}>{feedback.mal}</div>
                </div>
            </div>
        </MagicMotion>
        </>
    );
};

export default Cajas;
