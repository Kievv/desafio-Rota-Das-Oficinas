import { Button, Spacer } from '@nextui-org/react';

export default function BotaoRota(props) {
  return (
    <>
      <Button
        auto
        bordered
        shadow
        flat={true}
        size={{
          '@initial': 'xl',

          '@xs': 'sm',

          '@sm': 'md',

          '@md': 'lg',

          '@lg': 'lg',

          '@xl': 'xl',
        }}
        color={props.color}
        onPress={props.onClick}
      >
        {props.texto}
      </Button>
    </>
  );
}
