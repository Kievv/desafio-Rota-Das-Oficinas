import { Button, Spacer } from '@nextui-org/react';

export default function BotaoErro(props) {
  return (
    <>
      <Button
        auto
        size={{
          '@initial': 'xl',

          '@xs': 'sm',

          '@sm': 'md',

          '@md': 'lg',

          '@lg': 'lg',

          '@xl': 'xl',
        }}
        color={props.color}
      >
        {props.texto}
      </Button>
    </>
  );
}
