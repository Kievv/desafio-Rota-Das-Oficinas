import { useState } from 'react';

const AdicionarClientes = ({ onAdicionarCliente, produtos, handleProdutoCheckboxChange }) => {
  const [cliente, setCliente] = useState('');
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  const handleAdicionarCliente = () => {
    if (cliente.trim() !== '') {
      onAdicionarCliente(cliente, produtosSelecionados);
      setCliente('');
      setProdutosSelecionados([]);
    }
  };

  const handleClienteChange = (event) => {
    setCliente(event.target.value);
  };

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

  return (
    <div>
      <h2>Adicionar Clientes</h2>
      <div>
        <label htmlFor="nomeCliente">Nome do Cliente:</label>
        <input id="nomeCliente" type="text" value={cliente} onChange={handleClienteChange} />
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
