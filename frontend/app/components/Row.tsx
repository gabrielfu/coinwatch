import { Box, BoxProps } from 'rebass'

const Row = (props: BoxProps) => {
  return ( 
    <Box
      className="flex"
      width={props.width ?? "100%"}
      alignItems={props.alignItems ?? "center"}
      justifyContent={props.justifyContent ?? "flex-start"}
      {...props}
    />
   );
}

export const RowBetween = (props: BoxProps) => {
  return (
    <Row justifyContent="space-between" {...props} />
  )
}

export const RowFixed = (props: BoxProps) => {
  return (
    <Row margin={0} width="fit" {...props} />
  )
}

export default Row;
