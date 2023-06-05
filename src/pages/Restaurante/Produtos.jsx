import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { useState } from 'react';

const Produtos = ({ handleCadastro }) => {
  const [modal, setModal] = useState(false);
  const [produto, setProduto] = useState('');
  const [valor, setValor] = useState('');

  const handleProduto = (event) => {
    setProduto(event.target.value);
  };

  const handleValor = (event) => {
    setValor(event.target.value);
  };

  const handleAdicionarProduto = () => {
    handleCadastro(produto, valor);
    setProduto('');
    setValor('');
  };
  return (
    <>
      <PureModal
        header="Cadastrar Produto"
        footer={
          <div>
            <button>Cancel</button>
            <button onClick={handleAdicionarProduto}>Cadastrar</button>
          </div>
        }
        isOpen={modal}
        closeButton="close"
        closeButtonPosition="bottom"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <label htmlFor="nomeProduto">
          Produto
          <input type="text" name="produto" id="produto" value={produto} onChange={handleProduto} />
        </label>
        <label htmlFor="valorProduto">
          Valor
          <input type="number" name="valor" id="valor" value={valor} onChange={handleValor} />
        </label>
      </PureModal>
      <button className="button" onClick={() => setModal(true)}>
        Cadastrar Produtos
      </button>
    </>
  );
};

export default Produtos;
