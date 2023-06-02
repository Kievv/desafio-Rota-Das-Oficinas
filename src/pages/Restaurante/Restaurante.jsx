import { useState } from 'react';
import AdicionarClientes from './AdicionarClientes';

const Restaurante = () => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([
    { nome: 'Pizza', valor: 42.0, consumidores: [] },
    { nome: 'Refrigerante', valor: 6.0, consumidores: [] },
    { nome: 'Suco', valor: 7.0, consumidores: [] },
    { nome: 'Rodízio Simples', valor: 70.0, consumidores: [] },
    { nome: 'Rodízio Executivo', valor: 85.0, consumidores: [] },
    { nome: 'Temaki', valor: 20.0, consumidores: [] },
  ]);
  const [valorAPagar, setValorAPagar] = useState({});
  const [taxaServico, setTaxaServico] = useState([]);

  const handleAdicionarCliente = (cliente, produtosSelecionados) => {
    setClientes([...clientes, { nome: cliente, produtos: produtosSelecionados }]);
  };

  const handleProdutoCheckboxChange = (event, produtoNome, cliente) => {
    const checked = event.target.checked;

    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) => {
        if (produto.nome === produtoNome) {
          if (checked) {
            return { ...produto, consumidores: [...produto.consumidores, cliente] };
          } else {
            return {
              ...produto,
              consumidores: produto.consumidores.filter((consumidor) => consumidor !== cliente),
            };
          }
        }
        return produto;
      })
    );
  };

  const calcularDivisaoConta = (clientes, produtos, taxaServico) => {
    const resultado = {};

    for (const cliente of clientes) {
      resultado[cliente] = 0;
    }

    for (const cliente of clientes) {
      for (const produto of produtos) {
        if (produto.consumidores.includes(cliente)) {
          if (
            produto.nome === 'Rodízio Simples' ||
            produto.nome === 'Rodízio Executivo' ||
            (produto.nome === 'Refrigerante' && produto.consumidores.length === clientes.length)
          ) {
            resultado[cliente] += produto.valor;
          } else if (produto.consumidores.filter((nome) => nome === cliente).length > 1) {
            let quantidade = produto.consumidores.filter((nome) => nome === cliente).length;
            resultado[cliente] += produto.valor * quantidade;
          } else {
            const quantidade = produto.consumidores.filter((nome) => nome === cliente).length;
            resultado[cliente] += (produto.valor * quantidade) / produto.consumidores.length;
          }
        }
      }
    }

    for (const cliente of clientes) {
      const totalGasto = resultado[cliente];
      if (totalGasto > 0 && taxaServico.includes(cliente)) {
        resultado[cliente] += totalGasto * 0.1;
      }
    }

    return resultado;
  };

  const calcularValorAPagar = () => {
    const resultado = calcularDivisaoConta(
      clientes.map((cliente) => cliente.nome),
      produtos,
      taxaServico
    );
    setValorAPagar(resultado);
  };

  return (
    <>
      <AdicionarClientes
        onAdicionarCliente={handleAdicionarCliente}
        produtos={produtos}
        handleProdutoCheckboxChange={handleProdutoCheckboxChange}
      />
      <h2>Clientes:</h2>
      <ul>
        {clientes.map((cliente, index) => (
          <li key={index}>
            {cliente.nome}
            <ul>
              {cliente.produtos.map((produtoNome) => {
                const produto = produtos.find((p) => p.nome === produtoNome);
                return (
                  <li key={produtoNome}>
                    {produtoNome}, R$ {produto.valor}
                  </li>
                );
              })}
            </ul>
            <p>
              Total: R${' '}
              {cliente.produtos.reduce((acc, produtoNome) => {
                const produto = produtos.find((p) => p.nome === produtoNome);
                return acc + produto.valor;
              }, 0)}
            </p>
          </li>
        ))}
      </ul>
      <button onClick={calcularValorAPagar}>Calcular Valor a Pagar</button>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.nome}>
            {cliente.nome} - Valor a Pagar: R$ {valorAPagar[cliente.nome] || 0}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Restaurante;
