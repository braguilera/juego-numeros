import sun from '../iconos/sun.svg'
import dark from '../iconos/dark.svg'


export const DarkMode = ({cambio, isSeleccionado}) => {
    return (
        <div className="cambio_container">
            <label htmlFor="check"> <img src={dark} className='moon'/></label>
            <input
                type="checkbox"
                id="check"
                className="toggle"
                onChange={cambio}
                checked={isSeleccionado}
            />
            <label htmlFor="check"><img src={sun}/></label>
        </div>

    )
}

