import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import { useState } from 'react';
import ModalRota from '../../components/ModalRota/ModalRota';

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

  const handleModal = () => {
    setModal(true);
  };
  return (
    <>
      <ModalRota
        onClick={handleAdicionarProduto}
        onChangeProduto={handleProduto}
        onChangeValor={handleValor}
        dataProduto={produto}
        dataValor={valor}
      />
    </>
  );
};

export default Produtos;
