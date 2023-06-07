import { Link } from 'react-router-dom';
import BotaoErro from '../../components/BotaoRota/BotaoErro';
import './Error404.css';

const Error404 = () => {
  return (
    <>
      <div className="imageContainer">
        <div className="container-404">
          <h1 className="gradient textoError">Error 404</h1>
          <h2 className="gradient ">Hmm... Parece que você errou o caminho e parou em um lugar que não devia.</h2>

          <h2 className="gradient">Siga a Rota das Oficias para encontrar o caminho certo</h2>
          <Link to="/">
            <BotaoErro texto="Rota das Oficinas" color={'warning'} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error404;
