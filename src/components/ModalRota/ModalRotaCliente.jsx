import React, { useContext } from 'react';
import { Modal, Input, Row, Checkbox, Spacer, Text, Radio } from '@nextui-org/react';
import DataContext from '../../services/DataContext';
import BotaoRota from '../BotaoRota/BotaoRota';

export default function ModalRotaCliente(props) {
  const { produtos, mesa, setMesa } = useContext(DataContext);
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  var chunk_size = 3;
  var arr = produtos;
  var groups = arr
    .map(function (e, i) {
      return i % chunk_size === 0 ? arr.slice(i, i + chunk_size) : null;
    })
    .filter(function (e) {
      return e;
    });
  console.log({ arr, groups });

  const handlePress = () => {
    closeHandler();
    props.onClick();
  };

  const handleChangeSlect = (e) => {
    console.log(e);
    setSelected(e);
  };

  const handleChangeMesa = (e) => {
    setMesa(e.target.value);

    console.log(mesa);
  };

  return (
    <div>
      <BotaoRota color="warning" shadow onClick={handler} texto={'Adicionar Clientes'} />
      <Modal
        width="500px"
        css={{ backgroundColor: '#EDEDED' }}
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" b size={24} color="warning">
            Clientes
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            label="Cliente"
            clearable
            bordered
            fullWidth
            color="warning"
            size="lg"
            placeholder="Nome"
            onChange={props.onChangeCliente}
            value={props.dataCliente}
          />

          <Input
            type="number"
            label="Mesa"
            clearable
            bordered
            fullWidth
            color="warning"
            size="lg"
            placeholder="Valor"
            onChange={handleChangeMesa}
            value={mesa}
          />
          <Radio.Group orientation="horizontal" label="Taxa de Serviço" onChange={props.onChangeTaxa}>
            <Radio value={true} color="warning">
              Sim
            </Radio>
            <Radio value={false} color="warning">
              Não
            </Radio>
          </Radio.Group>
          <Row>
            <Checkbox.Group color="warning" value={selected} onChange={(e) => handleChangeSlect(e)} label="Consumo">
              {produtos.map((produto, index) => {
                return (
                  <Checkbox
                    value={produto.nome}
                    key={index}
                    onChange={(event) => props.onChangeConsumidos(event, produto.nome)}
                    size="sm"
                  >
                    {produto.nome} (R$ {produto.valor})
                    <Spacer y={1} />
                  </Checkbox>
                );
              })}
              <Spacer y={1} />
              <Text>Você selecionou: {selected.join(', ')}</Text>
            </Checkbox.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <BotaoRota ghost onClick={closeHandler} color={'error'} texto={'Fechar'} />

          <BotaoRota ghost onClick={handlePress} color={'success'} texto={'Cadastrar'} />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
