import { useState } from 'react';
import AdicionarClientes from './AdicionarClientes';
import Produtos from './Produtos';

const Restaurante = () => {
  const [clientes, setClientes] = useState([]);
  const [clientesSelecionados, setClientesSelecionados] = useState([]);

  const handleAdicionarCliente = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  const handleClienteCheckboxChange = (event) => {
    const cliente = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setClientesSelecionados([...clientesSelecionados, cliente]);
    } else {
      setClientesSelecionados(clientesSelecionados.filter((c) => c !== cliente));
    }
  };

  const handleAdicionarConsumo = (produtos) => {
    const valorPagar = {};

    clientesSelecionados.forEach((cliente) => {
      const valorTotal = produtos.reduce((acc, produto) => {
        if (produto.consumidores.includes(cliente)) {
          return acc + produto.valor;
        }
        return acc;
      }, 0);

      valorPagar[cliente] = valorTotal;
    });

    console.log('Valor a pagar por cliente:', valorPagar);
  };

  return (
    <>
      <AdicionarClientes onAdicionarCliente={handleAdicionarCliente} />
      <ul>
        {clientes.map((cliente, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                value={cliente}
                checked={clientesSelecionados.includes(cliente)}
                onChange={handleClienteCheckboxChange}
              />
              {cliente}
            </li>
          );
        })}
      </ul>
      <Produtos clientes={clientes} adicionarConsumo={handleAdicionarConsumo} />
    </>
  );
};

export default Restaurante;
