import React, { useContext } from 'react';
import Contexto from '../contexto/Contexto';
import { motion } from 'react-magic-motion';

const Cajas = ({ numeroUsuario, isAdivinado, feedback, isVictoria }) => {
    const { isClaro } = useContext(Contexto);

    const estilo = (!isClaro) ? {
        backgroundColor: isAdivinado ? '#efefef' : '#232323',
        color: isAdivinado ? '#232323' : '#efefef',
        border: isAdivinado ? '3px solid #efefef' : '3px solid #2e2e2e'
    } : {
        backgroundColor: isAdivinado ? '#232323' : '#d3d3d3',
        color: isAdivinado ? '#efefef' : '#232323',
        border: isAdivinado ? '3px solid #2e2e2e' : '3px solid #dfdfdf'
    }

    return (
        <>
            <div className='caja_fila'>
                <div className={isVictoria ? 'cajas_ganadora' :  'cajas'}>
                    {new Array(4).fill(0).map((_, index) => (
                        <motion.div
                            initial={{scale:0}}
                            animate={{scale:1}}
                            transition={{delay: index * 0.02}}
                            key={index}
                            className= 'caja_item'
                            style={isVictoria ? {
                            backgroundColor: 'green',
                            color: '#efefef',
                            border: '3px solid green'
                            }
                            : estilo }
                        >
                            {numeroUsuario[index]}
                        </motion.div>
                    ))}
                </div>

                <div className='feedback'>
                    <div style={{ backgroundColor: 'green', fontWeight: 'bold' }}>{feedback.bien}</div>
                    <div style={{ backgroundColor: 'orange', fontWeight: 'bold' }}>{feedback.regular}</div>
                    <div style={{ backgroundColor: 'red', fontWeight: 'bold' }}>{feedback.mal}</div>
                </div>
            </div>
        </>
    );
};

export default Cajas;
