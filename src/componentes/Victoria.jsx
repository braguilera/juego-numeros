import React from 'react'
import { useNavigate } from 'react-router-dom'

const Victoria = () => {
    const navegacion=useNavigate();
    
    return (
        <div>
            Victoria
            <button onClick={()=>navegacion("/")} >Volver a jugar</button>
        </div>
    )
}

export default Victoria
