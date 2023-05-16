import styled from 'styled-components'
import { Box } from 'rebass/styled-components'

interface RowProps {
  children: React.ReactNode;
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}

// FIXME
const Row: React.FC<RowProps> = ({
  width = '100%',
  align = 'center',
  justify = 'flex-start',
  padding,
  border,
  borderRadius,
  children
}) => {
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

export const RowFixed = styled(Row)<{ gap?: string; justify?: string }>`
  width: fit-content;
  margin: ${({ gap }) => gap && `-${gap}`};
`

export const ResponsiveRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
    row-gap: 1rem;
  `};
`

export default Row;
