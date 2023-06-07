import DataTable from 'react-data-table-component';
import DataProvider from '../../services/DataContext';
import { useContext } from 'react';

const TableRota = (props) => {
  const { clientes, produtos, mesa } = useContext(DataProvider);

  const gerarData = (clientes) => {
    let arrObj = [];

    clientes.map((cliente, index) => {
      let total = 0; // Inicializa a variável "total" como 0 para cada cliente
      produtos.forEach((produto) => {
        if (produto.consumidores.includes(cliente.nome)) {
          total += produto.valor; // Calcula o somatório dos produtos selecionados
        }
      });

      let obj = {
        id: index,
        nome: cliente.nome,
        taxa: cliente.taxaServico ? 'Sim' : 'Não',
        produtos: cliente.produtos.length,
        total: total, // Define a propriedade "total" como o somatório dos produtos
      };
      arrObj.push(obj);
    });

    return arrObj;
  };

  const columns = [
    {
      name: 'Cliente',
      selector: (row) => row.nome,
    },
    {
      name: 'Produtos',
      selector: (row) => row.produtos,
    },
    {
      name: 'Taxa de Serviço',
      selector: (row) => row.taxa,
    },
    {
      name: 'Total',
      selector: (row) => row.total,
    },
  ];

  const data = gerarData(clientes);

  if (data == null || data == undefined) {
    return <p>Ainda não foi populada</p>;
  } else {
    return (
      <div className="container mt-5">
        <DataTable columns={columns} data={data}></DataTable>
      </div>
    );
  }
};

export default TableRota;
