import React from 'react';
import { Modal, Input, Row, Checkbox, Button, Text } from '@nextui-org/react';
import BotaoRota from '../BotaoRota/BotaoRota';

export default function ModalRota(props) {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log('closed');
  };

  const handlePress = () => {
    closeHandler();
    props.onClick(props.dataProduto, props.dataValor);
  };
  return (
    <div>
      <BotaoRota color="warning" shadow onClick={handler} texto={'Inserir Produtos'} />
      <Modal width="500px" closeButton blur aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
        <Modal.Header>
          <Text id="modal-title" b color="warning" size={24}>
            Produtos
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            label="Produto"
            clearable
            bordered
            fullWidth
            color="warning"
            size="lg"
            placeholder="Produto"
            onChange={props.onChangeProduto}
            value={props.dataProduto}
          />
          <Input
            type="number"
            label="Valor"
            clearable
            bordered
            fullWidth
            color="warning"
            size="lg"
            placeholder="Valor"
            onChange={props.onChangeValor}
            value={props.dataValor}
          />
        </Modal.Body>
        <Modal.Footer>
          <BotaoRota ghost onClick={closeHandler} color={'error'} texto={'Fechar'} />

          <BotaoRota ghost onClick={handlePress} color={'warning'} texto={'Cadastrar'} />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
