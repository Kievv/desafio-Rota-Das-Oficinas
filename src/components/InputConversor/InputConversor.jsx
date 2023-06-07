import { Input, Grid, Text } from '@nextui-org/react';

export default function InputConversor(props) {
  return (
    <Grid.Container gap={1}>
      <Grid>
        <Text h1>{props.text}</Text>
        <Input type="text" onChange={(e) => props.onChangeValue(e)} />
      </Grid>
    </Grid.Container>
  );
}
