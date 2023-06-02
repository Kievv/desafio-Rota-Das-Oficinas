import React, { useState } from 'react';

const ConversorRomano = () => {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState('');

  const handleEntradaChange = (event) => {
    setEntrada(event.target.value);
  };

  const converterParaArabico = () => {
    const numeroArabico = converterRomanoParaArabico(entrada);
    setResultado(numeroArabico.toString());
  };

  const converterParaRomano = () => {
    const numeroRomano = converterArabicoParaRomano(parseInt(entrada, 10));
    setResultado(numeroRomano);
  };

  // Função para converter um número romano para arábico
  const converterRomanoParaArabico = (numeroRomano) => {
    if (numeroRomano === '') {
      return 0;
    }

    var valoresRomanos = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };

    var resultado = 0;

    for (var i = 0; i < numeroRomano.length; i++) {
      var valorAtual = valoresRomanos[numeroRomano[i]];
      var valorProximo = valoresRomanos[numeroRomano[i + 1]];

      if (valorProximo && valorAtual < valorProximo) {
        resultado += valorProximo - valorAtual;
        i++;
      } else {
        resultado += valorAtual;
      }
    }

    return resultado;
  };

  // Função para converter um número arábico para romano
  const converterArabicoParaRomano = (numeroArabico) => {
    // Implemente aqui a lógica de conversão de arábico para romano
    var numerosArabicos = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var numerosRomanos = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
    var resultado = '';

    if (numeroArabico <= 0 || numeroArabico >= 4000) {
      return 'O número não pode ser maior que 3999 nem menor que 0';
    }

    for (var i = 0; i < numerosArabicos.length; i++) {
      while (numeroArabico >= numerosArabicos[i]) {
        resultado += numerosRomanos[i];
        numeroArabico -= numerosArabicos[i];
      }
    }

    return resultado;
    // Retorne o número romano correspondente
  };

  return (
    <div>
      <h1>Conversor Romano</h1>
      <label>
        Insira um número Romano ou Arábico:
        <input type="text" value={entrada} onChange={handleEntradaChange} />
      </label>
      <button onClick={converterParaArabico}>Converter para Arábico</button>
      <button onClick={converterParaRomano}>Converter para Romano</button>
      <div>
        Resultado: <span>{resultado}</span>
      </div>
    </div>
  );
};

export default ConversorRomano;
