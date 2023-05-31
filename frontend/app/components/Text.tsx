import { Text, TextProps } from 'rebass';
import { twColors } from '../twConfig';

interface LabelProps extends TextProps {
  end?: number
}

interface PercentProps extends LabelProps {
  negative?: boolean
}

// responsive text
export const Label = (props: LabelProps) => {
  return (
    <Text 
      className={`
        flex items-center font-normal text-base 
        font-variant-numeric: tabular-nums 
        ${props.end ? 'justify-end' : 'justify-start'}
      `}
      fontWeight={500}
      {...props} 
    />
  )
}

export const ClickableText = (props: LabelProps) => {
  return (
    <Label 
      className={`
        ${props.end ? 'text-right' : 'text-left'} 
        hover:opacity-60 hover:cursor-pointer select-none
      `}
      {...props} 
    />
  )
}

export const Percent = (props: PercentProps) => {
  const color = (props.negative ?
    twColors.tick_down : 
    twColors.tick_up) as string;
  return (
    <Label 
      fontWeight={500}
      color={color}
      {...props} 
    />
  )
}
