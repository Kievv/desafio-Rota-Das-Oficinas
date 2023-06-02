import { useState } from 'react';

const AdicionarClientes = ({ onAdicionarCliente }) => {
  const [cliente, setCliente] = useState('');

  const handleAdicionarCliente = () => {
    if (cliente.trim() !== '') {
      onAdicionarCliente(cliente);
      setCliente('');
    }
  };

  const handleClienteChange = (event) => {
    setCliente(event.target.value);
  };

  return (
    <div>
      <h2>Adicionar Clientes</h2>
      <div>
        <label htmlFor="nomeCliente">Nome do Cliente:</label>
        <input id="nomeCliente" type="text" value={cliente} onChange={handleClienteChange} />
      </div>

      <button onClick={handleAdicionarCliente}>Adicionar Cliente</button>
    </div>
  );
};

export default AdicionarClientes;
