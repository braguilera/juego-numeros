import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { DarkMode } from './DarkMode';
import Contexto from '../contexto/Contexto';

const ComoJugar = () => {
    const navegacion = useNavigate();

    const { isClaro, setIsClaro } = useContext(Contexto);

    return (
    <>
    <section className='comoJugar' data-theme={isClaro ? "light" : "dark"}>

        <header className='comoJugar_header'>
            <button onClick={()=>navegacion('/')}>Volver</button>
            <h1>Instrucciones para Jugar</h1>
            <DarkMode
                    isSeleccionado={isClaro}
                    cambio={()=>setIsClaro(!isClaro)}
                />
        </header>

        <main>
            <div>
                <h2>Objetivo del Juego</h2>
                <p>El objetivo del juego es adivinar un número secreto de 4 dígitos en un máximo de 10 intentos. Dependiendo de la dificultad seleccionada, el número secreto puede o no tener dígitos repetidos.</p>
            </div>
            <div>
                <h2>Cómo Hacer una Suposición</h2>
                <p>Para cada intento:</p>
                <ul>
                    <li>Selecciona los dígitos: En la parte inferior de la pantalla, verás botones numerados del 0 al 9. Haz clic en estos botones para armar tu número. Los dígitos seleccionados aparecerán en la fila activa de la cuadrícula.</li>
                    <li>Borrar un dígito: Si deseas corregir el último dígito ingresado, haz clic en el botón "Borrar".</li>
                    <li>Enviar tu intento: Cuando tengas un número de 4 dígitos completo, presiona "Enviar" para recibir retroalimentación sobre tu intento.</li>
                </ul>
            </div>
            <div>
                <h2>Interpretación de Resultados</h2>
                <p>Luego de enviar tu intento, el juego te brindará retroalimentación en tres colores en la fila correspondiente:</p>
                <ul>
                    <li>Verde (Bien): Muestra cuántos dígitos están en la posición correcta.</li>
                    <li>Amarillo (Regular): Indica la cantidad de dígitos que son correctos pero están en una posición incorrecta.</li>
                    <li>Rojo (Mal): Señala los dígitos incorrectos que no forman parte del número secreto.</li>
                </ul>
            </div>
            <div>
                <h2>Estrategia de Juego</h2>
                <p>Para mejorar tus probabilidades:</p>
                <ul>
                    <li>Utiliza los colores para deducir los dígitos correctos y sus posiciones.</li>
                    <li>Si un dígito aparece en verde, intenta mantenerlo en la misma posición en los próximos intentos.</li>
                    <li>Desactivar dígitos no relevantes: Si estás seguro de que un número no forma parte del número secreto, puedes hacer clic derecho sobre ese número en el teclado numérico para desactivarlo. Te ayudará a evitar utilizarlo en intentos futuros. Si decides volver a considerarlo, simplemente haz clic derecho otra vez para reactivarlo.</li>
                </ul>
            </div>


        </main>
    </section>
    </>
    )
}

export default ComoJugar
