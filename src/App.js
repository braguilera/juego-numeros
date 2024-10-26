import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Inicio from './componentes/Inicio';
import Juego from './componentes/Juego';
import Victoria from './componentes/Victoria';
import Derrota from './componentes/Derrota';
import Provider from './contexto/Provider';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='juego/' element={<Juego/>}/>
        <Route path='victoria/' element={<Victoria/>}/>
        <Route path='derrota/' element={<Derrota/>}/>
      </Routes>
    </Provider>
  );
}

export default App;
