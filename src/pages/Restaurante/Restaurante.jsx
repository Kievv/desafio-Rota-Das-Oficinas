import { useState } from 'react';
import AdicionarClientes from './AdicionarClientes';
import './Restaurante.css';

import Produtos from './Produtos';
// import Produtos from './Produtos';

const Restaurante = () => {
  // Estado para armazenar a lista de clientes
  const [clientes, setClientes] = useState([]);
  // Estado para armazenar a lista de produtos
  const [produtos, setProdutos] = useState([
    // Produtos com nome, valor e array de consumidores
    { nome: 'Pizza', valor: 42.0, consumidores: [] },
    { nome: 'Refrigerante', valor: 6.0, consumidores: [] },
    { nome: 'Suco', valor: 7.0, consumidores: [] },
    { nome: 'Rodízio Simples', valor: 70.0, consumidores: [] },
    { nome: 'Rodízio Executivo', valor: 85.0, consumidores: [] },
    { nome: 'Temaki', valor: 20.0, consumidores: [] },
    { nome: 'Porção de Peixe', valor: 50.0, consumidores: [] },
  ]);
  // Estado para armazenar o valor a ser pago por cada cliente
  const [valorAPagar, setValorAPagar] = useState({});
  // Estado para armazenar a lista de clientes que pagarão a taxa de serviço
  const [taxaServico, setTaxaServico] = useState();

  // Função para adicionar um cliente com os produtos selecionados
  const handleAdicionarCliente = (cliente, produtosSelecionados, taxaServico) => {
    // Verifica se o cliente já existe na lista de clientes
    const clienteExistente = clientes.find((c) => c.nome === cliente);

    if (clienteExistente) {
      // Caso o cliente já exista, atualiza os produtos do cliente existente
      const produtosAtualizados = [...clienteExistente.produtos, ...produtosSelecionados];
      const clientesAtualizados = clientes.map((c) =>
        c.nome === cliente ? { ...c, produtos: produtosAtualizados, taxaServico: taxaServico } : c
      );

      setClientes(clientesAtualizados);
    } else {
      // Caso o cliente não exista, adiciona o cliente com os produtos selecionados
      setClientes(clientes.concat({ nome: cliente, produtos: produtosSelecionados, taxaServico: taxaServico }));
    }
  };

  // Função para lidar com a alteração do checkbox de um produto
  const handleProdutoCheckboxChange = (event, produtoNome, cliente) => {
    const checked = event.target.checked;

    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) => {
        if (produto.nome === produtoNome) {
          if (checked) {
            // Adiciona o cliente ao array de consumidores do produto
            return { ...produto, consumidores: [...produto.consumidores, cliente] };
          } else {
            // Remove o cliente do array de consumidores do produto
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

  // Função para calcular a divisão da conta entre os clientes
  const calcularDivisaoConta = (clientes, produtos) => {
    const resultado = {};

    // Inicializa o objeto resultado com cada cliente e valor 0
    for (const cliente of clientes) {
      resultado[cliente.nome] = 0;
    }

    // Itera sobre cada cliente e produto para calcular o valor a ser pago por cada cliente
    for (const cliente of clientes) {
      for (const produto of produtos) {
        if (produto.consumidores.includes(cliente.nome)) {
          if (
            produto.nome === 'Rodízio Simples' ||
            produto.nome === 'Rodízio Executivo' ||
            (produto.nome === 'Refrigerante' && produto.consumidores.length === clientes.length)
          ) {
            // Caso especial: se o produto for Rodízio Simples, Rodízio Executivo ou todos os clientes consumirem o Refrigerante
            // o valor do produto é somado diretamente ao resultado do cliente
            resultado[cliente.nome] += produto.valor;
          } else if (produto.consumidores.filter((nome) => nome === cliente.nome).length > 1) {
            // Se o cliente consumir mais de um produto igual, o valor é multiplicado pela quantidade de produtos
            let quantidade = produto.consumidores.filter((nome) => nome === cliente.nome).length;
            resultado[cliente.nome] += produto.valor * quantidade;
          } else {
            // Se o cliente consumir um único produto, o valor é dividido pelo número de consumidores do produto
            const quantidade = produto.consumidores.filter((nome) => nome === cliente.nome).length;
            resultado[cliente.nome] += (produto.valor * quantidade) / produto.consumidores.length;
          }
        }
      }
    }

    // Aplica a taxa de serviço aos clientes que a pagam
    for (const cliente of clientes) {
      const totalGasto = resultado[cliente.nome];
      if (totalGasto > 0 && cliente.taxaServico === true) {
        resultado[cliente.nome] += totalGasto * 0.1;
      }
    }

    return resultado;
  };

  // Função para calcular o valor a ser pago por cada cliente
  const calcularValorAPagar = () => {
    const resultado = calcularDivisaoConta(
      clientes.filter((cliente) => cliente.nome),
      produtos
    );
    setValorAPagar(resultado);
  };

  const handleCadastroProduto = (novoProduto, valorNovoProduto) => {
    console.log(novoProduto);
    console.log(valorNovoProduto);
    if (novoProduto.trim() !== '' && valorNovoProduto !== 0) {
      // setProdutos([...produtos, { nome: novoProduto, valor: valorNovoProduto, consumidores: [] }]);
      setProdutos(produtos.concat({ nome: novoProduto, valor: +valorNovoProduto, consumidores: [] }));
    }
    console.log(produtos);
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
        {/* Renderiza a lista de clientes */}
        {clientes.map((cliente, index) => (
          <li key={index}>
            {cliente.nome} {console.log(cliente.taxaServico)}-
            <p>Taxa de Serviço? {cliente.taxaServico === true ? 'Sim' : 'Não'}</p>
            <ul>
              {/* Renderiza os produtos consumidos por cada cliente */}
              {cliente.produtos.map((produtoNome, index) => {
                const produto = produtos.find((p) => p.nome === produtoNome);
                return (
                  <li key={index}>
                    {produtoNome}, R$ {produto.valor}
                  </li>
                );
              })}
            </ul>
            <p>
              Total: R$ {/* Calcula o total gasto pelo cliente somando o valor de cada produto */}
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
        {/* Renderiza o valor a ser pago por cada cliente */}
        {clientes.map((cliente) => (
          <li key={cliente.nome}>
            {cliente.nome} - Valor a Pagar: R$ {valorAPagar[cliente.nome] || 0}
          </li>
        ))}
      </ul>

      <Produtos handleCadastro={handleCadastroProduto} />
    </>
  );
};

export default Restaurante;
