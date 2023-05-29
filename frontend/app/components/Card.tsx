import { Box, BoxProps } from 'rebass'

const Card = (props: BoxProps) => {
  return ( 
    <Box 
      width={props.width ?? '100%'}
      className="rounded-2xl p-4"
      {...props}
    />
   );
}

export default Card;
