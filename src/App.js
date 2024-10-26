import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Juego from './componentes/Juego';
import Victoria from './componentes/Victoria';
import Derrota from './componentes/Derrota';
import Provider from './contexto/Provider';
import ComoJugar from './componentes/ComoJugar';
import Error from './componentes/Error';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/comoJugar' element={<ComoJugar/>}/>
        <Route path='/juego' element={<Juego/>}/>
        <Route path='/victoria' element={<Victoria/>}/>
        <Route path='/derrota' element={<Derrota/>}/>
        <Route path='/*' element={<Error/>}/>
      </Routes>
    </Provider>
  );
}

export default App;
