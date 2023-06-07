import { Input, Grid } from '@nextui-org/react';

export default function InputJogo(props) {
  return (
    <Grid.Container gap={1}>
      <Grid>
        <Input label="Number" type="number" onChange={(e) => props.onChangeValue(e)} />
      </Grid>
    </Grid.Container>
  );
}
