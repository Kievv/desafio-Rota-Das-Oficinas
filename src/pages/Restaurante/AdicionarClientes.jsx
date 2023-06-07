import { useState, useContext } from 'react';
import DataContext from '../../services/DataContext';
import ModalRotaCliente from '../../components/ModalRota/ModalRotaCliente';

const AdicionarClientes = ({ onAdicionarCliente, handleProdutoCheckboxChange, valorAPagar }) => {
  const { clientes, setClientes, produtos, mesa, setMesa } = useContext(DataContext);
  // Estado para armazenar o nome do cliente e os produtos selecionados pelo cliente
  const [cliente, setCliente] = useState('');
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [taxaServico, setTaxaServico] = useState(false);

  // Função para adicionar o cliente com os produtos selecionados
  const handleAdicionarCliente = () => {
    // Verifica se o nome do cliente não está vazio
    if (cliente.trim() !== '') {
      // Chama a função `onAdicionarCliente` passando o nome do cliente e os produtos selecionados
      onAdicionarCliente(cliente, produtosSelecionados, taxaServico, mesa);
      // Limpa os campos
      setCliente('');
      setMesa('');
      setProdutosSelecionados([]);
      setTaxaServico(false);
    }
  };

  // Função para atualizar o estado do nome do cliente
  const handleClienteChange = (event) => {
    setCliente(event.target.value);
  };

  // Função para lidar com a alteração da seleção de produtos, ao selecionar adiciona o produto a lista, ao deselecionar, o remove
  const handleProdutoCheckboxChangeInternal = (event, produtoNome) => {
    const checked = event;

    if (checked) {
      setProdutosSelecionados([...produtosSelecionados, produtoNome]);
      handleProdutoCheckboxChange(event, produtoNome, cliente);
    } else {
      setProdutosSelecionados(produtosSelecionados.filter((produto) => produto !== produtoNome));
      handleProdutoCheckboxChange(event, produtoNome, cliente);
    }
  };

  const handleTaxa = (event) => {
    if (event === true) {
      setTaxaServico(true);
    } else {
      setTaxaServico(false);
    }
  };

  return (
    <div className="formularioCliente diagramacao">
      <ModalRotaCliente
        dataCliente={cliente}
        onChangeCliente={handleClienteChange}
        onClick={handleAdicionarCliente}
        onChangeTaxa={handleTaxa}
        onChangeConsumidos={handleProdutoCheckboxChangeInternal}
        dataValor={valorAPagar}
      />
    </div>
  );
};

export default AdicionarClientes;
