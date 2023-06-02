import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Error404 from './pages/Error404';
import ConversorRomano from './pages/Conversor';
import JogoDaVida from './pages/JogoDaVida/JogoDaVida';
import Restaurante from './pages/Restaurante/Restaurante';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/conversor" element={<ConversorRomano />} />
            <Route path="/jogo" element={<JogoDaVida />} />
            <Route path="/restaurante" element={<Restaurante />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
