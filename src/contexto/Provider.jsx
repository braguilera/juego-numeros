import Contexto from "./Contexto"


const Provider = ({children}) => {
    return (
        <Contexto.Provider value={{}}>
            {children}
        </Contexto.Provider>
    )
}

export default Provider
