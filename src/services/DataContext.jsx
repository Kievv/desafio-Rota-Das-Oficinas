import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [mesa, setMesa] = useState('');
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([
    { nome: 'Pizza', valor: 42.0, consumidores: [] },
    { nome: 'Refrigerante', valor: 6.0, consumidores: [] },
    { nome: 'Suco', valor: 7.0, consumidores: [] },
    { nome: 'Rodízio Simples', valor: 70.0, consumidores: [] },
    { nome: 'Rodízio Executivo', valor: 85.0, consumidores: [] },
    { nome: 'Temaki', valor: 20.0, consumidores: [] },
    { nome: 'Porção de Peixe', valor: 50.0, consumidores: [] },
  ]);

  return (
    <DataContext.Provider value={{ mesa, setMesa, clientes, setClientes, produtos, setProdutos }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
