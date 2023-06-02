import { useState } from 'react';

const Produtos = ({ clientes, adicionarConsumo }) => {
  const [produtos, setProdutos] = useState([
    { nome: 'Pizza', valor: 42.0, consumidores: [] },
    { nome: 'Refrigerante', valor: 6.0, consumidores: [] },
    { nome: 'Suco', valor: 7.0, consumidores: [] },
    { nome: 'Rodízio Simples', valor: 70.0, consumidores: [] },
    { nome: 'Rodízio Executivo', valor: 85.0, consumidores: [] },
    { nome: 'Temaki', valor: 20.0, consumidores: [] },
    { nome: 'Porção de Peixe', valor: 50.0, consumidores: [] },
  ]);

  const handleProdutoCheckboxChange = (event, produtoNome) => {
    const cliente = event.target.value;
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

  return (
    <>
      <form action="">
        <label>Produtos</label>
        {produtos.map((produto) => (
          <div key={produto.nome}>
            <label>
              <input
                type="checkbox"
                name="produto"
                value={produto.nome}
                onChange={(event) => handleProdutoCheckboxChange(event, produto.nome)}
              />
              {produto.nome} (R$: {produto.valor})
            </label>
          </div>
        ))}
      </form>
      <button onClick={() => adicionarConsumo(produtos)}>Adicionar Consumo</button>
    </>
  );
};

export default Produtos;
