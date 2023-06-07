import { useContext, useState } from 'react';
import AdicionarClientes from './AdicionarClientes';
import './Restaurante.css';
import DataContext from '../../services/DataContext';

import Produtos from './Produtos';
import TableRota from '../../components/TableRota/TableRota';
import BotaoRota from '../../components/BotaoRota/BotaoRota';
import TableRotaRestaurante from '../../components/TableRota/TableRotaRestaurante';

const Restaurante = () => {
  const { clientes, setClientes, produtos, setProdutos } = useContext(DataContext);

  // Estado para armazenar o valor a ser pago por cada cliente
  const [valorAPagar, setValorAPagar] = useState({});
  // Estado para armazenar a lista de clientes que pagarão a taxa de serviço
  const [taxaServico, setTaxaServico] = useState();

  // Função para adicionar um cliente com os produtos selecionados
  const handleAdicionarCliente = (cliente, produtosSelecionados, taxaServico, mesaNumero) => {
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
      setClientes(
        clientes.concat({ nome: cliente, produtos: produtosSelecionados, taxaServico: taxaServico, mesa: mesaNumero })
      );
    }
  };

  // Função para lidar com a alteração do checkbox de um produto
  const handleProdutoCheckboxChange = (event, produtoNome, cliente) => {
    const checked = event;

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

  // Função para calcular a divisão da conta baseando-se nos produtos selecionados por cada cliente na mesma mesa
  const calcularDivisaoConta = (clientes, produtos) => {
    const resultado = {};

    // Inicializa o objeto resultado com cada cliente e valor 0
    for (const cliente of clientes) {
      resultado[cliente.nome] = 0;
    }
    // divide os clientes por mesa em arrays menores
    const mesas = clientes.reduce((acc, cliente) => {
      if (!acc[cliente.mesa]) {
        acc[cliente.mesa] = [];
      }
      acc[cliente.mesa].push(cliente);
      return acc;
    }, {});

    // percorre os arrays de clientes por mesa e verifica se os clientes selecionaram o mesmo produto
    Object.values(mesas).forEach((mesa, index) => {
      mesa.forEach((cliente) => {
        // se os clientes selecionaram o mesmo produto, o valor do produto é dividido entre os clientes
        cliente.produtos.forEach((produto) => {
          const item = produtos.find((item) => item.nome === produto);

          //se os clientes forem da mesma mesa, devem dividir o valor do produto.
          if (cliente.mesa === mesa[index].mesa) {
            //filtrar os clientes que estão na mesma mesa
            const clientesMesa = mesa.filter((cliente) => cliente.mesa === mesa[index].mesa);

            // filtrar os clientes que selecionaram o mesmo produto
            const clientesMesaProduto = clientesMesa.filter((cliente) => {
              return cliente.produtos.find((produto) => produto === item.nome);
            });

            // se mais de um cliente selecionou o mesmo produto, o valor do produto é dividido entre os clientes
            if (clientesMesaProduto.length > 1) {
              resultado[cliente.nome] += item.valor / clientesMesaProduto.length;
            } else {
              resultado[cliente.nome] += item.valor;
            }
          }
        });
      });
    });

    //retorna o resultado da divisão da conta já aplicada a função de calcular taxa
    return calcularTaxaServico(resultado);
  };

  // funcão para calcular a taxa de serviço
  const calcularTaxaServico = (result) => {
    for (const cliente of clientes) {
      if (cliente.taxaServico) {
        result[cliente.nome] += result[cliente.nome] * 0.1;
      }
    }
    return result;
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
      setProdutos(produtos.concat({ nome: novoProduto, valor: +valorNovoProduto, consumidores: [] }));
    }
    console.log(produtos);
  };

  return (
    <>
      <div className="conteudo">
        <div className="tabelaClientes">
          {clientes.length > 0 ? <TableRota valorAPagar={valorAPagar} /> : <p>Nenhum cliente adicionado</p>}
        </div>
        <div className="tabelaValor">
          {clientes.length > 0 ? (
            <TableRotaRestaurante dataValorAPagar={valorAPagar} />
          ) : (
            <p>Total ainda não calculado</p>
          )}
        </div>
        <div className="containerBotoes">
          <div className="botaoCadastro">
            <Produtos handleCadastro={handleCadastroProduto} />
          </div>
          <AdicionarClientes
            onAdicionarCliente={handleAdicionarCliente}
            handleProdutoCheckboxChange={handleProdutoCheckboxChange}
            dataValor={valorAPagar}
          />
          <div className="valorAPagar">
            <div className="botaoPagar">
              <BotaoRota onClick={calcularValorAPagar} color={'gradient'} texto={'Calcular Valor Total'} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Restaurante;
