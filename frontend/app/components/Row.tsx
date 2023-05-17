import styled from 'styled-components'
import { Box, BoxProps } from 'rebass/styled-components'
import React from 'react';

interface RowProps extends BoxProps {
  children: React.ReactNode;
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}

// FIXME
const Row = ({
  width = 'auto',
  align = 'center',
  justify = 'start',
  padding,
  border,
  borderRadius,
  children
}: RowProps) => {
  const classNames = `flex w-${width} justify-${justify} items-${align} ${padding ? `p-${padding}` : ''} ${border ? `border-${border}` : ''} ${borderRadius ? `rounded-${borderRadius}` : ''}`;

  return (
    <Box className={classNames}>
      {children}
    </Box>
  );
};

export const RowBetween = styled(Row)`
  justify-content: space-between;
`
// export const RowBetween = (props: RowProps) => {
//   return (
//     <Row justify="between" {...props} />
//   )
// }

export const RowFlat = styled.div`
  display: flex;
  align-items: flex-end;
`

export const AutoRow = styled(Row)<{ gap?: string; justify?: string }>`
  flex-wrap: wrap;
  margin: ${({ gap }) => gap && `-${gap}`};
  justify-content: ${({ justify }) => justify && justify};

  & > * {
    margin: ${({ gap }) => gap} !important;
  }
`

export const RowFixed = ({ gap, children }: { gap?: string; children: React.ReactNode }) => {
  return (
    <Row margin={gap || 0} width="fit">
      {children}
    </Row>
  )
}

export const ResponsiveRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    row-gap: 1rem;
  `};
`

export default Row;
