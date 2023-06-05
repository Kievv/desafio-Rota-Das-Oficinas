import { useState } from 'react';

const AdicionarClientes = ({ onAdicionarCliente, produtos, handleProdutoCheckboxChange }) => {
  // Estado para armazenar o nome do cliente e os produtos selecionados pelo cliente
  const [cliente, setCliente] = useState('');
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [taxaServico, setTaxaServico] = useState(false);

  // Função para adicionar o cliente com os produtos selecionados
  const handleAdicionarCliente = () => {
    // Verifica se o nome do cliente não está vazio
    if (cliente.trim() !== '') {
      // Chama a função `onAdicionarCliente` passando o nome do cliente e os produtos selecionados
      onAdicionarCliente(cliente, produtosSelecionados, taxaServico);
      // Limpa os campos
      setCliente('');
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
    const checked = event.target.checked;

    if (checked) {
      setProdutosSelecionados([...produtosSelecionados, produtoNome]);
      handleProdutoCheckboxChange(event, produtoNome, cliente);
    } else {
      setProdutosSelecionados(produtosSelecionados.filter((produto) => produto !== produtoNome));
      handleProdutoCheckboxChange(event, produtoNome, cliente);
    }
  };

  const handleTaxa = (event) => {
    if (event.target.value === 'true') {
      setTaxaServico(true);
    } else {
      setTaxaServico(false);
    }
  };

  return (
    <div className="formularioCliente">
      <h2>Adicionar Clientes</h2>
      <div className="areaCliente">
        <label htmlFor="nomeCliente" className="inputCliente">
          Nome do Cliente:
          <input id="nomeCliente" type="text" value={cliente} onChange={handleClienteChange} />
        </label>
        <div className="areaTaxaDeServico">
          <label>
            Taxa de Serviço
            <input className="radioBtn" type="radio" name="taxa" id="taxa" value={true} onChange={handleTaxa} /> SIM
            <input className="radioBtn" type="radio" name="taxa" id="taxa" value={false} onChange={handleTaxa} /> NÃO
          </label>
        </div>
      </div>

      <div>
        <label>Produtos:</label>
        {produtos.map((produto) => (
          <div key={produto.nome}>
            <label>
              <input
                type="checkbox"
                value={produto.nome}
                checked={produtosSelecionados.includes(produto.nome)}
                onChange={(event) => handleProdutoCheckboxChangeInternal(event, produto.nome)}
              />
              {produto.nome} (R$: {produto.valor})
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleAdicionarCliente}>Adicionar Cliente</button>
    </div>
  );
};

export default AdicionarClientes;
