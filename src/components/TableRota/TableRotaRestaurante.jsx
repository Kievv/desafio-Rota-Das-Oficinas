import DataTable from 'react-data-table-component';
import DataProvider from '../../services/DataContext';
import { useContext } from 'react';

const TableRotaRestaurante = (props) => {
  const { clientes, produtos } = useContext(DataProvider);

  const gerarData = (clientes) => {
    let arrObj = [];

    clientes.map((cliente, index) => {
      let obj = {
        id: index,
        nome: cliente.nome,
        total: props.dataValorAPagar[cliente.nome] == undefined ? 'N/A' : props.dataValorAPagar[cliente.nome],
        produtos: cliente.produtos,
      };
      console.log(props.dataValorAPagar[cliente.nome]);
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

export default TableRotaRestaurante;
