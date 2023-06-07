import './Home.css';
import { Link } from 'react-router-dom';
import BotaoErro from '../../components/BotaoRota/BotaoErro';

const Home = () => {
  return (
    <>
      <div className="textoContainer">
        <h1 className="textoHomeH1">Desafio lógico Rota Das Oficinas</h1>
        <h3 className="textoHomeH2">O desafio foi separado em 3 etapas</h3>
        <ul className="ulHome">
          <div className="grupo">
            <li className="liHome">Conversor de números romanos e arábicos</li>
            <Link to="/conversor">
              <BotaoErro texto="Conversor" color={'warning'} />
            </Link>
          </div>
          <div className="grupo">
            <li className="liHome">Criar e implementar o Jogo de Conway </li>
            <Link to="/jogo">
              <BotaoErro texto="Jogo de Conway" color={'warning'} />
            </Link>
          </div>
          <div className="grupo">
            <li className="liHome">Implementar um divisor de contas para restaurante</li>
            <Link to="/restaurante">
              <BotaoErro texto="Calculadora Restaurante" color={'warning'} />
            </Link>
          </div>
        </ul>
        <p className="pHome">Caso prefira, também pode navegar pelo Menu</p>
      </div>
    </>
  );
};

export default Home;
